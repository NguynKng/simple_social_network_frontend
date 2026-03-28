import PropTypes from "prop-types";
import Header from "./Header";
import Meta from "./Meta";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { useCallback } from "react";
import Navbar from "./Navbar";
import NotificationPopup from "./NotificationPopup";
import { Sound } from "../utils/sound";
import useNotificationStore from "../store/notificationStore";
import ChatBox from "./ChatBox";

function MainLayout({ Element }) {
  const { addNotification } = useNotificationStore();
  const { socket, updateUser, user } = useAuthStore();
  const [showChat, setShowChat] = useState(false);
  const [activeChat, setActiveChat] = useState();
  const [isCloseSidebar, setIsCloseSidebar] = useState(true);

  const [popup, setPopup] = useState({
    isPopup: false,
    content: {
      title: "",
      author_name: "",
      author_img: "",
    },
  });

  const handleGetNewMessage = useCallback(
    (chat) => {
      setShowChat(true);
      setActiveChat(chat.chat);
    },
    [setShowChat, setActiveChat],
  );

  const handleGetNotificationsAndPopup = useCallback(
    (notification1) => {
      Sound.play();
      const { notification } = notification1;
      if (notification.type === "friend_request") {
        const newFriendRequests = [...user.friendRequests, notification.actor];
        updateUser({
          friendRequests: newFriendRequests,
        });
      }

      if (notification.type === "accepted_request") {
        const newFriends = [...user.friends, notification.actor];
        updateUser({
          friends: newFriends,
        });
      }
      addNotification(notification);
      setPopup({
        isPopup: true,
        content: {
          title: notification.content,
          author_img: notification.actor.avatar,
          author_name: notification.actor.fullName,
        },
      });
      const timer = setTimeout(() => {
        setPopup({
          isPopup: false,
          content: {
            title: "",
            author_img: "",
            author_name: "",
          },
        });
      }, 10000);

      return () => clearTimeout(timer);
    },
    [addNotification, setPopup, updateUser, user],
  );

  const handleClosePopup = () => {
    setPopup({
      isPopup: false,
      content: {
        title: "",
        author_name: "",
        author_img: "",
      },
    });
  };

  const handleToggleChat = (chat) => {
    setActiveChat(chat);
    setShowChat(true); // ensure ChatBox shows when a friend is clicked
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setActiveChat(undefined);
  }; // giữ nguyên qua các route

  useEffect(() => {
    if (!socket) return;
    socket.on("getNewMessage", handleGetNewMessage);
    socket.on("new_notification", handleGetNotificationsAndPopup);

    return () => {
      socket.off("getNewMessage", handleGetNewMessage);
      socket.off("new_notification", handleGetNotificationsAndPopup);
    };
  }, [socket, handleGetNotificationsAndPopup, handleGetNewMessage]);

  return (
    <>
      <Meta title={`BingBong`} />
      <Navbar
        isCloseSidebar={isCloseSidebar}
        setIsCloseSidebar={setIsCloseSidebar}
      />
      <Header onToggleChat={handleToggleChat} />
      <div className="relative mt-[64px] bg-gradient-to-br from-[#f0f4ff] to-[#fff1f7] dark:from-[#1c1f2a] dark:to-[#2a2e3d] min-h-[92vh]">
        <Element onToggleChat={handleToggleChat} />
      </div>
      {showChat && <ChatBox chat={activeChat} onClose={handleCloseChat} />}
      {popup.isPopup && (
        <NotificationPopup content={popup.content} onClose={handleClosePopup} />
      )}
    </>
  );
}

MainLayout.propTypes = {
  Element: PropTypes.elementType.isRequired,
};

export default MainLayout;
