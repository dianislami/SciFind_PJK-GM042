import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = (): void => {
      const teamSection = document.getElementById('team');
      const searchSection = document.getElementById('search');
      
      const scrollPosition: number = window.scrollY + 200; // Offset untuk deteksi yang lebih baik

      // Check from bottom to top (team first, then search, then hero)
      if (teamSection && scrollPosition >= teamSection.offsetTop) {
        setActiveSection('team');
      } else if (searchSection && scrollPosition >= searchSection.offsetTop) {
        setActiveSection('search');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Universal Navbar - Responsive for Desktop and Mobile */}
      <nav className="fixed left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-[#4A9DE3]/20 px-[10px] py-[5px] lg:px-[30px] lg:py-[10px] top-2 sm:top-4 z-50 w-[80vw] lg:w-[70vw] max-w-xl">
        <div className="flex justify-between items-center px-3 sm:px-6 py-0">

          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center cursor-pointer"
            >
              <img 
                src="/images/logo_SciFind.png" 
                alt="SciFind logo" 
                className={`h-4 sm:h-6 w-auto ml-1 lg:ml-2 transition-all duration-300 ${
                  activeSection === 'hero'
                    ? 'drop-shadow-[0_0_15px_rgba(74,157,227,1)] brightness-150 scale-110' 
                    : 'hover:drop-shadow-[0_0_10px_rgba(74,157,227,0.5)] hover:brightness-110 hover:scale-105'
                }`}
              />
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex list-none gap-1 lg:gap-2">
            <li>
              <button
                onClick={() => scrollToSection('search')}
                className={
                  activeSection === 'search'
                    ? "px-3 sm:px-5 py-2 sm:py-2.5 text-[#4A9DE3] font-bold text-sm sm:text-base transition-all duration-300 drop-shadow-[0_0_10px_rgba(74,157,227,0.8)] brightness-135 rounded-full cursor-pointer" 
                    : "px-3 sm:px-5 py-2 sm:py-2.5 text-gray-600 font-medium text-sm sm:text-base hover:text-[#4A9DE3] hover:drop-shadow-[0_0_5px_rgba(74,157,227,0.5)] hover:brightness-110 transition-all duration-300 cursor-pointer"
                }
              >
                Search
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('team')}
                className={
                  activeSection === 'team'
                    ? "px-3 sm:px-5 py-2 sm:py-2.5 text-[#4A9DE3] font-bold text-sm sm:text-base transition-all duration-300 drop-shadow-[0_0_10px_rgba(74,157,227,0.8)] brightness-135 rounded-full cursor-pointer" 
                    : "px-3 sm:px-5 py-2 sm:py-2.5 text-gray-600 font-medium text-sm sm:text-base hover:text-[#4A9DE3] hover:drop-shadow-[0_0_5px_rgba(74,157,227,0.5)] hover:brightness-110 transition-all duration-300 cursor-pointer"
                }
              >
                About Us
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;