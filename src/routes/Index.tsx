import { createBrowserRouter } from "react-router";

import AppLayout from "@/components/layout/AppLayout";
import NotFound from "@/components/layout/NotFound";
import Ingredients from "@/pages/Ingredients";
import IngredientDetail from "@/pages/IngredientDetail";
import MealDetailPage from "@/pages/MealDetail";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Ingredients /> },

      {
        path: "foods/:name",
        element: <IngredientDetail />,
      },

      {
        path: "foods/meals/:id",
        element: <MealDetailPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);