
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from "./types";

const SYSTEM_INSTRUCTION = `You are an elite AI visual analyst and professional image prompt engineer.

Your role:
Analyze any uploaded image and generate a highly accurate, reusable, production-quality image generation prompt that matches the image’s content, composition, lighting, mood, and style.

────────────────────────────────
IDENTITY & SAFETY RULES (STRICT):
────────────────────────────────
- Never identify or guess real people from images
- Never name celebrities unless explicitly provided by the user
- Always use neutral PLACEHOLDERS for people
- Placeholders must be in square brackets and descriptive (e.g., [LEAD_CHARACTER_NAME], [SECONDARY_CHARACTER_NAME])

────────────────────────────────
AUTOMATIC IMAGE ANALYSIS:
────────────────────────────────
Describe:
1. Number of people and their prominence
2. Facial structure, age range, expression, body language
3. Clothing, accessories, materials, textures
4. Environment and setting
5. Mood, emotion, and story context
6. Lighting type
7. Camera angle, framing
8. Color palette and grading
9. Art style
10. Visual genre

────────────────────────────────
OUTPUT FORMAT (STRICT — DO NOT CHANGE):
────────────────────────────────

---
IMAGE TYPE:
[Auto-detected type]

PROMPT:
[High-impact cinematic depiction...]

STYLE TAGS:
[Tags]

NEGATIVE PROMPT:
[Negative prompt]

USER REPLACEMENT GUIDE:
[Guide]
---

Rules:
- Only output the formatted result.
- Never explain reasoning.
- Never ask questions.`;

export const analyzeImage = async (base64Image: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image.split(',')[1],
    },
  };

  const textPart = {
    text: "Analyze this image and generate the prompt according to your instructions."
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [imagePart, textPart] },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });

  const rawText = response.text || "";
  return parseGeminiResponse(rawText);
};

function parseGeminiResponse(text: string): AnalysisResult {
  const sections = text.split('\n');
  let imageType = '';
  let prompt = '';
  let styleTags = '';
  let negativePrompt = '';
  let userReplacementGuide = '';

  let currentSection = '';

  sections.forEach(line => {
    if (line.startsWith('IMAGE TYPE:')) currentSection = 'type';
    else if (line.startsWith('PROMPT:')) currentSection = 'prompt';
    else if (line.startsWith('STYLE TAGS:')) currentSection = 'tags';
    else if (line.startsWith('NEGATIVE PROMPT:')) currentSection = 'negative';
    else if (line.startsWith('USER REPLACEMENT GUIDE:')) currentSection = 'guide';
    else if (line.trim() === '---' || line.trim() === '') return;
    else {
      switch (currentSection) {
        case 'type': imageType += line.trim() + ' '; break;
        case 'prompt': prompt += line.trim() + ' '; break;
        case 'tags': styleTags += line.trim() + ' '; break;
        case 'negative': negativePrompt += line.trim() + ' '; break;
        case 'guide': userReplacementGuide += line.trim() + ' '; break;
      }
    }
  });

  return {
    imageType: imageType.trim(),
    prompt: prompt.trim(),
    styleTags: styleTags.trim(),
    negativePrompt: negativePrompt.trim(),
    userReplacementGuide: userReplacementGuide.trim()
  };
}
