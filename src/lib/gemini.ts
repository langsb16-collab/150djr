import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Script, Scene } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeProduct(input: string): Promise<{ name: string; description: string }> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this product input (URL or description) and extract a concise name and marketing-focused description. Input: ${input}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["name", "description"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function generateMarketingScript(name: string, description: string): Promise<Script> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a high-converting marketing script for "${name}". Description: ${description}. 
    Follow this structure: 
    1. Hook (catchy opening)
    2. Problem (pain point)
    3. Solution (how it helps)
    4. Features (3 key benefits)
    5. CTA (call to action).
    Keep it short for a 30-second video.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hook: { type: Type.STRING },
          problem: { type: Type.STRING },
          solution: { type: Type.STRING },
          features: { type: Type.ARRAY, items: { type: Type.STRING } },
          cta: { type: Type.STRING },
        },
        required: ["hook", "problem", "solution", "features", "cta"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function generateSceneImage(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [{ text: `High quality commercial photography, professional lighting, marketing style: ${prompt}` }],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return "";
}

export async function generateVoiceover(text: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say enthusiastically: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  return base64Audio ? `data:audio/mp3;base64,${base64Audio}` : "";
}
