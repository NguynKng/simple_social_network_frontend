import { toast } from "react-hot-toast";
import api from "./api";

export const newsApi = {
  fetchNews: async () => {
    try {
      const response = await api.get("/news");

      // Check if response indicates failure
      if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      // Handle axios error
      if (error.response) {
        const errorMessage = error.response.data.message || "Failed to fetch news";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Handle other errors
      toast.error(error.message || "Failed to fetch news");
      throw error;
    }
  },
};
