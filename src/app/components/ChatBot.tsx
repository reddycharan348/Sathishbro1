import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, Sparkles, ArrowRight } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  links?: { label: string; page: string }[];
}

// Complete website knowledge base
const WEBSITE_KNOWLEDGE = {
  about: {
    name: 'Tectonix',
    tagline: 'Your AI-Powered Learning Assistant',
    description: 'Tectonix is a comprehensive AI-powered learning platform designed to empower engineering students across all branches with personalized learning and career guidance. We help students go from classroom to career excellence.',
    phone: '+91 99899 99099',
    email: 'support@tectonix.com',
    location: 'Tirupati, AP, India',
    workingHours: '09.00am - 9.00pm (IST)',
    students: '1,000+',
    courses: '10+',
    placementSupport: '100%',
    certifications: '24+',
    partnerCompanies: '10+',
    avgCTC: '₹7.2 LPA',
  },
  pages: {
    home: { label: 'Home', description: 'Main landing page with platform overview, features, and live activity stats' },
    branches: { label: 'Branches', description: 'All engineering branches - CSE/IT, AI/DS, ECE, EEE, Mechanical, Civil with detailed skills, career paths, and tools' },
    roadmap: { label: 'Roadmap', description: 'Structured learning roadmaps for Java, Python, Web Dev, Testing, IoT, Embedded Systems, VLSI, CAD/CAM' },
    courses: { label: 'Courses', description: 'Industry-curated courses with curriculum details, pricing, and enrollment options' },
    projects: { label: 'Projects', description: 'Real-world project ideas and virtual labs for hands-on experience' },
    papers: { label: 'Papers', description: 'Previous year papers and study materials for exam preparation' },
    ai: { label: 'AI Tools', description: 'AI-powered learning tools including code review, career guidance, and personalized recommendations' },
    trainer: { label: 'Trainers', description: 'Meet our expert trainers with industry experience and proven track records' },
  },
  branches: [
    { name: 'Computer Science / IT (CSE/IT)', skills: 'C, Java, Python, DSA, Web Dev, AI/ML, DevOps, Databases', salary: '₹6–12 LPA', placement: '94%' },
    { name: 'AI & Data Science (AI/DS)', skills: 'Python, R, ML/DL, NLP, Computer Vision, Big Data, MLOps', salary: '₹7–15 LPA', placement: '91%' },
    { name: 'Electronics & Communication (ECE)', skills: 'VLSI, Embedded Systems, IoT, Signal Processing, RF Engineering', salary: '₹5–10 LPA', placement: '87%' },
    { name: 'Electrical & Electronics (EEE)', skills: 'Power Systems, EV Technology, Smart Grids, Renewable Energy, PLC', salary: '₹5–11 LPA', placement: '85%' },
    { name: 'Mechanical Engineering (MECH)', skills: 'CAD/CAM, SolidWorks, ANSYS, Robotics, Industry 4.0, 3D Printing', salary: '₹4–9 LPA', placement: '83%' },
    { name: 'Civil Engineering (CIVIL)', skills: 'AutoCAD, STAAD Pro, BIM, Construction Management, Smart Cities', salary: '₹4–8 LPA', placement: '80%' },
  ],
  features: [
    'AI-powered personalized learning paths',
    'Industry-certified courses',
    'Real-world projects and virtual labs',
    '100% placement support',
    '1-on-1 mentorship from industry experts',
    'Previous year papers and study materials',
    'Mock interviews and resume building',
    'Direct company connections for recruitment',
  ],
};

function findBestResponse(query: string): Message {
  const q = query.toLowerCase().trim();
  const id = Date.now();

  // Keyword categories and their weights
  const categories = [
    {
      id: 'greeting',
      keywords: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'hi bot'],
      response: {
        text: `Hello! 👋 Welcome to Tectonix! I'm your AI assistant. How can I help you today? You can ask me about:\n\n• Our branches & courses\n• Learning roadmaps\n• Career guidance & placements\n• AI tools\n• Contact information\n\nJust type your question! 😊`,
        links: [
          { label: 'View Branches', page: 'branches' },
          { label: 'Explore Courses', page: 'courses' },
          { label: 'See Roadmaps', page: 'roadmap' },
        ]
      }
    },
    {
      id: 'about',
      keywords: ['what is tectonix', 'about platform', 'tell me about', 'who are you', 'what do you do', 'company info'],
      response: {
        text: `🎓 **Tectonix** - ${WEBSITE_KNOWLEDGE.about.tagline}\n\n${WEBSITE_KNOWLEDGE.about.description}\n\n📊 Key Numbers:\n• ${WEBSITE_KNOWLEDGE.about.students} Active Students\n• ${WEBSITE_KNOWLEDGE.about.courses} Industry Courses\n• ${WEBSITE_KNOWLEDGE.about.placementSupport} Placement Support\n• ${WEBSITE_KNOWLEDGE.about.certifications} Industry Certifications\n• Avg CTC: ${WEBSITE_KNOWLEDGE.about.avgCTC}`,
        links: [
          { label: 'Go to Home', page: 'home' },
          { label: 'View Branches', page: 'branches' },
        ]
      }
    },
    {
      id: 'branches',
      keywords: ['branch', 'department', 'stream', 'engineering', 'cse', 'it', 'ece', 'eee', 'mech', 'civil', 'ai', 'data science'],
      response: {
        text: (() => {
          let branchInfo = '🏛️ **Our Engineering Branches:**\n\n';
          WEBSITE_KNOWLEDGE.branches.forEach((b, i) => {
            branchInfo += `${i + 1}. **${b.name}**\n   💰 Salary: ${b.salary} | 🎯 Placement: ${b.placement}\n   🔧 Skills: ${b.skills}\n\n`;
          });
          return branchInfo + 'Click below to explore all branches in detail! 👇';
        })(),
        links: [{ label: 'Explore All Branches', page: 'branches' }]
      }
    },
    {
      id: 'courses',
      keywords: ['course', 'curriculum', 'syllabus', 'learn', 'enroll', 'program', 'study', 'teaching'],
      response: {
        text: `📚 **Tectonix Courses:**\n\nWe offer ${WEBSITE_KNOWLEDGE.about.courses} industry-curated courses covering:\n\n• Programming (Java, Python, C)\n• Web Development (MERN/MEAN Stack)\n• AI & Machine Learning\n• Data Science & Analytics\n• VLSI Design & Verification\n• Embedded Systems & IoT\n• CAD/CAM Design\n• Cloud Computing & DevOps\n\nAll courses include hands-on projects, industry mentorship, and certification! 🎯`,
        links: [
          { label: 'Browse All Courses', page: 'courses' },
          { label: 'View Roadmaps', page: 'roadmap' },
        ]
      }
    },
    {
      id: 'roadmap',
      keywords: ['roadmap', 'learning path', 'career path', 'how to start', 'where to begin', 'guide', 'steps', 'process'],
      response: {
        text: `🗺️ **Learning Roadmaps:**\n\nWe have structured learning paths for:\n\n1. ☕ Java Full Stack Development\n2. 🐍 Python Programming\n3. 🌐 Web Development (HTML/CSS/JS)\n4. 🧪 Software Testing\n5. 📡 IoT Development\n6. 🔌 Embedded Systems\n7. 💻 VLSI Design\n8. 📐 CAD/CAM Design\n\nEach roadmap includes curriculum, projects, career paths, and industry tools! 🚀`,
        links: [{ label: 'View All Roadmaps', page: 'roadmap' }]
      }
    },
    {
      id: 'placement',
      keywords: ['placement', 'job', 'hire', 'recruit', 'salary', 'package', 'ctc', 'intern', 'company', 'career', 'employment', 'hiring'],
      response: {
        text: `💼 **Placement & Career Support:**\n\n• 🎯 100% Placement Support Guaranteed\n• 💰 Average CTC: ₹7.2 LPA\n• 🏢 ${WEBSITE_KNOWLEDGE.about.partnerCompanies} Hiring Partners\n• 📊 Up to 94% Placement Rate\n\n**Top Recruiters:** Google, Microsoft, Amazon, TCS, Infosys, Intel, Siemens, L&T, Bosch, and more!\n\n**We offer:**\n• Resume building & ATS optimization\n• Mock interviews with AI & mentors\n• Direct company referrals\n• 1-on-1 career mentorship`,
        links: [
          { label: 'Explore Branches', page: 'branches' },
          { label: 'View Projects', page: 'projects' },
        ]
      }
    },
    {
      id: 'contact',
      keywords: ['contact', 'phone', 'call', 'email', 'reach', 'address', 'location', 'where', 'whatsapp', 'number', 'support'],
      response: {
        text: `📞 **Contact Tectonix:**\n\n📱 Phone: ${WEBSITE_KNOWLEDGE.about.phone}\n📧 Email: ${WEBSITE_KNOWLEDGE.about.email}\n📍 Location: ${WEBSITE_KNOWLEDGE.about.location}\n🕐 Working Hours: ${WEBSITE_KNOWLEDGE.about.workingHours}\n\nYou can also use our social widgets on the left side of the page to reach us on WhatsApp, Instagram, or Email! 💬`,
      }
    },
    {
      id: 'thanks',
      keywords: ['thank', 'thanks', 'thx', 'appreciate', 'great', 'awesome', 'good job'],
      response: {
        text: `You're welcome! 😊 I'm glad I could help. If you have any more questions about Tectonix, feel free to ask!\n\n🌟 Remember, you can always reach us at ${WEBSITE_KNOWLEDGE.about.phone} or ${WEBSITE_KNOWLEDGE.about.email}`,
      }
    }
  ];

  // Scoring algorithm
  let bestMatch = null;
  let highestScore = 0;

  categories.forEach(cat => {
    let score = 0;
    cat.keywords.forEach(kw => {
      if (q.includes(kw)) {
        // Higher score for longer keyword matches
        score += kw.length;
        // Bonus for exact word match
        if (new RegExp(`\\b${kw}\\b`, 'i').test(q)) {
          score += 10;
        }
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = cat;
    }
  });

  if (bestMatch && highestScore > 2) {
    return { id, sender: 'bot', ...bestMatch.response };
  }

  // Default fallback if no good match
  return {
    id, sender: 'bot',
    text: `I'm not sure I understood that correctly, but I'm here to help! 🤔\n\nHere are some things I can help you with:\n\n• 📚 Courses & curriculum info\n• 🏛️ Branch details & career paths\n• 🗺️ Learning roadmaps\n• 💼 Placement & job support\n• 🤖 AI tools & features\n• 📞 Contact information\n\nTry asking me about any of these topics! 😊`,
    links: [
      { label: 'Home', page: 'home' },
      { label: 'Branches', page: 'branches' },
      { label: 'Courses', page: 'courses' },
      { label: 'Roadmaps', page: 'roadmap' },
    ],
  };
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      sender: 'bot',
      text: `Hey! 👋 How can I help you?\n\nI'm **Tectonix Bot**, your AI assistant. I can help you with:\n• Branch & course info\n• Career guidance\n• Placement details\n• Navigation help\n\nAsk me anything! 😊`,
      links: [
        { label: 'View Branches', page: 'branches' },
        { label: 'Explore Courses', page: 'courses' },
        { label: 'Contact Info', page: 'home' },
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Auto-open bot on mount after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate a brief thinking delay
    setTimeout(() => {
      const response = findBestResponse(input);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleNavigate = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const event = new CustomEvent('navigate', { detail: page });
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  const quickButtons = [
    { label: '📚 Courses', query: 'courses' },
    { label: '🏛️ Branches', query: 'branches' },
    { label: '💼 Placements', query: 'placements' },
    { label: '📞 Contact', query: 'contact info' },
  ];

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-2xl shadow-blue-500/40 flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse effect when closed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500 animate-ping opacity-20 pointer-events-none" />
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-blue-500/20 border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-base">Tectonix Bot</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/80 text-xs">Online • Ready to help</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    
                    {/* Navigation links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/20 dark:border-slate-600">
                        {msg.links.map((link, i) => (
                          <button
                            key={i}
                            onClick={() => handleNavigate(link.page)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              msg.sender === 'user'
                                ? 'bg-white/20 hover:bg-white/30 text-white'
                                : 'bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                            }`}
                          >
                            {link.label}
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick action buttons */}
            <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex gap-2 overflow-x-auto flex-shrink-0">
              {quickButtons.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(btn.query);
                    setTimeout(() => {
                      const userMsg: Message = { id: Date.now(), text: btn.query, sender: 'user' };
                      setMessages((prev) => [...prev, userMsg]);
                      setIsTyping(true);
                      setTimeout(() => {
                        setMessages((prev) => [...prev, findBestResponse(btn.query)]);
                        setIsTyping(false);
                      }, 600);
                      setInput('');
                    }, 100);
                  }}
                  className="flex-shrink-0 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-500/30 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all whitespace-nowrap"
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Tectonix..."
                  className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" /> Powered by Tectonix AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
