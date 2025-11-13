// src/components/FeaturedBooks.tsx
import { Book } from '@/types/Library';

interface FeaturedBooksProps {
  books: Book[];
}

export default function FeaturedBooks({ books }: FeaturedBooksProps) {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
        {books.map((book: Book) => (
          <div 
            key={book.id} 
            className="flex flex-col items-center text-center space-y-3"
          >
            {/* Book-shaped frame */}
            <div className="relative w-full aspect-2/3 max-w-40 bg-gray-100 rounded-lg shadow-md overflow-hidden group">
              {/* subtle book spine effect */}
              <div className="absolute inset-y-0 left-0 w-[6%] bg-linear-to-r from-gray-300 to-transparent" />
              
              <img
                src={book.cover_url}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            <h3 className="text-md font-semibold truncate max-w-40">{book.title}</h3>
            <p className="text-sm text-gray-500 truncate max-w-40">
              {book.authors?.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
