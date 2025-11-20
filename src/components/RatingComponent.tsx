import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface RatingComponentProps {
  onRate: (rating: number, feedback?: string) => void;
  currentRating?: number;
  currentFeedback?: string;
}

const RatingComponent = ({ onRate, currentRating, currentFeedback }: RatingComponentProps) => {
  const [rating, setRating] = useState(currentRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState(currentFeedback || "");
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(!!currentRating);

  const handleRatingClick = (value: number) => {
    setRating(value);
    setShowFeedback(true);
  };

  const handleSubmit = () => {
    onRate(rating, feedback.trim() || undefined);
    setSubmitted(true);
    setShowFeedback(false);
  };

  if (submitted) {
    return (
      <div className="rounded-lg bg-muted/30 p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-medium">Your Rating:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= rating
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
        </div>
        {feedback && (
          <p className="text-sm text-muted-foreground">{feedback}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-3">
      <div>
        <p className="mb-2 text-sm font-medium">How would you rate this response?</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoverRating || rating)
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <div className="space-y-2">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Any additional feedback? (optional)"
            rows={2}
            className="text-sm"
          />
          <Button onClick={handleSubmit} size="sm" className="w-full">
            Submit Rating
          </Button>
        </div>
      )}
    </div>
  );
};

export default RatingComponent;
