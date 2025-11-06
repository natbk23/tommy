'use client';

import React, { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center font-serif bg-linear-to-r from-[#f6e7d7] via-[#fbead1] to-[#e9cba7] rounded-xl shadow-md py-10">
      <h1 className="text-4xl font-bold text-[#a86b32] mb-4 drop-shadow-sm">
        Stories that speak to you
      </h1>
      <p className="text-xl text-[#a86b32] mb-8">
        Name your feeling, find your story
      </p>
      <div className="w-full max-w-lg">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#c89f6a] bg-[#fff8f0] text-[#a86b32] focus:outline-none focus:ring-2 focus:ring-[#c89f6a] focus:border-transparent placeholder-[#c89f6a]"
            placeholder="Enter your feeling..."
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-[#a86b32] hover:bg-[#c89f6a] px-4 py-1 rounded-md shadow transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}