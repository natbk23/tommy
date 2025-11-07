import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="grow flex items-center justify-center pt-4">
        <SearchBar />
      </div>
      <Footer />
    </main>
  );
}
