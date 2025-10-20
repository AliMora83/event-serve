import React from 'react';

const Hero = () => {
  return (
    <section className="bg-bgMain text-textMain py-40">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h1 className="text-5xl font-bold mb-6 text-white">Welcome to EventServe Part 2</h1>
        <p className="text-xl mb-8 text-gray-300">Creating Unforgettable Moments for Your Special Events</p>
        <button className="bg-white text-bgMain px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
