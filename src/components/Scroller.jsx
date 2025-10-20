import React from 'react';
const Scroller = () => {
  return (
    <section className="overflow-hidden w-full bg-black flex justify-center items-center">
      <div className="animate-horizontal-scroll whitespace-nowrap flex text-center">
        <p className="text-3xl text-white inline-block px-4">Creating <span className="font-bold text-primary">Unforgettable Moments</span> for Your <span className="font-bold text-primary">Special Events</span></p>
        <p className="text-3xl text-white inline-block px-4">Creating <span className="font-bold text-primary">Unforgettable Moments</span> for Your <span className="font-bold text-primary">Special Events</span></p>
        <p className="text-3xl text-white inline-block px-4">Creating <span className="font-bold text-primary">Unforgettable Moments</span> for Your <span className="font-bold text-primary">Special Events</span></p>
      </div>
    </section>
  );
};
export default Scroller;
