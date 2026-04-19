import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, TrendingUp, Building2 } from 'lucide-react';
import { useState } from 'react';

export function SuccessStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      name: 'Rajesh Kumar',
      branch: 'Computer Science',
      image: '👨‍💻',
      before: {
        status: 'Final Year Student',
        skills: 'Basic HTML, CSS',
        concern: 'No internship experience',
      },
      after: {
        position: 'Full-Stack Developer',
        company: 'Amazon',
        package: '₹24 LPA',
        skills: 'React, Node.js, AWS, System Design',
      },
      testimonial: 'EduPulseX transformed my career. The personalized AI roadmap and real projects gave me the confidence to crack Amazon interviews. Within 3 months, I went from zero to hero!',
      timeline: '12 weeks',
      highlight: 'Got 3 offers in final placement drive',
    },
    {
      name: 'Priya Sharma',
      branch: 'Electronics & Communication',
      image: '👩‍💼',
      before: {
        status: '3rd Year Student',
        skills: 'Basic circuit theory',
        concern: 'Confused about career path',
      },
      after: {
        position: 'VLSI Design Engineer',
        company: 'Intel',
        package: '₹18 LPA',
        skills: 'Verilog, FPGA, Physical Design',
      },
      testimonial: 'I was confused between software and core ECE. The career counseling and VLSI specialization track helped me find my passion. Now I\'m working on cutting-edge chip design!',
      timeline: '14 weeks',
      highlight: 'Published 2 research papers during learning',
    },
    {
      name: 'Arjun Patel',
      branch: 'Mechanical Engineering',
      image: '🧑‍🔧',
      before: {
        status: 'Recent Graduate',
        skills: 'CAD basics, Theory knowledge',
        concern: '6 months job searching',
      },
      after: {
        position: 'Robotics Engineer',
        company: 'Tesla',
        package: '₹32 LPA',
        skills: 'ROS, Python, Computer Vision, Embedded Systems',
      },
      testimonial: 'After 6 months of failed interviews, EduPulseX gave me the robotics and AI skills that made me stand out. The project portfolio opened doors to global companies!',
      timeline: '16 weeks',
      highlight: 'Received job offer from dream company',
    },
    {
      name: 'Sneha Reddy',
      branch: 'AI & Data Science',
      image: '👩‍🔬',
      before: {
        status: 'Career Switcher',
        skills: 'Mathematics background',
        concern: 'No programming experience',
      },
      after: {
        position: 'ML Engineer',
        company: 'Google',
        package: '₹28 LPA',
        skills: 'PyTorch, TensorFlow, MLOps, NLP',
      },
      testimonial: 'I switched from a non-tech background to ML engineering. The structured curriculum and mentor support made the impossible possible. Now I work on Google AI projects!',
      timeline: '20 weeks',
      highlight: 'Built 5 production-grade ML models',
    },
  ];

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const currentStory = stories[currentIndex];

  return (
    <div className="py-20 bg-card-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-full text-sm mb-4">
            Real Transformations
          </div>
          <h2 className="text-4xl sm:text-5xl text-heading mb-4">
            From Students to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            See how EduPulseX students landed dream jobs at top companies
          </p>
        </motion.div>

        {/* Story carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              {/* Before/After comparison */}
              <div className="space-y-6">
                {/* Before card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-surface backdrop-blur-sm border border-surface-border rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full text-xs">
                      Before
                    </div>
                    <span className="text-2xl">{currentStory.image}</span>
                    <div>
                      <h3 className="text-white">{currentStory.name}</h3>
                      <p className="text-xs text-text-muted">{currentStory.branch}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-text-muted text-sm">Status:</span>
                      <span className="text-text-muted text-sm">{currentStory.before.status}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-text-muted text-sm">Skills:</span>
                      <span className="text-text-muted text-sm">{currentStory.before.skills}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 text-sm">⚠️</span>
                      <span className="text-red-400 text-sm">{currentStory.before.concern}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Timeline indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-blue-500/30 rounded-full">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span className="text-white">{currentStory.timeline}</span>
                    <span className="text-cyan-400">with EduPulseX</span>
                  </div>
                </motion.div>

                {/* After card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-blue-600/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-transparent rounded-bl-full" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-xs">
                        After
                      </div>
                      <span className="text-2xl">🎉</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-2xl text-heading mb-1">{currentStory.after.position}</h3>
                        <div className="flex items-center gap-2 text-blue-400">
                          <Building2 className="w-4 h-4" />
                          <span>{currentStory.after.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl text-green-400">{currentStory.after.package}</span>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted mb-2">New Skills Acquired:</p>
                        <p className="text-sm text-white">{currentStory.after.skills}</p>
                      </div>
                      <div className="pt-3 border-t border-blue-500/30">
                        <p className="text-xs text-cyan-400">✨ {currentStory.highlight}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-surface backdrop-blur-sm border border-surface-border rounded-2xl p-8 relative"
              >
                <Quote className="w-12 h-12 text-blue-600/30 mb-6" />
                <blockquote className="text-lg text-text-secondary leading-relaxed mb-6 italic">
                  "{currentStory.testimonial}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentStory.image}</span>
                  <div>
                    <h4 className="text-white">{currentStory.name}</h4>
                    <p className="text-sm text-text-muted">{currentStory.branch}</p>
                    <p className="text-sm text-cyan-400">{currentStory.after.position} @ {currentStory.after.company}</p>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-600/10 to-transparent rounded-tl-full" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevStory}
              className="p-3 bg-surface border border-surface-border hover:border-blue-500/50 rounded-full transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-blue-500 w-8'
                      : 'bg-surface hover:bg-surface-hover'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextStory}
              className="p-3 bg-surface border border-surface-border hover:border-blue-500/50 rounded-full transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
