
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";
import { EXPERIENCES, SKILL_CATEGORIES, BRAND_NAME } from '../constants';

const getSystemInstruction = () => {
  const expContext = EXPERIENCES.map(e => 
    `- ${e.company} (${e.period}): ${e.role}. ${e.summary} Details: ${e.details.join(', ')}`
  ).join('\n');

  const skillContext = SKILL_CATEGORIES.map(s => 
    `- ${s.title}: ${s.skills.join(', ')}`
  ).join('\n');

  return `You are the AI Assistant for ${BRAND_NAME}, a Senior System Administrator with 30 years of experience.
  Your tone is professional, technical yet accessible, and efficient.
  
  Professional Background:
  ${expContext}
  
  Technical Skills:
  ${skillContext}
  
  Instructions:
  - Answer questions about Sergio's professional career, technical skills, and availability.
  - If asked about hiring him, mention his contact details (sergio@grivetto.it).
  - Use technical terms accurately (e.g., Zabbix custom builds, static linking, DMZ hardening).
  - Keep answers concise and informative.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey: string | undefined;
    try {
      apiKey = process.env.API_KEY;
    } catch (e) {
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      return "Assistant currently offline. Please contact me directly at sergio@grivetto.it";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Updated model to gemini-3-flash-preview as per the latest GenAI SDK guidelines for basic text and chat tasks
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently processing some complex kernel optimizations... (API Error). Please reach out via email.";
  }
};
