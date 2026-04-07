import { StarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { mealdbApi } from "@/services/api";
import type { Ingredient } from "@/types";
import { Button } from "@/components/ui/button";
import IngredientCard from "@/components/ingredients/IngredientCard";
import SearchBar from "@/components/SearchBar";
import IngredientCardSkeleton from "@/components/ingredients/IngredientCardSkeleton";
import EmptyState from "@/components/common/EmptyState";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 9;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mealdbApi.listIngredients().then((data) => {
      setIngredients(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    mealdbApi.listIngredients().then(setIngredients);
  }, []);

  const filteredIngredients = useMemo(() => {
    return ingredients.filter((item) =>
      item.strIngredient.toLowerCase().includes(search.toLowerCase()),
    );
  }, [ingredients, search]);

  const displayedIngredients = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    return filteredIngredients.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredIngredients, page]);

  return (
    <section id="features" className="pt-32 py-10 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5">
            {/* STARS */}
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-3 h-3 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            {/* TEXT */}
            <span className="font-body text-xs text-primary tracking-widest uppercase">
              LIST BAHAN MENU
            </span>

            {/* STARS */}
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-3 h-3 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl mb-4 font-bold tracking-tight text-primary">
            Pilih Bahan Menu
            <br />
            <em className="gradient-text not-italic">yang Kamu Butuhkan</em>
          </h2>

          <p className="text-black/50 max-w-xl mx-auto">
            Pilih bahan untuk melihat berbagai menu yang bisa kamu masak.
          </p>
        </motion.div>

        {/* SEARCH */}
        <SearchBar value={search} onChange={setSearch} />

        {/* LOADING FIRST */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <IngredientCardSkeleton key={i} />
            ))}
          </div>
        ) : search && filteredIngredients.length === 0 ? (
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedIngredients.map((item) => (
              <IngredientCard key={item.idIngredient} item={item} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-10 flex justify-center items-center gap-4">
        {/* PREV */}
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 rounded-lg text-white disabled:opacity-30"
        >
          Prev
        </Button>

        {/* INFO */}
        <span className="text-sm text-black/60">
          Page {page + 1} of{" "}
          {Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE)}
        </span>

        {/* NEXT */}
        <Button
          onClick={() =>
            setPage((p) =>
              p + 1 < Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE)
                ? p + 1
                : p,
            )
          }
          disabled={
            page + 1 >= Math.ceil(filteredIngredients.length / ITEMS_PER_PAGE)
          }
          className="px-4 py-2 rounded-lg text-white disabled:opacity-30"
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default Ingredients;
