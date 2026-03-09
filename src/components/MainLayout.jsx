import PropTypes from "prop-types";
import Header from "./Header";
import Meta from "./Meta";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { useCallback } from "react";
import Navbar from "./Navbar";

function MainLayout({ Element }) {
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

  return (
    <>
      <Meta title={`BingBong`} />
      <Navbar
        isCloseSidebar={isCloseSidebar}
        setIsCloseSidebar={setIsCloseSidebar}
      />
      <Header />
      <div className="relative mt-[64px] bg-gradient-to-br from-[#f0f4ff] to-[#fff1f7] dark:from-[#1c1f2a] dark:to-[#2a2e3d] min-h-[92vh]">
        <Element />
      </div>
    </>
  );
}

MainLayout.propTypes = {
  Element: PropTypes.elementType.isRequired,
};

export default MainLayout;
