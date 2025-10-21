import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-30 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Get In Touch</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1f1f1f] text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1f1f1f] text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
              <textarea rows="4" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1f1f1f] text-white"></textarea>
            </div>
            <button type="submit" className="w-1/2 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
