import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { mood } = req.body;
  if (!mood || !mood.trim()) return res.status(400).json({ message: "Mood is required" });

  try {
    const prompt = `
You are a literary curator. Recommend 3 books that match the mood: "${mood}".
For each book, include:
- Title
- Author
- Why it matches this emotion
Respond in JSON format ONLY:
[
  { "title": "...", "author": "...", "why": "..." }
]
`;

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    // Type-safe extraction without external type import
    let text = "[]";
    const firstOutput = completion.output[0];
    if (firstOutput && "content" in firstOutput) {
      const contentArray = (firstOutput as any).content; // cast to any
      if (Array.isArray(contentArray) && contentArray.length > 0) {
        text = contentArray[0].text || "[]";
      }
    }

    // Clean Markdown code blocks
    text = text.replace(/^```json\s*|```$/g, "").trim();

    let recommendations: { title: string; author: string; why: string }[] = [];
    try {
      recommendations = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse error:", err, "Raw text:", text);
      recommendations = [];
    }

    res.status(200).json({ recommendations });
  } catch (error: any) {
    console.error("OpenAI error:", error);
    res.status(500).json({ message: "Error fetching recommendations" });
  }
}
