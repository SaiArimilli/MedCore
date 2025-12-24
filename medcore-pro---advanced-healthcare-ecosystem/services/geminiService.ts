
import { GoogleGenAI } from "@google/genai";

// Always use the API key directly from process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthcareResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are an advanced AI Healthcare Assistant for MedCore Pro. 
        Your goals:
        1. Help users with basic health inquiries using professional medical terminology but clear explanations.
        2. Assist with scheduling information (directing users to the booking page).
        3. Provide information about medicines (dosages, side effects, general use).
        4. ALWAYS include a medical disclaimer: "I am an AI, not a doctor. In case of emergency, call local emergency services immediately or visit the nearest hospital."
        5. Be empathetic, concise, and professional.`,
        temperature: 0.7,
      },
    });

    // Access the .text property directly (not as a function call)
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my knowledge base. Please try again or contact support.";
  }
};
