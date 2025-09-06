import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PoetryPost {
  id: string;
  title?: string | null;
  caption?: string | null;
  image_url: string;
  category: string | null;
  tags?: string[] | null;
  like_count: number | null;
  comment_count: number | null;
  created_at: string;
  user_id: string;
  author?: {
    display_name?: string | null;
    username?: string | null;
    avatar_url?: string | null;
  };
  user_likes?: { user_id: string }[];
}

export const usePoetryPosts = () => {
  const [posts, setPosts] = useState<PoetryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Get posts
      const { data: postsData, error: postsError } = await supabase
        .from('poetry_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      if (!postsData) {
        setPosts([]);
        return;
      }

      // Get user profiles for each post
      const userIds = [...new Set(postsData.map(post => post.user_id))];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, display_name, username, avatar_url')
        .in('user_id', userIds);

      // Get likes for each post
      const postIds = postsData.map(post => post.id);
      const { data: likesData } = await supabase
        .from('likes')
        .select('post_id, user_id')
        .in('post_id', postIds);

      // Combine data
      const postsWithData = postsData.map(post => {
        const profile = profilesData?.find(p => p.user_id === post.user_id);
        const postLikes = likesData?.filter(like => like.post_id === post.id) || [];

        return {
          ...post,
          author: profile ? {
            display_name: profile.display_name,
            username: profile.username,
            avatar_url: profile.avatar_url
          } : undefined,
          user_likes: postLikes
        };
      });

      setPosts(postsWithData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
};