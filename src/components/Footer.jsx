import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-black text-textMain py-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">EventServe</h3>
            <p className="text-textMain text-xs">Creating memorable events since 2020</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-textMain hover:text-gray-600 transition-colors text-xs">About</a></li>
              <li><a href="#services" className="text-textMain hover:text-white transition-colors text-xs">Services</a></li>
              <li><a href="#contact" className="text-textMain hover:text-white transition-colors text-xs">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <p className="text-textMain text-xs">Email: info@eventserve.co.za</p>
            <p className="text-textMain text-xs">Phone: 073 463 4425 / 064 050 4442</p>
          </div>
        </div>
        <hr className="border-t border-primary my-6" />
        <p className="text-center text-primary text-xs">Copyright © 2025 EventServe. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
