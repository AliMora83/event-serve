import React from 'react';
const Hero = () => {
  return (
    <section className="bg-bgMain text-textMain py-80">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <p className="text-xl mb-8 text-gray-300">Creating Unforgettable Moments for Your Special Events</p>
       
      </div>
      
      {/* Horizontal Text Scroller */}
      <div className="overflow-hidden w-full mt-8">
        <div className="animate-horizontal-scroll whitespace-nowrap">
          <p className="text-lg text-gray-400 inline-block">Creating Unforgettable Moments for Your Special Events</p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
