import React, { useState } from 'react';
import axios from 'axios';

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus(null);
    setResponseData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const webhookUrl =`${window.location.origin}/api/webhook`;
    formData.append('webhook_url', webhookUrl);

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/imgproc/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUploadStatus('✅ File uploaded successfully!');
      setResponseData(response.data);
    } catch (error) {
      setUploadStatus('❌ File upload failed. Please try again.');
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full text-center border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Upload CSV File</h1>
        <p className="text-gray-600 mb-4">Select a CSV file and click Upload</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 p-3 bg-gray-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-bold rounded-lg text-white transition-all shadow-md ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105'
            }`}
          >
            {isLoading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>

        {uploadStatus && (
          <div
            className={`mt-6 text-lg font-semibold p-4 rounded-md ${
              uploadStatus.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {uploadStatus}
          </div>
        )}

        {responseData && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md text-left border border-gray-200">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words bg-gray-100 p-4 rounded-lg">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadPage;
