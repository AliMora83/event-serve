import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              <span className="font-bold">We combine</span> creativity and precision
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
            <img src='/assets/EventLogo.png' alt='Event Logo' className='mx-auto my-8 rounded-lg shadow-lg w-64 h-auto'></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
