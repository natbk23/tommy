'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Book } from '@/types/Library';

interface LibraryContextValue {
  books: Book[];
  addToLibrary: (book: Book) => void;
  removeFromLibrary: (id: string) => void;
  isInLibrary: (id: string) => boolean;
}

const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);

  const addToLibrary = (book: Book) => {
    setBooks((prev) => (prev.some((b) => b.id === book.id) ? prev : [...prev, book]));
  };

  const removeFromLibrary = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const isInLibrary = (id: string) => books.some((b) => b.id === id);

  return (
    <LibraryContext.Provider value={{ books, addToLibrary, removeFromLibrary, isInLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
