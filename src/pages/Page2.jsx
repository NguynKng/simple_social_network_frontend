export default function Page2() {
  const images = [
    {
      id: 1,
      url: "https://i.pinimg.com/originals/3e/61/bb/3e61bb707c62c337239800e9c9398666.jpg",
      title: "Jesus Christ",
      description: "Sacred Heart of Jesus",
    },
    {
      id: 2,
      url: "https://i.pinimg.com/736x/89/13/16/8913168604ab1ee9a86ce43ef2b8c2e3.jpg",
      title: "The Good Shepherd",
      description: "Jesus the shepherd",
    },
    {
      id: 3,
      url: "https://www.seekpng.com/png/full/316-3164943_jesus-christ-png-image-jesus-christ-images-png.png",
      title: "Christ the King",
      description: "King of Kings",
    },
    {
      id: 4,
      url: "https://i.pinimg.com/originals/c5/4e/8d/c54e8d6f5e4e5e5e5e5e5e5e5e5e5e5e5e.jpg",
      title: "Divine Mercy",
      description: "Jesus I trust in you",
    },
    {
      id: 5,
      url: "https://cdn.pixabay.com/photo/2016/11/29/02/05/jesus-1867098_960_720.jpg",
      title: "Risen Christ",
      description: "Resurrection glory",
    },
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
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
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
            Đây là một trang gallery hiển thị 5 hình ảnh đẹp với hiệu ứng hover
            động. Di chuột qua mỗi hình để xem chi tiết thông tin. Bạn có thể
            thay thế các URL hình ảnh bằng hình ảnh của riêng bạn.
          </p>
        </div>
      </div>
    </div>
  );
}
