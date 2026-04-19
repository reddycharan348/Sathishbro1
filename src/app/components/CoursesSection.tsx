import {
  BookOpen, FileText, CheckCircle, Award, Play, Clock,
  TrendingUp, ArrowRight, Code, Zap, Cpu, Globe, Layers, Star,
  Search, ChevronRight, Flame, Target, GraduationCap,
  LayoutGrid, List, BadgeCheck, Sparkles, Bookmark, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, memo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { EnrollmentModal } from './EnrollmentModal';

/* ─────────────────────── data ─────────────────────── */
const CATEGORIES = [
  { id: 'all',        label: 'All Courses',    count: 12 },
  { id: 'cse',        label: 'CSE / Programming', count: 4 },
  { id: 'web',        label: 'Web Development', count: 2 },
  { id: 'ece',        label: 'ECE / VLSI',     count: 2 },
  { id: 'eee',        label: 'EEE / Power',    count: 1 },
  { id: 'embedded',   label: 'IoT / Embedded', count: 2 },
  { id: 'civil',      label: 'Civil / Mech',   count: 1 },
];

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

const courses = [
  {
    id: 1,
    title: 'Python Programming Mastery',
    tagline: 'From scripting to data science — the most versatile language in tech',
    branch: 'CSE / Programming',
    category: 'cse',
    duration: '12 Weeks',
    level: 'Beginner',
    lectures: 120,
    projects: 15,
    rating: 4.9,
    gradient: 'from-blue-600 to-cyan-500',
    badge: { label: '🔥 Most Popular', cls: 'bg-orange-500/90 text-white' },
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NjU2ODcwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Code,
    instructor: { name: 'Priya Nair', role: 'Data Engineer · Infosys', exp: '6 yrs' },
    highlights: ['Django & Flask', 'Data Science Basics', 'Automation Scripts'],
    outcomes: ['Build real-world Python applications', 'Master data analysis with Pandas & NumPy', 'Automate tasks with Python scripts'],
    skills: ['Python 3', 'NumPy', 'Pandas', 'Django', 'Flask', 'Automation'],
    salary: '₹4–12 LPA',
    featured: true,
  },
  {
    id: 2,
    title: 'Java Full Stack Development',
    tagline: 'Enterprise Java with Spring Boot, Microservices & cloud deployment',
    branch: 'CSE / Programming',
    category: 'cse',
    duration: '12 Weeks',
    level: 'Intermediate',
    lectures: 115,
    projects: 12,
    rating: 4.8,
    gradient: 'from-cyan-600 to-blue-500',
    badge: { label: '⭐ Top Rated', cls: 'bg-blue-600/90 text-white' },
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzY1Njg3MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Code,
    instructor: { name: 'Kiran Sharma', role: 'Sr. Java Developer · TCS', exp: '8 yrs' },
    highlights: ['Spring Boot', 'Microservices', 'REST APIs'],
    outcomes: ['Build full-stack Java applications', 'Design RESTful APIs with Spring Boot', 'Deploy on cloud with CI/CD pipelines'],
    skills: ['Java SE', 'Spring Boot', 'Microservices', 'REST API', 'MySQL', 'Maven'],
    salary: '₹4–10 LPA',
    featured: false,
  },
  {
    id: 3,
    title: 'C Programming Fundamentals',
    tagline: 'Master C language with data structures, algorithms & system programming',
    branch: 'CSE / Programming',
    category: 'cse',
    duration: '12 Weeks',
    level: 'Beginner',
    lectures: 100,
    projects: 10,
    rating: 4.7,
    gradient: 'from-blue-500 to-cyan-600',
    badge: null,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGV8ZW58MXx8fHwxNzY1Njg3MDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Code,
    instructor: { name: 'Arun Verma', role: 'System Programmer · HCL', exp: '7 yrs' },
    highlights: ['Pointers & Memory', 'DSA in C', 'System Programming'],
    outcomes: ['Understand pointers and memory management', 'Implement data structures in C', 'Write efficient system-level programs'],
    skills: ['C Language', 'Pointers', 'DSA', 'File Handling', 'Dynamic Memory'],
    salary: '₹3–8 LPA',
    featured: false,
  },
  {
    id: 4,
    title: 'Data Science & Machine Learning',
    tagline: 'Build intelligent models from scratch using Python, Scikit-learn & TensorFlow',
    branch: 'CSE / AI',
    category: 'cse',
    duration: '12 Weeks',
    level: 'Intermediate',
    lectures: 140,
    projects: 18,
    rating: 4.9,
    gradient: 'from-blue-700 to-cyan-400',
    badge: { label: '🆕 New Launch', cls: 'bg-cyan-500/90 text-white' },
    image: 'https://images.unsplash.com/photo-1653564142048-d5af2cf9b50f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMG1hY2hpbmUlMjBsZWFybmluZyUyMGNvZGV8ZW58MXx8fHwxNzcyODEzNjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: TrendingUp,
    instructor: { name: 'Meera Pillai', role: 'ML Engineer · Google', exp: '9 yrs' },
    highlights: ['Scikit-learn', 'TensorFlow', 'Model Deployment'],
    outcomes: ['Build supervised & unsupervised models', 'Perform EDA on real datasets', 'Deploy ML models as REST APIs'],
    skills: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'EDA', 'Model Deployment'],
    salary: '₹6–18 LPA',
    featured: false,
  },
  {
    id: 5,
    title: 'Frontend Web Development',
    tagline: 'Build modern responsive websites with HTML, CSS, JavaScript & React',
    branch: 'Web Development',
    category: 'web',
    duration: '12 Weeks',
    level: 'Beginner',
    lectures: 130,
    projects: 16,
    rating: 4.8,
    gradient: 'from-cyan-600 to-blue-400',
    badge: { label: '🚀 High Demand', cls: 'bg-purple-600/90 text-white' },
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjU2ODcwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Globe,
    instructor: { name: 'Arun Verma', role: 'Frontend Lead · Wipro', exp: '7 yrs' },
    highlights: ['React & Next.js', 'Tailwind CSS', 'Responsive Design'],
    outcomes: ['Build production-ready web apps', 'Master React component architecture', 'Deploy on Vercel and Netlify'],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind'],
    salary: '₹3–9 LPA',
    featured: false,
  },
  {
    id: 6,
    title: 'React & Advanced JavaScript',
    tagline: 'Deep dive into modern React patterns, hooks, state management & performance',
    branch: 'Web Development',
    category: 'web',
    duration: '12 Weeks',
    level: 'Intermediate',
    lectures: 110,
    projects: 12,
    rating: 4.8,
    gradient: 'from-blue-600 to-cyan-400',
    badge: { label: '💎 Premium', cls: 'bg-slate-700/90 text-cyan-300 border border-cyan-500/30' },
    image: 'https://images.unsplash.com/photo-1672309046475-4cce2039f342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMGphdmFzY3JpcHQlMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGxhcHRvcHxlbnwxfHx8fDE3NzI4MTM2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Globe,
    instructor: { name: 'Rahul Dev', role: 'React Specialist · Accenture', exp: '8 yrs' },
    highlights: ['React Hooks', 'Redux Toolkit', 'Performance'],
    outcomes: ['Master React hooks & context API', 'Build complex SPA with Redux', 'Optimize React app performance'],
    skills: ['React 18', 'Redux Toolkit', 'TypeScript', 'React Query', 'Zustand'],
    salary: '₹5–14 LPA',
    featured: false,
  },
  {
    id: 7,
    title: 'IoT & Embedded Systems',
    tagline: 'Build smart IoT devices with Arduino, ESP32 & cloud integration',
    branch: 'IoT / Embedded',
    category: 'embedded',
    duration: '12 Weeks',
    level: 'Intermediate',
    lectures: 110,
    projects: 14,
    rating: 4.8,
    gradient: 'from-cyan-500 to-blue-600',
    badge: { label: '📡 Industry Boom', cls: 'bg-emerald-600/90 text-white' },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBkZXZpY2VzfGVufDF8fHx8MTc2NTY4NzA0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Cpu,
    instructor: { name: 'Sandeep Reddy', role: 'IoT Architect · Bosch', exp: '10 yrs' },
    highlights: ['Arduino & ESP32', 'MQTT Protocol', 'Cloud IoT'],
    outcomes: ['Design complete IoT systems', 'Program ESP32 over Wi-Fi', 'Connect sensors to cloud dashboards'],
    skills: ['Arduino', 'ESP32', 'MQTT', 'Node-RED', 'ThingSpeak', 'Blynk'],
    salary: '₹5–11 LPA',
    featured: false,
  },
  {
    id: 8,
    title: 'Embedded C & Microcontrollers',
    tagline: 'Master Embedded C, RTOS and hardware-software integration for real systems',
    branch: 'IoT / Embedded',
    category: 'embedded',
    duration: '12 Weeks',
    level: 'Advanced',
    lectures: 105,
    projects: 10,
    rating: 4.7,
    gradient: 'from-blue-600 to-cyan-600',
    badge: { label: '🏆 Premium Track', cls: 'bg-amber-600/90 text-white' },
    image: 'https://images.unsplash.com/photo-1602493054376-d9dc3dfcbc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwY2lyY3VpdCUyMGJvYXJkfGVufDF8fHx8MTc2NTY2NzQwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Cpu,
    instructor: { name: 'Rahul Mishra', role: 'Firmware Engineer · Qualcomm', exp: '11 yrs' },
    highlights: ['Embedded C', 'FreeRTOS', 'UART/SPI/I2C'],
    outcomes: ['Write optimized Embedded C firmware', 'Implement RTOS task scheduling', 'Debug hardware with JTAG/SWD'],
    skills: ['Embedded C', 'STM32', 'FreeRTOS', 'UART', 'SPI', 'I2C'],
    salary: '₹6–14 LPA',
    featured: false,
  },
  {
    id: 9,
    title: 'VLSI Design & Verification',
    tagline: 'Complete chip design with Verilog, RTL synthesis & FPGA implementation',
    branch: 'ECE / VLSI',
    category: 'ece',
    duration: '12 Weeks',
    level: 'Advanced',
    lectures: 125,
    projects: 8,
    rating: 4.9,
    gradient: 'from-blue-600 to-cyan-400',
    badge: { label: '💎 Highest CTC', cls: 'bg-blue-700/90 text-cyan-300 border border-cyan-500/30' },
    image: 'https://images.unsplash.com/photo-1733741071656-ba8832fde42a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZWxlY3Ryb25pY3MlMjBjaXJjdWl0JTIwY29tcG9uZW50c3xlbnwxfHx8fDE3NzI4MTM2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Layers,
    instructor: { name: 'Arjun Kumar', role: 'VLSI Engineer · Intel', exp: '12 yrs' },
    highlights: ['Verilog HDL', 'FPGA Design', 'Timing Analysis'],
    outcomes: ['Design digital circuits with Verilog', 'Synthesize RTL and analyze timing', 'Implement designs on FPGA'],
    skills: ['Verilog', 'VHDL', 'ModelSim', 'Xilinx Vivado', 'RTL Synthesis'],
    salary: '₹8–20 LPA',
    featured: false,
  },
  {
    id: 10,
    title: 'Digital Electronics & Communication',
    tagline: 'Logic gates, sequential circuits, modulation techniques & signal systems',
    branch: 'ECE / Electronics',
    category: 'ece',
    duration: '12 Weeks',
    level: 'Beginner',
    lectures: 95,
    projects: 8,
    rating: 4.6,
    gradient: 'from-cyan-600 to-blue-700',
    badge: null,
    image: 'https://images.unsplash.com/photo-1768839722571-c45c96186dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHN5c3RlbXMlMjBlbGVjdHJpY2FsJTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzcyODEzNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Zap,
    instructor: { name: 'Deepa Raj', role: 'EC Lecturer · NIT', exp: '9 yrs' },
    highlights: ['Logic Design', 'Flip-Flops & FSMs', 'AM/FM Modulation'],
    outcomes: ['Design combinational & sequential circuits', 'Understand modulation & demodulation', 'Analyze digital communication systems'],
    skills: ['Boolean Algebra', 'K-Maps', 'Flip-Flops', 'FSM', 'Modulation', 'OFDM'],
    salary: '₹4–9 LPA',
    featured: false,
  },
  {
    id: 11,
    title: 'Power Systems & Electrical Machines',
    tagline: 'From generation to distribution — transformers, motors and protection systems',
    branch: 'EEE / Power',
    category: 'eee',
    duration: '12 Weeks',
    level: 'Intermediate',
    lectures: 100,
    projects: 8,
    rating: 4.7,
    gradient: 'from-blue-500 to-cyan-500',
    badge: null,
    image: 'https://images.unsplash.com/photo-1554350747-ec45fd24f51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMHRlc3RpbmclMjBxdWFsaXR5JTIwYXNzdXJhbmNlfGVufDF8fHx8MTc3Mjc5MTgxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Zap,
    instructor: { name: 'Vikram Iyer', role: 'Power Systems Engineer · NTPC', exp: '10 yrs' },
    highlights: ['Transformers', 'Induction Motors', 'Power Protection'],
    outcomes: ['Analyse single and three-phase systems', 'Understand transformer design & testing', 'Study motor protection and drives'],
    skills: ['Power Analysis', 'Transformers', 'AC Motors', 'Protection Relays', 'MATLAB'],
    salary: '₹4–10 LPA',
    featured: false,
  },
  {
    id: 12,
    title: 'AutoCAD 2D & Engineering Drawing',
    tagline: 'Create professional technical drawings for civil, electrical and mechanical engineering',
    branch: 'Civil / Mechanical',
    category: 'civil',
    duration: '12 Weeks',
    level: 'Beginner',
    lectures: 90,
    projects: 10,
    rating: 4.5,
    gradient: 'from-blue-700 to-cyan-500',
    badge: { label: '📐 Core Skill', cls: 'bg-slate-700/90 text-blue-300 border border-blue-500/30' },
    image: 'https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljYWwlMjBkcmFmdGluZyUyMGVuZ2luZWVyaW5nJTIwYmx1ZXByaW50fGVufDF8fHx8MTc3MjgxMzY4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: BookOpen,
    instructor: { name: 'Meera Pillai', role: 'CAD Manager · L&T', exp: '8 yrs' },
    highlights: ['AutoCAD Commands', 'Electrical Layouts', 'Civil Floor Plans'],
    outcomes: ['Create professional 2D drawings', 'Apply proper dimensioning & annotations', 'Design electrical and civil layouts'],
    skills: ['AutoCAD 2024', 'Dimensioning', 'Layers', 'Blocks', 'Plot Setup'],
    salary: '₹3–7 LPA',
    featured: false,
  },
];

const PLATFORM_FEATURES = [
  { icon: Play,          label: '100+ Video Lectures' },
  { icon: FileText,      label: 'Downloadable Notes' },
  { icon: CheckCircle,   label: 'Weekly Assignments' },
  { icon: Code,          label: 'Live Coding Sessions' },
  { icon: Award,         label: 'Industry Certificate' },
  { icon: GraduationCap, label: 'Placement Support' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
      ))}
    </div>
  );
}

function LevelBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    'Beginner':     'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    'Intermediate': 'text-amber-400  bg-amber-500/10  border-amber-500/25',
    'Advanced':     'text-red-400    bg-red-500/10    border-red-500/25',
  };
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full border ${map[level] ?? map['Beginner']}`}>
      {level}
    </span>
  );
}

/* ─────────────────────── main component ─────────────────────── */
export const CoursesSection = memo(function CoursesSection() {
  const [activeCategory, setActiveCategory]   = useState('all');
  const [activeLevel, setActiveLevel]         = useState('All Levels');
  const [searchQuery, setSearchQuery]         = useState('');
  const [viewMode, setViewMode]               = useState<'grid' | 'list'>('grid');
  const [expandedCard, setExpandedCard]       = useState<number | null>(null);
  const [enrollmentModal, setEnrollmentModal] = useState({ isOpen: false, courseName: '', coursePrice: '' });

  const openEnroll = (name: string) => setEnrollmentModal({ isOpen: true, courseName: name, coursePrice: '' });
  const closeEnroll = () => setEnrollmentModal({ isOpen: false, courseName: '', coursePrice: '' });

  const filtered = courses.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchCat   = activeCategory === 'all' || c.category === activeCategory;
    const matchLevel = activeLevel === 'All Levels' || c.level === activeLevel;
    const matchQ     = !q || c.title.toLowerCase().includes(q) || c.branch.toLowerCase().includes(q) ||
                       c.skills.some(s => s.toLowerCase().includes(q));
    return matchCat && matchLevel && matchQ;
  });

  const featured = courses.find(c => c.featured)!;

  return (
    <div className="py-20 bg-gradient-to-b from-page-bg via-surface to-page-bg relative overflow-hidden">

      {/* ── background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f05_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f05_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



        {/* ════════ PLATFORM FEATURES STRIP ════════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {PLATFORM_FEATURES.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }} viewport={{ once: true }} whileHover={{ y: -3 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-card-bg border border-card-border rounded-xl hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-default">
              <f.icon className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-sm text-text-secondary whitespace-nowrap">{f.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ════════ STATS ROW ════════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {([
            { value: '12',      label: 'Courses',          sub: 'Across all branches' },
            { value: '1,400+',  label: 'Video Lectures',   sub: 'Across all programs' },
            { value: '4.8 / 5', label: 'Average Rating',   sub: 'From verified learners' },
            { value: '94%',     label: 'Placement Rate',   sub: 'Within 3 months' },
          ] as const).map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }} whileHover={{ y: -4 }}
              className="bg-card-bg border border-card-border rounded-2xl p-5 text-center hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="text-2xl text-heading bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">{s.value}</div>
              <div className="text-sm text-text-secondary mb-0.5">{s.label}</div>
              <div className="text-xs text-slate-600">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ════════ FEATURED COURSE ════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-text-muted">Featured Course</span>
          </div>
          <div className="relative bg-card-bg border border-blue-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 hover:shadow-blue-900/40 transition-all group">
            <div className="grid md:grid-cols-5">
              {/* image side */}
              <div className="md:col-span-2 relative h-56 md:h-auto overflow-hidden">
                <motion.img src={featured.image} alt={featured.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} />
                <div className={`absolute inset-0 bg-gradient-to-r ${featured.gradient} opacity-50`} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80" />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs px-3 py-1.5 rounded-full ${featured.badge?.cls}`}>{featured.badge?.label}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className={`p-3 bg-gradient-to-br ${featured.gradient} rounded-xl`}>
                    <featured.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* content side */}
              <div className="md:col-span-3 p-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs px-3 py-1 bg-blue-600/15 text-blue-300 rounded-full border border-blue-500/20">{featured.branch}</span>
                    <LevelBadge level={featured.level} />
                    <span className="text-xs text-text-muted">{featured.duration}</span>
                  </div>
                  <h3 className="text-2xl text-heading mb-2 leading-snug group-hover:text-blue-300 transition-colors">{featured.title}</h3>
                  <p className="text-sm text-text-muted mb-4 leading-relaxed">{featured.tagline}</p>

                  {/* outcomes */}
                  <ul className="space-y-1.5 mb-5">
                    {featured.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>

                  {/* skills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {featured.skills.map((s, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-blue-600/10 text-blue-300 rounded-full border border-blue-500/20">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-card-border">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={featured.rating} />
                      <span className="text-sm text-amber-400">{featured.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Play className="w-3.5 h-3.5" />
                      {featured.lectures} lectures
                    </div>
                  </div>
                  <button onClick={() => openEnroll(featured.title)}
                    className={`px-7 py-3 bg-gradient-to-r ${featured.gradient} text-white rounded-xl text-sm hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105 flex items-center gap-2`}>
                    <Play className="w-4 h-4" /> Enroll Now
                  </button>
                </div>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${featured.gradient}`} />
          </div>
        </motion.div>

        {/* ════════ FILTERS ════════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="space-y-4 mb-8">

          {/* search + view toggle */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by course, skill or technology…"
                className="w-full pl-11 pr-4 py-3 bg-surface border border-surface-border rounded-xl text-text-secondary placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-surface text-sm transition-all" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-text-muted hover:text-white transition-colors" />
                </button>
              )}
            </div>
            {/* level filter */}
            <div className="flex gap-2">
              {LEVELS.map(l => (
                <button key={l} onClick={() => setActiveLevel(l)}
                  className={`px-3.5 py-3 rounded-xl text-xs whitespace-nowrap transition-all ${
                    activeLevel === l
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-surface text-text-muted border border-surface-border hover:border-blue-500/40 hover:text-heading'
                  }`}>
                  {l}
                </button>
              ))}
            </div>
            {/* view toggle */}
            <div className="flex gap-1 bg-surface border border-surface-border rounded-xl p-1">
              {([['grid', LayoutGrid], ['list', List]] as const).map(([mode, Icon]) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-lg transition-all ${viewMode === mode ? 'bg-blue-600 text-white' : 'text-text-muted hover:text-white'}`}>
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-surface text-text-secondary border border-surface-border hover:border-blue-500/40 hover:text-heading'
                }`}>
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-surface text-text-muted'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* results count */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Showing <span className="text-blue-400">{filtered.length}</span> of {courses.length} courses
              {searchQuery && <> for "<span className="text-white">{searchQuery}</span>"</>}
            </p>
            {(activeCategory !== 'all' || activeLevel !== 'All Levels' || searchQuery) && (
              <button onClick={() => { setActiveCategory('all'); setActiveLevel('All Levels'); setSearchQuery(''); }}
                className="text-xs text-text-muted hover:text-blue-400 transition-colors">
                Clear filters ×
              </button>
            )}
          </div>
        </motion.div>

        {/* ════════ COURSE GRID / LIST ════════ */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-24 text-center">
              <Search className="w-14 h-14 mx-auto mb-4 text-slate-700" />
              <p className="text-base text-text-muted mb-2">No courses match your search.</p>
              <button onClick={() => { setActiveCategory('all'); setActiveLevel('All Levels'); setSearchQuery(''); }}
                className="text-sm text-blue-400 hover:underline">Clear all filters</button>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course, idx) => (
                <CourseGridCard key={course.id} course={course} idx={idx}
                  isExpanded={expandedCard === course.id}
                  onExpand={() => setExpandedCard(expandedCard === course.id ? null : course.id)}
                  onEnroll={openEnroll} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-4">
              {filtered.map((course, idx) => (
                <CourseListRow key={course.id} course={course} idx={idx} onEnroll={openEnroll} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════ BOTTOM CTA ════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-blue-900/25 to-cyan-900/15 border border-blue-500/30 rounded-2xl p-10 sm:p-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600/10 border border-blue-500/25 text-blue-400 rounded-full text-xs mb-5">
            <Target className="w-3.5 h-3.5" />
            Not sure which course to pick?
          </div>
          <h3 className="text-3xl text-heading mb-3">Talk to a Career Counsellor</h3>
          <p className="text-text-muted max-w-xl mx-auto mb-8 leading-relaxed text-sm">
            Our engineering experts will help you pick the right course based on your branch,
            current skill level and career goals — completely free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-sm hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:scale-105 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Book Free Counselling
            </button>
            <button className="px-8 py-4 bg-surface border border-surface-border text-text-secondary rounded-xl text-sm hover:border-blue-500/40 hover:text-heading transition-all flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> View All 12 Courses
            </button>
          </div>
        </motion.div>

      </div>

      <EnrollmentModal
        isOpen={enrollmentModal.isOpen}
        courseName={enrollmentModal.courseName}
        coursePrice={enrollmentModal.coursePrice}
        onClose={closeEnroll}
      />
    </div>
  );
});

/* ─────────────────────── grid card ─────────────────────── */
function CourseGridCard({ course, idx, isExpanded, onExpand, onEnroll }:
  { course: typeof courses[0]; idx: number; isExpanded: boolean; onExpand: () => void; onEnroll: (n: string) => void }) {

  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.07, type: 'spring', stiffness: 100 }} viewport={{ once: true }}>
      <div className={`group h-full flex flex-col bg-card-bg border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 ${
        isExpanded ? 'border-blue-500/60 shadow-xl shadow-blue-900/20' : 'border-card-border hover:border-blue-500/40'
      }`}>

        {/* ── card image / header ── */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <motion.img src={course.image} alt={course.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.07 }} transition={{ duration: 0.4 }} />
          <div className={`absolute inset-0 bg-gradient-to-t ${course.gradient} opacity-55`} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />

          {/* badge */}
          {course.badge && (
            <div className="absolute top-3 left-3">
              <span className={`text-xs px-3 py-1.5 rounded-full ${course.badge.cls}`}>{course.badge.label}</span>
            </div>
          )}

          {/* rating */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/15">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-heading">{course.rating}</span>
          </div>

          {/* icon + branch */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className={`p-2 bg-gradient-to-br ${course.gradient} rounded-lg`}>
              <course.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">{course.branch}</span>
          </div>
        </div>

        {/* ── card body ── */}
        <div className="flex flex-col flex-1 p-5">

          {/* level + duration row */}
          <div className="flex items-center justify-between mb-3">
            <LevelBadge level={course.level} />
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </div>
          </div>

          {/* title */}
          <h3 className="text-base text-heading leading-snug mb-1.5 group-hover:text-blue-300 transition-colors">
            {course.title}
          </h3>

          {/* tagline */}
          <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">
            {course.tagline}
          </p>

          {/* ── stats bar ── */}
          <div className="grid grid-cols-2 gap-0 border border-card-border rounded-xl overflow-hidden mb-4">
            {([
              { icon: Play, val: `${course.lectures}`, sub: 'Lectures' },
              { icon: Code, val: `${course.projects}`, sub: 'Projects' },
            ] as const).map((s, i) => (
              <div key={i} className={`flex flex-col items-center py-2.5 ${i < 1 ? 'border-r border-card-border' : ''} bg-surface`}>
                <s.icon className="w-3.5 h-3.5 text-blue-400 mb-1" />
                <span className="text-sm text-heading">{s.val}</span>
                <span className="text-xs text-slate-600">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* skill tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.skills.slice(0, 4).map((s, i) => (
              <span key={i} className="text-xs px-2.5 py-1 bg-blue-600/10 text-blue-600 dark:text-blue-300 rounded-full border border-blue-500/15">{s}</span>
            ))}
            {course.skills.length > 4 && (
              <span className="text-xs px-2.5 py-1 bg-surface text-text-muted rounded-full border border-surface-border">+{course.skills.length - 4}</span>
            )}
          </div>

          {/* expandable outcomes */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                className="overflow-hidden mb-4">
                <div className="bg-surface border border-surface-border rounded-xl p-4">
                  <p className="text-xs text-text-muted mb-3">What you will learn</p>
                  <ul className="space-y-2">
                    {course.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-surface-border flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                      Avg Salary: <span className="text-cyan-600 dark:text-cyan-400">{course.salary}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Certificate Included
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── divider ── */}
          <div className="border-t border-card-border mb-4" />

          {/* instructor */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs shrink-0">
              {course.instructor.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm text-heading truncate">{course.instructor.name}</div>
              <div className="text-xs text-text-muted truncate">{course.instructor.role}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <StarRating rating={course.rating} />
            </div>
          </div>

          {/* ── actions ── */}
          <div className="flex gap-2 mt-auto">
            <button onClick={() => onEnroll(course.title)}
              className={`flex-1 py-3 rounded-xl text-sm bg-gradient-to-r ${course.gradient} text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2`}>
              <Play className="w-3.5 h-3.5" /> Enroll Now
            </button>
            <button onClick={onExpand}
              className={`px-3.5 py-3 rounded-xl border text-sm transition-all ${
                isExpanded
                  ? 'border-blue-500/40 bg-blue-600/15 text-blue-600 dark:text-blue-400'
                  : 'border-surface-border bg-surface text-text-muted hover:border-blue-500/40 hover:text-heading'
              }`}>
              <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* bottom gradient line */}
        <div className={`h-1 bg-gradient-to-r ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
      </div>
    </motion.div>
  );
}

/* ─────────────────────── list row ─────────────────────── */
function CourseListRow({ course, idx, onEnroll }:
  { course: typeof courses[0]; idx: number; onEnroll: (n: string) => void }) {

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }} viewport={{ once: true }}>
      <div className="group flex flex-col sm:flex-row items-start gap-5 bg-card-bg border border-card-border rounded-2xl p-5 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-0.5">

        {/* thumbnail */}
        <div className="relative w-full sm:w-36 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-40`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`p-2.5 bg-gradient-to-br ${course.gradient} rounded-lg`}>
              <course.icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {course.badge && (
              <span className={`text-xs px-2.5 py-0.5 rounded-full ${course.badge.cls}`}>{course.badge.label}</span>
            )}
            <span className="text-xs px-2.5 py-0.5 bg-blue-600/10 text-blue-600 dark:text-blue-300 rounded-full border border-blue-500/15">{course.branch}</span>
            <LevelBadge level={course.level} />
          </div>
          <h3 className="text-base text-heading mb-1 group-hover:text-blue-300 transition-colors">{course.title}</h3>
          <p className="text-xs text-text-muted mb-3 leading-relaxed line-clamp-1">{course.tagline}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-1.5">
              <StarRating rating={course.rating} />
              <span className="text-amber-400">{course.rating}</span>
            </div>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
            <span className="flex items-center gap-1"><Play className="w-3 h-3" />{course.lectures} lectures</span>
            <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400"><TrendingUp className="w-3 h-3" />{course.salary}</span>
          </div>
        </div>

        {/* action */}
        <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
          <button onClick={() => onEnroll(course.title)}
            className={`flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r ${course.gradient} text-white rounded-xl text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2`}>
            <Play className="w-3.5 h-3.5" /> Enroll
          </button>
          <button className="flex-1 sm:flex-none px-6 py-3 bg-surface border border-surface-border text-text-muted rounded-xl text-sm hover:border-blue-500/40 hover:text-heading transition-all flex items-center justify-center gap-2">
            <Bookmark className="w-3.5 h-3.5" /> Save
          </button>
        </div>
      </div>
    </motion.div>
  );
}