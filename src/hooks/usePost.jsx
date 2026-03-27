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

  const createPost = useCallback(async (payload) => {
    try {
      const response = await postApi.createPost(payload);

      if (response.success) {
        const createdPost = response.data;
        if (createdPost) {
          setFeed((prev) => [createdPost, ...prev]);
        }
      } else {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  }, []);

  const deletePost = useCallback(async (postId) => {
    try {
      const response = await postApi.deletePost(postId);

      if (response.success) {
        setFeed((prev) => prev.filter((post) => post._id !== postId));
      } else {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  }, []);

  return {
    feed,
    setFeed,
    loading,
    error,
    createPost,
    deletePost,
  };
};

export const useGetOwnerPost = (ownerId) => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOwnerPosts = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await postApi.getPostsByOwner(ownerId);

      if (response.success) {
        setPosts(response.data || []);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [ownerId, user]);

  useEffect(() => {
    loadOwnerPosts();
  }, [loadOwnerPosts]);

  const createOwnerPost = useCallback(async (payload) => {
    try {
      const response = await postApi.createPost(payload);

      if (response.success) {
        const createdPost = response.data;
        if (createdPost) {
          setPosts((prev) => [createdPost, ...prev]);
        }
      } else {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  }, []);

  const deleteOwnerPost = useCallback(async (postId) => {
    try {
      const response = await postApi.deletePost(postId);

      if (response.success) {
        setPosts((prev) => prev.filter((post) => post._id !== postId));
      } else {
        setError(response.message);
      }

      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  }, []);

  return {
    posts,
    setPosts,
    loading,
    error,
    refreshOwnerPosts: loadOwnerPosts,
    createOwnerPost,
    deleteOwnerPost,
  };
};