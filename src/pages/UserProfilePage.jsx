import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { profileApi } from "../services/profileApi";
import { toast } from "react-hot-toast";
import { FaCamera, FaSearchPlus, FaUserEdit } from "react-icons/fa";

const UserProfilePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await profileApi.getUserBySlug(slug);
        if (data.success && data.data) {
          setUser(data.data);
        } else {
          toast.error("User not found");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.message || "Error fetching profile");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchUserProfile();
  }, [slug, navigate]);

  if (loading) return <div className="flex justify-center mt-20 font-medium italic text-gray-400">Đang tải hồ sơ...</div>;
  if (!user) return null;

  const avatarUrl = user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || "User")}&background=EAB308&color=black&size=256`;

  return (
    /* Dùng flex để chia không gian. 
       ml-[75px] là dành cho Sidebar nhỏ, lg:ml-[280px] dành cho Sidebar lớn. 
    */
    <div className="min-h-screen bg-white ml-[75px] lg:ml-[280px] transition-all duration-300 flex flex-col">
      
      {/* 1. COVER SECTION */}
      <div className="relative w-full h-56 md:h-72 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-[40px] shadow-lg flex-shrink-0">
        <button className="absolute bottom-6 right-6 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 transition-all border border-white/20 z-10">
          <FaCamera /> Chỉnh sửa ảnh bìa
        </button>

        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-20">
          <div className="relative group w-36 h-36 md:w-44 md:h-44 rounded-full border-[8px] border-white shadow-2xl overflow-hidden bg-white">
            <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col cursor-pointer">
              <div className="flex-[1.5] flex items-center justify-center border-b border-white/10 hover:bg-white/10 transition-colors">
                <FaSearchPlus className="text-white text-3xl" />
              </div>
              <div className="flex-1 flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-white text-[10px] font-bold tracking-widest uppercase">Chỉnh sửa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CONTENT AREA: Chứa Name và Info Card */}
      <div className="flex-1 flex flex-col items-center px-6">
        
        {/* KHOẢNG ĐỆM: Đẩy tên xuống dưới Avatar (Avatar cao 176px, lấn xuống 80px) */}
        <div className="h-24 w-full"></div> 

        {/* FULLNAME - Nằm tách biệt, không bị che */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            {user.fullName}
          </h1>
          <p className="text-gray-400 font-semibold my-2 text-sm">@{user.slug}</p>
          
          <div className="flex gap-3 justify-center mt-6 text-sm" style={{marginTop: "12px"}}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
              Theo dõi
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
              Nhắn tin
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-4 rounded-2xl transition-all">
              <FaUserEdit size={18} />
            </button>
          </div>
        </div>

        {/* 4. INFO CARD - Đã xử lý không gian và thẩm mỹ */}
        <div className="w-full max-w-2xl mb-20 space-y-8 " style={{padding: "30px"}}>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-6 border border-slate-100 flex flex-col items-center shadow-sm">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bài viết</span>
              <span className="text-2xl font-black text-slate-800">12</span>
            </div>
            <div className="bg-slate-50 p-6 border border-slate-100 flex flex-col items-center shadow-sm">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tham gia</span>
              <span className="text-2xl font-black text-slate-800">
                {new Date(user.createdAt).getFullYear()}
              </span>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden" style={{marginTop: "20px"}}>
            <div className="px-8 py-8 bg-gray-50/50 border-b border-gray-100" style={{marginLeft: "20px", padding: "10px"}}>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[3px]">Chi tiết tài khoản</h3>
            </div>
            
            <div className="p-4 space-y-1" >
               <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors" style={{marginTop: "10px",marginBottom: "10px", marginLeft: "20px", marginRight: "20px"}}>
                  <span className="text-sm text-gray-400 font-semibold">Mã định danh</span>
                  <span className="text-sm text-gray-900 font-bold bg-gray-100 px-3 py-1 rounded-lg">@{user.slug}</span>
               </div>
               <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors" style={{marginTop: "10px", marginBottom: "10px", marginLeft: "20px", marginRight: "20px"}}>
                  <span className="text-sm text-gray-400 font-semibold">Ngày tham gia</span>
                  <span className="text-sm text-gray-900 font-bold">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;