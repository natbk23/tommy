'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.png';
import { useLibrary } from '@/context/LibraryContext';

export default function Header() {
  const { books } = useLibrary();

  return (
  <header className="flex items-center justify-between px-8 py-4 bg-transparent shadow-none border-b-0">
      <div className="flex items-center">
        <Link href="/">
            <Image src={logo} alt="Logo" width={100} height={100} />
        </Link>
      </div>
      <nav className="flex items-center gap-8">
        <Link href="/library" className="relative text-orange-950 hover:text-[#e9cba7] font-serif font-medium transition-colors duration-200">
          Library
          {books.length > 0 && (
            <span className="absolute -top-2 -right-4 flex items-center justify-center min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-orange-950 text-white text-[10px] font-sans font-semibold">
              {books.length}
            </span>
          )}
        </Link>
        <Link href="/about" className="text-orange-950 hover:text-[#e9cba7] font-serif font-medium transition-colors duration-200">About</Link>
        <Link href="/how-it-works" className="text-orange-950 hover:text-[#e9cba7] font-serif font-medium transition-colors duration-200">How it works</Link>
        <Link href="/profile" className="text-orange-950 hover:text-[#e9cba7] font-serif font-medium transition-colors duration-200">Profile</Link>
      </nav>
    </header>
  );
}
