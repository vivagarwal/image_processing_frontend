import React, { useState } from 'react';
import axios from 'axios';

const StatusPage = () => {
  const [requestId, setRequestId] = useState('');
  const [status, setStatus] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL; // Access base URL from environment variable

  const fetchStatus = async () => {
    setStatus('');
    setHtmlContent('');
    setError('');

    if (!requestId.trim()) {
      setError("⚠️ Please enter a valid Request ID.");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/imgproc/status/${requestId}/`, {
        headers: { 'Accept': 'application/json, text/html' }
      });

      // Check response type
      if (response.headers['content-type'].includes('application/json')) {
        setStatus(response.data.status || response.data.error);
      } else {
        setHtmlContent(response.data);
      }
    } catch (error) {
      setError('❌ Error fetching status. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Check Request Status</h1>
        <p className="text-gray-600 mb-6">Enter your Request ID to check the processing status</p>

        <input 
          type="text" 
          placeholder="Enter Request ID" 
          value={requestId} 
          onChange={(e) => setRequestId(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 text-lg"
        />

        <button 
          onClick={fetchStatus} 
          className="w-full mt-4 py-3 text-lg font-bold rounded-lg text-white transition-all shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 transform hover:scale-105"
        >
          Check Status
        </button>

        {error && <p className="mt-6 text-red-500 text-lg font-medium">{error}</p>}

        {status && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg shadow-inner border border-green-300">
            <h2 className="text-2xl font-bold mb-2">Processing Status:</h2>
            <p className="text-lg">{status}</p>
          </div>
        )}

        {htmlContent && (
          <div 
            className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner border border-gray-300 text-left max-h-60 overflow-auto"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default StatusPage;
