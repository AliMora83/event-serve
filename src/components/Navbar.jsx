import React from 'react';
import Logo from '../assets/Events-01-07.png'; 

const Navbar = () => {
  return (
    <nav className="bg-bgMain shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-white">
          <img 
            src={Logo} 
            alt="EventServe Logo" 
            className="h-10 w-auto" // adjust height as needed
          />
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
