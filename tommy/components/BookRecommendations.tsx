import React from 'react';

export default function BookRecommendations({ books }) {
  if (!books || books.length === 0) return null;

  return (
  <div className="mt-10 w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {books.map((book) => (
        <div key={book.id} className="bg-transparent rounded-lg shadow-none p-4 flex flex-col items-center font-serif border-2 border-white">
          <img src={book.coverUrl} alt={book.title} className="w-32 h-48 object-cover rounded mb-4 border-2 border-white" />
          <h2 className="text-lg text-white font-bold mb-2 text-center">{book.title}</h2>
          <p className="text-white text-center">{book.author}</p>
        </div>
      ))}
    </div>
  );
}
