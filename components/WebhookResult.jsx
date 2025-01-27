import React, { useState, useEffect } from 'react';

const WebhookResult = () => {
  const [requests, setRequests] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      fetchWebhookData();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchWebhookData = async () => {
    try {
      const response = await fetch('/api/webhook'); // Fetch stored data from API route
      if (!response.ok) {
        throw new Error('Failed to fetch webhook data');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching webhook data:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-purple-600 text-center">
        Webhook Results
      </h2>
      {Object.keys(requests).length === 0 ? (
        <p className="text-gray-500 text-center">No results available yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-6 py-3 text-left text-lg font-semibold text-gray-700">
                  Request ID
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left text-lg font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {Object.entries(requests).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-300">
                  <td className="border border-gray-300 px-6 py-3 break-words max-w-xs truncate">
                    <span className="text-blue-700 font-medium">{key}</span>
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-green-600 font-medium">
                    {value.status}
                  </td>
                  <td className="border border-gray-300 px-6 py-3">
                    {value.status === 'completed' ? (
                      <div
                        className="bg-gray-100 p-4 rounded-md shadow-md overflow-auto max-h-40"
                        dangerouslySetInnerHTML={{ __html: value.data }}
                      />
                    ) : (
                      <span className="text-red-500">Processing failed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WebhookResult;
