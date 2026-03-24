'use client';

import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import GPLogo from '@/components/icons/GPLogo';
import { User, LogOut } from 'lucide-react';

export default function NavBar() {
  const { user, logout } = useUser();

  return (
    <nav className="flex justify-between items-center px-5 py-4 bg-gp-dark text-white shadow-lg">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <GPLogo width={50} height={30} />
        </Link>
      </div>
      <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gp-pastel" />
                <span className="hidden sm:inline-block font-medium">{user.username}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded hover:bg-white/10 transition-colors flex items-center gap-1"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
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
