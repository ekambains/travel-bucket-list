import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const BucketDetails = () => {
  const { id } = useParams(); // Get the bucket ID from the URL

  // Mock data (replace with API call)
  const bucketItem = {
    id: 1,
    destination: 'Paris',
    description: 'The city of love and lights.',
    visited: false,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-white">
      <Header />
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-orange-600 mb-4">
            {bucketItem.destination}
          </h1>
          <p className="text-gray-600 mb-6">{bucketItem.description}</p>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
              Edit
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BucketDetails;