import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Scroller from '../components/Scroller';
import AboutSection from '../components/AboutSection';
import LegacySection from '../components/LegacySection';
import MagicYearsSection from '../components/MagicYearsSection';
import WorkHighlightsSection from '../components/WorkHighlightsSection';
import WhatWeOfferSection from '../components/WhatWeOfferSection';
import ClienteleSection from '../components/ClienteleSection';
import ClientsTestimonials from '../components/ClientsTestimonials';
import ImpactSection from '../components/ImpactSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
      <>
        <Navbar />
        <Hero />
        <Scroller />
        <AboutSection />
        <LegacySection />
        <MagicYearsSection />
        <WorkHighlightsSection />
        <WhatWeOfferSection />
        <ClienteleSection />
        <ClientsTestimonials />
        <ImpactSection />
        <ContactSection />
        <Footer />
      </>
  );
};

export default Home;
