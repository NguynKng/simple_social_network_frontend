import { useEffect, useState } from "react";
import { chatApi } from "../services/chatApi";
import { messageApi } from "../services/messageApi";
import useChatStore from "../store/chatStore";
import useAuthStore from "../store/authStore";

export const useGetChats = () => {
  const { user } = useAuthStore();
  const { messages, setMessages, updateMessage } = useChatStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return; // không tải nếu chưa đăng nhập
    const fetchChats = async () => {
      setLoading(true);
      try {
        const res = await chatApi.getRecentChat();
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching recent chats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [setMessages, user]);

  return { messages, loading, updateMessage };
};

export const useGetHistoryChat = (userChatId) => {
  const { user: currentUser } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser || !userChatId) return;

    const fetchChats = async () => {
      setLoading(true);
      try {
        const res = await messageApi.getHistoryChat(userChatId);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userChatId, currentUser]);

  return {
    messages,
    loading,
    setMessages,
  };
};
