import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Profile | Tommy",
};

export default function Profile() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-orange-950 mb-6">Profile</h1>
        <div className="bg-white/10 border border-white/30 rounded-2xl p-10">
          <p className="text-xl text-white/90 leading-relaxed">
            Accounts aren't set up yet. Once they are, this is where you'll
            find your saved shelves, reading history, and mood preferences.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
