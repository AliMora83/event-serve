import React from 'react';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      <AboutSection />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default About;
