import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Code, Cpu, Award, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function InteractiveDemoSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: BookOpen,
      label: 'Smart Learning',
      title: 'AI-Powered Adaptive Learning System',
      description: 'Experience next-gen personalized education that adapts to YOUR learning style, pace, and goals. Our AI engine analyzes 50+ learning parameters in real-time.',
      features: [
        'Smart difficulty adjustment based on performance',
        'Personalized content recommendations using ML',
        'Predictive analytics for exam preparation',
        'Interactive quizzes with instant feedback',
        'Knowledge gap detection and auto-remediation',
        'Learning style optimization (Visual/Audio/Kinesthetic)',
      ],
      color: 'from-blue-600 to-cyan-500',
      image: '🎯',
    },
    {
      icon: Code,
      label: 'Live Projects',
      title: 'Build Production-Ready Applications',
      description: 'Work on real-world industry projects with cutting-edge tools. Get hands-on with cloud deployment, CI/CD pipelines, and professional development workflows.',
      features: [
        'In-browser VS Code with 100+ extensions',
        'Real-time collaboration with peers',
        'GitHub/GitLab integration for version control',
        'AWS, Azure & GCP cloud deployment',
        'Docker containerization & Kubernetes',
        'Expert code review and mentorship',
      ],
      color: 'from-cyan-600 to-blue-500',
      image: '💻',
    },
    {
      icon: Cpu,
      label: 'Virtual Labs',
      title: '24/7 Access to Advanced Simulations',
      description: 'Industry-grade virtual lab environment with unlimited access to premium software worth ₹5+ lakhs. No installation, no hardware limitations.',
      features: [
        'VLSI - Xilinx, Cadence, Synopsys tools',
        'Circuit design with MATLAB & Simulink',
        'AutoCAD, SolidWorks, ANSYS for design',
        'Python, Java, C++ IDEs with debuggers',
        'IoT simulations with Arduino & ESP32',
        'Cloud-based rendering & computation',
      ],
      color: 'from-blue-500 to-cyan-600',
      image: '⚙️',
    },
    {
      icon: Award,
      label: 'Career Support',
      title: '360° Placement Assistance Program',
      description: 'End-to-end career support from skill building to salary negotiation. Get placed in your dream company with our proven 85% success rate.',
      features: [
        '1-on-1 mock interviews with industry experts',
        'ATS-optimized resume builder with AI',
        'Direct referrals to 50+ partner companies',
        'Salary negotiation coaching & strategies',
        'LinkedIn profile optimization workshop',
        'Soft skills & communication training',
      ],
      color: 'from-cyan-500 to-blue-600',
      image: '🚀',
    },
  ];

  return (
    <div className="py-20 bg-page-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-purple-600/10 border border-purple-500/30 text-purple-400 rounded-full text-sm mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Interactive Demo
          </div>
          <h2 className="text-4xl sm:text-5xl text-heading mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Experience the Platform
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Explore our key features and see how Tectonix makes learning engaging and effective
            with cutting-edge technology and industry-proven methodologies.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 ${
                activeTab === index
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-card-bg border-card-border text-text-muted hover:border-blue-500/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left content */}
            <div className="space-y-6">
              <div className={`inline-block text-6xl mb-4 p-4 rounded-2xl bg-gradient-to-br ${tabs[activeTab].color} bg-opacity-10`}>
                {tabs[activeTab].image}
              </div>

              <h3 className="text-3xl text-heading">
                {tabs[activeTab].title}
              </h3>

              <p className="text-lg text-text-muted leading-relaxed">
                {tabs[activeTab].description}
              </p>

              <div className="space-y-3">
                {tabs[activeTab].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-text-secondary"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${tabs[activeTab].color} flex items-center justify-center flex-shrink-0`}>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-6 px-8 py-4 bg-gradient-to-r ${tabs[activeTab].color} text-white rounded-xl shadow-lg hover:shadow-2xl transition-all`}
              >
                Try It Now
              </motion.button>
            </div>

            {/* Right visual */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-8 shadow-2xl"
              >
                {/* Mock interface */}
                <div className="space-y-4">
                  {/* Header bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-card-border">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-text-muted">Tectonix Dashboard</div>
                  </div>

                  {/* Content boxes */}
                  {[...Array(3)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className={`h-20 bg-gradient-to-r ${tabs[activeTab].color} opacity-20 rounded-xl`}
                    />
                  ))}

                  {/* Progress bar */}
                  <div className="pt-4">
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full bg-gradient-to-r ${tabs[activeTab].color}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className={`absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br ${tabs[activeTab].color} opacity-20 rounded-full blur-2xl`} />
                <div className={`absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br ${tabs[activeTab].color} opacity-20 rounded-full blur-2xl`} />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}