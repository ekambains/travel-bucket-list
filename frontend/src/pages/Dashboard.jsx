import React from 'react';
import Header from '../components/Header';
import BucketCard from '../components/BucketCard';

const Dashboard = () => {
  // Mock data (replace with API call)
  const buckets = [
    { id: 1, destination: 'Paris', description: 'The city of love and lights.' },
    { id: 2, destination: 'Tokyo', description: 'A vibrant city with rich culture.' },
    { id: 3, destination: 'New York', description: 'The city that never sleeps.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-white">
      <Header />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Your Bucket List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buckets.map((bucket) => (
            <BucketCard key={bucket.id} {...bucket} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;