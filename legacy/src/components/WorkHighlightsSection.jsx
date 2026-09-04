import { GradFlow } from 'gradflow';       // <--- Import GradFlow!

const WorkHighlightsSection = () => {

  // Generate 8 dummy images
  // Dynamically import all images from the gallery folder
  const galleryImages = import.meta.glob('../assets/gallery/*.png', { eager: true, as: 'url' });

  // Convert module object to array and sort specially to handle "1.png", "10.png" correctly
  const images = Object.entries(galleryImages)
    .map(([path, url], index) => {
      // Extract filename for alt text
      const fileName = path.split('/').pop().replace('.png', '');
      return {
        id: index,
        url,
        alt: `Work Highlight ${fileName}`
      };
    })
    .sort((a, b) => {
      // Natural sort for filenames (e.g. 1, 2, 10 instead of 1, 10, 2)
      const numA = parseInt(a.alt.split(' ').pop());
      const numB = parseInt(b.alt.split(' ').pop());
      return numA - numB;
    });

  // Duplicate images for seamless infinite scroll
  const scrollImages = [...images, ...images];

  return (
    // Make sure section is relative & hidden overflow!
    <section style={{ position: "relative", overflow: "hidden" }} className="py-16 bg-bgMain">
      {/* ---- Gradient Background Layer ---- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      >
        <GradFlow
          config={{
            color1: { r: 98, g: 19, b: 19 },
            color2: { r: 0, g: 0, b: 0 },
            color3: { r: 59, g: 7, b: 7 },
            speed: 0.9,
            scale: 2,
            type: 'smoke',
            noise: 0.18
          }}
        />
      </div>
      {/* ---- Foreground Content Layer ---- */}
      <div className="relative z-10 w-full">
        {/* Heading */}
        <h2 className="text-4xl text-white font-bold text-center mb-12">
          Work Highlights
        </h2>

        {/* Infinite Scroll Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max gap-8 animate-scroll hover:[animation-play-state:paused]">
            {scrollImages.map((image, i) => (
              <div
                key={`${image.id}-${i}`}
                className="w-[320px] sm:w-[400px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkHighlightsSection;
