import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-primary">
            EventServe
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary">Home</a>
            <a href="#about" className="text-gray-700 hover:text-primary">About</a>
            <a href="#services" className="text-gray-700 hover:text-primary">Services</a>
            <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
