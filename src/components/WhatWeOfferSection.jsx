import React from 'react';
import bgImage from '../assets/bg-01.jpg';
import screenGif from '../assets/screen.gif';
import recordGif from '../assets/record.gif';

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
    <section className="py-20 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'grayscale(100%)',
          mixBlendMode: 'multiply',
          backgroundAttachment: 'fixed',
          zIndex: 0
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-white">What We </span>
          <span className="text-primary">Offer</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {offers.map((offer, idx) => (
            <div key={offer.id} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center mb-4 hover:border-primary transition-colors duration-300 overflow-hidden">
                <img
                  src={idx < 4 ? screenGif : recordGif}
                  alt={idx < 4 ? "Screen Gif" : "Record Gif"}
                  className="object-contain w-16 h-16 md:w-24 md:h-24"
                />
              </div>
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
