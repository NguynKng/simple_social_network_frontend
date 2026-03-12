export default function Page1() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Page 1
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          This is a simple page component.
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-3">Content Section</h2>
          <p className="text-gray-700">
            Add your content here. You can customize this page as needed.
          </p>
        </div>
      </div>
    </div>
  );
}