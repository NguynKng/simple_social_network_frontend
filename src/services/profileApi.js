import api from "./api";

export const profileApi = {
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
};
