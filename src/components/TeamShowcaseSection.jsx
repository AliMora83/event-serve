import React from 'react';
import eventsImage from '../assets/Events wht blck.png';

const TeamShowcaseSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-5xl font-bold text-white text-center mb-4">
          Team Showcase
        </h2>
        
        {/* Sub-heading */}
        <h3 className="text-3xl text-red-600 text-center mb-6">
          Meet Our Dedicated Professionals
        </h3>
        
        {/* Text paragraph */}
        <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Our team brings together years of experience and passion to deliver exceptional events. 
          Each member contributes unique skills and dedication to making every occasion memorable.
        </p>
        
        {/* Grid of round dummy images */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="w-32 h-32">
              <img
                src={eventsImage}
                alt={`Team member ${item}`}
                className="w-full h-full object-cover rounded-full border-4 border-red-600"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamShowcaseSection;
