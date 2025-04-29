import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareButtonProps {
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title }) => {
  const handleShare = async () => {
    const url = window.location.href;
    const text = `Check out this recipe for ${title}!`;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share recipe');
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleShare}
    >
      <Share2 className="h-5 w-5" />
    </Button>
  );
};

export default ShareButton;
