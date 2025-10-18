import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2a1818] text-gray-100 py-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">EventServe</h3>
            <p className="text-gray-400">Creating memorable events since 2020</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <p className="text-gray-400">Email: info@eventserve.com</p>
            <p className="text-gray-400">Phone: (555) 123-4567</p>
          </div>
        </div>
        <hr className="border-t border-primary my-6" />
        <p className="text-center text-primary text-sm">Copyright © 2025 EventServe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
