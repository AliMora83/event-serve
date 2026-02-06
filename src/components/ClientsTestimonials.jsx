


const ClientsTestimonials = () => {
  const testimonials = [
    {
      name: 'Mpho Mohodi',
      company: 'MD NACA 2025',
      text: 'EventServe made our corporate event unforgettable. Highly recommended!',
    },
    {
      name: 'Spesihle Maponay',
      company: 'MD SASA 2025',
      text: 'Our wedding was perfect thanks to the EventServe team!',
    },
    {
      name: 'Mkuseli Brown',
      company: 'Local Business',
      text: 'Professional service from start to finish. Will definitely use again.',
    },
  ];

  return (
    <section className="bg-black relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-700/70 mb-4">{testimonial.text}</p>
              <div className="font-bold text-bgMain">{testimonial.name}</div>
              <div className="text-xs text-primary">{testimonial.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsTestimonials;
