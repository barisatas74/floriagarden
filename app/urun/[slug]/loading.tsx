import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="pt-28 md:pt-32 pb-20 md:pb-28">
      <div className="container">
        <Skeleton className="h-3 w-48 mb-8" />

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Galeri */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <Skeleton className="aspect-[4/5] w-full rounded-3xl" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          </div>

          {/* Bilgi */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="grid gap-3 mt-4">
              <Skeleton className="h-12 w-full rounded-full" />
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>
        </div>

        {/* Önerilenler */}
        <div className="mt-20">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
