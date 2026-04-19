import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { TrendingUp, Users, Award, BookOpen, Briefcase, Globe } from 'lucide-react';
import { useEffect, useRef, memo } from 'react';

const Counter = memo(function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, { duration: 1.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [motionValue, value, isInView]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl text-heading mb-2 font-bold">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </div>
  );
});

export const NumbersSection = memo(function NumbersSection() {
  const stats = [
    {
      icon: Users,
      value: 1000,
      suffix: '+',
      label: 'Active Students',
      description: 'Learning across all branches',
      color: 'from-blue-600 to-cyan-500',
      trend: 26,
    },
    {
      icon: Award,
      value: 850,
      suffix: '+',
      label: 'Certificates Issued',
      description: 'Industry-recognized credentials',
      color: 'from-cyan-600 to-blue-500',
      trend: 11,
    },
    {
      icon: BookOpen,
      value: 10,
      suffix: '+',
      label: 'Courses',
      description: 'Across all engineering streams',
      color: 'from-blue-500 to-cyan-600',
      trend: 15,
    },
    {
      icon: Briefcase,
      value: 85,
      suffix: '%',
      label: 'Placement Rate',
      description: 'Students placed in top companies',
      color: 'from-cyan-500 to-blue-600',
      trend: 12,
    },
    {
      icon: TrendingUp,
      value: 650000,
      suffix: '',
      label: '₹6.5L Avg Package',
      description: 'Starting salary for graduates',
      color: 'from-blue-600 to-cyan-400',
      trend: 18,
    },
    {
      icon: Globe,
      value: 10,
      suffix: '+',
      label: 'Partner Companies',
      description: 'Direct hiring partnerships',
      color: 'from-cyan-600 to-blue-400',
      trend: 22,
    },
  ];

  return (
    <div className="py-16 sm:py-20 bg-page-bg relative overflow-hidden theme-transition"
      style={{
        backgroundImage: `linear-gradient(to bottom, var(--page-bg), rgba(30, 58, 138, 0.05), var(--page-bg))`,
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[600px] sm:h-[1000px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-full text-sm mb-4">
            By The Numbers
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Impact That Speaks For Itself
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto px-2">
            Join thousands of students who are already transforming their careers with EduPulseX.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-all h-full theme-transition">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`relative inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${stat.color} mb-4 sm:mb-6 shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>

                {/* Number */}
                {stat.value === 650000 ? (
                  <div className="text-3xl sm:text-4xl md:text-5xl text-heading mb-2 font-bold">₹6.5L</div>
                ) : (
                  <Counter value={stat.value} suffix={stat.suffix} />
                )}

                {/* Label */}
                <h3 className="relative text-lg sm:text-xl text-heading mb-2">{stat.label}</h3>
                <p className="relative text-sm text-text-muted">
                  {stat.description}
                </p>

                {/* Trend indicator */}
                <div className="relative mt-4 pt-4 border-t border-surface-border flex items-center gap-2 text-sm text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{stat.trend}% this month</span>
                </div>

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