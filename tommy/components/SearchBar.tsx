'use client';

import React, { useState } from 'react';
import BookRecommendations from './BookRecommendations';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBooks([]);
    try {
      // Replace with your actual API endpoint
      const res = await fetch(`/api/recommend?query=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Failed to fetch recommendations');
      const data = await res.json();
      setBooks(data.books || []);
    } catch (err) {
      setError('Could not fetch recommendations.');
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center font-serif bg-transparent rounded-xl shadow-none py-10">
  <h1 className="text-8xl font-bold text-yellow-950 mb-4 drop-shadow-sm">
        Stories That Speak to You
      </h1>
  <p className="text-2xl text-gray-600 mb-8">
        Name your feeling, find your story
      </p>
      <form className="w-full max-w-2xl" onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-8 py-5 text-2xl rounded-xl border-2 border-white bg-transparent text-white focus:outline-none focus:ring-4 focus:ring-white focus:border-transparent placeholder-white"
            placeholder="Enter your feeling..."
          />
          <button
            type="submit"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-white bg-[#a86b32] hover:bg-[#e9cba7] px-8 py-3 rounded-xl shadow transition-colors duration-200 border-2 border-white"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      <BookRecommendations books={books} />
    </div>
  );
}