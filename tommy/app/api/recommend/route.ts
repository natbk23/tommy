// app/api/recommend/route.ts (CORRECT for App Router)

import { NextRequest, NextResponse } from "next/server"; // ⬅️ NEW IMPORTS
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

// Initialize external clients (remains the same)
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// [Your helper function getBookCover remains here]
async function getBookCover(title: string, author: string): Promise<string | null> {
  // ... (content of getBookCover)
  try {
    const searchQuery = encodeURIComponent(`${title} ${author}`);
    const searchRes = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}&limit=1`);
    const searchData = await searchRes.json();

    if (searchData.docs && searchData.docs.length > 0) {
      const book = searchData.docs[0];
      if (book.isbn && book.isbn.length > 0) {
        const isbn = book.isbn[0];
        return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      }
      if (book.cover_i) {
        return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching book cover:", error);
    return null;
  }
}
// ------------------------------------------------------------------

// 🟢 FIX: Export a named function called POST to handle POST requests
export async function POST(req: NextRequest) {
  // 1. New way to get the request body (use req.json())
  const body = await req.json();
  const { mood, count = 3 } = body;
  
  if (!mood || !mood.trim()) {
    // 2. New way to return responses (use NextResponse)
    return NextResponse.json({ message: "Mood is required" }, { status: 400 });
  }

  try {
    // 1️⃣ Ask OpenAI for recommendations
    let prompt = `You are a literary curator. Recommend ${count} books matching the mood: "${mood}". 
For each, include Title, Author, and Why it matches this mood.
Respond ONLY in a JSON array: [{ "title": "...", "author": "...", "why": "..." }]`;

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant designed to output JSON." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" }, 
    });

    const raw = completion.choices[0]?.message?.content || "[]";
    let recommendations: { title: string; author: string; why: string }[] = [];

    try {
      recommendations = JSON.parse(raw);
      if (!Array.isArray(recommendations)) recommendations = [];
    } catch (err) {
      console.error("JSON parse error:", err, "Raw text:", raw);
    }

    // 2️⃣ Fetch your library books from Supabase
    const { data: existingBooks, error: supabaseError } = await supabase
      .from("books") // replace with your actual table name
      .select("title, author");

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    // Normalize for comparison
    const existingSet = new Set(
      existingBooks.map(
        (b) => `${b.title.toLowerCase().trim()}|${b.author.toLowerCase().trim()}`
      )
    );

    // 3️⃣ Filter out duplicates
    const newBooks = recommendations.filter(
      (r) =>
        !existingSet.has(`${r.title.toLowerCase().trim()}|${r.author.toLowerCase().trim()}`)
    );

    // 4️⃣ Fetch covers for remaining books
    const recommendationsWithCovers = await Promise.all(
      newBooks.map(async (rec) => ({
        ...rec,
        imageUrl: await getBookCover(rec.title, rec.author),
      }))
    );

    // 3. New way to return success response
    return NextResponse.json({ recommendations: recommendationsWithCovers }, { status: 200 });
  } catch (error) {
    console.error("OpenAI or Supabase error:", error);
    return NextResponse.json({ message: "Error fetching recommendations" }, { status: 500 });
  }
}