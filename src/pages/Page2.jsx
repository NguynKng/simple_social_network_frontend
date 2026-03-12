export default function Page2() {
  const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    title: "Tom Cruise",
    description: "Ngôi sao hành động huyền thoại"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    title: "Scarlett Johansson",
    description: "Nữ diễn viên tài năng và quyến rũ"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
    title: "Robert Downey Jr.",
    description: "Iron Man của Marvel Universe"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    title: "Chris Hemsworth",
    description: "Thần sấm Thor của Hollywood"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    title: "Leonardo DiCaprio",
    description: "Diễn viên tài năng đoạt giải Oscar"
  }

];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600">
            Khám phá bộ sưu tập hình ảnh tuyệt đẹp
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                  <p className="text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Về Bộ Sưu Tập
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Đây là một trang gallery hiển thị 5 hình ảnh đẹp với hiệu ứng hover động. 
            Di chuột qua mỗi hình để xem chi tiết thông tin. Bạn có thể thay thế các 
            URL hình ảnh bằng hình ảnh của riêng bạn.
          </p>
        </div>
      </div>
    </div>
  );
}