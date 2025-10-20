import React from 'react';
import bgImg from '../assets/sasa-image.jpeg';


const LegacySection = () => {
  return (
        <section className=" py-20 bg-black text-white">
      {/* Background Image Layer */}
 
        {/* Content Layer */}
       
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Our Legacy</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building a tradition of excellence in event management, creating memorable experiences that last a lifetime.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-4">500+</div>
            <h3 className="text-2xl font-semibold mb-3">Events Delivered</h3>
            <p className="text-gray-400">
              From intimate gatherings to grand celebrations, we've brought countless visions to life.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-4">15+</div>
            <h3 className="text-2xl font-semibold mb-3">Years of Excellence</h3>
            <p className="text-gray-400">
              Over a decade of dedication to creating unforgettable moments for our clients.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-4">98%</div>
            <h3 className="text-2xl font-semibold mb-3">Client Satisfaction</h3>
            <p className="text-gray-400">
              Our commitment to excellence is reflected in the smiles of satisfied clients.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 italic max-w-2xl mx-auto">
            "EventServe has been instrumental in creating lasting memories for families and communities. 
            Our legacy is built on trust, quality, and the unwavering dedication to make every event special."
          </p>
        </div>
    </section>
  );
};

export default LegacySection;
