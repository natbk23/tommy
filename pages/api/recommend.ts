import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getBookCover(title: string, author: string): Promise<string
 | null> {
  try {
    const searchQuery = encodeURIComponent(`${title} ${author}`);
    const searchRes = await
fetch(`https://openlibrary.org/search.json?q=${searchQuery}&limit=1`);
    const searchData = await searchRes.json();

    console.log(`Searching for cover: "${title}" by ${author}`);

    if (searchData.docs && searchData.docs.length > 0) {
      const book = searchData.docs[0];

      if (book.isbn && book.isbn.length > 0) {
        const isbn = book.isbn[0];
        const coverUrl =
`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
        console.log(`Found cover via ISBN: ${coverUrl}`);
        return coverUrl;
      }

      if (book.cover_i) {
        const coverUrl =
`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
        console.log(`Found cover via cover_i: ${coverUrl}`);
        return coverUrl;
      }
    }

    console.log(`No cover found for: ${title}`);
    return null;
  } catch (error) {
    console.error("Error fetching book cover:", error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: 
NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { mood, count = 3, exclude = [] } = req.body;
  if (!mood || !mood.trim()) {
    return res.status(400).json({ message: "Mood is required" });
  }

  try {
    let prompt = `You are a literary curator. Recommend ${count} books 
that match the mood: "${mood}". For each book, include: Title, Author, Why
 it matches this emotion.`;

    if (exclude.length > 0) {
      prompt += `\n\nDo NOT recommend any of these books: 
${exclude.join(", ")}`;
    }

    prompt += `\n\nRespond in JSON format ONLY: [{ "title": "...", 
"author": "...", "why": "..." }]`;

    console.log("Prompt:", prompt);

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    let text = "[]";
    const firstOutput = completion.output[0];
    if (firstOutput && "content" in firstOutput) {
      const contentArray = (firstOutput as any).content;
      if (Array.isArray(contentArray) && contentArray.length > 0) {
        text = contentArray[0].text || "[]";
      }
    }

    text = text.replace(/^```json\s*|```$/g, "").trim();

    let recommendations: { title: string; author: string; why: string }[]
= [];
    try {
      recommendations = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse error:", err, "Raw text:", text);
      recommendations = [];
    }

    console.log(`Got ${recommendations.length} recommendations, fetching 
covers...`);

    const recommendationsWithCovers = await Promise.all(
      recommendations.map(async (rec) => {
        const imageUrl = await getBookCover(rec.title, rec.author);
        return {
          title: rec.title,
          author: rec.author,
          why: rec.why,
          imageUrl: imageUrl,
        };
      })
    );

    console.log("Sending recommendations:",
recommendationsWithCovers.map(r => ({ title: r.title, hasImage:
!!r.imageUrl })));

    res.status(200).json({ recommendations: recommendationsWithCovers });
  } catch (error: any) {
    console.error("OpenAI error:", error);
    res.status(500).json({ message: "Error fetching recommendations" });
  }
}