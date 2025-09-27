"use client";

import { useState } from "react";

type Rec = { title: string; author: string; why: string };

export default function Home() {
  const [mood, setMood] = useState("");
  const [recs, setRecs] = useState<Rec[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getRecs(e: React.FormEvent) {
    e.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    setRecs([]);
    setError("");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (res.ok) {
        setRecs(data.recommendations || []);
      } else {
        setError(data.message || "Error fetching recommendations");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error fetching recommendations");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0b1b3a] to-[#001429] text-white px-6">
      <section className="text-center max-w-2xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Stories That{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-200 bg-clip-text text-transparent">
            Touch Your Soul
          </span>
        </h1>
        <p className="text-lg text-blue-200">
          Discover books by the emotions they evoke
        </p>

        <div className="mt-10 bg-[#0b1b3a]/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-[#1c2c4a]">
          <h2 className="text-xl font-semibold text-yellow-400">
            How are you feeling today?
          </h2>
          <p className="text-sm text-blue-100">
            Type an emotion, and Tommy will recommend books that resonate.
          </p>

          <form
            onSubmit={getRecs}
            className="flex flex-col md:flex-row items-center gap-4 justify-center mt-4"
          >
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g. nostalgic, anxious, hopeful..."
              className="w-full md:w-2/3 px-4 py-3 rounded-full border border-blue-400 bg-transparent text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Finding..." : "Get Recommendations"}
            </button>
          </form>

          {error && <p className="text-red-400 mt-4">{error}</p>}

          {recs.length === 0 && !loading && !error && (
            <p className="text-blue-200 mt-4">No recommendations found. Try a different mood!</p>
          )}

          {recs.length > 0 && (
            <div className="mt-8 text-left space-y-4">
              <h3 className="text-lg font-semibold text-yellow-300">Your Book Matches</h3>
              <ul className="space-y-4">
                {recs.map((rec, i) => (
                  <li
                    key={i}
                    className="bg-[#142347]/60 p-5 rounded-2xl border border-[#1c2c4a] shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                  >
                    <p className="text-lg font-bold text-yellow-300">{rec.title}</p>
                    <p className="text-sm text-blue-200 mt-1">by {rec.author}</p>
                    <p className="text-sm text-blue-300 mt-2">{rec.why}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
