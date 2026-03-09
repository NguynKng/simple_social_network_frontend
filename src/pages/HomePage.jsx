import { useRef, useCallback } from "react";
import SpinnerLoading from "../components/SpinnerLoading";
import useAuthStore from "../store/authStore";
import LeftSidebar from "../components/LeftSideBar";

function HomePage({ onToggleChat }) {
  const { user } = useAuthStore();

  // ✅ Ref cho Intersection Observer
//   const observerRef = useRef();
//   const lastPostRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observerRef.current) observerRef.current.disconnect();

//       observerRef.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           loadMore();
//         }
//       });

//       if (node) observerRef.current.observe(node);
//     },
//     [loading, hasMore, loadMore]
//   );

//   const handleAddPost = (newPost) => {
//     setFeed((prev) => [newPost, ...prev]);
//   };

//   const handleRemovePost = (postId) => {
//     setFeed((prev) => prev.filter((post) => post._id !== postId));
//   };

  return (
    <div className="min-h-screen">
      <div className="flex w-full max-w-[1920px] mx-auto justify-center lg:px-4 md:px-2 px-1 py-4 gap-4">
        {/* LEFT SIDEBAR: NEWS - Only visible on LG screens */}
        <aside className="hidden lg:block lg:w-[280px] xl:w-[320px] flex-shrink-0">
          <div className="sticky top-20">
            <LeftSidebar />
          </div>
        </aside>

      </div>
    </div>
  );
}

export default HomePage;
