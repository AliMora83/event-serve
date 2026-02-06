const Hero = () => {
  return (
    <section className="bg-bgMain text-textMain py-80">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <div className="mt-8 flex justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              pointerEvents: 'none',
              opacity: 0.3
            }}
          >
            <source src="/show_jan.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="text-xl mb-8 text-gray-300">Creating Unforgettable Moments for Your Special Events</p>
      </div>
    </section>
  );
};

export default Hero;
