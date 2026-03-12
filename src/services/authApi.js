import { toast } from "react-hot-toast";
import api from "./api"; // Ensure this is your configured axios instance

export const authApi = {
  signup: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);

      // Check if response indicates failure
      if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      // Handle axios error
      if (error.response) {
        const errorMessage = error.response.data.message || "Signup failed";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Handle other errors
      toast.error(error.message || "Signup failed");
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      // Check if response indicates failure
      if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      // Handle axios error
      if (error.response) {
        const errorMessage = error.response.data.message || "Login failed";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Handle other errors
      toast.error(error.message || "Login failed");
      throw error;
    }
  },
  // Logout user
  logout: async () => {
    try {
      const response = await api.post("/auth/logout");

      // Check if response indicates failure
      if (response.data.success === false) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      // Handle axios error
      if (error.response) {
        const errorMessage = error.response.data.message || "Logout failed";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Handle other errors
      toast.error(error.message || "Logout failed");
      throw error;
    }
  },

  // Check authentication status
  checkAuth: async (token) => {
    try {
      const response = await api.post("/auth/verify", { token });

      // Check if response indicates failure
      if (response.data.success === false) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      // Don't show error toast for auth check failures since this is often expected
      if (error.response && error.response.status === 401) {
        toast.error("Authentication failed. Please log in again.");
      }
      throw error;
    }
  },
  verifyEmail: async (token, otp) => {
    try {
      const response = await api.post("/auth/verify-email", { token, otp });

      // Check if response indicates failure
      if (response.data.success === false) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      // Don't show error toast for auth check failures since this is often expected
      if (error.response && error.response.status !== 401) {
        toast.error(error.response.data.message || "Email verification failed");
      }
      throw error;
    }
  },
};
