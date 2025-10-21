import React from 'react';
import EventsLogo from '../assets/EventsLogo.png';

const AboutSection = () => {
  return (
    <section className="py-40 bg-black text-white" id="about">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center relative" style={{ minHeight: '500px' }}>
          {/* Background Video */}
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
          
          {/* Content Overlay */}
          <div className="relative z-10" style={{ gridColumn: '1 / -1' }}>
            <div className="grid md:grid-cols-2 gap-12 items-center bg-black/90">
              <div>
                {/* Empty space for layout balance */}
              </div>
              <div>
                <h2 className="text-5xl font-bold mb-8 leading-tight font-bold uppercase">
                  We do Events
                </h2>
                <div className="space-y-6 text-lg text-gray-300">
                  <p>
                    EventServe specializes in creating <span className="text-primary font-semibold">unforgettable experiences</span> <br/> that bring your vision to life.
                  </p>
                  
                </div>
                <button className="mt-8 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
                  Learn More About Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
