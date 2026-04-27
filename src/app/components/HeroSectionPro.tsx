import { GraduationCap, ArrowRight, Play, CheckCircle2, TrendingUp, Briefcase, GraduationCap as CapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface HeroSectionProProps {
  setActiveSection: (section: string) => void;
}

const slideImages = [
  "/hero-1.png",
  "/hero-2.png",
  "/hero-3.png"
];

export function HeroSectionPro({ setActiveSection }: HeroSectionProProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const openStarterModal = () => {
    window.dispatchEvent(new CustomEvent('open-get-started'));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="hero-main" className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden theme-transition pt-16 lg:pt-0">
      
      {/* Split Background Effect requested by user */}
      <div className="absolute inset-0 pointer-events-none flex">
        <div className="w-full lg:w-[40%] bg-blue-50/80 dark:bg-slate-900 h-full border-r border-blue-100/50 dark:border-slate-800/50" />
        <div className="hidden lg:block lg:w-[60%] bg-white dark:bg-[#0f172a] h-full" />
      </div>

      {/* Main Grid Wrapper with extra left padding and 40/60 distribution */}
      <div className="w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-8 lg:gap-12 xl:gap-16">
          
          {/* Left Content Half - ~40% (2 cols out of 5) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 lg:col-span-2 pl-4 pr-4 sm:pl-8 lg:pl-16 xl:pl-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 shadow-sm w-fit mt-4 lg:mt-0">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                Trusted by 1000+ Engineering Students
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              <span className="block text-slate-800 dark:text-slate-200">Learn Smarter.</span>
              <span className="block text-slate-800 dark:text-slate-200">Build Faster.</span>
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
                Get Hired.
              </span>
            </h1>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                AI-Driven Education for the Next-Gen Engineer
              </h3>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Personalized learning paths, real-time skill tracking, and live industry projects — all in one powerful platform built for modern engineering careers.
              </p>
            </div>

            <div className="flex flex-col gap-3 py-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">AI tracks your progress</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-100/50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Projects build your portfolio</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <CapIcon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Mentors guide your placement</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-y border-slate-200/60 dark:border-slate-700/50 py-8 my-4">
              <div>
                <p className="text-4xl font-black text-indigo-600 dark:text-indigo-400">1000+</p>
                <p className="text-base font-bold text-slate-500 dark:text-slate-400 mt-1">Active Learners</p>
              </div>
              <div>
                <p className="text-4xl font-black text-purple-600 dark:text-purple-400">85%</p>
                <p className="text-base font-bold text-slate-500 dark:text-slate-400 mt-1">Hiring Success</p>
              </div>
              <div>
                <p className="text-4xl font-black text-fuchsia-600 dark:text-fuchsia-400">₹6.5 LPA</p>
                <p className="text-base font-bold text-slate-500 dark:text-slate-400 mt-1">Avg CTC</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button 
                onClick={() => scrollToSection("courses")}
                className="group flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white px-8 py-5 rounded-xl font-extrabold text-xl shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <GraduationCap className="w-6 h-6" />
                Start Free
              </button>
              <button 
                onClick={openStarterModal}
                className="group flex-1 inline-flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-5 rounded-xl font-extrabold text-xl transition-all active:scale-95"
              >
                <Play className="w-6 h-6 fill-current" />
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Right Image Slider Half - ~60% (3 cols out of 5), 16:9 Aspect Ratio with rounded corners on left */}
          <div className="lg:col-span-3 w-full relative aspect-[16/9] lg:rounded-l-3xl overflow-hidden shadow-2xl z-20 group border-y border-l border-slate-200/50 dark:border-slate-700/50">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentImageIndex}
                src={slideImages[currentImageIndex]}
                alt="Product Demo"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            <div className="absolute inset-0 border-4 border-white/20 dark:border-white/5 lg:rounded-l-3xl z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-900/60 to-transparent z-[5] pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}