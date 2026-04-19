import { motion } from 'motion/react';
import { UserPlus, BookOpen, Code, Briefcase, TrendingUp, Sparkles } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      step: '01',
      title: 'Sign Up & Assessment',
      description: 'Create your profile and take our AI-powered skill assessment to identify your current level and career goals.',
      duration: '15 min',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      icon: Sparkles,
      step: '02',
      title: 'Get Your AI Roadmap',
      description: 'Receive a personalized learning path tailored to your branch, skills, and target companies.',
      duration: 'Instant',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: BookOpen,
      step: '03',
      title: 'Learn & Practice',
      description: 'Access curated courses, interactive labs, and hands-on projects aligned with industry standards.',
      duration: '8-12 weeks',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Code,
      step: '04',
      title: 'Build Real Projects',
      description: 'Work on live industry projects to build a compelling portfolio that showcases your abilities.',
      duration: '4-6 weeks',
      color: 'from-cyan-600 to-blue-500',
    },
    {
      icon: Briefcase,
      step: '05',
      title: 'Get Placement Ready',
      description: 'Resume optimization, mock interviews, and direct access to 500+ hiring partners.',
      duration: '2 weeks',
      color: 'from-blue-600 to-cyan-400',
    },
    {
      icon: TrendingUp,
      step: '06',
      title: 'Land Your Dream Job',
      description: 'Get placed with our 85% success rate and start your engineering career with confidence.',
      duration: 'Ongoing',
      color: 'from-cyan-400 to-blue-600',
    },
  ];

  return (
    <div className="py-20 bg-page-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
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
            Simple, Proven Process
          </div>
          <h2 className="text-4xl sm:text-5xl text-heading mb-4">
            Your Journey to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            From enrollment to employment in just 12-16 weeks with our structured, AI-driven approach
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-500 to-blue-600" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="w-full lg:w-5/12 group"
                >
                  <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 hover:border-blue-500/50 transition-all relative overflow-hidden">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    
                    {/* Step number badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 bg-gradient-to-r ${step.color} rounded-full text-white text-xs`}>
                        {step.step}
                      </div>
                    </div>

                    <div className="relative">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${step.color} mb-4`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-xl text-heading mb-2">{step.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Duration badge */}
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <span className="text-xs text-cyan-400">{step.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Center circle */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-blue-500/50 relative z-10`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-500/30 rounded-full">
            <span className="text-sm text-text-secondary">
              ⚡ <span className="text-white">Join 10,000+ students</span> already on this journey
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
