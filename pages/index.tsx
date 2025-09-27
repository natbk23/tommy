import { useState } from "react";

type Rec = { title: string; author: string; why: string };

export default function Home() {
  const [mood, setMood] = useState("");
  const [recs, setRecs] = useState<Rec[]>([]);
  const [loading, setLoading] = useState(false);

  async function getRecs() {
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood })
      });
      const data = await res.json();
      setRecs(data.recommendations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Tommy 📚</h1>
        <p className="text-gray-600 mb-4">Tell Tommy how you're feeling and get three book recs.</p>

        <textarea
          rows={3}
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g. I'm anxious about a deadline but hopeful..."
          className="w-full p-3 rounded border mb-3"
        />

        <button
          onClick={getRecs}
          disabled={!mood || loading}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Get recs"}
        </button>

        {recs.length > 0 && (
          <div className="mt-6 space-y-3">
            {recs.map((r, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="font-semibold">{r.title}</div>
                <div className="text-sm text-gray-600">{r.author}</div>
                <div className="mt-2">{r.why}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
