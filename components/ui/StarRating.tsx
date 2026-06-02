import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Props = {
  rating: number;
  size?: number;
  className?: string;
};

export default function StarRating({ rating, size = 14, className }: Props) {
  const rounded = Math.round(rating);
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${rating} / 5 yıldız`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={
            i < rounded
              ? "fill-rose-gold text-rose-gold"
              : "text-coffee/20"
          }
        />
      ))}
    </div>
  );
}
