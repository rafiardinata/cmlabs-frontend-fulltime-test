import { extractRecipe, getYoutubeId, mealdbApi } from "@/services/api";
import type { MealDetail } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import EmptyState from "@/components/common/EmptyState";
import { StarIcon } from "lucide-react";
import AppBreadcrumb from "@/components/common/Breadchumb";

const MealDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    mealdbApi
      .getMealDetail(id)
      .then((res) => {
        setMeal(res);
      })
      .catch(() => {
        setMeal(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-1/2 bg-muted rounded-lg" />
          <div className="h-80 w-full bg-muted rounded-2xl" />
          <div className="h-6 w-1/3 bg-muted rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (!meal) {
    return (
      <EmptyState
        title="Meal not found"
        description="Data tidak ditemukan"
        icon={<StarIcon className="w-10 h-10 text-primary/60" />}
      />
    );
  }

  const recipes = extractRecipe(meal);
  const youtubeId = getYoutubeId(meal.strYoutube);

  return (
    <section className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-primary mb-2">
            {meal.strMeal}
          </h1>
          <p className="text-black/50">
            {meal.strCategory} • {meal.strArea}
          </p>
        </motion.div>

        <AppBreadcrumb />

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="overflow-hidden rounded-2xl mb-10"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-400px object-cover"
          />
        </motion.div>

        {/* GRID CONTENT */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* RECIPES */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-primary mb-4">
              Recipes
            </h2>

            <ul className="space-y-2 text-sm">
              {recipes.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b border-white/10 pb-1"
                >
                  <span>{item.ingredient}</span>
                  <span className="text-black/50">{item.measure}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* INSTRUCTIONS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-primary mb-4">
              Instructions
            </h2>

            <p className="text-black/70 leading-relaxed whitespace-pre-line">
              {meal.strInstructions}
            </p>
          </motion.div>
        </div>

        {/* YOUTUBE */}
        {youtubeId && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h2 className="text-xl font-semibold text-primary mb-4">
              Video Tutorial
            </h2>

            <div className="overflow-hidden rounded-2xl aspect-square">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MealDetailPage;
