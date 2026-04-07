import { mealdbApi } from "@/services/api";
import type { MealPreview } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import AppBreadcrumb from "@/components/common/Breadchumb";
import SearchBar from "@/components/SearchBar";
import { StarIcon } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import MealCardSkeleton from "@/components/meal/MealCardSkeleton";
import MealCard from "@/components/meal/MealCard";

const IngredientDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [meals, setMeals] = useState<MealPreview[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    setLoading(true);
    mealdbApi.filterByIngredient(name).then((data) => {
      setMeals(data);
      setLoading(false);
    });
  }, [name]);

  const filtered = useMemo(() => {
    return meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(search.toLowerCase()),
    );
  }, [meals, search]);

  return (
    <section className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-primary mb-2 capitalize">
            {name}
          </h1>
          <p className="text-black/50">
            Explore meals made with this ingredient
          </p>
        </motion.div>

        {/* SEARCH */}
        <SearchBar value={search} onChange={setSearch} />

        {/* BREADCRUMB */}
        <AppBreadcrumb />

        {/* LOADING FIRST */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <MealCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          /* EMPTY STATE */
          <EmptyState
            title="No results found"
            description="Tidak ada bahan yang cocok dengan pencarian kamu. Coba kata kunci lain ya."
            icon={<StarIcon className="w-10 h-10 text-primary/60" />}
            actionLabel="Reset Search"
            onAction={() => setSearch("")}
          />
        ) : (
          /* DATA */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}

        {/* TOTAL INFO */}
        <div className="mt-10 text-center text-sm text-black/50">
          Showing {filtered.length} of {meals.length} meals
        </div>
      </div>
    </section>
  );
};

export default IngredientDetail;
