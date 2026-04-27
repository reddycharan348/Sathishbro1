import { Menu, X, Sun, Moon, PhoneCall, Clock, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useTheme } from 'next-themes';

// Lazy load the modal as it contains heavy logic and UI
const GetStartedModal = lazy(() => import('./GetStartedModal').then(m => ({ default: m.GetStartedModal })));

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'branches', label: 'Branches' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'courses', label: 'Courses' },
    { id: 'projects', label: 'Projects' },
    { id: 'papers', label: 'Papers' },
    { id: 'ai', label: 'AI Tools' },
    { id: 'trainer', label: 'Trainers' },
    { id: 'blogs', label: 'Blogs' },
  ];

  const navigateToPage = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleOpenModal = () => {
      setIsGetStartedModalOpen(true);
    };

    window.addEventListener('open-get-started', handleOpenModal);
    return () => window.removeEventListener('open-get-started', handleOpenModal);
  }, []);

  return (
    <div className="sticky top-0 z-50 theme-transition shadow-lg shadow-blue-900/10">
      {/* Top Header Bar like ATRISOL Reference */}
      <div className="hidden md:flex justify-between items-center px-4 sm:px-6 lg:px-8 py-2 bg-white dark:bg-slate-900 border-b border-surface-border transition-colors">
        {/* Left Side: Logo */}
        <Logo onClick={() => navigateToPage('home')} textSize="text-3xl" iconSize={64} />

        {/* Right Side: Contact Info */}
        <div className="flex items-center gap-8 text-base">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <PhoneCall className="w-10 h-10 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full p-2" />
            <div>
              <p className="font-bold text-slate-800 dark:text-white">Call Us</p>
              <p className="text-sm text-red-600 dark:text-red-400 font-bold">+91 99899 99099</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 border-l border-slate-200 dark:border-slate-700 pl-8">
            <Clock className="w-10 h-10 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-full p-2" />
            <div>
              <p className="font-bold text-slate-800 dark:text-white">Working Hours</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">09.00am - 9.00pm (IST)</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#2c3e8a] dark:bg-slate-950 backdrop-blur-xl border-b border-white/10 transition-colors py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Mobile Logo */}
            <Logo onClick={() => navigateToPage('home')} iconSize={56} showName={false} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-start ml-10 gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className={`px-4 py-2 rounded-md text-lg md:text-xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${
                    activePage === item.id
                      ? 'text-red-500 dark:text-red-400 border-b-2 border-red-500'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side: theme toggle + mobile menu */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all theme-transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-200" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-white rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-1 border-t border-white/20">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all text-base uppercase font-medium tracking-wide ${
                    activePage === item.id
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-4 border-t border-white/20 mt-2">
                <button 
                  onClick={() => navigateToPage('contact')}
                  className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-4 rounded-md font-bold text-lg transition-all shadow-md"
                >
                  <Mail className="w-5 h-5" /> Contact Us
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <Suspense fallback={null}>
        <GetStartedModal
          isOpen={isGetStartedModalOpen}
          onClose={() => setIsGetStartedModalOpen(false)}
        />
      </Suspense>
    </div>
  );
}