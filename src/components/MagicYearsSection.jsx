import React from 'react';
import EventsLogo from '../assets/EventsLogo.png';

const MagicYearsSection = () => {
  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          
          {/* Right Column - Text */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-white">
              35+ years of excellence
            </h2>
            <p className="text-2xl font-semibold">
              <span className="text-primary">3000+ experiences</span>
              <span className="text-white"> in </span> <br/>
              <span className="text-primary">90+ countries</span> <br/>
              <span className="text-white"> winning </span>
              <span className="text-primary">120+ awards</span>
            </p>
          </div>
          {/* Left Column - Image */}
          <div className="flex justify-center">
            <img src={EventsLogo} alt="Event Logo" className="w-96 h-auto rounded-xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicYearsSection;
