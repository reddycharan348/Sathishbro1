import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SocialWidgets } from './components/SocialWidgets';
import { ChatBot } from './components/ChatBot';

// Lazy load pages for better performance
const BranchesPage = lazy(() => import('./pages/BranchesPage').then(m => ({ default: m.BranchesPage })));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage').then(m => ({ default: m.RoadmapPage })));
const CoursesPage = lazy(() => import('./pages/CoursesPage').then(m => ({ default: m.CoursesPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const PapersPage = lazy(() => import('./pages/PapersPage').then(m => ({ default: m.PapersPage })));
const AIToolsPage = lazy(() => import('./pages/AIToolsPage').then(m => ({ default: m.AIToolsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

const TrainerPage = lazy(() => import('./pages/TrainerPage').then(m => ({ default: m.TrainerPage })));
const BlogsPage = lazy(() => import('./pages/BlogsPage').then(m => ({ default: m.BlogsPage })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-page-bg">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-text-muted">Loading...</p>
    </div>
  </div>
);

export default function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    // Cache clearing logic for version updates and hacker prevention
    const APP_VERSION = '1.0.5'; // Updated to forcefully clear local storage
    const storedVersion = localStorage.getItem('app_version');
    
    if (storedVersion !== APP_VERSION) {
      console.log('New version detected, clearing cache explicitly...');
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('app_version', APP_VERSION);
      // Clear service worker cache fully to eliminate stale cache loops
      if ('serviceWorker' in navigator) {
        caches.keys().then((names) => {
          for (const name of names) caches.delete(name);
        });
      }
      // Reload once to ensure fresh state with cache avoidance
      window.location.replace(window.location.href);
    }

    const handleNavigate = (event: CustomEvent) => {
      setActivePage(event.detail);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActiveSection={setActivePage} />;
      case 'branches':
        return <BranchesPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'courses':
        return <CoursesPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'papers':
        return <PapersPage />;
      case 'ai':
        return <AIToolsPage />;
      case 'trainer':
        return <TrainerPage />;
      case 'contact':
        return <ContactPage />;
      case 'blogs':
        return <BlogsPage />;
      default:
        return <HomePage setActiveSection={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-page-bg text-page-fg theme-transition">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>

      <Footer />

      {/* Social Widgets - WhatsApp, Instagram, Email */}
      <SocialWidgets />

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
}