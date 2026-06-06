import React, { useEffect } from 'react';
import HeroSection from './components/hero_section';
import TeamSection from './section/team';
import Searching from './section/search';

const LandingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="search">
          <Searching />
        </div>
        <div id="team">
          <TeamSection />
        </div>
    </div>
  );
};

export default LandingPage;