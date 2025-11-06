'use client';

import React, { useState } from 'react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Stories that speak to you
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Name your feeling, find your story
      </p>
      <div className="w-full max-w-lg">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your feeling..."
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}