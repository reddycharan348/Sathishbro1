import { Menu, X, Zap, Sun, Moon } from 'lucide-react';
import { useState, lazy, Suspense } from 'react';
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
    { id: 'career', label: 'Career' },
    { id: 'trainer', label: 'Trainers' },
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

  return (
    <nav className="sticky top-0 z-50 bg-nav-bg backdrop-blur-xl border-b border-nav-border shadow-lg shadow-blue-900/10 theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => navigateToPage('home')}>
            <div className="bg-gradient-to-br from-blue-600 to-cyan-400 p-2 rounded-lg shadow-lg shadow-blue-500/50">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-bold">
              EduPulseX
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  activePage === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-heading'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side: theme toggle + mobile menu */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-surface hover:bg-surface-hover border border-surface-border text-text-secondary hover:text-heading transition-all theme-transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-text-secondary rounded-lg hover:bg-surface-hover transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-1 border-t border-surface-border">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all text-base ${
                  activePage === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-heading'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <Suspense fallback={null}>
        <GetStartedModal
          isOpen={isGetStartedModalOpen}
          onClose={() => setIsGetStartedModalOpen(false)}
        />
      </Suspense>
    </nav>
  );
}