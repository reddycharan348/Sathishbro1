import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Code, BookOpen, Award } from 'lucide-react';
import { useState, useEffect, memo } from 'react';

export const LiveActivitySection = memo(function LiveActivitySection() {
  const [currentActivity, setCurrentActivity] = useState(0);

  const activities = [
    {
      icon: Award,
      user: 'Arjun K.',
      action: 'earned certificate',
      item: 'Advanced React & Next.js 2025',
      time: '8 min ago',
      branch: 'CSE',
    },
    {
      icon: Code,
      user: 'Priya M.',
      action: 'completed',
      item: 'Generative AI with ChatGPT-4',
      time: '12 min ago',
      branch: 'AI/ML',
    },
    {
      icon: CheckCircle,
      user: 'Rohan S.',
      action: 'submitted project',
      item: 'Autonomous Drone Navigation',
      time: '18 min ago',
      branch: 'MEC',
    },
    {
      icon: Award,
      user: 'Ananya R.',
      action: 'earned certificate',
      item: 'VLSI Physical Design 2025',
      time: '22 min ago',
      branch: 'VLSI',
    },
    {
      icon: Code,
      user: 'Karthik V.',
      action: 'completed',
      item: 'Electric Vehicle Battery Management',
      time: '28 min ago',
      branch: 'EEE',
    },
    {
      icon: CheckCircle,
      user: 'Divya L.',
      action: 'completed',
      item: 'Full-Stack MERN Development',
      time: '35 min ago',
      branch: 'CSE',
    },
    {
      icon: Award,
      user: 'Aditya P.',
      action: 'earned certificate',
      item: 'Cloud Architecture & DevOps',
      time: '41 min ago',
      branch: 'CSE',
    },
    {
      icon: Code,
      user: 'Sneha B.',
      action: 'submitted project',
      item: '5G Network Simulation',
      time: '47 min ago',
      branch: 'ECE',
    },
    {
      icon: CheckCircle,
      user: 'Vikram T.',
      action: 'completed',
      item: 'Smart Grid IoT Systems',
      time: '53 min ago',
      branch: 'EEE',
    },
    {
      icon: Award,
      user: 'Meera N.',
      action: 'earned certificate',
      item: 'BIM & Revit Architecture 2025',
      time: '1 hour ago',
      branch: 'CIVIL',
    },
    {
      icon: Code,
      user: 'Siddharth J.',
      action: 'completed',
      item: 'Deep Learning with PyTorch',
      time: '1 hour ago',
      branch: 'AI/DS',
    },
    {
      icon: CheckCircle,
      user: 'Nithya K.',
      action: 'submitted project',
      item: 'Blockchain Supply Chain DApp',
      time: '1 hour ago',
      branch: 'CSE',
    },
    {
      icon: Award,
      user: 'Harish D.',
      action: 'earned certificate',
      item: 'Embedded Systems & RTOS',
      time: '1 hour ago',
      branch: 'ECE',
    },
    {
      icon: Code,
      user: 'Kavya S.',
      action: 'completed',
      item: 'Computer Vision with OpenCV',
      time: '2 hours ago',
      branch: 'AI/ML',
    },
    {
      icon: CheckCircle,
      user: 'Rahul A.',
      action: 'submitted project',
      item: 'Robotic Arm Control System',
      time: '2 hours ago',
      branch: 'MEC',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activities.length]);

  return (
    <div className="py-12 sm:py-16 bg-page-bg relative overflow-hidden theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-full text-sm mb-4">
            Recent Student Activities
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-heading mb-4">
            Students <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Learning & Achieving</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Live activity feed */}
          <div className="lg:col-span-2">
            <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-4 sm:p-6 h-full theme-transition">
              <div className="space-y-3 sm:space-y-4">
                <AnimatePresence mode="wait">
                  {activities.slice(currentActivity, currentActivity + 3).map((activity, index) => (
                    <motion.div
                      key={currentActivity + index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-surface rounded-xl border border-surface-border hover:border-blue-500/50 transition-all theme-transition"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-heading">
                          <span className="font-medium">{activity.user}</span>{' '}
                          <span className="text-text-muted">{activity.action}</span>{' '}
                          <span className="text-blue-400">{activity.item}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] sm:text-xs text-text-muted">{activity.time}</span>
                          <span className="text-[10px] sm:text-xs text-text-muted">•</span>
                          <span className="text-[10px] sm:text-xs text-cyan-400">{activity.branch}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-surface-border">
                {[
                  { value: '1K+', label: 'Active Students' },
                  { value: '850+', label: 'Certified in 2025' },
                  { value: '15K+', label: 'Alumni Network' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl sm:text-2xl text-heading mb-1 font-bold">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-600/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-4 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl mb-2">⚡</div>
              <div className="text-xl sm:text-2xl text-heading mb-2 font-bold">1,250+</div>
              <div className="text-xs sm:text-sm text-text-muted">Students Placed in 2025</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-600/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl mb-2">🏆</div>
              <div className="text-xl sm:text-2xl text-heading mb-2 font-bold">₹8.2 LPA</div>
              <div className="text-xs sm:text-sm text-text-muted">Average Package 2025</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-1 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-4 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl mb-2">🎓</div>
              <div className="text-xl sm:text-2xl text-heading mb-2 font-bold">10+</div>
              <div className="text-xs sm:text-sm text-text-muted">Courses Available</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});