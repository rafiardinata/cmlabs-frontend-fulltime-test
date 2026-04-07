import type { Ingredient, MealDetail, MealPreview } from "@/types";

const BASE = "https://www.themealdb.com/api/json/v1/1";

export const mealdbApi = {
  async listIngredients(): Promise<Ingredient[]> {
    const res = await fetch(`${BASE}/list.php?i=list`);
    const data = await res.json();
    return data.meals ?? [];
  },

  async filterByIngredient(name: string): Promise<MealPreview[]> {
    const res = await fetch(`${BASE}/filter.php?i=${encodeURIComponent(name)}`);
    const data = await res.json();
    return data.meals ?? [];
  },

  async getMealDetail(id: string): Promise<MealDetail | null> {
    const res = await fetch(`${BASE}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals?.[0] ?? null;
  },
};

export function extractRecipe(meal: MealDetail) {
  const items: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]?.trim();
    const meas = meal[`strMeasure${i}`]?.trim();
    if (ing) items.push({ ingredient: ing, measure: meas || "—" });
  }
  return items;
}

export function getYoutubeId(url: string | null): string | null {
  if (!url) return null;
  return url.match(/(?:v=|youtu\.be\/)([^&?\s]+)/)?.[1] ?? null;
}
