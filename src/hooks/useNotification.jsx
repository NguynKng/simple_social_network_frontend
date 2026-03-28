import { useCallback, useEffect, useState } from "react";
import { notificationApi } from "../services/notificationApi";
import useNotificationStore from "../store/notificationStore";
import useAuthStore from "../store/authStore";

export function useGetNotification() {
  const { user } = useAuthStore();
  const { setNotifications, appendNotifications, notifications, unreadCount } =
    useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = useCallback(
    async (currentPage = 1) => {
      const currentUserId = user?._id || user?.id;
      if (!currentUserId) return;
      setLoading(true);

      try {
        const res = await notificationApi.getNotifications(currentPage);
        const items = Array.isArray(res.data?.notifications)
          ? res.data.notifications
          : [];

        if (currentPage === 1) {
          setNotifications(items);
        } else {
          appendNotifications(items);
        }

        setHasMore(Boolean(res.data.pagination?.hasNextPage));
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setLoading(false);
      }
    },
    [appendNotifications, setNotifications, user?._id, user?.id],
  );

  // Chỉ fetch khi user thay đổi để tránh vòng lặp setState
  useEffect(() => {
    const currentUserId = user?._id || user?.id;

    if (!currentUserId) {
      // logout → reset
      setNotifications([]);
      setHasMore(false);
      setPage(1);
      return;
    }

    setPage(1);
    setHasMore(true);
    fetchNotifications(1);
  }, [fetchNotifications, setNotifications, user?._id, user?.id]);

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNotifications(nextPage);
    }
  };

  return {
    loading,
    loadMore,
    hasMore,
    notifications,
    unreadCount,
  };
}
