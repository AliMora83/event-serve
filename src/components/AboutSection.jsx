import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg text-gray-700 mb-4">
              EventServe has been creating memorable experiences for over 5 years. 
              We specialize in corporate events, weddings, and private celebrations.
            </p>
            <p className="text-lg text-gray-700">
              Our team of dedicated professionals ensures every detail is perfect.
            </p>
          </div>
          <div className="bg-primary h-64 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
