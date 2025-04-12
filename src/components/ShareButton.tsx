
import { useState } from "react";
import { Share2, Check, Copy, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
  url: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  url,
  variant = "outline",
  size = "default"
}) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = url || window.location.href;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };
  
  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };
  
  // For mobile devices that support Web Share API
  const nativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: shareUrl,
        })
        .catch((error) => console.log("Error sharing", error));
    }
  };

  return (
    <>
      {navigator.share ? (
        <Button
          variant={variant}
          size={size}
          onClick={nativeShare}
        >
          <Share2 className={size === "icon" ? "h-4 w-4" : "h-4 w-4 mr-2"} />
          {size !== "icon" && "Share"}
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={variant}
              size={size}
            >
              <Share2 className={size === "icon" ? "h-4 w-4" : "h-4 w-4 mr-2"} />
              {size !== "icon" && "Share"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={copyToClipboard}>
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareToFacebook}>
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareToTwitter}>
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ShareButton;
