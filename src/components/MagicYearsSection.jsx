import React from 'react';

const MagicYearsSection = () => {
  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Image */}
          <div className="flex justify-center">
              <div className="bg-gradient-to-br from-primary to-primary/80 h-96 rounded-xl shadow-2xl"></div>
          </div>
          
          {/* Right Column - Text */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-white">
              40+ years of magic
            </h2>
            <p className="text-2xl font-semibold">
              <span className="text-primary">3000+ experiences</span>
              <span className="text-white"> in </span>
              <span className="text-primary">90+ countries</span>
              <span className="text-white"> winning </span>
              <span className="text-primary">120+ awards</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicYearsSection;
