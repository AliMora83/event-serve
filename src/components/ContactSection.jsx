import React, { useState } from 'react';

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    setSubmitted(true);
  };

  return (
    <section className="py-16 px-6 bg-bgMain">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Contact Us
        </h2>
        {submitted ? (
          <div className="bg-green-700/70 rounded-lg p-6 text-white text-center font-semibold">
            Thank you for contacting us! We'll get back to you soon.
          </div>
        ) : (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="space-y-6 bg-[#232323] p-8 rounded-lg shadow-xl"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1f1f1f] text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
              <input type="email" name="email" required className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1f1f1f] text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
              <textarea name="message" rows="4" required className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-[#1f1f1f] text-white"></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg transition-all hover:bg-opacity-90">
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
