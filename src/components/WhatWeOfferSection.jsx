import React from 'react';
import bgImage from '../assets/bg-01.jpg';

const WhatWeOfferSection = () => {
  const offers = [
    { id: 1, label: 'Event Production' },
    { id: 2, label: 'Virtual & Hybrid Experiences' },
    { id: 3, label: 'Live to Air Broadcast' },
    { id: 4, label: 'Employee Engagement' },
    { id: 5, label: 'Brand Activations' },
    { id: 6, label: 'Multimedia Content' },
    { id: 7, label: 'Video Production' },
    { id: 8, label: 'Digital & Mobile Technology' }
  ];

  return (
    <section className="py-20 px-6">
     {/* Background image with effects - positioned absolutely behind content */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'grayscale(100%)',
          mixBlendMode: 'multiply',
          backgroundAttachment: 'fixed',
          zIndex: 0
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-white">What We </span>
          <span className="text-primary">Offer</span>
        </h2>

        {/* Offers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {offers.map((offer) => (
            <div key={offer.id} className="flex flex-col items-center text-center">
              {/* Circle Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center mb-4 hover:border-primary transition-colors duration-300">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Label */}
              <p className="text-white text-sm md:text-base font-medium">
                {offer.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
