
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { BRAND_NAME, CONTACT_INFO } from '../constants';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer id="contact" className="bg-[#EBE7DE] pt-32 pb-12 px-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
          <div className="md:col-span-6">
            <h2 className="text-6xl font-serif text-[#2C2A26] mb-12">Let's build <br /> stable systems.</h2>
            <div className="space-y-4 text-xl text-[#5D5A53] font-light">
              <p><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#2C2A26] underline underline-offset-8 decoration-1">{CONTACT_INFO.email}</a></p>
              <p>{CONTACT_INFO.phone}</p>
              <p className="max-w-md">{CONTACT_INFO.address}</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2C2A26] mb-8">Links</h4>
            <ul className="space-y-4 text-[#5D5A53] font-light">
              <li><a href="#experience" onClick={(e) => onLinkClick(e, 'experience')} className="hover:text-[#2C2A26] transition-colors">Career Path</a></li>
              <li><a href="#expertise" onClick={(e) => onLinkClick(e, 'expertise')} className="hover:text-[#2C2A26] transition-colors">Expertise</a></li>
              <li><a href={CONTACT_INFO.web} className="hover:text-[#2C2A26] transition-colors">Back to Home</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#2C2A26] mb-8">Languages</h4>
            <ul className="space-y-4 text-[#5D5A53] font-light">
              <li className="flex justify-between"><span>Italiano</span> <span className="text-[#A8A29E] uppercase text-[10px] tracking-tighter">Madrelingua</span></li>
              <li className="flex justify-between"><span>Inglese</span> <span className="text-[#A8A29E] uppercase text-[10px] tracking-tighter">Professional</span></li>
              <li className="flex justify-between"><span>Spagnolo</span> <span className="text-[#A8A29E] uppercase text-[10px] tracking-tighter">Professional</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-[#D6D1C7] flex justify-between items-center text-[10px] uppercase tracking-widest text-[#A8A29E]">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. Built with stability in mind.</p>
          <p>Torino, Italia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
