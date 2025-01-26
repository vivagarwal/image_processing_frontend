import React, { useState } from 'react';
import axios from 'axios';

const HelloPage = () => {
  const [message, setMessage] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL; // Access base URL from environment variable

  const fetchHello = async () => {
    try {
      const response = await axios.get(`${baseUrl}/imgproc/hello`);
      setMessage(response.data);
    } catch (error) {
      setMessage('Error fetching data');
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Hello API</h1>
      <button 
        onClick={fetchHello} 
        className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-700"
      >
        Fetch Hello
      </button>
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
};

export default HelloPage;
