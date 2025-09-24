import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateTripPlan = async (data) => {
  const prompt = `Generate a travel plan for ${data.location} for ${data.days} days for ${data.persons} with a ${data.budget} budget. 
  Include a list of hotels and a day-wise itinerary with tourist spots.
  For each hotel, include: name, price per night, rating, description.
  For each tourist spot, include: name, description, rating, best time to visit.
  Return the response in JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hotels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                price: { type: Type.STRING },
                rating: { type: Type.NUMBER },
                description: { type: Type.STRING },
              },
              required: ["name", "price", "rating", "description"],
            },
          },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER },
                theme: { type: Type.STRING },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      spotName: { type: Type.STRING },
                      description: { type: Type.STRING },
                      rating: { type: Type.NUMBER },
                      bestTime: { type: Type.STRING },
                    },
                    required: ["spotName", "description", "rating", "bestTime"],
                  },
                },
              },
              required: ["day", "activities"],
            },
          },
        },
        required: ["hotels", "itinerary"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};
