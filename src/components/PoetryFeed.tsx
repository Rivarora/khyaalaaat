import { useAuth } from "@/hooks/useAuth";
import { usePoetryPosts } from "@/hooks/usePoetryPosts";
import PoetryCard from "./PoetryCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const PoetryFeed = () => {
  const { posts, loading, error } = usePoetryPosts();
  const { user } = useAuth();

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading poetry...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-destructive">Error loading poetry: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-foreground mb-2">No poetry shared yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to share your beautiful verses!</p>
            {!user && (
              <p className="text-sm text-muted-foreground">
                <Button variant="link" className="p-0 h-auto">Sign in</Button> to start sharing poetry
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            const transformedPost = {
              id: post.id,
              imageUrl: post.image_url,
              caption: post.caption || post.title || "",
              author: {
                name: post.author?.display_name || "Anonymous Poet",
                username: post.author?.username || "anonymous",
                avatar: post.author?.avatar_url || "/placeholder.svg"
              },
              likes: post.like_count || 0,
              comments: post.comment_count || 0,
              isLiked: user ? post.user_likes?.some(like => like.user_id === user.id) || false : false,
              isBookmarked: false // We'll implement bookmarks later
            };

            return (
              <div
                key={post.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PoetryCard {...transformedPost} />
              </div>
            );
          })}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="bg-card hover:bg-card/80 text-card-foreground border-border hover:border-primary"
          >
            Load More Poetry
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PoetryFeed;