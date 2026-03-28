import { create } from "zustand";
import { notificationApi } from "../services/notificationApi";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  setNotifications: (notifications) => {
    const unread = notifications.filter((n) => !n.isRead).length;
    set({ notifications, unreadCount: unread });
  },
  addNotification: (notification) => {
    const currentNotifications = get().notifications;
    const updatedNotifications = [notification, ...currentNotifications];
    const unread = updatedNotifications.filter((n) => !n.isRead).length;
    set({ notifications: updatedNotifications, unreadCount: unread });
  },
  appendNotifications: (newNotifications) => {
    const currentNotifications = get().notifications;
    const updatedNotifications = [...currentNotifications, ...newNotifications];
    const unread = updatedNotifications.filter((n) => !n.isRead).length;
    set({ notifications: updatedNotifications, unreadCount: unread });
  },
  markAsAllRead: async () => {
    if (get().unreadCount === 0) return;
    try {
      const response = await notificationApi.markAsAllRead();
      if (response.success) {
        const updated = get().notifications.map((notification) => ({
          ...notification,
          isRead: true,
        }));
        set({ notifications: updated, unreadCount: 0 });
      }
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
    }
  },
}));

export default useNotificationStore;
