import { Trophy, Target, Zap, Shield, Users, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { memo } from 'react';

export const FeaturesSection = memo(function FeaturesSection() {
  const features = [
    {
      icon: Trophy,
      title: 'Industry Recognition',
      description: 'Get certified by top companies and boost your career prospects with industry-recognized credentials.',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'AI-powered adaptive learning paths that adjust to your pace, strengths, and career goals.',
      color: 'from-cyan-600 to-blue-500',
    },
    {
      icon: Zap,
      title: 'Live Projects',
      description: 'Work on real-world projects from day one. Build a portfolio that impresses recruiters.',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Shield,
      title: 'Placement Support',
      description: '85% placement rate with top companies. Resume building, mock interviews, and direct recruiter access.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Learn from industry professionals with 10+ years of experience. Get 1-on-1 guidance.',
      color: 'from-blue-600 to-cyan-400',
    },
    {
      icon: Rocket,
      title: 'Fast-Track Career',
      description: 'From student to professional in 12 weeks. Accelerated learning with proven results.',
      color: 'from-cyan-600 to-blue-400',
    },
  ];

  return (
    <div className="py-16 sm:py-20 bg-page-bg relative overflow-hidden theme-transition">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-all h-full theme-transition">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`relative inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4 sm:mb-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all`}
                >
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="relative text-lg sm:text-xl text-heading mb-2 sm:mb-3">{feature.title}</h3>
                <p className="relative text-sm text-text-muted leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-600/5 to-transparent rounded-bl-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});
