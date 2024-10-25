import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/">
          <img 
            src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/01/srm-logo-white.svg.gzip" 
            alt="Easwari Engineering College Logo" 
            className="w-12 h-12"
          />
          </Link>
        </div>
        <nav className="flex space-x-6">
          <Link to="/blog" className="hover:text-gray-300 transition-colors duration-300">Blogs</Link>
          <Link to="/events" className="hover:text-gray-300 transition-colors duration-300">Events</Link>
          <Link to="/openings" className="hover:text-gray-300 transition-colors duration-300">Jobs</Link>
          <Link to="/ats-tracker" className="hover:text-gray-300 transition-colors duration-300">ATS Tracker</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
