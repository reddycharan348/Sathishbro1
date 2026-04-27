import { lazy, Suspense } from 'react';
import { HeroSectionPro } from '../components/HeroSectionPro';
import { SectionSkeleton } from '../components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

// Lazy load ALL sections below the fold for maximum performance
const CompaniesSection = lazy(() => import('../components/CompaniesSection').then(m => ({ default: m.CompaniesSection })));
const StatsSection = lazy(() => import('../components/StatsSection').then(m => ({ default: m.StatsSection })));
const FeaturesSection = lazy(() => import('../components/FeaturesSection').then(m => ({ default: m.FeaturesSection })));
const NumbersSection = lazy(() => import('../components/NumbersSection').then(m => ({ default: m.NumbersSection })));
const LiveActivitySection = lazy(() => import('../components/LiveActivitySection').then(m => ({ default: m.LiveActivitySection })));
const FAQSection = lazy(() => import('../components/FAQSection').then(m => ({ default: m.FAQSection })));

interface HomePageProps {
  setActiveSection: (section: string) => void;
}

export function HomePage({ setActiveSection }: HomePageProps) {
  return (
    <div className="space-y-0">
      <section id="hero">
        <HeroSectionPro setActiveSection={setActiveSection} />
      </section>
      
      <section id="placements">
        <Suspense fallback={<SectionSkeleton />}>
          <CompaniesSection />
        </Suspense>
      </section>

      <section id="capabilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 scroll-mt-20">
        <h2 className="text-4xl md:text-6xl font-black text-heading text-center mb-16 tracking-tight">
          Discover Platform <span className="text-blue-500">Capabilities</span>
        </h2>
        
        <Tabs defaultValue="features" className="w-full flex flex-col items-center">
          <TabsList className="grid w-full max-w-4xl grid-cols-4 mb-16 bg-surface/50 border border-surface-border rounded-2xl p-2 shadow-xl backdrop-blur-xl">
            <TabsTrigger value="features" className="text-sm md:text-lg font-bold rounded-xl py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Features</TabsTrigger>
            <TabsTrigger value="stats" className="text-sm md:text-lg font-bold rounded-xl py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Stats</TabsTrigger>
            <TabsTrigger value="numbers" className="text-sm md:text-lg font-bold rounded-xl py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Impact</TabsTrigger>
            <TabsTrigger value="activity" className="text-sm md:text-lg font-bold rounded-xl py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Activity</TabsTrigger>
          </TabsList>
          
          <div className="w-full">
            <TabsContent value="features" className="focus:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Suspense fallback={<SectionSkeleton />}>
                <FeaturesSection />
              </Suspense>
            </TabsContent>
            
            <TabsContent value="stats" className="focus:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Suspense fallback={<SectionSkeleton />}>
                <StatsSection />
              </Suspense>
            </TabsContent>
            
            <TabsContent value="numbers" className="focus:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Suspense fallback={<SectionSkeleton />}>
                <NumbersSection />
              </Suspense>
            </TabsContent>
            
            <TabsContent value="activity" className="focus:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Suspense fallback={<SectionSkeleton />}>
                <LiveActivitySection />
              </Suspense>
            </TabsContent>
          </div>
        </Tabs>
      </section>

      <section id="faq-section">
        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>
      </section>
    </div>
  );
}