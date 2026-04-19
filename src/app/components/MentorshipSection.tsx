import { GraduationCap, Calendar, Trophy, Users2, MessageSquareText } from 'lucide-react';
import { motion } from 'motion/react';

export function MentorshipSection() {
  const mentorshipFeatures = [
    {
      icon: GraduationCap,
      title: 'Branch-Wise Mentors',
      description: 'Connect with industry experts from your engineering discipline',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Calendar,
      title: 'Weekly Doubt Sessions',
      description: 'Live Q&A sessions every week with experienced mentors',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Trophy,
      title: 'Hackathons & Challenges',
      description: 'Compete in branch-specific and interdisciplinary competitions',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Users2,
      title: 'Peer Learning Groups',
      description: 'Study groups organized by branch, year, and interest',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: MessageSquareText,
      title: 'Alumni Interaction',
      description: 'Learn from successful alumni in your field',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const upcomingSessions = [
    { topic: 'VLSI Design Best Practices', mentor: 'Dr. Rajesh Kumar', date: 'Dec 16, 2025', branch: 'ECE' },
    { topic: 'Full Stack Development', mentor: 'Sarah Johnson', date: 'Dec 17, 2025', branch: 'CS' },
    { topic: 'Power Systems Analysis', mentor: 'Prof. Amit Sharma', date: 'Dec 18, 2025', branch: 'EEE' },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-sm mb-4">
            Mentorship & Community
          </div>
          <h2 className="text-3xl sm:text-4xl text-heading mb-4">
            Learn Together, Grow Together
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Join a vibrant community of engineering students and mentors.
            Get guidance, share knowledge, and build lasting connections.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mentorshipFeatures.slice(0, 3).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface backdrop-blur-sm border border-surface-border rounded-2xl p-6 hover:shadow-2xl hover:border-orange-500/50 transition-all group"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-heading mb-2">{feature.title}</h3>
              <p className="text-sm text-text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Two column layout for remaining features */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {mentorshipFeatures.slice(3).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface backdrop-blur-sm border border-surface-border rounded-2xl p-6 hover:shadow-2xl hover:border-orange-500/50 transition-all group"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-heading mb-2">{feature.title}</h3>
              <p className="text-sm text-text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Upcoming sessions */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-surface-border rounded-2xl p-8">
          <h3 className="text-xl text-heading mb-6">Upcoming Live Sessions</h3>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface backdrop-blur-sm border border-surface-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xl hover:border-teal-500/50 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded border border-teal-500/30">{session.branch}</span>
                    <h4 className="text-white">{session.topic}</h4>
                  </div>
                  <p className="text-sm text-text-muted">by {session.mentor}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-muted">{session.date}</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:shadow-xl transition-all whitespace-nowrap">
                    Register
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { value: '50+', label: 'Expert Mentors' },
            { value: '200+', label: 'Study Groups' },
            { value: '30+', label: 'Weekly Sessions' },
            { value: '5,000+', label: 'Community Members' },
          ].map((stat, index) => (
            <div key={index} className="bg-surface backdrop-blur-sm border border-surface-border rounded-xl p-6 text-center">
              <div className="text-2xl text-heading mb-2">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}