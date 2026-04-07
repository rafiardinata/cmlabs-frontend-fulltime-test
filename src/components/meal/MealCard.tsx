import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { MealPreview } from "@/types";
import { useNavigate } from "react-router";

type Props = {
  meal: MealPreview;
};

const MealCard = ({ meal }: Props) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        onClick={() => navigate(`/foods/meals/${meal.idMeal}`)}
        className="relative cursor-pointer overflow-hidden rounded-2xl border-0 h-40"
      >
        {/* IMAGE FULL */}
        <motion.img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition" />

        {/* TEXT */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white font-semibold text-sm md:text-base text-center px-2 drop-shadow-lg">
            {meal.strMeal}
          </h3>
        </div>
      </Card>
    </motion.div>
  );
};

export default MealCard;