import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../store/authStore.js";
import PostModal from "./PostModal";
import { getBackendImgURL } from "../utils/helper.js";

function CreatePost({ onPostCreated }) {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayName = user?.fullName || "User";

  const linkToProfile = () => {
    return `/profile/${user.slug || ""}`;
  };

  const placeholderText = () => {
    return `What's on your mind, ${displayName}?`;
  };

  return (
    <>
      <div className="px-4 bg-white dark:bg-[#1b1f2b] dark:border dark:border-[#2b2b3d] rounded-lg">
        {/* Status input row */}
        <div className="flex items-center gap-2 py-4">
          <Link
            to={linkToProfile()}
            className="size-12 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-70"
          >
            <img
              src={getBackendImgURL(user?.avatar)}
              alt="user-avatar"
              className="object-cover rounded-full size-full"
            />
          </Link>

          <div
            className="py-2 px-4 rounded-full bg-gray-100 dark:bg-[#2a2e3d] hover:bg-gray-200 dark:hover:bg-[#3a3e4d] flex-1 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-gray-500 dark:text-gray-300 lg:text-[1.1rem] text-sm">
              {placeholderText()}
            </span>
          </div>
          <button className="rounded-lg hover:bg-gray-200 cursor-pointer p-2" onClick={() => setIsModalOpen(true)}>
            <img
              src="/photos.png"
              alt="Photos"
              className="object-cover size-6"
            />
          </button>
        </div>
      </div>

      {/* Post creation modal */}
      {isModalOpen && (
        <PostModal
          onPostCreated={onPostCreated}
          onClose={() => setIsModalOpen(false)}
          placeholder={placeholderText()}
        />
      )}
    </>
  );
}

export default CreatePost;
