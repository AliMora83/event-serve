import React from 'react';

const Scroller = () => {
  return (
    <section className="overflow-hidden w-full mt-8">
      <div className="animate-horizontal-scroll whitespace-nowrap flex">
        <p className="text-lg text-gray-400 inline-block px-4">Creating Unforgettable Moments for Your Special Events</p>
        <p className="text-lg text-gray-400 inline-block px-4">Creating Unforgettable Moments for Your Special Events</p>
        <p className="text-lg text-gray-400 inline-block px-4">Creating Unforgettable Moments for Your Special Events</p>
      </div>
    </section>
  );
};

export default Scroller;
