import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Rec = { title: string; author: string; why: string };

export default function Home() {
  const [mood, setMood] = useState("");
  const [recs, setRecs] = useState<Rec[]>([]);
  const [loading, setLoading] = useState(false);

  async function getRecs(e?: React.FormEvent) {
    e?.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    setRecs([]);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
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
    <div className="min-h-screen flex flex-col text-tommy-cream grain">
      <Header />

      <main className="flex-1 flex flex-col items-center px-6 md:px-12 py-12">
        <div className="w-full max-w-5xl">
          {/* ===== HERO ===== */}
          <section className="text-center mb-12">
            <h1
              className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Stories That{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-tommy-brown via-tommy-tan to-tommy-olive">
                Speak to
              </span>{" "}
              <span className="text-tommy-olive">You</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-tommy-cream/85">
              Name your feeling, find your story
            </p>
          </section>

          {/* ===== PROMPT CARD ===== */}
          <section className="paper p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left: copy */}
              <div className="md:w-[44%]">
                <h2
                  className="text-2xl md:text-3xl font-semibold text-tommy-golden"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  How are you feeling today?
                </h2>
                <p className="text-tommy-cream/80 mt-1 text-sm md:text-base">
                  Tommy will find books that resonate
                </p>
              </div>

              {/* Right: form */}
              <form
                onSubmit={getRecs}
                className="flex-1 flex gap-3 md:gap-4 items-center mt-6 md:mt-0"
              >
                <div className="flex-1 flex items-center rounded-full border border-tommy-brown/45 bg-tommy-cream/5 px-5 py-3 shadow-inner">
                  <input
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="e.g. rainy-cabin cozy, bittersweet, lyrical"
                    className="flex-1 bg-transparent outline-none placeholder-tommy-cream/60 text-tommy-cream"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-full bg-gradient-to-b from-tommy-golden to-tommy-tan text-tommy-ink font-semibold btn-cta hover:brightness-110 active:translate-y-[1px] disabled:opacity-60 transition"
                >
                  {loading ? "Thinking..." : "Get Recs"}
                </button>
              </form>
            </div>

            {/* ===== RESULTS ===== */}
            {recs.length > 0 && (
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recs.map((r, i) => (
                  <article key={i} className="paper-cream p-5 rounded-[14px] fade-up">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className="font-semibold text-lg ink"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {r.title}
                      </h3>
                      <span className="text-sm opacity-70 whitespace-nowrap ink">
                        by {r.author}
                      </span>
                    </div>

                    <div className="rule my-3" />

                    <p className="text-sm leading-relaxed ink">{r.why}</p>

                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
