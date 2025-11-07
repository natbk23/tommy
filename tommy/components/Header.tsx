import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.png';

export default function Header() {
  return (
  <header className="flex items-center justify-between px-8 py-4 bg-transparent shadow-none border-b-0">
      <div className="flex items-center">
        <Link href="/">
            <Image src={logo} alt="Logo" width={100} height={100} />
        </Link>
      </div>
      <nav className="flex items-center gap-8">
        <Link href="/library" className="text-orange-950 hover:text-[#e9cba7] font-serif font-medium transition-colors duration-200">Library</Link>
        <Link href="/about" className="text-orange-950 hover:text-[#e9cba7] font-serif font-medium transition-colors duration-200">About</Link>
        <Link href="/how-it-works" className="text-orange-950 hover:text-[#e9cba7] font-serif font-medium transition-colors duration-200">How it works</Link>
        <Link href="/profile" className="text-orange-950 hover:text-[#e9cba7] font-serif font-medium transition-colors duration-200">Profile</Link>
      </nav>
    </header>
  );
}
