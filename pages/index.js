import FileUploadPage from "../components/FileUploadPage";
import StatusPage from "../components/StatusPage";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 via-blue-200 to-purple-300 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Image Processing Portal
      </h1>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start">
        {/* Left side - File Upload */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Upload CSV File</h2>
          <FileUploadPage />
        </div>

        {/* Right side - Status Check */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Check Status</h2>
          <StatusPage />
        </div>
      </div>
    </div>
  );
}
