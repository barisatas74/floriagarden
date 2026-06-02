import { PageHeaderSkeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container">
        <PageHeaderSkeleton />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
