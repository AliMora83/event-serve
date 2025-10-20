import React, { useState } from 'react';
import sasaImage from '../assets/sasa-image.jpeg';
import eventsImage from '../assets/EventsLogo.png';

const ImpactSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { id: 1, alt: 'Team member 1' },
    { id: 2, alt: 'Team member 2' },
    { id: 3, alt: 'Team member 3' },
    { id: 4, alt: 'Team member 4' },
    { id: 5, alt: 'Team member 5' },
    { id: 6, alt: 'Team member 6' },
    { id: 7, alt: 'Team member 7' },
    { id: 8, alt: 'Team member 8' },
  ];

  const visibleImages = 6;
  const maxIndex = Math.max(0, images.length - visibleImages);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="relative py-16 px-4 bg-cover bg-center bg-blend-overlay bg-black/90" style={{ backgroundImage: `url(${sasaImage})` }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading with icon and accent */}
        <div className="flex items-center justify-start gap-4 mb-8">
          <span className="text-primary text-4xl">★</span>
          <h2 className="text-5xl font-bold text-white">
            Impact
          </h2>
          <div className="h-1 w-16 bg-primary"></div>
        </div>

        {/* Main content - left aligned section */}
        <div className="max-w-3xl mb-12">
          <h3 className="text-3xl text-primary mb-6">
            Making a Difference Through Every Event
          </h3>
          <p className="text-lg text-gray-300">
            Our impact extends beyond creating memorable events. We bring together people, ideas, and experiences that create lasting change. Each event is an opportunity to inspire, connect, and make a meaningful difference in our community.
          </p>
        </div>

        {/* Carousel section */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleImages)}%)` }}
            >
              {images.map((image) => (
                <div key={image.id} className="flex-shrink-0" style={{ width: `calc(${100 / visibleImages}% - 20px)` }}>
                  <img
                    src={eventsImage}
                    alt={image.alt}
                    className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-primary"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all"
            aria-label="Previous images"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all"
            aria-label="Next images"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
