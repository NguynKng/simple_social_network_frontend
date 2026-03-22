import { postApi } from "../services/postApi";
import { useCallback, useEffect, useState } from "react";
import useAuthStore from "../store/authStore";

export const useGetFeed = () => {
  const { user } = useAuthStore();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeed = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await postApi.getPosts();
      
      if (response.success) {
        const newPosts = response.data || [];
        
        setFeed(newPosts);
    
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  return {
    feed,
    setFeed,
    loading,
    error,
  };
};