import Lottie from 'lottie-react';
import redGlobe from '../assets/red-globe.json';


const MagicYearsSection = () => {
  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">


          {/* Right Column - Text */}
          <div className="space-y-4">
            <h2 className="text-6xl font-bold text-white">
              15+ years of excellence
            </h2>
          </div>
          {/* Left Column - Image */}
          <div className="flex justify-center">
            <Lottie
              animationData={redGlobe}
              loop
              style={{ width: 220, height: 220 }}
            />          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicYearsSection;
