'use client';

import { Book } from "@/types/Library";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookRecommendationsProps {
  books: Book[];
  loading?: boolean;
}

const BOOKS_PER_PAGE = 12;

export default function BookRecommendations({
  books,
  loading = false,
}: BookRecommendationsProps) {
  const [page, setPage] = useState(1);

  if (!books || books.length === 0) return null;

  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
  const startIdx = (page - 1) * BOOKS_PER_PAGE;
  const currentBooks = books.slice(startIdx, startIdx + BOOKS_PER_PAGE);

  const goToPage = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="w-full px-6 py-20">
        <div className="text-center text-yellow-950 text-2xl">Loading recommendations…</div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-yellow-950">
        Recommended Reads
      </h2>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentBooks.map((book, i) => (
          <div
            key={book.id || `${book.title}-${startIdx + i}`}
            className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Book Cover */}
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
              <div className="absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-black/20 to-transparent z-10" />
              <img
                src={book.cover_url || "/placeholder.jpeg"}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
                {book.title}
              </h3>

              {book.authors?.name && (
                <p className="text-sm text-gray-500 mt-1">by {book.authors.name}</p>
              )}

              {book.why && (
                <p className="mt-4 text-sm text-gray-700 line-clamp-3 flex-1">
                  {book.why}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6 text-yellow-950" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`w-10 h-10 rounded-full transition ${
                  p === page
                    ? "bg-yellow-950 text-white font-semibold"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6 text-yellow-950" />
          </button>
        </div>
      )}

      {/* Page indicator */}
      <p className="text-center text-sm text-gray-600 mt-4">
        Page {page} of {totalPages} ({books.length} books total)
      </p>
    </section>
  );
}