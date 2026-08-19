// src/app/page.js or src/app/page.tsx

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import FeaturedBooks from '@/components/FeaturedBooks';
import { createClient } from "@/utils/supabase/server/createClient";
import type { Book } from "@/types/Library";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let featuredBooks: Book[] | null = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('books')
      .select('*, authors(name)')
      .eq('is_featured', true)
      .limit(10);

    if (error) {
      console.error('Error fetching featured books:', error);
    } else {
      featuredBooks = data;
    }
  } catch (err) {
    // Next.js signals internal control flow (e.g. dynamic-usage bailout,
    // redirect, notFound) as thrown errors carrying a `digest`. Those must
    // propagate to Next.js, not be treated as "Supabase unavailable".
    if (err && typeof err === 'object' && 'digest' in err) {
      throw err;
    }
    console.error('Unexpected error fetching featured books:', err);
  }

  return (
    <main>
      <Header />
      
      <div className="grow flex flex-col items-center justify-start p-8">
        <div className="mb-10">
          <SearchBar />
        </div>
        
      </div>

      {/* 2. Pass the data to the FeaturedBooks component */}
      {featuredBooks && featuredBooks.length > 0 && (
        <FeaturedBooks books={featuredBooks} />
      )}
      
      <Footer />
    </main>
  );
}

export const metadata = {
  title: "Dashboard",
};