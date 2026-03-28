import { toast } from "react-hot-toast";
import api from "./api";

const handleApiError = (error, fallbackMessage) => {
  if (error.response) {
    const errorMessage = error.response.data?.message || fallbackMessage;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  toast.error(error.message || fallbackMessage);
  throw error;
};

export const notificationApi = {
  getNotifications: async (page = 1, limit = 20) => {
    try {
      const response = await api.get("/notifications", {
        params: { page, limit },
      });
      if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch notifications");
    }
  },
  markAsAllRead: async () => {
    try {
      const response = await api.patch("/notifications/read-all");
      if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to mark notifications as read");
    }
  },
};
