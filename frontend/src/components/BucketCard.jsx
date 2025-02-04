import React from 'react';
import { Link } from 'react-router-dom';

const BucketCard = ({ id, destination, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform">
      <h3 className="text-xl font-semibold text-orange-600">{destination}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4 flex space-x-4">
        <Link
          to={`/bucket/${id}`}
          className="text-orange-500 hover:text-orange-600"
        >
          View Details
        </Link>
        <button className="text-red-500 hover:text-red-600">Delete</button>
      </div>
    </div>
  );
};

export default BucketCard;