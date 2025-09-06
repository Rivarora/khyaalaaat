import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLikes } from "@/hooks/useLikes";

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
  id,
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
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentList, setCommentList] = useState<string[]>([]);
  const { toggleLike, loading } = useLikes();

  const handleLike = async () => {
    if (loading) return;
    
    const success = await toggleLike(id, liked);
    if (success) {
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const openComments = () => setIsCommentModalOpen(true);
  const closeComments = () => setIsCommentModalOpen(false);

  const handleAddComment = () => {
    if (commentInput.trim() === "") return;
    setCommentList([commentInput, ...commentList]);
    setCommentInput("");
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
            <Button
              variant="ghost"
              size="sm"
              className="p-0 text-muted-foreground hover:text-primary hover:scale-110 transition-transform"
              onClick={openComments}
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 text-muted-foreground hover:text-primary hover:scale-110 transition-transform"
              onClick={async () => {
                const shareData = {
                  title: "Check out this poetry!",
                  text: caption || "",
                  url: window.location.href,
                };
                if (navigator.share) {
                  try {
                    await navigator.share(shareData);
                  } catch (err) {
                    // User cancelled or error occurred
                  }
                } else if (navigator.clipboard) {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  } catch (err) {
                    alert("Failed to copy link. Please copy it manually.");
                  }
                } else {
                  // Fallback for very old browsers
                  prompt("Copy this link:", window.location.href);
                }
              }}
            >
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
            onClick={openComments}
          >
            View all {comments} comments
          </Button>
        )}
      </div>

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-card rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={closeComments}
            >
              <X className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            <div className="mb-4 max-h-60 overflow-y-auto">
              {commentList.length === 0 ? (
                <div className="text-muted-foreground">No comments yet. Be the first to comment!</div>
              ) : (
                commentList.map((c, i) => (
                  <div key={i} className="mb-2 p-2 rounded bg-muted">
                    <span className="font-medium text-card-foreground">You:</span>{" "}
                    <span className="text-card-foreground">{c}</span>
                  </div>
                ))
              )}
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full border rounded px-3 py-2 mb-2"
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleAddComment();
              }}
              autoFocus
            />
            <Button className="w-full" onClick={handleAddComment} disabled={commentInput.trim() === ""}>
              Post
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoetryCard;