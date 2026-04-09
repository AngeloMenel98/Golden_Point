'use client';

import { useInView } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Torneos dinámicos',
    description: 'Crea y participa en torneos con sistema de clasificación, emparejamientos automáticos y seguimiento en tiempo real.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Estadísticas avanzadas',
    description: 'Analiza tu rendimiento, historial de partidos, nivel de juego y evoluciona con datos precisos.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Comunidad activa',
    description: 'Conecta con otros jugadores, encuentra compañeros de juego y participa en eventos exclusivos.',
  },
];

export function FeaturesSection() {
  const { ref: headerRef, isInView: headerVisible } = useInView(0.2);
  const { ref: cardsRef, isInView: cardsVisible } = useInView(0.1);

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
            ¿Por qué elegirnos?
          </span>
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair, serif)' }}
          >
            La plataforma definitiva{' '}
            <span className="text-gold">para tu pádel</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Diseñada para jugadores que buscan mejorar, competir y conectar con la comunidad
          </p>
        </div>

        {/* Feature Cards */}
        <div 
          ref={cardsRef}
          className={`grid md:grid-cols-3 gap-6 lg:gap-8 ${cardsVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-gradient-to-br from-surface-elevated to-surface border border-white/5 rounded-2xl p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 to-gold/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold/20 rounded-tr" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
