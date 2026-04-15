'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import RedesignedLogo from '@/components/icons/RedesignedLogo';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Torneos', href: '#torneos' },
  { label: 'Clubes', href: '#clubes' },
  { label: 'Contacto', href: '#contacto' },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Mobile Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible 
            ? 'bg-surface/95 backdrop-blur-md border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/" onClick={closeMenu}>
            <RedesignedLogo width={120} height={43} />
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Login Link - Desktop */}
            <Link 
              href="/login" 
              className="hidden sm:block text-white hover:text-gold transition-colors text-sm font-medium"
            >
              Iniciar sesión
            </Link>

            {/* Join Button - Desktop */}
            <Link 
              href="/register" 
              className="hidden sm:block bg-gold text-surface px-4 py-2 rounded-md text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Únete
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              <span 
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`} 
              />
              <span 
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`} 
              />
              <span 
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`} 
              />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Slide-in Drawer */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-surface border-l border-white/10 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-text-muted hover:text-white transition-colors"
          aria-label="Cerrar menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Mobile Menu Content */}
        <div className="pt-20 px-6">
          {/* Navigation Links */}
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="block py-3 text-white hover:text-gold transition-colors text-lg font-medium border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="mt-8 space-y-3">
            <Link
              href="/login"
              onClick={closeMenu}
              className="block w-full py-3 text-center text-white hover:text-gold transition-colors text-base font-medium border border-white/20 rounded-lg"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              onClick={closeMenu}
              className="block w-full py-3 text-center bg-gold text-surface rounded-lg text-base font-semibold hover:bg-gold-light transition-colors"
            >
              Únete
            </Link>
          </div>
        </div>

        {/* Decorative Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
          <p className="text-text-muted text-xs text-center">
            © 2025 Golden Point
          </p>
        </div>
      </div>
    </>
  );
}
