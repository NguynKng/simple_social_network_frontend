import api from "./api";

export const userApi = {
  getUserBySlug: async (slug) => {
    try {
      const response = await api.get(`/users/${slug}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to fetch user profile");
      }
      throw error;
    }
  },

  searchUsersByName: async (query, options = {}) => {
    try {
      const response = await api.get("/users/search", {
        params: {
          q: query,
          page: options.page || 1,
          limit: options.limit || 10,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to search users");
      }
      throw error;
    }
  },

  uploadAvatar: async (file, userId) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      if (userId) {
        formData.append("userId", userId);
      }

      const response = await api.put("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to upload avatar");
      }
      throw error;
    }
  },

  uploadCoverPhoto: async (file, userId) => {
    try {
      const formData = new FormData();
      formData.append("coverPhoto", file);
      if (userId) {
        formData.append("userId", userId);
      }

      const response = await api.put("/users/cover-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to upload cover photo");
      }
      throw error;
    }
  },

  sendFriendRequest: async (userId) => {
    try {
      const response = await api.post(`/users/friends/request/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to send friend request");
      }
      throw error;
    }
  },

  cancelFriendRequest: async (userId) => {
    try {
      const response = await api.delete(`/users/friends/request/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to cancel friend request");
      }
      throw error;
    }
  },

  acceptFriendRequest: async (userId) => {
    try {
      const response = await api.post(`/users/friends/accept/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to accept friend request");
      }
      throw error;
    }
  },

  declineFriendRequest: async (userId) => {
    try {
      const response = await api.post(`/users/friends/reject/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to decline friend request");
      }
      throw error;
    }
  },

  removeFriend: async (userId) => {
    try {
      const response = await api.delete(`/users/friends/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to remove friend");
      }
      throw error;
    }
  },
};