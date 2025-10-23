import React from 'react';
import { GradFlow } from 'gradflow';

const ClientsTestimonials = () => {
  const testimonials = [
    {
      name: 'John Smith',
      company: 'Tech Corp',
      text: 'EventServe made our corporate event unforgettable. Highly recommended!',
    },
    {
      name: 'Sarah Johnson',
      company: 'Happy Couple',
      text: 'Our wedding was perfect thanks to the EventServe team!',
    },
    {
      name: 'Mike Brown',
      company: 'Local Business',
      text: 'Professional service from start to finish. Will definitely use again.',
    },
  ];
  
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      {/* Gradient background: absolutely positioned and stretched */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }}>
        <GradFlow
          config={{
            color1: { r: 217, g: 211, b: 211 },
            color2: { r: 255, g: 255, b: 255 },
            color3: { r: 229, g: 210, b: 210 },
            speed: 0.6,
            scale: 2,
            type: 'animated',
            noise: 0.18
          }}
        />
      </div>
      {/* Content above gradient */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-bgMain">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-700/70 mb-4">{testimonial.text}</p>
              <div className="font-bold text-bgMain">{testimonial.name}</div>
              <div className="text-sm text-bgMain">{testimonial.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsTestimonials;
