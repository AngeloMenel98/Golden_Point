'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/useScrollAnimation';

export function HeroSection() {
  const { ref: titleRef, isInView: titleVisible } = useInView(0.2);
  const { ref: subtitleRef, isInView: subtitleVisible } = useInView(0.2);
  const { ref: ctaRef, isInView: ctaVisible } = useInView(0.2);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like Effect */}
      <div className="absolute inset-0">
        <Image
          src="/GP_WallPaper.jpg"
          alt="Padel Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/60" />
        
        {/* Decorative Overlay Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Decorative Accent */}
        <div 
          ref={titleRef}
          className={`inline-block mb-6 px-4 py-1 border border-gold/30 rounded-full backdrop-blur-sm ${
            titleVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
            La experiencia definitiva en pádel
          </span>
        </div>

        <h1 
          ref={titleRef}
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight ${
            titleVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ fontFamily: 'var(--font-playfair, serif)' }}
        >
          VIVE LA EMOCIÓN{' '}
          <span className="relative">
            <span className="text-gold">DEL PÁDEL</span>
            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className={`text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed ${
            subtitleVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'
          }`}
          style={{ fontFamily: 'var(--font-dm-sans, sans-serif)' }}
        >
          Únete a la comunidad más exclusiva de pádel. Organiza torneos profesionales, 
          mide tu progreso con estadísticas avanzadas y conecta con jugadores de élite.
        </p>

        <div 
          ref={ctaRef}
          className={`flex flex-col sm:flex-row gap-5 justify-center ${
            ctaVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'
          }`}
        >
          <Link 
            href="/register" 
            className="group relative px-8 py-4 bg-gold text-surface text-lg font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <span className="relative z-10">Únete a la comunidad</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <Link 
            href="#torneos" 
            className="group px-8 py-4 border-2 border-white/30 text-white text-lg font-semibold rounded-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50"
          >
            Ver torneos
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
