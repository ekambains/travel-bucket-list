import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="p-6 flex justify-between items-center bg-orange-500">
      <Link to="/" className="text-2xl font-bold text-white">
        TravelBucket
      </Link>
      <nav className="space-x-4">
        <Link to="/login" className="text-white hover:text-orange-200">
          Login
        </Link>
        <Link to="/signup" className="text-white hover:text-orange-200">
          Signup
        </Link>
      </nav>
    </header>
  );
};

export default Header;