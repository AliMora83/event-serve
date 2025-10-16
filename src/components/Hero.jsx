import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-red-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to EventServe</h1>
        <p className="text-xl mb-8">Creating Unforgettable Moments for Your Special Events</p>
        <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
