
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Experience } from '../types';

interface ExperienceDetailProps {
  experience: Experience;
  onBack: () => void;
}

const ExperienceDetail: React.FC<ExperienceDetailProps> = ({ experience, onBack }) => {
  return (
    <div className="pt-24 min-h-screen bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-6xl mx-auto px-6 pb-24">
        
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Career
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] bg-[#EBE7DE] overflow-hidden grayscale">
              <img src={experience.imageUrl} alt={experience.company} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
             <span className="text-sm font-medium text-[#A8A29E] uppercase tracking-widest mb-4">{experience.period}</span>
             <h1 className="text-5xl font-serif text-[#2C2A26] mb-2">{experience.company}</h1>
             <p className="text-xl italic text-[#5D5A53] mb-8">{experience.role} — {experience.location}</p>
             
             <div className="space-y-8">
                <div>
                   <h2 className="text-xs font-bold uppercase tracking-widest text-[#2C2A26] mb-4">Descrizione</h2>
                   <p className="text-[#5D5A53] text-lg font-light leading-relaxed">{experience.summary}</p>
                </div>

                <div>
                   <h2 className="text-xs font-bold uppercase tracking-widest text-[#2C2A26] mb-4">Attività Principali</h2>
                   <ul className="space-y-4">
                      {experience.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-4 text-[#5D5A53] font-light">
                           <span className="w-1.5 h-1.5 bg-[#2C2A26] rounded-full mt-2.5 flex-shrink-0"></span>
                           {detail}
                        </li>
                      ))}
                   </ul>
                </div>

                <div>
                   <h2 className="text-xs font-bold uppercase tracking-widest text-[#2C2A26] mb-4">Tecnologie</h2>
                   <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, i) => (
                        <span key={i} className="px-4 py-1.5 bg-white border border-[#D6D1C7] text-xs uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;
