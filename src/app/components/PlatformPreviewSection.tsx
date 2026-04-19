import { motion } from 'motion/react';
import { BarChart3, Brain, Target, Award, TrendingUp, BookOpen, Code2, Zap } from 'lucide-react';
import { useState } from 'react';

export function PlatformPreviewSection() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 0,
      name: 'AI Dashboard',
      icon: Brain,
      description: 'Real-time skill analytics and personalized recommendations',
      preview: {
        title: 'Your Learning Analytics',
        stats: [
          { label: 'Skills Mastered', value: '24/50', percent: 48, color: 'from-blue-600 to-cyan-500' },
          { label: 'Projects Completed', value: '8/12', percent: 67, color: 'from-cyan-500 to-blue-600' },
          { label: 'Certifications', value: '5', percent: 100, color: 'from-blue-500 to-cyan-400' },
        ],
        recommendation: {
          icon: Target,
          title: 'Next Recommended Course',
          course: 'Advanced System Design',
          reason: 'Based on your full-stack progress',
        },
      },
    },
    {
      id: 1,
      name: 'Learning Paths',
      icon: BookOpen,
      description: 'Customized roadmaps for every engineering branch',
      preview: {
        title: 'Your Personalized Roadmap',
        path: [
          { name: 'Fundamentals', progress: 100, status: 'completed' },
          { name: 'Core Skills', progress: 75, status: 'in-progress' },
          { name: 'Advanced Topics', progress: 30, status: 'in-progress' },
          { name: 'Specialization', progress: 0, status: 'locked' },
        ],
        currentFocus: 'React Advanced Patterns',
      },
    },
    {
      id: 2,
      name: 'Live Projects',
      icon: Code2,
      description: 'Real-world projects with industry mentors',
      preview: {
        title: 'Active Projects',
        projects: [
          { name: 'E-commerce Platform', tech: 'MERN Stack', progress: 65, deadline: '12 days' },
          { name: 'AI Chatbot', tech: 'Python, NLP', progress: 40, deadline: '18 days' },
          { name: 'Mobile App', tech: 'React Native', progress: 20, deadline: '25 days' },
        ],
      },
    },
    {
      id: 3,
      name: 'Career Tracker',
      icon: TrendingUp,
      description: 'Track applications and interview preparation',
      preview: {
        title: 'Placement Progress',
        metrics: [
          { label: 'Profile Score', value: '87/100', status: 'excellent' },
          { label: 'Applications', value: '24', status: 'good' },
          { label: 'Interviews Scheduled', value: '6', status: 'active' },
        ],
        nextInterview: {
          company: 'Amazon',
          role: 'SDE-1',
          date: 'Feb 15, 2026',
        },
      },
    },
  ];

  const activeFeature = features[activeTab];

  return (
    <div className="py-20 bg-page-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F8A05_1px,transparent_1px),linear-gradient(to_bottom,#0B4F8A05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
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
            Platform Features
          </div>
          <h2 className="text-4xl sm:text-5xl text-heading mb-4">
            Experience the <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Future of Learning</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Powerful AI-driven tools designed to accelerate your engineering career
          </p>
        </motion.div>

        {/* Feature tabs */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveTab(feature.id)}
              className={`p-6 rounded-2xl border transition-all text-left ${
                activeTab === feature.id
                  ? 'bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'bg-card-bg border-card-border hover:border-surface-border'
              }`}
            >
              <feature.icon className={`w-8 h-8 mb-3 ${activeTab === feature.id ? 'text-cyan-400' : 'text-text-muted'}`} />
              <h3 className={`text-lg mb-2 ${activeTab === feature.id ? 'text-white' : 'text-text-secondary'}`}>
                {feature.name}
              </h3>
              <p className="text-sm text-text-muted">{feature.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Feature preview */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card-bg backdrop-blur-sm border border-card-border rounded-3xl p-8 lg:p-12"
        >
          {/* AI Dashboard Preview */}
          {activeTab === 0 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl text-heading">{activeFeature.preview.title}</h3>
              </div>

              {/* Stats bars */}
              <div className="space-y-6">
                {activeFeature.preview.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-muted">{stat.label}</span>
                      <span className="text-white">{stat.value}</span>
                    </div>
                    <div className="h-3 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.percent}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recommendation card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 mt-8"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white mb-1">{activeFeature.preview.recommendation.title}</h4>
                    <p className="text-lg text-cyan-400 mb-2">{activeFeature.preview.recommendation.course}</p>
                    <p className="text-sm text-text-muted">{activeFeature.preview.recommendation.reason}</p>
                  </div>
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
              </motion.div>
            </div>
          )}

          {/* Learning Paths Preview */}
          {activeTab === 1 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl text-heading">{activeFeature.preview.title}</h3>
              </div>

              <div className="space-y-4">
                {activeFeature.preview.path.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl border ${
                      phase.status === 'completed'
                        ? 'bg-green-500/5 border-green-500/30'
                        : phase.status === 'in-progress'
                        ? 'bg-blue-500/5 border-blue-500/30'
                        : 'bg-surface border-surface-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          phase.status === 'completed'
                            ? 'bg-green-500'
                            : phase.status === 'in-progress'
                            ? 'bg-blue-500'
                            : 'bg-slate-700'
                        }`}>
                          <span className="text-white text-xl">
                            {phase.status === 'completed' ? '✓' : phase.status === 'locked' ? '🔒' : index + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white mb-1">{phase.name}</h4>
                          <div className="flex items-center gap-2">
                            <div className="w-32 h-2 bg-surface rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  phase.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${phase.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-text-muted">{phase.progress}%</span>
                          </div>
                        </div>
                      </div>
                      {phase.status === 'in-progress' && (
                        <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-xs">
                          Active
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-surface border border-surface-border rounded-2xl p-6 mt-6">
                <p className="text-sm text-text-muted mb-2">Currently Learning:</p>
                <p className="text-xl text-heading">{activeFeature.preview.currentFocus}</p>
              </div>
            </div>
          )}

          {/* Live Projects Preview */}
          {activeTab === 2 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl text-heading">{activeFeature.preview.title}</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {activeFeature.preview.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-surface border border-surface-border rounded-2xl p-6 hover:border-blue-500/50 transition-all"
                  >
                    <div className="mb-4">
                      <h4 className="text-white mb-2">{project.name}</h4>
                      <p className="text-sm text-text-muted">{project.tech}</p>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-text-muted">Progress</span>
                        <span className="text-xs text-white">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <span>⏱</span>
                      <span>{project.deadline} left</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Career Tracker Preview */}
          {activeTab === 3 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl text-heading">{activeFeature.preview.title}</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {activeFeature.preview.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-surface border border-surface-border rounded-2xl p-6 text-center"
                  >
                    <p className="text-sm text-text-muted mb-2">{metric.label}</p>
                    <p className="text-3xl text-heading mb-2">{metric.value}</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs ${
                      metric.status === 'excellent'
                        ? 'bg-green-500/20 text-green-400'
                        : metric.status === 'good'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      {metric.status}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Award className="w-8 h-8 text-cyan-400" />
                  <h4 className="text-xl text-heading">Next Interview</h4>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-text-muted mb-1">Company</p>
                    <p className="text-lg text-heading">{activeFeature.preview.nextInterview.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Role</p>
                    <p className="text-lg text-heading">{activeFeature.preview.nextInterview.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Scheduled</p>
                    <p className="text-lg text-cyan-400">{activeFeature.preview.nextInterview.date}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
