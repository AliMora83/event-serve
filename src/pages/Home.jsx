import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import LegacySection from '../components/LegacySection';
import MagicYearsSection from '../components/MagicYearsSection';
import WorkHighlightsSection from '../components/WorkHighlightsSection';
import WhatWeOfferSection from '../components/WhatWeOfferSection';
import ClienteleSection from '../components/ClienteleSection';
import ExperienceStats from '../components/ExperienceStats';
import WorkHighlights from '../components/WorkHighlights';
import ServicesSection from '../components/ServicesSection';
import ClientsTestimonials from '../components/ClientsTestimonials';
import TeamSection from '../components/TeamSection';
import ImpactSection from '../components/ImpactSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
      <>
        <Navbar />
        <Hero />
        <AboutSection />
        <LegacySection />
        <MagicYearsSection />
        <WorkHighlightsSection />
        <WhatWeOfferSection />
        <ClienteleSection />
        <ExperienceStats />
        <WorkHighlights />
        <ServicesSection />
        <ClientsTestimonials />
        <TeamSection />
        <ImpactSection />
        <ContactSection />
        <Footer />
      </>
  );
};

export default Home;
