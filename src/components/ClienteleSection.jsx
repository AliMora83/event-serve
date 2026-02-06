import deptSportLogo from '../assets/events_logos/Dept_sport.png';
import kuduLogo from '../assets/events_logos/KUDU.png';
import netballLogo from '../assets/events_logos/Netball.png';
import sabcLogo from '../assets/events_logos/SABC.png';
import safaLogo from '../assets/events_logos/SAFA.png';
import sasaLogo from '../assets/events_logos/SASA.png';

const ClienteleSection = () => {
  const clients = [
    { name: 'Dept Sport', logo: deptSportLogo },
    { name: 'KUDU', logo: kuduLogo },
    { name: 'Netball', logo: netballLogo },
    { name: 'SABC', logo: sabcLogo },
    { name: 'SAFA', logo: safaLogo },
    { name: 'SASA', logo: sasaLogo },
  ];

  // Duplicate clients for seamless scrolling
  const marqueeClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="bg-black py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Organizations We&apos;re Proud to Have <span className="text-primary">Served</span>
        </h2>

        <div className="relative">
          <div className="marquee-container">
            <div className="marquee-content">
              {marqueeClients.map((client, index) => (
                <div key={`${client.name}-${index}`} className="flex items-center justify-center mx-16 min-w-[150px]">
                  <img
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    className="h-24 max-w-[200px] object-contain rounded-lg transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        .marquee-content {
          display: flex;
          animation: marquee 10s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ClienteleSection;
