import React, { useState } from 'react';
import { GradFlow } from 'gradflow';       // <--- Import GradFlow!
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
    // Make sure section is relative & hidden overflow!
    <section style={{ position: "relative", overflow: "hidden" }} className="py-16 px-6 bg-bgMain">
      {/* ---- Gradient Background Layer ---- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      >
        <GradFlow
          config={{
                  color1: { r: 98, g: 19, b: 19 },
                  color2: { r: 0, g: 0, b: 0 },
                  color3: { r: 59, g: 7, b: 7 },
                  speed: 0.9,
                  scale: 2,
                  type: 'smoke',
                  noise: 0.18
                }}
        />
      </div>
      {/* ---- Foreground Content Layer ---- */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl text-white font-bold text-center mb-12">
          Work Highlights
        </h2>
        {/* Image Grid with Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrevious}
            className="absolute bg-primary left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
            {visibleImages.map((image) => (
              <div
                key={image.id}
                className="rounded-xl overflow-hidden"
              >
                <img src={image.url} alt={image.alt} className="w-full h-auto" />
              </div>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute bg-primary right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
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
        {/* Dot Navigation */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-4 h-4 rounded-full ${i === currentIndex ? 'bg-primary' : 'bg-gray-400/50'} transition-all`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkHighlightsSection;
