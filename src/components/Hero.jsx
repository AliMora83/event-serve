import React from 'react';

const Hero = () => {
  return (
    <section className="bg-bgMain text-textMain py-80">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <p className="text-xl mb-8 text-gray-300">Creating Unforgettable Moments for Your Special Events</p>
       
      </div>
      
      {/* Vertical Text Scroller */}
      <div className="overflow-hidden h-12 mt-8">
        <div className="animate-vertical-scroll">
          <p className="text-lg text-gray-400">Creating Unforgettable Moments for Your Special Events</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
