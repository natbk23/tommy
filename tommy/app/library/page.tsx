import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "Library | Tommy",
};

const SHELF_SLOTS = 6;

export default function Library() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-orange-950 mb-4">Your Library</h1>
        <p className="text-xl text-white/90 mb-12">
          Every book you save will live here.
        </p>

        <div className="bg-white/10 border border-white/30 rounded-2xl p-10 mb-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-14 h-14 text-white/60 mx-auto mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          <p className="text-xl text-white/90 leading-relaxed">
            Your shelf is empty. Once accounts are set up, books you save
            from your recommendations will show up here.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-orange-950 text-white font-semibold hover:bg-orange-900 transition-colors duration-200"
          >
            Find books to add
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-orange-950 mb-8">
          What your shelf will look like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: SHELF_SLOTS }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-full aspect-[2/3] rounded-xl border-2 border-dashed border-white/40 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-white/30"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <div className="h-3 w-3/4 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
