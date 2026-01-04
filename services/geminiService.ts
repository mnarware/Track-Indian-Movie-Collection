
import { GoogleGenAI } from "@google/genai";
import { CinemaDashboardData, Movie, GroundingSource } from "../types";

export const fetchCinemaData = async (): Promise<CinemaDashboardData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Perform a high-precision Indian and Global Cinema analysis. 
    Use Google Search to verify real-time data from Wikipedia (priority for total gross), BookMyShow (priority for theatrical status), and official box office trackers.

    1. CURRENTLY RUNNING MOVIES:
       - STRICT REQUIREMENT: Only include movies that are actively being screened in theaters today according to BookMyShow.
       - VERIFICATION: Cross-reference collection figures with Wikipedia and trade analysts (e.g., Sacnilk).
       - Ensure specific accuracy for Marathi movies (like 'Dhurandhar' or similar recent releases), Gujarati, and all regional PAN-India content.
       - For each: Name, Release Date, Total Collection (INR Crores), Budget (INR Crores), Language, Industry.

    2. TOP 10 HIGHEST GROSSING INDIAN MOVIES (ALL-TIME):
       - Worldwide gross records sourced from Wikipedia's 'List of highest-grossing Indian films'.
       - For each: Name, Release Year, Total Collection (INR Crores), Budget (INR Crores), Primary Industry.

    3. TOP 10 HIGHEST GROSSING WORLDWIDE MOVIES (ALL-TIME):
       - Global box office records sourced from Wikipedia's 'List of highest-grossing films'.
       - For each: Name, Release Year, Total Collection (USD Billions), Budget (USD Millions).

    IMPORTANT: Format the response as a valid JSON object with three keys: "running", "topIndian", and "topWorldwide".
    Each value must be an array of objects with keys: "name", "yearOrDate", "collectionStr", "collectionNumeric", "budget", "languageOrIndustry".
    
    Ensure 'collectionNumeric' is a precise number for sorting. Order all lists by collectionNumeric in descending order.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    let result: CinemaDashboardData = {
      runningMovies: [],
      topIndianAllTime: [],
      topWorldwideAllTime: [],
      sources: [],
      lastUpdated: new Date().toLocaleDateString('en-IN', { 
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      })
    };

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      
      const mapToMovie = (item: any, prefix: string): Movie => ({
        id: `${prefix}-${Math.random().toString(36).substr(2, 9)}`,
        name: item.name,
        releaseDate: item.yearOrDate,
        collection: item.collectionStr,
        collectionValue: item.collectionNumeric,
        budget: item.budget,
        language: item.languageOrIndustry || '',
        industry: item.languageOrIndustry || '',
      });

      result.runningMovies = (parsed.running || []).map((m: any) => mapToMovie(m, 'run'));
      result.topIndianAllTime = (parsed.topIndian || []).map((m: any) => mapToMovie(m, 'ind'));
      result.topWorldwideAllTime = (parsed.topWorldwide || []).map((m: any) => mapToMovie(m, 'ww'));
    }

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    chunks.forEach((chunk: any) => {
      if (chunk.web) {
        result.sources.push({ title: chunk.web.title, uri: chunk.web.uri });
      }
    });

    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
