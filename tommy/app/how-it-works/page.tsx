import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "How It Works | Tommy",
};

const steps = [
  {
    title: "Name your feeling",
    body: "Type in a mood, vibe, or moment — “rainy-cabin cozy,” “bittersweet,” “slow-burn romance.” There's no wrong way to describe it.",
  },
  {
    title: "Tommy curates a shelf",
    body: "Tommy asks an AI literary curator for books that match your mood, then fetches real cover art for each one.",
  },
  {
    title: "Browse the recommendations",
    body: "Each book comes with a short note on why it fits your mood, so you can tell at a glance if it's worth a read.",
  },
  {
    title: "Swap what doesn't fit",
    body: "Hover over any book and click the refresh icon to get a different pick — Tommy won't repeat a book already on your shelf.",
  },
];

export default function HowItWorks() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-orange-950 mb-12 text-center">
          How It Works
        </h1>

        <ol className="space-y-8">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-950 text-white flex items-center justify-center font-semibold">
                {i + 1}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-orange-950 mb-1">
                  {step.title}
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Footer />
    </main>
  );
}
