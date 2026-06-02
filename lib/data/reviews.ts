export type Review = {
  id: string;
  productId: string;
  customerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  comment: string;
  verified: boolean;
};

export const REVIEWS: Review[] = [];

export function getReviewsByProduct(productId: string): Review[] {
  return REVIEWS.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): {
  average: number;
  count: number;
} {
  const reviews = getReviewsByProduct(productId);
  if (reviews.length === 0) return { average: 0, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
}
