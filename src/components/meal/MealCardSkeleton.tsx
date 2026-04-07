import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MealCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden rounded-2xl border-0 h-40">
      <Skeleton className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>
    </Card>
  );
};

export default MealCardSkeleton;
