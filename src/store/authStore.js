import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "../services/authApi";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import Config from "../envVars";

//let hasShownTokenExpired = false; // flag để toast chỉ 1 lần

const useAuthStore = create(
  persist(
    (set, get) => ({
      /** ==== STATE ==== */
      user: null,
      token: null,
      isAuthenticated: false,
      tokenExpired: false,

      // Separate loading states
      isCheckingAuth: false,
      isLoggingIn: false,
      isSigningUp: false,

      error: null,
      onlineUsers: [],
      socket: null,
      theme: "light",

      /** ==== THEME ==== */
      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      },
      /** Sign up */
      signup: async (data) => {
        set({ isSigningUp: true, error: null });
        try {
          const res = await authApi.signup(data);
          set({ isSigningUp: false });
          toast.success("Account created successfully!");
          return res;
        } catch (error) {
          set({ isSigningUp: false, error: error.message });
          throw error;
        }
      },
      resetError: () => set({ error: null }),

      /** Login (user hoặc admin) */
      login: async (credentials, options = { admin: false }) => {
        set({ isLoggingIn: true, error: null });
        try {
          const response = options.admin
            ? await authApi.adminLogin(credentials)
            : await authApi.login(credentials);

          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoggingIn: false,
            error: null,
          });
          toast.success("Login successful!");
          get().connectSocket();
          return response;
        } catch (error) {
          set({ isLoggingIn: false, error: error.message });
          throw error;
        }
      },

      /** Logout */
      logout: async (manual = true) => {
        try {
          get().disconnectSocket();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoggingIn: false,
            isCheckingAuth: false,
            isSigningUp: false,
            error: null,
          });
          if (manual) toast.success("Logged out successfully!");
        } catch (error) {
          set({ error: error.message });
          console.error("Logout error:", error);
        }
      },
      /** Check Authentication */
      checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        const token = get().token;
        try {
          const response = await authApi.checkAuth(token);
          set({
            user: response.data,
            isAuthenticated: true,
            isCheckingAuth: false,
          });
          if (!get().socket) get().connectSocket();
          return response;
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: false,
            token: null,
          });
        }
      },

      /** ==== SOCKET ==== */
      connectSocket: () => {
        const { user, token } = get();
        if (!user || !token || get().socket?.connected) return;

        const socket = io(Config.BACKEND_URL, {
          auth: { token }, // Gửi token cho authentication
          withCredentials: true,
          transports: ["websocket"],
        });

        set({ socket });

        socket.on("connect", () => {
          console.log("[SOCKET CONNECTED]", socket.id);
        });

        socket.on("user-status", ({ userId, status }) => {
          console.log(`User ${userId} is now ${status}`);
        });

        socket.on("getOnlineUsers", (onlineUsers) => {
          set({ onlineUsers });
        });
      },

      disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) socket.disconnect();
      },

      /** ==== USER ==== */
      updateUser: (data) => {
        set({ user: { ...get().user, ...data } });
      },
    }),
    {
      name: "social-network-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
      }),
    },
  ),
);

export default useAuthStore;
