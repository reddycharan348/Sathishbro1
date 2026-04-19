import { FlaskConical, Lightbulb, GitBranch, FileCode, Microscope } from 'lucide-react';
import { motion } from 'motion/react';

export function VirtualLabsSection() {
  const labFeatures = [
    {
      icon: FlaskConical,
      title: 'Branch-Specific Labs',
      description: 'Hands-on experiments tailored to your engineering discipline',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Microscope,
      title: 'Simulation-Based Learning',
      description: 'Industry-standard tools like MATLAB, ANSYS, AutoCAD',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Lightbulb,
      title: 'Final-Year Projects',
      description: 'Complete project ideas with implementation guides',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: GitBranch,
      title: 'GitHub Repository',
      description: 'Access to open-source projects and code samples',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: FileCode,
      title: 'Industry Case Studies',
      description: 'Real-world problems from leading companies',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-sm mb-4">
            Virtual Labs & Projects
          </div>
          <h2 className="text-3xl sm:text-4xl text-heading mb-4">
            Learn by Doing
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Access virtual labs and work on real projects without expensive hardware.
            From simulations to final-year projects, we've got you covered.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {labFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface backdrop-blur-sm border border-surface-border rounded-2xl p-6 hover:shadow-2xl hover:border-purple-500/50 transition-all group"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-heading mb-2">{feature.title}</h3>
              <p className="text-sm text-text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Sample projects showcase */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-surface-border rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl text-heading mb-4">
                100+ Project Ideas Across All Branches
              </h3>
              <p className="text-text-muted mb-6">
                Get access to comprehensive project documentation, source code, and step-by-step implementation guides.
                Perfect for final-year projects and internship applications.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Complete source code & documentation',
                  'Video tutorials & walkthroughs',
                  'Industry mentor guidance',
                  'Presentation templates',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-teal-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:shadow-xl transition-all">
                Browse Projects →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'IoT Smart Home', color: 'from-teal-500 to-cyan-500' },
                { name: 'AI Chatbot', color: 'from-violet-500 to-purple-500' },
                { name: 'Power Grid Simulation', color: 'from-amber-500 to-orange-500' },
                { name: 'Bridge Design Analysis', color: 'from-blue-500 to-indigo-500' },
              ].map((project, index) => (
                <div
                  key={index}
                  className="bg-surface backdrop-blur-sm border border-surface-border rounded-xl p-4 hover:border-teal-500/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.color} mb-3`} />
                  <div className="text-sm text-white">{project.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}