import sasaImage from '../assets/sasa-image.jpeg';

const ImpactSection = () => {

  return (
    <section className="relative py-16 px-4">
      {/* Background image with effects - positioned absolutely behind content */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${sasaImage})`,
          filter: 'grayscale(100%)',
          mixBlendMode: 'multiply',
          backgroundAttachment: 'fixed',
          zIndex: 0
        }}
      />

      {/* Dark overlay for better text contrast */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1
        }}
      />

      {/* Content container - positioned relative above background */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading with icon and accent */}
        <div className="flex items-center justify-start gap-4 mb-8">
          <span className="text-primary text-4xl">★</span>
          <h2 className="text-5xl font-bold text-white">
            Impact
          </h2>
          <div className="h-1 w-16 bg-primary"></div>
        </div>

        {/* Main content - left aligned section */}
        <div className="max-w-3xl mb-12">
          <h3 className="text-3xl text-primary mb-6">
            Making a Difference Through Every Event
          </h3>
          <p className="text-lg text-gray-300">
            Our impact extends beyond creating memorable events. We bring together people, ideas, and experiences that create lasting change. Each event is an opportunity to inspire, connect, and make a meaningful difference in our community.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ImpactSection;
