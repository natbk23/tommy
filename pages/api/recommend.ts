import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { mood } = req.body;

  if (!mood || !mood.trim()) {
    return res.status(400).json({ message: "Mood is required" });
  }

  try {
    // Prompt for OpenAI
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

    // Call OpenAI API
    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    let text = completion.output[0]?.content[0]?.text || "[]";

    // Robust cleaning: remove ```json or ``` and trim whitespace/newlines
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
