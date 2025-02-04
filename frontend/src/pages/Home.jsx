import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-white">
      <Header />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-6xl font-bold text-white text-center">
          Your Travel Dreams, Organized.
        </h1>
        <p className="mt-4 text-xl text-white">
          Plan, track, and explore your bucket list destinations.
        </p>
        <button className="mt-8 px-6 py-3 bg-white text-orange-500 rounded-lg font-semibold hover:bg-orange-100 transition">
          Get Started
        </button>
      </section>

      {/* Featured Destinations */}
      <section className="p-8">
        <h2 className="text-3xl font-bold text-orange-600 text-center">
          Featured Destinations
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src="https://via.placeholder.com/400x250"
                alt="Destination"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-orange-600">
                  Destination {item}
                </h3>
                <p className="mt-2 text-gray-600">A beautiful place to visit.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;