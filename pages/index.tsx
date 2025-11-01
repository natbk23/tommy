import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Rec = { title: string; author: string; why: string; imageUrl?: string
 };

export default function Home() {
  const [mood, setMood] = useState("");
  const [recs, setRecs] = useState<Rec[]>([]);
  const [loading, setLoading] = useState(false);
  const [replacingIndex, setReplacingIndex] = useState<number |
null>(null);

  async function getRecs(e?: React.FormEvent) {
    e?.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    setRecs([]);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, count: 12 }),
      });
      const data = await res.json();
      console.log("Received recommendations:", data.recommendations);
      setRecs(data.recommendations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function replaceRec(index: number) {
    setReplacingIndex(index);
    try {
      const excludeTitles = recs.map(r => r.title);

      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood,
          count: 1,
          exclude: excludeTitles
        }),
      });
      const data = await res.json();
      console.log("Replacement book:", data.recommendations[0]);

      if (data.recommendations && data.recommendations.length > 0) {
        const newRecs = [...recs];
        newRecs[index] = data.recommendations[0];
        setRecs(newRecs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReplacingIndex(null);
    }
  }

  return (
    <div className="min-h-screen flex flex-col text-tommy-cream grain">
      <Header />

      <main className="flex-1 flex flex-col items-center px-6 md:px-12 
py-12">
        <div className="w-full max-w-7xl">
          <section className="text-center mb-12">
            <h1
              className="text-5xl md:text-7xl font-bold leading-tight 
tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Stories That{" "}
              <span className="bg-clip-text text-transparent 
bg-gradient-to-r from-tommy-brown via-tommy-tan to-tommy-olive">
                Speak to
              </span>{" "}
              <span className="text-tommy-olive">You</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-tommy-cream/85">
              Name your feeling, find your story
            </p>
          </section>

          <section className="paper p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center 
md:justify-between gap-6">
              <div className="md:w-[44%]">
                <h2
                  className="text-2xl md:text-3xl font-semibold 
text-tommy-golden"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  How are you feeling today?
                </h2>
                <p className="text-tommy-cream/80 mt-1 text-sm 
md:text-base">
                  Tommy will find books that resonate
                </p>
              </div>

              <form
                onSubmit={getRecs}
                className="flex-1 flex gap-3 md:gap-4 items-center mt-6 
md:mt-0"
              >
                <div className="flex-1 flex items-center rounded-full 
border border-tommy-brown/45 bg-tommy-cream/5 px-5 py-3 shadow-inner">
                  <input
                    type="text"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="e.g. rainy-cabin cozy, bittersweet,
lyrical"
                    className="flex-1 bg-transparent outline-none
placeholder-tommy-cream/60 text-tommy-cream"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-full bg-gradient-to-b 
from-tommy-golden to-tommy-tan text-tommy-ink font-semibold btn-cta 
hover:brightness-110 active:translate-y-[1px] disabled:opacity-60 
transition"
                >
                  {loading ? "Thinking..." : "Get Recs"}
                </button>
              </form>
            </div>

            {recs.length > 0 && (
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 
xl:grid-cols-4 gap-6">
                {recs.map((r, i) => (
                  <article 
                    key={`${r.title}-${i}`}
                    className="paper-cream p-5 rounded-[14px] fade-up 
relative group"
                    style={{ opacity: replacingIndex === i ? 0.5 : 1 }}
                  >
                    <button
                      onClick={() => replaceRec(i)}
                      disabled={replacingIndex === i}
                      className="absolute top-2 right-2 z-10 opacity-0
group-hover:opacity-100 transition-opacity p-2 bg-white/90 hover:bg-red-50
 rounded-full shadow-md"
                      aria-label="Replace recommendation"
                      title="Get a different recommendation"
                    >
                      {replacingIndex === i ? (
                        <svg className="animate-spin h-4 w-4 
text-tommy-brown" xmlns="http://www.w3.org/2000/svg" fill="none" 
viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" 
r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor"
 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 
12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none"
                          viewBox="0 0 24 24" 
                          strokeWidth={2} 
                          stroke="currentColor" 
                          className="w-4 h-4 text-red-600"
                        >
                          <path strokeLinecap="round" 
strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 
9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25
 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 
0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 
0a48.11 48.11 0 013.478-.397m7.5 
0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 
0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      )}
                    </button>

                    {r.imageUrl ? (
                      <div className="mb-4 flex justify-center">
                        <img 
                          src={r.imageUrl} 
                          alt={`${r.title} cover`}
                          className="h-56 w-auto rounded shadow-md 
object-cover"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                            const placeholder = img.nextElementSibling as
HTMLElement;
                            if (placeholder) placeholder.style.display =
'flex';
                          }}
                        />
                        <div className="h-56 w-40 bg-gradient-to-br 
from-tommy-tan to-tommy-brown rounded shadow-md items-center 
justify-center p-4" style={{ display: 'none' }}>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-16 h-16 text-tommy-cream/40"
                          >
                            <path strokeLinecap="round" 
strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 
0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 
2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 
8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4 flex justify-center">
                        <div className="h-56 w-40 bg-gradient-to-br 
from-tommy-tan to-tommy-brown rounded shadow-md flex items-center 
justify-center p-4">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-16 h-16 text-tommy-cream/40"
                          >
                            <path strokeLinecap="round" 
strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 
0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 
2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 
8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                          </svg>
                        </div>
                      </div>
                    )}

                    <div className="mb-3">
                      <h3
                        className="font-semibold text-xl ink mb-1"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {r.title}
                      </h3>
                      <p className="text-sm opacity-70 ink">
                        by {r.author}
                      </p>
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