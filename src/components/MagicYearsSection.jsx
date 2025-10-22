import React from 'react';
import EventsLogo from '../assets/EventsLogo.png';
import Lottie from 'lottie-react';
import chooseYourColors from '../assets/choose-your-colors.json';


const MagicYearsSection = () => {
  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          
          {/* Right Column - Text */}
          <div className="space-y-4">
            <h2 className="text-6xl font-bold text-white">
              35+ years of excellence
            </h2>
            <p className="text-3xl font-semibold">
              <span className="text-white">2400+</span> 
              <span className="text-primary"> experiences in</span> <br/>
              <span className="text-white">12</span> 
              <span className="text-primary"> countries, </span>
              <span className="text-primary"> winning </span> <br/>
              <span className="text-white">120+</span>
              <span className="text-primary"> awards.</span>
            </p>
          </div>
          {/* Left Column - Image */}
          <div className="flex justify-center">
            <Lottie
              animationData={chooseYourColors}
              loop
              style={{ width: 220, height: 220 }}
            />          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicYearsSection;
