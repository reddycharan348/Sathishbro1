import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What is Tectonix and how does it help students?",
    answer: "Tectonix is an AI-powered learning assistant designed specifically for engineering students. We provide structured learning roadmaps, course recommendations, career guidance, and access to industry-relevant projects across all engineering branches (CSE, ECE, Mechanical, Civil, etc.) to help students bridge the gap between academia and industry."
  },
  {
    question: "How do the learning roadmaps work?",
    answer: "Our roadmaps are step-by-step guides curated by industry experts. They break down complex subjects into weekly milestones, covering everything from fundamental concepts to advanced practical applications. Each roadmap includes recommended resources, hands-on projects, and assessment milestones."
  },
  {
    question: "Are the courses and roadmaps free for everyone?",
    answer: "Tectonix offers a mix of free and premium content. All basic learning roadmaps and career guidance articles are free to access. Advanced specialized courses, premium project mentors, and personalized placement support are part of our premium membership plans."
  },
  {
    question: "Which engineering branches do you support?",
    answer: "We support a wide range of branches including Computer Science & Engineering (CSE), Electronics & Communication (ECE), Mechanical Engineering, Civil Engineering, Electrical Engineering, and emerging fields like AI/ML, VLSI, and IoT."
  },
  {
    question: "Can Tectonix help me with campus placements?",
    answer: "Yes! We have a dedicated placement support system that includes resume building, mock interviews, technical assessment prep, and direct connections with our hiring partners like Google, Microsoft, Amazon, and top Indian MNCs."
  },
  {
    question: "Do you provide certificates after completing roadmaps?",
    answer: "Yes, upon successful completion of a roadmap and its associated capstone project, students receive a verified Tectonix Industry Certification that can be shared on LinkedIn and added to resumes."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-surface/30 theme-transition scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-heading mb-6 tracking-tight">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Everything you need to know about Tectonix and how to jumpstart your engineering career.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all text-left ${
                  openIndex === index
                    ? 'bg-surface border-blue-500/50 shadow-xl shadow-blue-500/10'
                    : 'bg-surface/50 border-surface-border hover:border-blue-500/30'
                }`}
              >
                <span className={`text-lg font-bold transition-colors ${
                  openIndex === index ? 'text-blue-400' : 'text-heading'
                }`}>
                  {faq.question}
                </span>
                <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 text-blue-400' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-2 text-text-muted leading-relaxed text-base border-x border-b border-blue-500/20 rounded-b-2xl -mt-2 bg-surface/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* SEO Schema Support */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </div>
    </section>
  );
}
