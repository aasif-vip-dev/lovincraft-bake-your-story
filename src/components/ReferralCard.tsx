import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Gift, Copy, Check, Share2, Users } from "lucide-react";
import { useReferral } from "@/contexts/ReferralContext";
import { toast } from "@/hooks/use-toast";

const ReferralCard = () => {
  const { referralCode, referrals, totalReferralPoints, shareReferralLink } = useReferral();
  const [copied, setCopied] = useState(false);

  const referralLink = shareReferralLink();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const shareOnSocial = (platform: string) => {
    const text = `Join me on LovinCraft and get started with amazing baking ingredients! Use my referral code: ${referralCode}`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(referralLink);

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  const completedReferrals = referrals.filter(r => r.status === "completed").length;

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-accent" />
          Referral Program
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center rounded-lg bg-background/50 p-4">
            <div className="mb-1 flex justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">{completedReferrals}</div>
            <div className="text-xs text-muted-foreground">Successful Referrals</div>
          </div>
          <div className="text-center rounded-lg bg-background/50 p-4">
            <div className="mb-1 flex justify-center">
              <Gift className="h-5 w-5 text-accent" />
            </div>
            <div className="text-2xl font-bold">{totalReferralPoints}</div>
            <div className="text-xs text-muted-foreground">Points Earned</div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Your Referral Code</div>
          <div className="flex gap-2">
            <Input 
              value={referralCode} 
              readOnly 
              className="font-mono text-lg font-bold"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Share Link */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Share Your Link</div>
          <div className="flex gap-2">
            <Input 
              value={referralLink} 
              readOnly 
              className="text-sm"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Share on Social Media</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => shareOnSocial("facebook")}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => shareOnSocial("twitter")}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => shareOnSocial("whatsapp")}
            >
              <Share2 className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* How it Works */}
        <div className="rounded-lg bg-background/50 p-4">
          <h4 className="mb-2 font-semibold">How It Works</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">1.</span>
              <span>Share your referral link with friends</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">2.</span>
              <span>They make their first purchase</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">3.</span>
              <span>You earn 100 bonus points!</span>
            </li>
          </ul>
        </div>

        {/* Referral History */}
        {referrals.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-semibold">Recent Referrals</div>
            <div className="space-y-2">
              {referrals.slice(0, 5).map((referral) => (
                <div 
                  key={referral.id} 
                  className="flex items-center justify-between rounded-lg bg-background/50 p-3"
                >
                  <div>
                    <div className="font-medium">{referral.referredEmail}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(referral.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant={referral.status === "completed" ? "default" : "secondary"}>
                    {referral.status === "completed" ? `+${referral.pointsEarned} pts` : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralCard;
