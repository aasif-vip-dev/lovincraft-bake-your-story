import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Gift, Star } from "lucide-react";
import { useLoyalty, tierThresholds } from "@/contexts/LoyaltyContext";
import type { RewardTier } from "@/contexts/LoyaltyContext";

const LoyaltyCard = () => {
  const { userPoints, getTierBenefits } = useLoyalty();

  if (!userPoints) return null;

  const currentBenefits = getTierBenefits(userPoints.tier);
  const tiers: RewardTier[] = ["bronze", "silver", "gold", "platinum"];
  const currentTierIndex = tiers.indexOf(userPoints.tier);
  const nextTier = tiers[currentTierIndex + 1];
  const nextTierPoints = nextTier ? tierThresholds[nextTier].minPoints : null;
  const progressToNext = nextTierPoints
    ? ((userPoints.points / nextTierPoints) * 100)
    : 100;

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-semibold">{currentBenefits.name}</span>
            </div>
            <div className="text-3xl font-bold">{userPoints.points} Points</div>
          </div>
          <Badge variant="secondary" className="text-lg">
            {currentBenefits.discount}% OFF
          </Badge>
        </div>

        {nextTierPoints && (
          <div className="mb-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">
                Progress to {tierThresholds[nextTier].name}
              </span>
              <span className="font-semibold">
                {nextTierPoints - userPoints.points} points to go
              </span>
            </div>
            <Progress value={progressToNext} className="h-2" />
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
          <div className="text-center">
            <div className="mb-1 flex justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="text-lg font-bold">{userPoints.totalPurchases || 0}</div>
            <div className="text-xs text-muted-foreground">Purchases</div>
          </div>
          <div className="text-center">
            <div className="mb-1 flex justify-center">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div className="text-lg font-bold">{userPoints.totalReviews || 0}</div>
            <div className="text-xs text-muted-foreground">Reviews</div>
          </div>
          <div className="text-center">
            <div className="mb-1 flex justify-center">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div className="text-lg font-bold">{userPoints.totalShares || 0}</div>
            <div className="text-xs text-muted-foreground">Shares</div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-background/50 p-4">
          <h4 className="mb-2 font-semibold">Your Benefits:</h4>
          <ul className="space-y-1 text-sm">
            {currentBenefits.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyCard;