import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PoetryCardProps {
  id: string;
  imageUrl: string;
  caption?: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const PoetryCard = ({
  imageUrl,
  caption,
  author,
  likes,
  comments,
  isLiked = false,
  isBookmarked = false,
}: PoetryCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden group hover:shadow-gold transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 ring-2 ring-primary/20">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-card-foreground">{author.name}</p>
            <p className="text-sm text-muted-foreground">@{author.username}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt="Poetry"
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`p-0 hover:scale-110 transition-transform ${
                liked ? "text-red-500" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 text-muted-foreground hover:text-primary hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 text-muted-foreground hover:text-primary hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`p-0 hover:scale-110 transition-transform ${
              bookmarked ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Bookmark className={`w-6 h-6 ${bookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Likes */}
        <p className="font-medium text-card-foreground mb-2">
          {likeCount.toLocaleString()} likes
        </p>

        {/* Caption */}
        {caption && (
          <div className="text-card-foreground">
            <span className="font-medium">{author.username}</span>{" "}
            <span className="text-muted-foreground">{caption}</span>
          </div>
        )}

        {/* Comments */}
        {comments > 0 && (
          <Button
            variant="ghost"
            className="p-0 h-auto mt-2 text-muted-foreground hover:text-primary"
          >
            View all {comments} comments
          </Button>
        )}
      </div>
    </div>
  );
};

export default PoetryCard;