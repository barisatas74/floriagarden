import { cn } from "@/lib/utils/cn";

/**
 * Tek satırlık bir skeleton "shimmer" yer tutucu.
 * Koyu tema için tasarlandı — cream/10 üzerinde rose-gold parlaması.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-cream/5",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2s_ease-in-out_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-rose-gold/12 before:to-transparent",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Hızlı bir ürün kartı iskeleti.
 * Sayfa geçişlerinde flash etkisi yaratmaması için koyu cam yüzey kullanır.
 */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl glass-dark overflow-hidden">
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="p-6 flex flex-col gap-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex items-end justify-between mt-2">
          <Skeleton className="h-7 w-24" />
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-10 flex-1 rounded-full" />
          <Skeleton className="h-10 flex-1 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Blog kartı iskeleti.
 */
export function BlogCardSkeleton() {
  return (
    <div className="rounded-3xl glass-dark overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-6 flex flex-col gap-3">
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <div className="flex justify-between pt-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Sayfa başlığı iskeleti.
 */
export function PageHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-4 mb-12 max-w-2xl">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-14 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
