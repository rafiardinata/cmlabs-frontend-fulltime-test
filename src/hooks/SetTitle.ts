import { useEffect } from "react";
import { useLocation, matchPath } from "react-router";

const TITLE_MAP = [
  {
    path: "/foods/meals/:id",
    title: "Meals Detail | Meal App",
  },
  {
    path: "/foods/:name",
    title: "Foods | Meal App",
  },
];

const DEFAULT_TITLE = "Meal App | Good Meals";

const SetTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let newTitle = DEFAULT_TITLE;

    for (const route of TITLE_MAP) {
      const match = matchPath(route.path, pathname);
      if (match) {
        newTitle = route.title;
        break;
      }
    }

    document.title = newTitle;
  }, [pathname]);

  return null;
};

export default SetTitle;
