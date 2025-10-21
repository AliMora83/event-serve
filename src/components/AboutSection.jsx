import React from 'react';
import EventsLogo from '../assets/EventsLogo.png';
const AboutSection = () => {
  return (
    <section className="py-40 bg-bgMain text-white" id="about">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="items-center">
            <iframe
              src='https://www.youtube.com/embed/EhmIfUMwf68?autoplay=1&loop=1&mute=1&playlist=EhmIfUMwf68'
              width={340}
              height={190}
              title='KB Motsilanyane - Rock Lefatshe'
              frameBorder={0}
              allow='autoplay; encrypted-media'
              allowFullScreen
              style={{ borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
            />
          </div>
          <div>
            <h2 className="text-5xl font-bold mb-8 leading-tight font-bold uppercase">
             We do Events
            </h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                EventServe specializes in creating <span className="text-primary font-semibold">unforgettable experiences</span> that bring your vision to life.
              </p>
              <p>
                From <span className="font-semibold">corporate events</span> to <span className="font-semibold">weddings</span> and private celebrations, our team ensures every detail exceeds expectations.
              </p>
              <p>
                With over 5 years of experience, we deliver <span className="text-primary font-semibold">excellence</span> in event management.
              </p>
            </div>
            <button className="mt-8 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
