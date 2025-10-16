import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import LegacySection from '../components/LegacySection';
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
        <Hero />
        <AboutSection />
        <LegacySection />
        <ExperienceStats />
        <WorkHighlights />
        <ServicesSection />
        <ClientsTestimonials />
        <TeamSection />
        <ImpactSection />
        <ContactSection />
      </>
  );
};

export default Home;
