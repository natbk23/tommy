import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "About | Tommy",
};

export default function About() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-orange-950 mb-6">About Tommy</h1>
        <p className="text-xl text-white/90 leading-relaxed mb-6">
          Tommy is a mood-based book recommender. Instead of browsing by genre
          or bestseller lists, you tell Tommy how you're feeling &mdash; cozy,
          bittersweet, adventurous, anything &mdash; and it curates a shelf of
          books to match.
        </p>
        <p className="text-xl text-white/90 leading-relaxed">
          Every recommendation is generated on the spot, paired with real
          cover art, and easy to swap out if one doesn't feel right. Tommy is
          still growing: expect new features like saved shelves and reading
          history as the project develops.
        </p>
      </div>

      <Footer />
    </main>
  );
}
