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
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Webhook Results</h2>
      {Object.keys(requests).length === 0 ? (
        <p className="text-gray-500">No results available yet.</p>
      ) : (
        <ul>
          {Object.entries(requests).map(([key, value]) => (
            <li key={key} className="border-b border-gray-300 py-2">
              <strong className="text-blue-700">Request ID:</strong> {key} <br />
              <strong className="text-green-600">Status:</strong> {value.status} <br />
              {value.status === 'completed' && (
                <div
                  className="bg-gray-100 p-4 mt-2 rounded-md shadow-md"
                  dangerouslySetInnerHTML={{ __html: value.data }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WebhookResult;
