import { Briefcase, Users, TrendingUp, FileText, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function CareerHubSection() {
  const careerFeatures = [
    {
      icon: Briefcase,
      title: 'Internships (Core + IT)',
      description: '500+ active internship opportunities',
      stat: '500+',
    },
    {
      icon: TrendingUp,
      title: 'Hybrid Roles',
      description: 'EEE + AI, ME + Data opportunities',
      stat: 'Trending',
    },
    {
      icon: Users,
      title: 'Skill-Based Hiring',
      description: 'Connect directly with recruiters',
      stat: '100+ Companies',
    },
    {
      icon: FileText,
      title: 'Resume Builder',
      description: 'ATS-optimized templates',
      stat: 'Pro Templates',
    },
    {
      icon: MessageCircle,
      title: 'Mock Interviews',
      description: 'Practice with AI & mentors',
      stat: 'AI Powered',
    },
  ];

  const companyLogos = [
    'Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro'
  ];

  return (
    <div className="py-20 bg-page-bg relative overflow-hidden theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Career features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {careerFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-surface backdrop-blur-sm border border-surface-border rounded-2xl p-6 hover:shadow-2xl hover:border-emerald-500/50 transition-all text-center group"
            >
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl text-heading mb-2">{feature.stat}</div>
              <h3 className="text-sm text-heading mb-1">{feature.title}</h3>
              <p className="text-xs text-text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Hiring partners */}
        <div className="bg-surface backdrop-blur-sm border border-surface-border rounded-2xl p-8">
          <h3 className="text-center text-heading mb-8">
            Our Hiring Partners
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {companyLogos.map((company, index) => (
              <div
                key={index}
                className="h-16 bg-surface rounded-lg flex items-center justify-center text-text-muted hover:bg-surface-hover hover:text-teal-400 transition-all"
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Success metrics */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { value: '85%', label: 'Placement Rate' },
            { value: '₹6.5 LPA', label: 'Average Package' },
            { value: '2,000+', label: 'Students Placed' },
          ].map((metric, index) => (
            <div key={index} className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl text-emerald-400 mb-2">{metric.value}</div>
              <div className="text-sm text-text-muted">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}