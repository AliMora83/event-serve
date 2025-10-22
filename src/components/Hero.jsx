import React from 'react';

const Hero = () => {
  return (
    <section className="bg-bgMain text-textMain py-80">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <div className="mt-8 flex justify-center">
          <iframe
            src='https://www.youtube.com/embed/EhmIfUMwf68?autoplay=1&loop=1&mute=1&playlist=EhmIfUMwf68&controls=0&showinfo=0&modestbranding=1'
            title='Background Video'
            frameBorder={0}
            allow='autoplay; encrypted-media'
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              pointerEvents: 'none',
              opacity: 0.3
            }}
          />
        </div>
        <p className="text-xl mb-8 text-gray-300">Creating Unforgettable Moments for Your Special Events</p>
      </div>
    </section>
  );
};

export default Hero;
