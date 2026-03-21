'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function NavBar() {
  const pathname = usePathname();
  const { user, logout } = useUser();

  const navItems = [
    { label: 'Tournaments', href: '/tournaments' },
    { label: 'My Tournaments', href: '/my-tournaments' },
    { label: 'Ranking', href: '/ranking' },
    { label: 'Tours', href: '/tours' },
  ];

  return (
    <nav className="flex justify-between items-center px-5 py-4 bg-gp-dark text-white shadow-lg">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-gp-light">
          Golden Point
        </Link>
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-gp-light ${
                pathname.startsWith(item.href) ? 'text-gp-light font-bold' : 'text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="hidden sm:inline-block font-medium">{user.username}</span>
            <button
              onClick={logout}
              className="px-3 py-1 border border-white rounded hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-gp-pastel rounded hover:bg-gp-light hover:text-gp-dark transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
