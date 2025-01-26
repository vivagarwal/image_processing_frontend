import React, { useState } from 'react';
import axios from 'axios';

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/imgproc/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUploadStatus('File uploaded successfully!');
    } catch (error) {
      setUploadStatus('File upload failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Upload CSV File</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
        <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
      {uploadStatus && <p className="mt-4 text-lg">{uploadStatus}</p>}
    </div>
  );
};

export default FileUploadPage;
