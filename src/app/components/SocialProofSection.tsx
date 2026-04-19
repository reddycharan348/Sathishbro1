import { motion } from 'motion/react';
import { Star, Award, TrendingUp, Users } from 'lucide-react';

export function SocialProofSection() {
  const achievements = [
    {
      icon: Star,
      value: '4.9/5.0',
      label: 'Average Rating',
      subtext: 'From 850+ reviews',
      color: 'from-yellow-600 to-orange-500',
    },
    {
      icon: Users,
      value: '1,000+',
      label: 'Active Students',
      subtext: 'Across all branches',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      icon: Award,
      value: '15,000+',
      label: 'Certifications',
      subtext: 'Issued in 2025',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Success Rate',
      subtext: 'Placement guarantee',
      color: 'from-green-600 to-emerald-500',
    },
  ];

  const recognitions = [
    {
      title: 'Best EdTech Platform 2025',
      org: 'Tech Excellence Awards',
      icon: '🏆',
    },
    {
      title: 'Top 10 Learning Platforms',
      org: 'EdTech India',
      icon: '⭐',
    },
    {
      title: 'Innovation in AI Education',
      org: 'National Education Summit',
      icon: '🎓',
    },
    {
      title: 'Student Choice Award',
      org: 'Campus Connect',
      icon: '💡',
    },
  ];

  const studentReviews = [
    {
      rating: 5,
      text: 'Best decision of my college life! The AI-powered learning really works.',
      author: 'Rahul M.',
      course: 'Full-Stack Development',
    },
    {
      rating: 5,
      text: 'Got placed at Google with ₹28 LPA. Thank you EduPulseX!',
      author: 'Priya S.',
      course: 'AI & Machine Learning',
    },
    {
      rating: 5,
      text: 'The mentorship and projects made all the difference in my career.',
      author: 'Arjun K.',
      course: 'VLSI Design',
    },
    {
      rating: 5,
      text: 'From confused student to confident engineer in just 3 months!',
      author: 'Sneha R.',
      course: 'Cloud & DevOps',
    },
  ];

  return (
    <div className="py-20 bg-page-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-full text-sm mb-4">
            Trusted by Thousands
          </div>
          <h2 className="text-4xl sm:text-5xl text-heading mb-4">
            Numbers That <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Speak Louder</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Join India's fastest-growing engineering career platform
          </p>
        </motion.div>

        {/* Main achievement cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 hover:border-blue-500/50 transition-all h-full relative overflow-hidden">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${achievement.color} mb-4 shadow-lg`}>
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-3xl text-heading mb-2">{achievement.value}</div>
                  
                  {/* Label */}
                  <div className="text-sm text-text-secondary mb-1">{achievement.label}</div>
                  
                  {/* Subtext */}
                  <div className="text-xs text-text-muted">{achievement.subtext}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recognition section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card-bg backdrop-blur-sm border border-card-border rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl text-heading mb-2">Awards & Recognition</h3>
            <p className="text-sm text-text-muted">Recognized by industry leaders and educational institutions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recognitions.map((recognition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface border border-surface-border rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all"
              >
                <div className="text-4xl mb-3">{recognition.icon}</div>
                <h4 className="text-sm text-heading dark:text-white mb-2">{recognition.title}</h4>
                <p className="text-xs text-text-muted">{recognition.org}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Student reviews */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl text-heading mb-2">What Students Say</h3>
            <p className="text-sm text-text-muted">Real reviews from real students</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 hover:border-blue-500/50 transition-all"
              >
                {/* Star rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm text-text-secondary leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>

                {/* Author info */}
                <div className="border-t border-surface-border pt-4">
                  <p className="text-sm text-heading dark:text-white mb-1">{review.author}</p>
                  <p className="text-xs text-text-muted">{review.course}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>✔ Industry Verified Curriculum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>✔ 500+ Hiring Partners</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <span>✔ ISO 9001:2015 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span>✔ 24/7 Student Support</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}