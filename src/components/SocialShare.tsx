import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  hashtags?: string[];
  variant?: "default" | "compact";
}

const SocialShare = ({ 
  url, 
  title, 
  description = "",
  image = "",
  hashtags = ["lovreboLove", "BakeWithLove"],
  variant = "default"
}: SocialShareProps) => {
  const fullUrl = `${window.location.origin}${url}`;
  const hashtagString = hashtags.join(",");
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}&hashtags=${encodeURIComponent(hashtagString)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(`${title} - ${description}`)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${description}\n\n${fullUrl}\n\n#${hashtags.join(" #")}`)}`,
  };

  const handleShare = (platform: string, link: string) => {
    window.open(
      link,
      "_blank",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    );
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: fullUrl,
        });
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    }
  };

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-background">
          <DropdownMenuItem onClick={() => handleShare("Facebook", shareLinks.facebook)}>
            <Facebook className="mr-2 h-4 w-4" />
            Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("Twitter", shareLinks.twitter)}>
            <Twitter className="mr-2 h-4 w-4" />
            Share on Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("Pinterest", shareLinks.pinterest)}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.92-.19-2.33 0-3.33l1.35-5.71s-.34-.68-.34-1.68c0-1.58.91-2.76 2.05-2.76.97 0 1.43.73 1.43 1.6 0 .98-.62 2.44-.94 3.8-.27 1.13.57 2.05 1.69 2.05 2.03 0 3.59-2.14 3.59-5.23 0-2.73-1.96-4.64-4.76-4.64-3.24 0-5.14 2.43-5.14 4.94 0 .98.38 2.03.85 2.6a.36.36 0 0 1 .08.35c-.09.38-.3 1.23-.34 1.4-.05.23-.17.28-.4.17-1.42-.66-2.31-2.73-2.31-4.39 0-3.58 2.6-6.87 7.51-6.87 3.95 0 7.02 2.81 7.02 6.57 0 3.92-2.47 7.07-5.9 7.07-1.15 0-2.24-.6-2.61-1.31l-.71 2.7c-.26.99-.96 2.23-1.43 2.99A12 12 0 1 0 12 0z"/>
            </svg>
            Share on Pinterest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("WhatsApp", shareLinks.whatsapp)}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Share on WhatsApp
          </DropdownMenuItem>
          {navigator.share && (
            <DropdownMenuItem onClick={handleNativeShare}>
              <Share2 className="mr-2 h-4 w-4" />
              More options
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("Facebook", shareLinks.facebook)}
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("Twitter", shareLinks.twitter)}
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("Pinterest", shareLinks.pinterest)}
        title="Share on Pinterest"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.92-.19-2.33 0-3.33l1.35-5.71s-.34-.68-.34-1.68c0-1.58.91-2.76 2.05-2.76.97 0 1.43.73 1.43 1.6 0 .98-.62 2.44-.94 3.8-.27 1.13.57 2.05 1.69 2.05 2.03 0 3.59-2.14 3.59-5.23 0-2.73-1.96-4.64-4.76-4.64-3.24 0-5.14 2.43-5.14 4.94 0 .98.38 2.03.85 2.6a.36.36 0 0 1 .08.35c-.09.38-.3 1.23-.34 1.4-.05.23-.17.28-.4.17-1.42-.66-2.31-2.73-2.31-4.39 0-3.58 2.6-6.87 7.51-6.87 3.95 0 7.02 2.81 7.02 6.57 0 3.92-2.47 7.07-5.9 7.07-1.15 0-2.24-.6-2.61-1.31l-.71 2.7c-.26.99-.96 2.23-1.43 2.99A12 12 0 1 0 12 0z"/>
        </svg>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare("WhatsApp", shareLinks.whatsapp)}
        title="Share on WhatsApp"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </Button>
      {navigator.share && (
        <Button
          variant="outline"
          size="icon"
          onClick={handleNativeShare}
          title="More sharing options"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SocialShare;