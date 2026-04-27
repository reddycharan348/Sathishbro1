import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      branch: 'CS/IT',
      image: '👩‍💻',
      content: 'Tectonix transformed my career! The structured roadmap and live projects helped me land my dream job at Google. The mentorship was invaluable.',
      rating: 5,
    },
    {
      name: 'Rahul Verma',
      role: 'Data Scientist at Microsoft',
      branch: 'AI/DS',
      image: '👨‍💼',
      content: 'The AI-powered learning paths are incredible. I went from basics to building ML models in 12 weeks. Now working on cutting-edge AI projects!',
      rating: 5,
    },
    {
      name: 'Anjali Patel',
      role: 'VLSI Design Engineer',
      branch: 'ECE',
      image: '👩‍🔬',
      content: 'Best platform for ECE students! The VLSI course with hands-on simulations prepared me perfectly for the industry. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Karthik Reddy',
      role: 'Power Systems Engineer',
      branch: 'EEE',
      image: '👨‍🔧',
      content: 'The practical approach to teaching power systems and MATLAB simulations was game-changing. Got placed in my top choice company!',
      rating: 5,
    },
    {
      name: 'Sneha Gupta',
      role: 'Mechanical Design Engineer',
      branch: 'Mechanical',
      image: '👩‍🏭',
      content: 'SolidWorks and ANSYS courses were top-notch. The projects helped me build a strong portfolio that impressed every recruiter.',
      rating: 5,
    },
    {
      name: 'Amit Kumar',
      role: 'Structural Engineer',
      branch: 'Civil',
      image: '👨‍🏗️',
      content: 'The AutoCAD and STAAD Pro training was exactly what I needed. Now confidently working on major infrastructure projects!',
      rating: 5,
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, rotate: 1 }}
              className="relative group"
            >
              <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 hover:border-blue-500/50 transition-all h-full">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-blue-600/20">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400">⭐</span>
                  ))}
                </div>

                {/* Content */}
                <p className="text-text-secondary text-sm mb-6 relative z-10 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-card-border">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="text-white">{testimonial.name}</h4>
                    <p className="text-xs text-text-muted">{testimonial.role}</p>
                    <span className="text-xs text-blue-400">{testimonial.branch}</span>
                  </div>
                </div>

                {/* Decorative glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}