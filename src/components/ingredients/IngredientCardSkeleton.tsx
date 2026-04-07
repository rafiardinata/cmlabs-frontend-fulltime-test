import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const IngredientCardSkeleton = () => {
  return (
    <Card className="h-full bg-white/5 backdrop-blur-lg border border-white/10">
      {/* IMAGE */}
      <CardHeader className="flex items-center justify-center">
        <Skeleton className="w-20 h-20 rounded-md" />
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="text-center space-y-2">
        {/* Title */}
        <Skeleton className="h-4 w-24 mx-auto" />

        {/* Description */}
        <Skeleton className="h-3 w-32 mx-auto" />
        <Skeleton className="h-3 w-28 mx-auto" />
      </CardContent>
    </Card>
  );
};

export default IngredientCardSkeleton;
