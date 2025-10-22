import React from 'react';
const ClientsTestimonials = () => {
  const testimonials = [
    { name: 'John Smith', company: 'Tech Corp', text: 'EventServe made our corporate event unforgettable. Highly recommended!' },
    { name: 'Sarah Johnson', company: 'Happy Couple', text: 'Our wedding was perfect thanks to the EventServe team!' },
    { name: 'Mike Brown', company: 'Local Business', text: 'Professional service from start to finish. Will definitely use again.' }
  ];
  return (
    <section className="py-16 bg-bgLight">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-textMain">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-bgLight p-6 rounded-lg shadow-md">
              <p className="text-textMain mb-4">"{testimonial.text}"</p>
              <div className="font-bold text-textMain">{testimonial.name}</div>
              <div className="text-sm text-textMain">{testimonial.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ClientsTestimonials;
