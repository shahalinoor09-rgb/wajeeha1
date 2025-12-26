
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorOptions, Suggestions, Genre, StoryLength } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStory = async (options: GeneratorOptions): Promise<{ title: string; content: string; summary: string }> => {
  const model = 'gemini-3-pro-preview';
  
  const prompt = `
    Generate a ${options.genre} story based on this prompt: "${options.prompt}".
    
    Constraints:
    - Length: Target ${options.length}
    - Tone: ${options.tone}
    - Include Plot Twist: ${options.includeTwist ? 'Yes' : 'No'}
    - Dialogue focus: ${options.heavyDialogue ? 'Heavy' : 'Balanced'}
    
    Output the result in JSON format with the following structure:
    {
      "title": "An evocative title",
      "content": "The full story in markdown format",
      "summary": "A 2-sentence captivating summary"
    }
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const expandStory = async (currentContent: string, instruction: string): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Continue the following story based on this instruction: "${instruction}".
    Maintain the existing tone and character voices.
    
    Existing Story:
    "${currentContent}"
    
    Output ONLY the new continuation text in markdown.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt
  });

  return response.text || '';
};

export const getSuggestions = async (prompt: string, genre: Genre): Promise<Suggestions> => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `Give me 3 titles, 5 character names, and 3 plot twist ideas for a ${genre} story based on this: "${prompt}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          titles: { type: Type.ARRAY, items: { type: Type.STRING } },
          characterNames: { type: Type.ARRAY, items: { type: Type.STRING } },
          plotIdeas: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["titles", "characterNames", "plotIdeas"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
