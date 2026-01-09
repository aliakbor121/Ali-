import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const LOCAL_TIPS = [
  "Try to keep your food expenses below 30% of your total budget.",
  "Consider setting aside 20% of your income for savings.",
  "Small daily purchases can add up; review your 'Others' category.",
  "Track your recurring bills to identify potential subscription waste.",
  "Consistency is key—keep logging your expenses daily!"
];

export async function getSmartTips(transactions: Transaction[]): Promise<string[]> {
  // If no transactions, immediate return
  if (transactions.length === 0) return ["Start adding transactions to get smart insights!"];

  // Offline-First Logic: If navigator is offline, don't even try the API
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return [
      "You are offline. Showing generic financial tips.",
      ...LOCAL_TIPS.slice(0, 2)
    ];
  }

  // Ensure API Key exists
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key missing. Falling back to local tips.");
    return LOCAL_TIPS.slice(0, 3);
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Prepare a summary for AI (limit to recent context)
  const summary = transactions.slice(0, 40).map(t => ({
    type: t.type,
    amount: t.amount,
    category: t.category,
    date: t.date.split('T')[0]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these recent transactions and provide exactly 3 concise, highly actionable financial tips for the user in a bulleted format. 
      Focus on spending habits, potential savings, and rule-based advice (e.g., 50/30/20 rule).
      Transactions: ${JSON.stringify(summary)}`,
      config: {
        systemInstruction: "You are a world-class financial advisor. Be professional, data-driven, and brief.",
      }
    });

    const text = response.text || "";
    if (!text) throw new Error("Empty response");

    return text
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^[*•-]\s*/, ''))
      .slice(0, 3);
  } catch (error) {
    console.error("Gemini Error:", error);
    // Shuffle and return local tips on any failure
    return LOCAL_TIPS.sort(() => 0.5 - Math.random()).slice(0, 3);
  }
}