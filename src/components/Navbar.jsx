import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#2a1818] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-white">
            EventServe
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
