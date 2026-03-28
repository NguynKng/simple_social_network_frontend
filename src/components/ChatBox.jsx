import { useEffect, useMemo, useRef, useState } from "react";
import {
  ImageIcon,
  Minus,
  Phone,
  Send,
  Video,
  X,
  Smile,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import useAuthStore from "../store/authStore";
import { useGetChats, useGetHistoryChat } from "../hooks/useChat";
import { Link } from "react-router-dom";
import {
  formatTimeToDateAndHour,
  formatTimeToHourMinute,
} from "../utils/timeUtils";
import { messageApi } from "../services/messageApi";
import { useImagePreview } from "../hooks/useImagePreview";
import SpinnerLoading from "./SpinnerLoading";
import { getBackendImgURL } from "../utils/helper";

function ChatBox({ onClose, chat }) {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const { user: currentUser, socket, onlineUsers, theme } = useAuthStore();
  const messagesEndRef = useRef(null);
  const isPrivateChat = chat?.type === "private";

  const userChat = useMemo(() => {
    if (!chat || !currentUser || !isPrivateChat) return null;
    return chat.participants.find((p) => p._id !== currentUser._id) || null;
  }, [chat, currentUser, isPrivateChat]);

  const getProfileLink = () => {
    if (!userChat?.slug) return "#";
    return `/profile/${userChat.slug}`;
  };

  const isOnline = userChat ? onlineUsers.includes(userChat._id) : false;
  const { messages, setMessages, loading } = useGetHistoryChat(chat?._id);
  const { updateMessage } = useGetChats();
  const { openImagePreview, ImagePreviewModal } = useImagePreview();

  useEffect(() => {
    if (!socket || !currentUser || !chat?._id) return;

    const handleReceiveMessage = (incomingMessage) => {
        console.log("incoming msg", incomingMessage);
      if (!incomingMessage?.chatId) return;
      if (String(incomingMessage.chatId) === String(chat._id)) {
        setMessages((prev) => [...prev, incomingMessage]);
      }
    };

    const handleNewMessage = (payload) => {
      if (payload?.chat) {
        updateMessage(payload.chat);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, currentUser, chat, updateMessage, setMessages]);

  useEffect(() => {
    if (!isMinimized) {
      const timer = setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "auto" }),
        50
      );
      return () => clearTimeout(timer);
    }
  }, [messages, isMinimized]);

  const handleSend = async () => {
    if ((!message.trim() && !images.length) || !currentUser || !chat?._id) return;

    try {
      const response = await messageApi.sendMessage({
        chatId: chat._id,
        text: message,
        images,
      });
      if (response.success) {
        setMessage("");
        setImages([]);
        setImagesPreview([]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleMinimize = () => setIsMinimized(!isMinimized);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
    setImagesPreview((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleCall = () => {
    
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  if (!userChat || !isPrivateChat) return null;

  return (
    <>
      <ImagePreviewModal />

      <div className="fixed right-10 bottom-0 lg:w-92 z-50 transform transition-all duration-300 ease-out hover:scale-[1.01]">
        <div className="rounded-t-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div
            className={`p-2 font-semibold rounded-t-xl flex justify-between items-center bg-linear-to-r from-blue-500 to-purple-500 text-white ${
              isMinimized ? "cursor-pointer" : ""
            }`}
            onClick={() => isMinimized && setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center gap-2">
              <Link to={getProfileLink()} className="relative rounded-full size-8">
                <img
                  src={getBackendImgURL(userChat.avatar)}
                  className="object-cover size-full rounded-full"
                  alt={userChat.fullName}
                />
                {isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </Link>

              <div>
                <Link to={getProfileLink()} className="text-[15px]">
                  {userChat.fullName}
                </Link>
                {isOnline && (
                  <span className="text-green-300 block text-[13px]">Online</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <button
                  onClick={handleToggleCall}
                  className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer"
                >
                  <Phone className="size-5 fill-white" />
                </button>
                <button className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer">
                  <Video className="size-5 fill-white" />
                </button>
              </div>
              <button
                onClick={handleMinimize}
                className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer"
              >
                <Minus />
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer"
              >
                <X />
              </button>
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              isMinimized ? "max-h-0 opacity-0" : "h-104 opacity-100"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col gap-2 p-2 overflow-y-auto text-sm dark:text-gray-200">
                {loading ? (
                  <SpinnerLoading />
                ) : (
                  messages.map((msg, index) => {
                    const senderId = msg?.sender?._id || msg?.sender;
                    const isMyMessage = String(senderId) === String(currentUser._id);
                    const formatDate = (dateStr) =>
                      new Date(dateStr).toLocaleDateString();
                    const currentDate = formatDate(msg.createdAt);
                    const prevDate =
                      index > 0
                        ? formatDate(messages[index - 1].createdAt)
                        : null;
                    const shouldShowDate = currentDate !== prevDate;

                    return (
                      <div key={msg._id + index}>
                        {shouldShowDate && (
                          <div className="text-center text-xs text-gray-500 mb-2 mt-1">
                            {formatTimeToDateAndHour(msg.createdAt)}
                          </div>
                        )}
                        <div
                          className={`flex gap-2 ${
                            isMyMessage ? "justify-end" : "justify-start"
                          }`}
                        >
                          {!isMyMessage && (
                            <img
                              src={getBackendImgURL(userChat?.avatar)}
                              className="w-8 h-8 rounded-full object-cover self-start"
                              alt="Avatar"
                              title={userChat?.fullName}
                            />
                          )}
                          <div
                            className={`flex flex-col max-w-[75%] ${
                              isMyMessage
                                ? "self-end items-end"
                                : "self-start items-start"
                            }`}
                          >
                            {msg.text && (
                              <div
                                className={`px-4 py-2 rounded-2xl text-sm wrap-break-word ${
                                  isMyMessage
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 dark:bg-[rgb(52,52,52)] dark:text-white"
                                }`}
                                style={{
                                  wordBreak: "break-word",
                                  whiteSpace: "pre-wrap",
                                  overflowWrap: "break-word",
                                }}
                              >
                                {msg.text}
                              </div>
                            )}
                            {msg.media && msg.media.length > 0 && (
                              <div
                                className={`gap-2 mt-2 ${
                                  msg.media.length >= 3
                                    ? "grid grid-cols-3"
                                    : "flex flex-col"
                                }`}
                              >
                                {msg.media.map((src, idx) => (
                                  <img
                                    key={idx}
                                    onClick={() => openImagePreview(msg.media, idx)}
                                    src={getBackendImgURL(src)}
                                    alt={`preview-${idx}`}
                                    className={`object-cover cursor-pointer rounded-lg border border-gray-300 ${
                                      msg.media.length >= 3
                                        ? "w-full h-20"
                                        : "w-full h-40"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                            <span
                              className={`text-xs mt-1 text-gray-400 ${
                                isMyMessage ? "pr-1" : "pl-1"
                              }`}
                            >
                              {formatTimeToHourMinute(msg.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {imagesPreview.length > 0 && (
                <div className="px-2 py-2 flex gap-2 overflow-x-auto border-t border-gray-200">
                  {imagesPreview.map((src, index) => (
                    <div
                      key={index}
                      className="relative w-12 h-12 shrink-0"
                    >
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-2 flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 relative">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer transition"
                  >
                    <ImageIcon className="size-4" />
                  </label>

                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="p-2 bg-yellow-400 cursor-pointer text-white rounded-full hover:bg-yellow-500 transition"
                  >
                    <Smile className="size-4" />
                  </button>
                </div>

                {showEmoji && (
                  <div className="absolute bottom-14 left-2 z-50">
                    <EmojiPicker theme={theme} onEmojiClick={handleEmojiClick} />
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 text-black dark:text-white"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />

                <button
                  onClick={handleSend}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
