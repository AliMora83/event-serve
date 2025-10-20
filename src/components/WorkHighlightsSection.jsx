import React, { useState } from 'react';
import eventsImage from '../assets/EventsLogo.png';

const WorkHighlightsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  
  // Generate 8 dummy images
  const images = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    url: eventsImage,
    alt: `Work Highlight ${i + 1}`
  }));

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const visibleImages = images.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="py-16 px-6 bg-bgMain">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl text-white font-bold text-center mb-12">
          Work Highlights
        </h2>

        {/* Image Grid with Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: '#FF0000' }}
            aria-label="Previous images"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleImages.map((image) => (
              <div
                key={image.id}
                className="aspect-[3/2] overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: '#FF0000' }}
            aria-label="Next images"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'w-8' : ''
              }`}
              style={{
                backgroundColor: index === currentIndex ? '#FF0000' : '#666'
              }}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkHighlightsSection;
