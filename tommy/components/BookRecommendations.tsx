'use client';

import { Book } from "@/types/Library";

interface BookRecommendationsProps {
  books: Book[];
  loading?: boolean;
}

export default function BookRecommendations({ books, loading }: BookRecommendationsProps) {

  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-yellow-950">
        Recommended Reads
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {books.map((book, i) => (
          <div
            key={book.id || `${book.title}-${i}`}
            className="flex flex-col items-center text-center space-y-3"
          >
            <div className="relative w-full aspect-2/3 max-w-56 overflow-hidden group rounded-2xl">
              <div className="absolute inset-y-0 left-0 w-[6%] bg-linear-to-r to-transparent" />
              <img
                src={book.cover_url || '/placeholder-cover.jpg'}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            <h3 className="text-lg font-semibold truncate w-full px-2">{book.title}</h3>
            <p className="text-base text-gray-500 truncate w-full px-2">
              {book.authors?.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}