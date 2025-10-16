import React from 'react';

const ServicesSection = () => {
  const services = [
    { title: 'Event Planning', description: 'Complete event planning and coordination services' },
    { title: 'Catering', description: 'Gourmet catering options for all occasions' },
    { title: 'Venue Selection', description: 'Help finding the perfect venue for your event' },
    { title: 'Decoration', description: 'Beautiful decorations tailored to your theme' },
    { title: 'Entertainment', description: 'Live music, DJs, and entertainment booking' },
    { title: 'Photography', description: 'Professional photography and videography' }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
