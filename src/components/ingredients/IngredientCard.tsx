import type { Ingredient } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

type Props = {
  item: Ingredient;
};

const IngredientCard = ({ item }: Props) => {
  const imageUrl = `https://www.themealdb.com/images/ingredients/${item.strIngredient}.png`;
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        onClick={() => navigate(`/foods/${item.strIngredient}`)}
        className="cursor-pointer h-full bg-white/5 backdrop-blur-lg border border-white/10 hover:shadow-xl transition"
      >
        <CardHeader className="flex items-center justify-center">
          <motion.img
            src={imageUrl}
            alt={item.strIngredient}
            className="w-20 h-20 object-contain"
            whileHover={{ scale: 1.1 }}
          />
        </CardHeader>

        <CardContent className="text-center">
          <CardTitle className="text-primary text-lg">
            {item.strIngredient}
          </CardTitle>

          <CardDescription className="text-black/70 text-xs mt-1 line-clamp-2">
            {item.strDescription || "No description"}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IngredientCard;
