import { motion } from 'motion/react';
import { X, Check, Zap } from 'lucide-react';

export function ComparisonSection() {
  const comparisons = [
    {
      feature: 'Personalized Learning Path',
      traditional: false,
      edupulse: true,
    },
    {
      feature: 'AI-Powered Skill Analytics',
      traditional: false,
      edupulse: true,
    },
    {
      feature: 'Real-Time Industry Projects',
      traditional: false,
      edupulse: true,
    },
    {
      feature: '1-on-1 Expert Mentorship',
      traditional: false,
      edupulse: true,
    },
    {
      feature: 'Direct Recruiter Access',
      traditional: false,
      edupulse: true,
    },
    {
      feature: 'Live Project Collaboration',
      traditional: false,
      edupulse: true,
    },
    {
      feature: 'Job Placement Support',
      traditional: '⚠️ Limited',
      edupulse: '85% Success Rate',
    },
    {
      feature: 'Industry-Aligned Curriculum',
      traditional: '⚠️ Outdated',
      edupulse: 'Updated Monthly',
    },
    {
      feature: 'Portfolio Building',
      traditional: false,
      edupulse: true,
    },
    {
      feature: 'Learning Speed',
      traditional: '6-12 months',
      edupulse: '12-16 weeks',
    },
  ];

  return (
    <div className="py-20 bg-card-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-full text-sm mb-4">
            Why We're Different
          </div>
          <h2 className="text-4xl sm:text-5xl text-heading mb-4">
            Tectonix vs <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Traditional Learning</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            See why 10,000+ students choose our modern, AI-powered approach
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface backdrop-blur-sm border border-surface-border rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-surface border-b border-surface-border">
            <div className="p-6">
              <h3 className="text-lg text-heading">Features</h3>
            </div>
            <div className="p-6 border-l border-surface-border">
              <div className="flex items-center gap-2">
                <span className="text-lg text-text-muted">Traditional</span>
                <span className="text-2xl">📚</span>
              </div>
            </div>
            <div className="p-6 border-l border-surface-border bg-gradient-to-br from-blue-600/10 to-cyan-500/10 relative">
              <div className="flex items-center gap-2">
                <span className="text-lg text-heading">Tectonix</span>
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              {/* Badge */}
              <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                Recommended
              </div>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="divide-y divide-slate-700">
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 hover:bg-surface transition-colors"
              >
                {/* Feature name */}
                <div className="p-6">
                  <p className="text-sm text-text-secondary">{item.feature}</p>
                </div>

                {/* Traditional column */}
                <div className="p-6 border-l border-surface-border">
                  <div className="flex items-center gap-2">
                    {item.traditional === false ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                          <X className="w-4 h-4 text-red-400" />
                        </div>
                        <span className="text-sm text-red-400">Not Available</span>
                      </>
                    ) : item.traditional === true ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-sm text-green-400">Available</span>
                      </>
                    ) : (
                      <span className="text-sm text-text-muted">{item.traditional}</span>
                    )}
                  </div>
                </div>

                {/* Tectonix column */}
                <div className="p-6 border-l border-surface-border bg-gradient-to-br from-blue-600/5 to-cyan-500/5">
                  <div className="flex items-center gap-2">
                    {item.edupulse === true ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-white">Included</span>
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-white">{item.edupulse}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border-t border-blue-500/30 p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl text-heading mb-2">Ready to upgrade your learning?</h3>
                <p className="text-sm text-text-muted">Join thousands of students already ahead</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow-lg shadow-blue-500/50 transition-all flex items-center gap-2"
              >
                <span>Start Free Trial</span>
                <Zap className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {[
            { icon: '⚡', value: '3x Faster', label: 'Learning Speed' },
            { icon: '💰', value: '₹6.5L+', label: 'Average Package' },
            { icon: '🎯', value: '85%', label: 'Placement Rate' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface backdrop-blur-sm border border-surface-border rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-2xl text-heading mb-1">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
