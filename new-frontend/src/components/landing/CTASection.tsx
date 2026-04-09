'use client';

import Link from 'next/link';
import { useInView } from '@/hooks/useScrollAnimation';

export function CTASection() {
  const { ref, isInView } = useInView(0.3);

  return (
    <section 
      ref={ref}
      className="relative py-28 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-elevated to-surface" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />
      
      {/* Diagonal Lines Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            white 20px,
            white 21px
          )`
        }} />
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-4xl mx-auto px-4 text-center ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full border border-gold/20 mb-8">
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-gold text-sm font-medium">Únete a miles de jugadores</span>
        </div>

        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-playfair, serif)' }}
        >
          ¿Listo para subir de nivel?
        </h2>
        
        <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Transforma tu juego con estadísticas avanzadas, participa en tournaments 
          exclusivos y conecta con la comunidad de pádel más activa.
        </p>

        <Link 
          href="/register" 
          className="inline-flex items-center gap-3 bg-gold text-surface px-10 py-5 rounded-xl text-lg font-semibold transition-all hover:bg-gold-light hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] group"
        >
          Crear cuenta gratis
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-text-muted text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Sin compromiso</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Cuenta gratuita</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Acceso inmediato</span>
          </div>
        </div>
      </div>
    </section>
  );
}
