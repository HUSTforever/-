
import { GoogleGenAI, Type } from "@google/genai";
import { SelectedCard, ReadingResult } from "../types";

export const generateTarotReading = async (
  question: string,
  selectedCards: SelectedCard[]
): Promise<ReadingResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const cardDetails = selectedCards.map((c, i) => 
    `${c.positionName || `位置 ${i + 1}`}: ${c.card.name} (${c.isReversed ? '逆位' : '正位'})`
  ).join('\n');

  const prompt = `
    作为一名富有智慧和直觉的塔罗占卜师，请针对以下问题提供神秘且深刻的见解：
    求问者的问题: "${question}"
    
    抽取的牌面:
    ${cardDetails}
    
    请严格按照以下格式提供中文回复：
    1. 整体总结：用充满诗意的语言概括这次占卜。
    2. 详细解读：针对每一张牌在特定位置的含义进行详细解析。
    3. 灵性建议：为求问者提供最后的精神引导或实用建议。
    
    语气应当慈悲、神秘且具有启发性。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            cardInterpretations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  cardName: { type: Type.STRING },
                  interpretation: { type: Type.STRING }
                },
                required: ["cardName", "interpretation"]
              }
            },
            guidance: { type: Type.STRING }
          },
          required: ["summary", "cardInterpretations", "guidance"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("未能收到宇宙的回应。");
    }
    
    return JSON.parse(responseText.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("星象能量紊乱，请稍后再试。");
  }
};
