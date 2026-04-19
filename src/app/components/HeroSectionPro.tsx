import { GraduationCap, ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface HeroSectionProProps {
  setActiveSection: (section: string) => void;
}

export function HeroSectionPro({ setActiveSection }: HeroSectionProProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end))`,
          }}
        />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-3xl"
          style={{ y, backgroundColor: 'var(--orb-blue)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-3xl"
          style={{ y, backgroundColor: 'var(--orb-cyan)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{
            backgroundImage: `linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`,
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: 'var(--particle-color)',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        {/* Centered content */}
        <motion.div
          style={{ opacity }}
          className="text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 backdrop-blur-sm rounded-full border border-blue-500/30 shadow-lg shadow-blue-500/20"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm text-text-secondary">Trusted by 1000+ Engineering Students</span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6">
              <span className="block text-heading">Learn Smarter.</span>
              <span className="block mt-2 text-heading">Build Faster.</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Get Hired.
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-blue-400 mb-3 sm:mb-4">
              AI-Driven Education for the Next-Gen Engineer
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-text-muted leading-relaxed mb-4 sm:mb-6 px-2">
              Personalized learning paths, real-time skill tracking, and live industry projects — all in one powerful platform built for modern engineering careers.
            </p>
            
            {/* Feature bullets */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              {[
                { icon: '📊', text: 'AI tracks your progress' },
                { icon: '🛠', text: 'Projects build your portfolio' },
                { icon: '🎯', text: 'Mentors guide your placement' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 text-base sm:text-lg text-text-secondary"
                >
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: '1000+', label: 'Active Learners' },
              { value: '85%', label: 'Hiring Success' },
              { value: '₹6.5 LPA', label: 'Avg CTC' },
            ].map((stat, index) => (
              <div key={index} className="bg-surface backdrop-blur-sm border border-surface-border rounded-xl p-3 sm:p-4 theme-transition">
                <div className="text-xl sm:text-2xl text-heading mb-1 font-bold">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4"
          >
            <motion.button
              onClick={() => scrollToSection('roadmap')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow-2xl shadow-blue-500/50 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <GraduationCap className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Start Learning Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('courses')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-surface backdrop-blur-sm border border-blue-500/30 text-heading rounded-xl hover:bg-surface-hover hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 theme-transition"
            >
              <Play className="w-5 h-5" />
              Watch How It Works
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-text-muted pt-4"
          >
            {[
              '✔ AI Skill Analytics',
              '✔ Industry-Aligned Curriculum',
              '✔ Career-Ready Certification',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}