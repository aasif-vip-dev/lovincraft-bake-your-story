import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Upload, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/contexts/ReviewContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { toast } from "@/hooks/use-toast";

interface ReviewFormProps {
  productId: number;
  productName: string;
  onSuccess?: () => void;
}

const ReviewForm = ({ productId, productName, onSuccess }: ReviewFormProps) => {
  const { user } = useAuth();
  const { addReview } = useReviews();
  const { addPoints } = useLoyalty();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Photos must be under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Review required",
        description: "Please write a review",
        variant: "destructive",
      });
      return;
    }

    addReview({
      productId,
      userId: user?.email || "guest",
      userName: user?.email?.split("@")[0] || "Guest",
      rating,
      comment: comment.trim(),
      photos,
    });

    // Award loyalty points
    addPoints(50, "review", `Review for ${productName}`);

    toast({
      title: "Review submitted! 🎉",
      description: "You earned 50 loyalty points for your review!",
    });

    setRating(0);
    setComment("");
    setPhotos([]);
    onSuccess?.();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="mb-2 block">Your Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your baking experience with this product..."
              rows={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Photos (Optional)</Label>
            <p className="mb-2 text-sm text-muted-foreground">
              Share photos of your baked creations!
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mb-4"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </Button>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={photo}
                      alt={`Upload ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit Review & Earn 50 Points
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;