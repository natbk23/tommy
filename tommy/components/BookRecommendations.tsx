'use client';

import { Book } from "@/types/Library";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookRecommendationsProps {
  books: Book[];
  loading?: boolean;
  replacingIndex?: number | null;
  onReplace?: (index: number) => void;
}

const BOOKS_PER_PAGE = 12;

export default function BookRecommendations({
  books,
  loading = false,
  replacingIndex = null,
  onReplace,
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
        {currentBooks.map((book, i) => {
          const globalIndex = startIdx + i;
          const isReplacing = replacingIndex === globalIndex;
          return (
          <div
            key={book.id || `${book.title}-${globalIndex}`}
            className="group relative flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            style={{ opacity: isReplacing ? 0.5 : 1 }}
          >
            {onReplace && (
              <button
                onClick={() => onReplace(globalIndex)}
                disabled={isReplacing}
                className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/90 hover:bg-red-50 rounded-full shadow-md"
                aria-label="Replace recommendation"
                title="Get a different recommendation"
              >
                {isReplacing ? (
                  <svg className="animate-spin h-4 w-4 text-yellow-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-red-600"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                )}
              </button>
            )}

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
          );
        })}
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