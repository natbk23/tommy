import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.png';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-linear-to-r from-[#f6e7d7] via-[#fbead1] to-[#e9cba7] shadow-lg border-b-4 border-[#c89f6a]">
      <div className="flex items-center">
        <Link href="/">
            <Image src={logo} alt="Logo" width={100} height={100} />
        </Link>
      </div>
      <nav className="flex items-center gap-8">
        <Link href="/library" className="text-[#a86b32] hover:text-[#c89f6a] font-serif font-medium transition-colors duration-200">Library</Link>
        <Link href="/about" className="text-[#a86b32] hover:text-[#c89f6a] font-serif font-medium transition-colors duration-200">About</Link>
        <Link href="/how-it-works" className="text-[#a86b32] hover:text-[#c89f6a] font-serif font-medium transition-colors duration-200">How it works</Link>
        <Link href="/profile" className="text-[#a86b32] hover:text-[#c89f6a] font-serif font-medium transition-colors duration-200">Profile</Link>
      </nav>
    </header>
  );
}
