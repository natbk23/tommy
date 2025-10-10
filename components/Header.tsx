// components/Header.tsx
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30">
      {/* Warm translucent bar */}
      <div className="mx-auto w-full backdrop-blur-md bg-white/5 border-b border-tommy-brown/20 shadow-[0_6px_18px_rgba(44,28,20,0.18)]">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Tommy logo"
              width={44}
              height={44}
              priority
              className="rounded-md"
            />
            <span
              className="text-2xl md:text-3xl text-tommy-brown leading-none"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Tommy
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link
              href="#how"
              className="text-tommy-brown/85 hover:text-tommy-brown transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#library"
              className="text-tommy-brown/85 hover:text-tommy-brown transition-colors"
            >
              Library
            </Link>
            <Link
              href="#about"
              className="text-tommy-brown/85 hover:text-tommy-brown transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-tommy-brown/30 bg-white/10 text-tommy-brown/90"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden px-6 pb-4">
            <div className="flex flex-col gap-3 rounded-lg border border-tommy-brown/25 bg-white/10 p-4">
              <Link
                href="#how"
                className="py-2 text-tommy-brown/90 hover:text-tommy-brown"
                onClick={() => setOpen(false)}
              >
                How it works
              </Link>
              <Link
                href="#library"
                className="py-2 text-tommy-brown/90 hover:text-tommy-brown"
                onClick={() => setOpen(false)}
              >
                Library
              </Link>
              <Link
                href="#about"
                className="py-2 text-tommy-brown/90 hover:text-tommy-brown"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
