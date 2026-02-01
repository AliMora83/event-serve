import React, { useState, useRef } from 'react';
import Lottie from 'lottie-react';
import bgImage from '../assets/bg-01.jpg';
import screenGif from '../assets/screen.gif';
import recordGif from '../assets/record.gif';
import multimediaAnimation from '../assets/multimedia.json';
import brandAnimation from '../assets/brand.json';
import videoAnimation from '../assets/video.json';
import employeeAnimation from '../assets/employee.json';
import virtualAnimation from '../assets/virtual.json';
import digitalAnimation from '../assets/digital.json';
import eventAnimation from '../assets/event.json';
import liveAnimation from '../assets/live.json';

const OfferItem = ({ offer, index }) => {
  const [isHovering, setIsHovering] = useState(false);
  const lottieRef = useRef();

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (lottieRef.current) {
      if (offer.hoverSegments) {
        // Use custom segments if defined (e.g., Multimedia Content)
        lottieRef.current.playSegments(offer.hoverSegments, true);
      } else {
        // Play full animation from start
        lottieRef.current.goToAndPlay(0, true);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (lottieRef.current) {
      if (offer.resetSegment) {
        // Use custom reset segment if defined
        lottieRef.current.playSegments(offer.resetSegment, true);
      } else {
        // Return to last frame (completed icon state)
        lottieRef.current.goToAndStop(lottieRef.current.totalFrames - 1, true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center mb-4 hover:border-primary transition-colors duration-300 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {offer.animation ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={offer.animation}
            loop={false}
            autoplay={false}
            initialSegment={offer.initialSegment}
            className="w-12 h-12 md:w-20 md:h-20 scale-90"
            style={offer.style}
            onDOMLoaded={() => {
              // Set initial frame to last frame (completed icon) for animations without custom initialSegment
              if (lottieRef.current && !offer.initialSegment) {
                lottieRef.current.goToAndStop(lottieRef.current.totalFrames - 1, true);
              }
            }}
          />
        ) : (
          <img
            src={offer.image}
            alt={`${offer.label} icon`}
            className="object-contain w-12 h-12 md:w-20 md:h-20"
          />
        )}
      </div>
      <p className="text-white text-sm md:text-base font-medium">
        {offer.label}
      </p>
    </div>
  );
};

const WhatWeOfferSection = () => {
  const offers = [
    {
      id: 1,
      label: 'Event Production',
      animation: eventAnimation
    },
    {
      id: 2,
      label: 'Virtual & Hybrid Experiences',
      animation: virtualAnimation
    },
    {
      id: 3,
      label: 'Live to Air Broadcast',
      animation: liveAnimation
    },
    {
      id: 4,
      label: 'Employee Engagement',
      animation: employeeAnimation
    },
    {
      id: 5,
      label: 'Brand Activations',
      animation: brandAnimation
    },
    {
      id: 6,
      label: 'Multimedia Content',
      animation: multimediaAnimation,
      hoverSegments: [100, 190],
      resetSegment: [89, 89],
      initialSegment: [89, 89]
    },
    {
      id: 7,
      label: 'Video Production',
      animation: videoAnimation
    },
    {
      id: 8,
      label: 'Digital & Mobile Technology',
      animation: digitalAnimation
    }
  ];

  return (
    <section id="services" className="py-20 px-6 relative overflow-hidden bg-black">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'grayscale(100%)',
          mixBlendMode: 'screen',
          backgroundAttachment: 'fixed',
          zIndex: 0,
          opacity: 0.5
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
            <OfferItem key={offer.id} offer={offer} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
