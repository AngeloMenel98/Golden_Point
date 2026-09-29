import { HeroSection, FeaturesSection, TournamentsSection, CTASection, Footer, MobileNav } from '@/components/landing';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <MobileNav />
      <HeroSection />
      <FeaturesSection />
      <TournamentsSection />
      <CTASection />
      <Footer />
    </div>
  );
}