
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Experience {
  id: string;
  company: string;
  period: string;
  role: string;
  location: string;
  summary: string;
  details: string[];
  technologies: string[];
  imageUrl: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Added missing Product interface to resolve export errors
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  longDescription?: string;
  features: string[];
}

// Added missing JournalArticle interface to resolve export errors
export interface JournalArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string | React.ReactNode;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'experience', experience: Experience }
  | { type: 'contact' };
