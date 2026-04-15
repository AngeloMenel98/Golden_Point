'use client';

import Link from 'next/link';
import { useInView } from '@/hooks/useScrollAnimation';

const tournaments = [
  {
    id: 1,
    name: 'Copa Primavera',
    date: '15 Abr 2025',
    category: 'Próximo',
    teams: 32,
    level: 'Mixto nivel intermedio',
  },
  {
    id: 2,
    name: 'Master Series',
    date: '22 Abr 2025',
    category: 'Próximo',
    teams: 16,
    level: 'Profesional masculino',
  },
  {
    id: 3,
    name: 'Amateur Cup',
    date: '5 May 2025',
    category: 'Próximo',
    teams: 48,
    level: 'Abierto todos los niveles',
  },
];

export function TournamentsSection() {
  const { ref: headerRef, isInView: headerVisible } = useInView(0.2);
  const { ref: cardsRef, isInView: cardsVisible } = useInView(0.1);

  return (
    <section id="torneos" className="py-24 bg-gradient-to-b from-surface to-surface-elevated relative">
      {/* Decorative Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 45%, white 45%, white 55%, transparent 55%)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
            Compite y destaca
          </span>
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair, serif)' }}
          >
            Próximos <span className="text-gold">Torneos</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Descubre los próximos torneos y únete a la competición
          </p>
        </div>

        {/* Tournament Cards */}
        <div 
          ref={cardsRef}
          className={`grid md:grid-cols-3 gap-6 ${cardsVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}
        >
          {tournaments.map((tournament, index) => (
            <div
              key={tournament.id}
              className="group relative bg-surface-elevated/50 border-l-2 border-l-gold/30 border border-white/5 rounded-r-2xl p-6 transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Top Badge & Date */}
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full border border-gold/20">
                  {tournament.category}
                </span>
                <span className="text-text-muted text-sm">{tournament.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                {tournament.name}
              </h3>
              <p className="text-text-secondary text-sm mb-6">{tournament.level}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-text-muted text-sm">
                  {tournament.teams} equipos
                </span>
                <span className="text-gold text-sm font-medium group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                  Ver más 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-12 ${cardsVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <Link 
            href="/tournaments" 
            className="inline-flex items-center gap-3 border-2 border-gold text-gold px-8 py-4 rounded-lg font-semibold transition-all hover:bg-gold hover:text-surface hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] group"
          >
            Ver todos los torneos
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
