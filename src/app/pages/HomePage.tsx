import { lazy, Suspense } from 'react';
import { HeroSectionPro } from '../components/HeroSectionPro';
import { SectionSkeleton } from '../components/ui/Skeleton';

// Lazy load ALL sections below the fold for maximum performance
const CompaniesSection = lazy(() => import('../components/CompaniesSection').then(m => ({ default: m.CompaniesSection })));
const StatsSection = lazy(() => import('../components/StatsSection').then(m => ({ default: m.StatsSection })));
const FeaturesSection = lazy(() => import('../components/FeaturesSection').then(m => ({ default: m.FeaturesSection })));
const NumbersSection = lazy(() => import('../components/NumbersSection').then(m => ({ default: m.NumbersSection })));
const LiveActivitySection = lazy(() => import('../components/LiveActivitySection').then(m => ({ default: m.LiveActivitySection })));

interface HomePageProps {
  setActiveSection: (section: string) => void;
}

export function HomePage({ setActiveSection }: HomePageProps) {
  return (
    <div>
      <HeroSectionPro setActiveSection={setActiveSection} />
      
      <Suspense fallback={<SectionSkeleton />}>
        <CompaniesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <NumbersSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <LiveActivitySection />
      </Suspense>
    </div>
  );
}