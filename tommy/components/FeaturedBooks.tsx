// src/components/FeaturedBooks.tsx
"use client"
import { Book } from '@/types/Library';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface FeaturedBooksProps {
  books: Book[];
}

export default function FeaturedBooks({ books }: FeaturedBooksProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate books for seamless infinite scroll
  const duplicatedBooks = [...books, ...books, ...books]; // 3x for smooth loop

  useEffect(() => {
    if (!scrollContainerRef.current || isHovered) return;

    const scrollContainer = scrollContainerRef.current;
    let animationFrame: number;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
        // Jump back to start without visual glitch
        scrollContainer.scrollLeft -= scrollContainer.scrollWidth / 3;
      } else {
        scrollContainer.scrollLeft += 1; // Adjust speed here (1 = slow, 3 = fast)
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  if (!books || books.length === 0) return null;

  return (
    <section className="w-full bg-gradient-to-b from-b3997f py-16 overflow-hidden">
      <div className="">
        <h2 className="text-4xl font-bold mb-12 text-center text-yellow-950">
          Featured Reads
        </h2>

        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* Scroll Buttons (visible on hover) */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-yellow-900 rounded-full p-3 shadow-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-yellow-900 rounded-full p-3 shadow-xl z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollBehavior: 'smooth',
              // Enable seamless loop
              scrollSnapType: 'x mandatory',
            }}
          >
            {duplicatedBooks.map((book, index) => (
              <div
                key={`${book.id}-${index}`}
                className="flex-shrink-0 w-48 scroll-snap-align-center"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative w-48 aspect-2/3 bg-gray-600 rounded-xl shadow-xl overflow-hidden group/book">
                    <div className="absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r to-transparent opacity-60" />
                    
                    <img
                      src={book.cover_url || '/placeholder.jpeg'}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/book:scale-105"
                    />

                    {/* Subtle hover glow */}
                    <div className="absolute inset-0 ring-4 ring-transparent group-hover/book:ring-amber-400/30 transition-all rounded-xl" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold line-clamp-2 leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {book.authors?.name || 'Unknown Author'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Hover to pause • Scroll or drag to explore
        </p>
      </div>
    </section>
  );
}