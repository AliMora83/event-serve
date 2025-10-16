import React from 'react';

const Hero = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to EventServe</h1>
        <p className="text-xl mb-8 text-gray-300">Creating Unforgettable Moments for Your Special Events</p>
        <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
