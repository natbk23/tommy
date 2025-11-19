// app/api/recommend/route.ts
// This file is built for the NEXT.JS APP ROUTER (Next.js 13+).

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Attempts to fetch a book cover image URL from Open Library.
 */
async function getBookCover(title: string, author: string): Promise<string | null> {
  try {
    const searchQuery = encodeURIComponent(`${title} ${author}`);
    const searchRes = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}&limit=1`);
    const searchData = await searchRes.json();

    if (searchData.docs && searchData.docs.length > 0) {
      const book = searchData.docs[0];
      const coverId = book.isbn?.[0] || book.cover_i;

      if (coverId) {
        const coverType = book.isbn?.[0] ? 'isbn' : 'id';
        const coverUrl = `https://covers.openlibrary.org/b/${coverType}/${coverId}-L.jpg`;
        console.log(`Found cover via ${coverType}: ${coverUrl}`);
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

/**
 * Handles POST requests to /api/recommend. 
 * This is the required NAMED EXPORT for the App Router.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse the request body
    const { mood, count = 3, exclude = [] } = await request.json();

    if (!mood || typeof mood !== 'string' || !mood.trim()) {
      // Use NextResponse for all responses in the App Router
      return NextResponse.json({ message: "Mood is required" }, { status: 400 });
    }

    let prompt = `You are a literary curator. Recommend ${count} books that match the mood: "${mood}". For each book, include: Title, Author, Why it matches this emotion.`;

    if (exclude.length > 0) {
      prompt += `\n\nDo NOT recommend any of these books: ${exclude.join(", ")}`;
    }

    prompt += `\n\nRespond in JSON format ONLY: [{ "title": "...", "author": "...", "why": "..." }]`;

    console.log("Prompt:", prompt);

    // 2. Call the OpenAI API
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // Use a valid model name
      messages: [
        { role: "system", content: "You are a literary curator who responds ONLY with a JSON array." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" }, 
    });

    let text = completion.choices[0]?.message?.content || "[]";
    text = text.replace(/^```json\s*|```$/g, "").trim();

    // 3. Parse and validate recommendations
    let recommendations: { title: string; author: string; why: string }[] = [];
    try {
      const parsedObject = JSON.parse(text);

      // 1. Check for the "books" key (most recently observed)
      if (parsedObject.books && Array.isArray(parsedObject.books)) {
        recommendations = parsedObject.books;
      } 
      // 2. Check for the "recommendations" key 
      else if (parsedObject.recommendations && Array.isArray(parsedObject.recommendations)) {
        recommendations = parsedObject.recommendations;
      }
      // 3. Fallback: Check if the AI returned the array directly
      else if (Array.isArray(parsedObject)) {
        recommendations = parsedObject;
      } else {
        // If none of the recognized formats are found
        throw new Error("Parsed result is not a recognized array structure.");
      }
        
    } catch (err) {
      // If parsing fails completely, this will log the error and the raw text
      console.error("JSON parse error, fallback failed:", err, "Raw text:", text);
      recommendations = [];
    }

    console.log(`Got ${recommendations.length} recommendations, fetching covers...`);

    // 4. Fetch covers in parallel
    const recommendationsWithCovers = await Promise.all(
      recommendations.map(async (rec) => {
        const imageUrl = await getBookCover(rec.title, rec.author);
        return {
          title: rec.title,
          author: rec.author,
          why: rec.why,
          cover_url: imageUrl,
        };
      })
    );

    console.log("Sending recommendations.");

    // 5. Return the final response
    return NextResponse.json({ recommendations: recommendationsWithCovers }, { status: 200 });

  } catch (error) {
    console.error("Internal or OpenAI error:", error);
    return NextResponse.json(
      { message: "Error fetching recommendations" },
      { status: 500 }
    );
  }
}

// Ensure no other exports (especially no 'export default') are present.