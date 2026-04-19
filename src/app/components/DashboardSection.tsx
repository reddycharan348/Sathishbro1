import { MapPin, TrendingUp, Award, Target, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export function DashboardSection() {
  const dashboardFeatures = [
    { icon: MapPin, label: 'Branch Roadmap Tracker', progress: 65 },
    { icon: TrendingUp, label: 'Skill Progress Bar', progress: 78 },
    { icon: Award, label: 'Project Completion', progress: 45 },
    { icon: Target, label: 'Certificates Earned', count: 12 },
    { icon: BarChart3, label: 'Placement Readiness', score: '82/100' },
  ];

  return (
    <div className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm mb-4">
            Student Dashboard
          </div>
          <h2 className="text-3xl sm:text-4xl text-heading mb-4">
            Track Your Engineering Journey
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Get complete visibility into your learning progress, skills development,
            and career readiness with our comprehensive dashboard.
          </p>
        </div>

        {/* Dashboard preview */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-surface-border rounded-2xl p-8 lg:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left side - Stats */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xl shadow-lg">
                  AK
                </div>
                <div>
                  <h3 className="text-xl text-heading">Arjun Kumar</h3>
                  <p className="text-sm text-text-muted">Computer Science Engineering · 3rd Year</p>
                </div>
              </div>

              {dashboardFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-surface backdrop-blur-sm border border-surface-border rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg">
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-white">{feature.label}</span>
                  </div>
                  {feature.progress !== undefined && (
                    <div className="relative">
                      <div className="h-2 bg-slate-600/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${feature.progress}%` }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                        />
                      </div>
                      <span className="text-xs text-text-muted mt-1 block">{feature.progress}% Complete</span>
                    </div>
                  )}
                  {feature.count !== undefined && (
                    <div className="text-2xl text-heading">{feature.count}</div>
                  )}
                  {feature.score !== undefined && (
                    <div className="text-2xl text-heading">{feature.score}</div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right side - Visual representation */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                {/* Center circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl text-heading">82%</div>
                      <div className="text-xs text-white/80">Ready</div>
                    </div>
                  </div>
                </div>

                {/* Orbiting elements */}
                {[
                  { label: 'Core', angle: 0, color: 'from-teal-500 to-cyan-500' },
                  { label: 'Skills', angle: 72, color: 'from-violet-500 to-purple-500' },
                  { label: 'Projects', angle: 144, color: 'from-emerald-500 to-teal-500' },
                  { label: 'Certs', angle: 216, color: 'from-amber-500 to-orange-500' },
                  { label: 'Career', angle: 288, color: 'from-blue-500 to-indigo-500' },
                ].map((item, index) => {
                  const radius = 140;
                  const x = Math.cos((item.angle * Math.PI) / 180) * radius;
                  const y = Math.sin((item.angle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-xs text-white shadow-xl`}>
                        {item.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105">
            Access Your Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}