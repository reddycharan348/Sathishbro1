import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare, Clock, Shield } from 'lucide-react';
import { useState, memo } from 'react';

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'support@tectonix.com',
    sub: 'Online support 24/7',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 9949167458',
    sub: 'Mon - Sat, 9am - 6pm',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Tirupati, AP, India',
    sub: 'Tech Hub, Tirupati',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
];

export const ContactPage = memo(function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 bg-page-bg min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F8A05_1px,transparent_1px),linear-gradient(to_bottom,#0B4F8A05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-blue-400 uppercase tracking-wider">Contact Us</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-heading mb-6 tracking-tight"
          >
            Let's Start a <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Have questions about our courses, projects, or placement support? 
            Our team of engineering experts is here to guide you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid gap-6">
              {CONTACT_INFO.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="bg-card-bg border border-card-border p-6 rounded-2xl group hover:border-blue-500/40 transition-all flex items-start gap-5"
                >
                  <div className={`p-4 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-heading mb-1">{item.value}</p>
                    <p className="text-sm text-text-secondary">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Extra Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield className="w-24 h-24 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-heading mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-400" />
                Data Privacy
              </h3>
              <p className="text-text-muted leading-relaxed mb-6">
                Your information is securely handled and used only to respond to your inquiry. 
                We never share your data with third parties.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Avg Response: 2 hours
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  Live Chat Available
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-card-bg border border-card-border p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
              
              <h2 className="text-3xl font-bold text-heading mb-2">Send us a Message</h2>
              <p className="text-text-muted mb-8 text-lg">We usually respond within a few hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary ml-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-5 py-4 bg-surface border border-surface-border rounded-xl focus:outline-none focus:border-blue-500 text-heading text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-secondary ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-5 py-4 bg-surface border border-surface-border rounded-xl focus:outline-none focus:border-blue-500 text-heading text-lg transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary ml-1">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="How can we help?"
                    value={formState.subject}
                    onChange={e => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-5 py-4 bg-surface border border-surface-border rounded-xl focus:outline-none focus:border-blue-500 text-heading text-lg transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary ml-1">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-5 py-4 bg-surface border border-surface-border rounded-xl focus:outline-none focus:border-blue-500 text-heading text-lg transition-all resize-none"
                  />
                </div>

                <button
                  disabled={isSubmitting || submitted}
                  type="submit"
                  className={`w-full py-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 transition-all ${
                    submitted 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : submitted ? (
                    <>Message Sent Successfully! ✨</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});
