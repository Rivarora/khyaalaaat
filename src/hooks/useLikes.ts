import { useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useLikes = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const toggleLike = async (postId: string, isCurrentlyLiked: boolean) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like posts.",
        variant: "destructive"
      });
      return false;
    }

    setLoading(true);
    try {
      if (isCurrentlyLiked) {
        // Remove like
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', postId);

        if (error) throw error;
      } else {
        // Add like
        const { error } = await supabase
          .from('likes')
          .insert({
            user_id: user.id,
            post_id: postId
          });

        if (error) throw error;
      }

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { toggleLike, loading };
};