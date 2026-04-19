import { Users, Layers, FolderKanban, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'motion/react';
import { memo, useEffect, useRef } from 'react';

const CountUp = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString() + (latest >= numericValue ? suffix : "")
  );

  useEffect(() => {
    if (inView) {
      motionValue.set(numericValue);
    }
  }, [inView, numericValue, motionValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export const StatsSection = memo(function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '1000',
      suffix: '+',
      label: 'Active Students',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      icon: Layers,
      value: '6',
      suffix: '',
      label: 'Engineering Branches',
      color: 'from-cyan-600 to-blue-500',
    },
    {
      icon: FolderKanban,
      value: '100',
      suffix: '+',
      label: 'Projects & Labs',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Sparkles,
      value: 'AI',
      suffix: '',
      label: 'Powered Learning',
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative group"
          >
            <div className="bg-card-bg border border-card-border rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all overflow-hidden theme-transition">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className={`relative inline-flex p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3 sm:mb-4 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              <div className="text-3xl sm:text-4xl text-heading mb-1 relative font-bold">
                {stat.value === 'AI' ? (
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
                ) : (
                  <CountUp value={stat.value} suffix={stat.suffix} />
                )}
              </div>
              
              <div className="text-xs sm:text-sm text-text-muted relative">{stat.label}</div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-600/10 to-transparent rounded-bl-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});