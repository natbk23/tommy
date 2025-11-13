// src/app/page.js or src/app/page.tsx

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import FeaturedBooks from '@/components/FeaturedBooks';
import { createClient } from "@/utils/supabase/server/createClient";

export default async function Home() {
  const supabase = await createClient();

  // 1. Fetch featured books
  const { data: featuredBooks, error } = await supabase
    .from('books')
    .select('*, authors(name)')
    .eq('is_featured', true) 
    .limit(10);            

  if (error) {
    console.error('Error fetching featured books:', error);
  }
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="grow flex flex-col items-center justify-start p-8">
        <div className="mb-10">
          <SearchBar />
        </div>
        
        {/* 2. Pass the data to the FeaturedBooks component */}
        {featuredBooks && featuredBooks.length > 0 && (
          <FeaturedBooks books={featuredBooks} />
        )}
      </div>
      
      <Footer />
    </main>
  );
}