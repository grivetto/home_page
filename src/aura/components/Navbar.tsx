
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BRAND_NAME } from '../constants';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#F5F2EB]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
      }`}>
      <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); onNavClick(e, ''); }}
          className={`text-3xl font-serif font-medium tracking-tight transition-colors ${scrolled ? 'text-[#2C2A26]' : 'text-white'}`}
        >
          {BRAND_NAME}
        </a>

        <div className={`hidden md:flex items-center gap-12 text-sm font-medium tracking-widest uppercase transition-colors ${scrolled ? 'text-[#2C2A26]' : 'text-white'}`}>
          <a href="#experience" onClick={(e) => onNavClick(e, 'experience')} className="hover:opacity-60 transition-opacity">Experience</a>
          <a href="#expertise" onClick={(e) => onNavClick(e, 'expertise')} className="hover:opacity-60 transition-opacity">Skills</a>
          <a href="#contact" onClick={(e) => onNavClick(e, 'contact')} className="hover:opacity-60 transition-opacity">Contact</a>
          <a href="https://grivetto.eu" className="hover:opacity-60 transition-opacity border px-4 py-2 rounded-full border-current">Back to Home</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
