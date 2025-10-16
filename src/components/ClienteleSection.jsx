import React from 'react';
import clienteleLogo from '../assets/Events wht blck.png';

const ClienteleSection = () => {
  return (
    <section className="bg-gray-900 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Our Global <span className="text-red-600">Clients</span>
        </h2>
        
        <div className="relative">
          <div className="marquee-container">
            <div className="marquee-content">
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
              <img src={clienteleLogo} alt="Client Logo" className="h-24 mx-8 inline-block" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }

        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          animation: scroll-left 30s linear infinite;
        }

        @keyframes scroll-left {
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
