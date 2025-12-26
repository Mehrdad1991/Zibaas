
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { ChatMessage } from "../types";

// Helper to create a fresh AI instance for key selection compliance
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Added generateProfessionalBio for technicians
export const generateProfessionalBio = async (name: string, specialty: string, experienceYears: string) => {
  try {
    const ai = getAI();
    const prompt = `Write a professional and engaging bio for a beauty technician on the Zibaas platform.
    Name: ${name}
    Specialty: ${specialty}
    Experience: ${experienceYears} years
    The bio should sound trustworthy, modern, and inviting. 
    Respond exclusively in Persian (Farsi). Keep it under 150 words.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Bio Generation Error:", error);
    return null;
  }
};

export const getAIRecommendation = async (userInput: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userInput,
      config: {
        systemInstruction: "You are an AI beauty advisor for Zibaas. Based on the user's needs, suggest a category of service and why. Keep it short and in Persian.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return "متاسفانه در حال حاضر پیشنهادی در دسترس نیست.";
  }
};

export const chatWithAI = async (messages: ChatMessage[]) => {
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\nUse Google Search to find current beauty trends, prices, and top doctors in Iran if relevant.",
        tools: [{ googleSearch: {} }],
      },
    });

    const lastMessage = messages[messages.length - 1].text;
    const response: GenerateContentResponse = await chat.sendMessage({ message: lastMessage });
    
    // Extract grounding URLs if any
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const urls = chunks.map((c: any) => c.web?.uri).filter(Boolean);
    
    let text = response.text || "";
    if (urls.length > 0) {
      text += "\n\nمنابع بیشتر:\n" + Array.from(new Set(urls)).map(url => `- ${url}`).join('\n');
    }
    
    return text;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "متاسفانه مشکلی در ارتباط با دستیار هوشمند پیش آمده است.";
  }
};

export const analyzeBeautyConsultation = async (imageBase64: string) => {
  try {
    const ai = getAI();
    const prompt = `Act as an expert Aesthetic Consultant and Stylist for the Zibaas beauty platform. 
    Analyze this photo for aesthetic proportions and facial harmony.
    1. Evaluate facial geometry, symmetry, and features.
    2. Suggest aesthetic enhancements such as skincare routines or cosmetic services (fillers, contouring).
    3. Focus on 'Visual Improvement' and 'Styling'.
    Respond exclusively in Persian (Farsi).`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Beauty Consultation Error:", error);
    return "سیستم تحلیل در حال حاضر با محدودیت روبرو شده است.";
  }
};

// Fix: Added analyzeBeforeAfter to compare two photos
export const analyzeBeforeAfter = async (beforeBase64: string, afterBase64: string) => {
  try {
    const ai = getAI();
    const prompt = `Analyze these two photos of a patient: the first is 'Before' and the second is 'After' an aesthetic procedure. 
    1. Compare the features and identify the changes.
    2. Evaluate the naturalness and success of the results.
    3. Provide professional feedback on the transformation.
    Respond exclusively in Persian (Farsi) in a supportive and professional tone for the Zibaas platform.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: beforeBase64, mimeType: 'image/jpeg' } },
          { inlineData: { data: afterBase64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Before/After Analysis Error:", error);
    return "سیستم تحلیل قبل و بعد در حال حاضر با مشکل مواجه شده است.";
  }
};

export const generateResultSimulation = async (prompt: string, imageBase64: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
          { text: `Based on this photo, generate a high-quality visualization of the result of: ${prompt}. Focus on a natural and beautiful outcome.` }
        ]
      },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });

    for (const part of response.candidates?.[0]?.content.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Simulation Generation Error:", error);
    return null;
  }
};

export const generateBeautyVideo = async (prompt: string, imageBase64?: string) => {
  try {
    const ai = getAI();
    const config: any = {
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic beauty transformation video: ${prompt}. Soft lighting, 4k detail, elegant atmosphere.`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    };

    if (imageBase64) {
      config.image = {
        imageBytes: imageBase64,
        mimeType: 'image/jpeg'
      };
    }

    let operation = await ai.models.generateVideos(config);
    
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) return null;

    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Video Generation Error:", error);
    throw error;
  }
};
