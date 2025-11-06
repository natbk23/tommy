import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.png';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="Logo" width={40} height={40} />
        </Link>
      </div>
      <nav className="flex items-center gap-8">
        <Link href="/library" className="text-gray-700 hover:text-blue-600 font-medium">Library</Link>
        <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
        <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">How it works</Link>
        <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</Link>
      </nav>
    </header>
  );
}
