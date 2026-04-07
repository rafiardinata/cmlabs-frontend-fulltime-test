import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { useLocation } from "react-router";

const formatLabel = (segment: string) => {
  if (segment === "foods") return "Ingredients";
  if (segment === "meals") return "Meals";

  return decodeURIComponent(segment).replace("-", " ");
};

const AppBreadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* HOME */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {paths.map((segment, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          const isMeals = segment === "meals";
          const isIngredients = segment === "ingredients";
          const isDisabled = isLast || isMeals || isIngredients || segment === "foods";

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isDisabled ? (
                  <BreadcrumbPage className="capitalize">
                    {formatLabel(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="capitalize">
                    {formatLabel(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;