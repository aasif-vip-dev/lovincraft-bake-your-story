import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp } from "lucide-react";
import { useReviews } from "@/contexts/ReviewContext";

interface ReviewListProps {
  productId: number;
}

const ReviewList = ({ productId }: ReviewListProps) => {
  const { getProductReviews, markHelpful } = useReviews();
  const reviews = getProductReviews(productId);

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Star className="mx-auto mb-4 h-12 w-12 text-muted" />
          <h3 className="mb-2 font-serif text-xl font-bold">No reviews yet</h3>
          <p className="text-muted-foreground">Be the first to review this product!</p>
        </CardContent>
      </Card>
    );
  }

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="mb-1 text-4xl font-bold">{averageRating}</div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(Number(averageRating))
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-1 font-semibold">{review.userName}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-primary text-primary"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary">Verified Purchase</Badge>
              </div>

              <p className="mb-4 text-muted-foreground">{review.comment}</p>

              {review.photos.length > 0 && (
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {review.photos.map((photo, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => markHelpful(review.id)}
                className="gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                Helpful ({review.helpful})
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;