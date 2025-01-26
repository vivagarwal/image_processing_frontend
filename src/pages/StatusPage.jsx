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
      setError("Please enter a valid Request ID.");
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
      setError('Error fetching status. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Check Request Id Status</h1>
      
      <input 
        type="text" 
        placeholder="Enter Request ID" 
        value={requestId} 
        onChange={(e) => setRequestId(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      
      <button 
        onClick={fetchStatus} 
        className="bg-blue-500 text-white px-6 py-2 rounded w-full hover:bg-blue-700"
      >
        Check Status
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {status && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h2 className="font-bold text-lg">Processing Status:</h2>
          <p className="text-gray-800">{status}</p>
        </div>
      )}

      {htmlContent && (
        <div 
          className="mt-4 border p-4 rounded bg-gray-100"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
      )}
    </div>
  );
};

export default StatusPage;
