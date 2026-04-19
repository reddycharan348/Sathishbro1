import { Bot, Target, Code2, FileCheck, MessageSquare, Bell, Brain, BookOpen, Lightbulb, TrendingUp, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function AIFeaturesSection() {
  const aiFeatures = [
    {
      icon: Brain,
      title: 'Personalized Study Plan',
      description: 'AI analyzes your strengths, weaknesses, and learning pace to create a custom roadmap tailored just for you',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Target,
      title: 'Smart Skill Gap Analysis',
      description: 'Identifies knowledge gaps in real-time and recommends targeted resources to fill them instantly',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Code2,
      title: 'AI Code Reviewer',
      description: 'Get instant feedback on your code with suggestions for optimization, best practices, and bug detection',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: FileCheck,
      title: 'Resume + ATS Optimizer',
      description: 'AI-powered resume analysis with ATS compatibility check and industry-specific improvement suggestions',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: MessageSquare,
      title: 'Interview Q&A Generator',
      description: 'Practice with unlimited AI-generated technical and HR questions customized for your branch and target role',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Lightbulb,
      title: 'Project Idea Suggester',
      description: 'Get personalized project recommendations based on your skills, interests, and career goals',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: BookOpen,
      title: 'Smart Study Scheduler',
      description: 'AI creates optimal study schedules based on your exam dates, syllabus coverage, and peak focus hours',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: TrendingUp,
      title: 'Performance Predictor',
      description: 'Predicts your exam performance and placement readiness with actionable insights to improve',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Zap,
      title: 'Instant Doubt Solver',
      description: '24/7 AI tutor for instant solutions to coding problems, numerical questions, and concept clarification',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="py-20 bg-page-bg relative overflow-hidden theme-transition">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* AI Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 hover:border-teal-500/50 transition-all group theme-transition"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-heading mb-2">{feature.title}</h3>
              <p className="text-sm text-text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* AI Demo CTA */}
        <div className="mt-16">
          {/* AI Benefits */}
          <div className="bg-surface border border-teal-500/20 rounded-2xl p-8 mb-8 theme-transition">
            <h3 className="text-2xl text-heading mb-6 text-center">
              Why EduPulseX AI is Your Ultimate Learning Partner
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-text-muted">AI adapts to your learning style and improves recommendations over time</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-text-muted">Trained on CSE, ECE, EEE, MEC syllabi and industry requirements</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-text-muted">Get instant answers, code reviews, and career guidance 24/7</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-heading mb-1">Data-Driven</h4>
                  <p className="text-sm text-text-muted">Insights based on 10,000+ student success patterns</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:shadow-2xl hover:shadow-teal-500/50 transition-all transform hover:scale-105">
                Try AI Assistant Free
              </button>
              <button className="px-8 py-4 bg-surface border border-surface-border text-heading rounded-xl hover:bg-surface hover:border-teal-500/50 transition-all theme-transition">
                Watch AI Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}