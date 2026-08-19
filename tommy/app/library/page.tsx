import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LibraryShelf from '@/components/LibraryShelf';

export const metadata = {
  title: "Library | Tommy",
};

export default function Library() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-orange-950 mb-4">Your Library</h1>
        <p className="text-xl text-white/90 mb-12">
          Every book you save will live here.
        </p>

        <LibraryShelf />
      </div>

      <Footer />
    </main>
  );
}
