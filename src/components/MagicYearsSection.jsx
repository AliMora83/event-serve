import React from 'react';
import placeholderImage from '../assets/Screenshot-2025-10-16-at-16.53.31.jpg';

const MagicYearsSection = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Image */}
          <div className="flex justify-center">
            <img 
              src={placeholderImage} 
              alt="Dummy placeholder" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          {/* Right Column - Text */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-gray-900">
              40+ years of magic
            </h2>
            <p className="text-2xl font-semibold">
              <span className="text-red-600">3000+ experiences</span>
              <span className="text-gray-900"> in </span>
              <span className="text-red-600">90+ countries</span>
              <span className="text-gray-900"> winning </span>
              <span className="text-red-600">120+ awards</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicYearsSection;
