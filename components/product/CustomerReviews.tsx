import { BadgeCheck } from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import FadeIn from "@/components/motion/FadeIn";
import { getReviewsByProduct, getAverageRating } from "@/lib/data/reviews";

type Props = {
  productId: string;
};

export default function CustomerReviews({ productId }: Props) {
  const reviews = getReviewsByProduct(productId);
  const { average, count } = getAverageRating(productId);

  // Henüz gerçek yorum yoksa bölümü hiç gösterme (sahte yorum yerine boş)
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 border-t border-rose-gold/15">
      <div className="container flex flex-col gap-10">
        <FadeIn className="flex flex-col items-start gap-3">
          <span className="eyebrow">Müşteri Yorumları</span>
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2 className="heading-section">{average.toFixed(1)}</h2>
            <StarRating rating={average} size={18} />
            <span className="text-coffee/55 text-sm">({count} değerlendirme)</span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((review, i) => (
            <FadeIn key={review.id} delay={i * 0.05} y={20}>
              <article className="h-full glass-dark rounded-3xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-rose-gold-gradient text-coffee font-display text-lg">
                      {review.customerName.charAt(0)}
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="font-display text-lg text-coffee flex items-center gap-1.5">
                        {review.customerName}
                        {review.verified && (
                          <BadgeCheck
                            size={14}
                            strokeWidth={1.8}
                            className="text-rose-gold"
                            aria-label="Doğrulanmış alıcı"
                          />
                        )}
                      </span>
                      <span className="text-xs text-coffee/45">{review.date}</span>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={14} />
                </div>
                <p className="mt-4 text-sm text-coffee/75 leading-relaxed">
                  {review.comment}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
