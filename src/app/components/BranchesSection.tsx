import {
  Code, Brain, Cpu, Zap, Cog, Building, BookOpen, Briefcase, Award, TrendingUp,
  Users, Target, CheckCircle, GraduationCap, Sparkles, DollarSign, Building2,
  Star, BarChart, Rocket, Globe, Shield, Package, Clock, PlayCircle, Download,
  ArrowUpRight, Lightbulb, Wrench, LineChart, FlaskConical, Trophy, Flame,
  Layers, Map, Compass, ChevronRight, ChevronDown, X, GitBranch, Cpu as CpuIcon,
  MonitorSmartphone, Network, Database, Cloud, Bot, Microscope, HardDrive,
  Workflow, Search, Filter, SlidersHorizontal, BadgeCheck, Zap as ZapIcon,
  ArrowRight, Lock, Binary, Atom, Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { memo, useState } from 'react';

type TabId = 'overview' | 'skills' | 'career' | 'tools';

export const BranchesSection = memo(function BranchesSection() {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedBranch, setExpandedBranch] = useState<number | null>(null);
  const [cardTab, setCardTab] = useState<Record<number, TabId>>({});
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const branches = [
    {
      icon: Code,
      title: 'Computer Science / IT',
      shortName: 'CSE/IT',
      category: 'software',
      color: 'from-blue-600 to-cyan-500',
      accentColor: 'blue',
      emoji: '💻',
      skills: ['C, Java, Python', 'Data Structures & Algorithms', 'Web Development (MERN/MEAN)', 'AI / ML Fundamentals', 'Software Testing & DevOps', 'Database Management (SQL/NoSQL)', 'Operating Systems & Networking'],
      skillLevels: [90, 95, 85, 70, 75, 80, 65],
      bgColor: 'bg-blue-600/5',
      borderColor: 'border-blue-500/20',
      students: '520+',
      courses: 25,
      avgSalary: '₹6–12 LPA',
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture'],
      careerPaths: ['Software Developer', 'Full Stack Developer', 'Data Engineer', 'DevOps Engineer', 'Cloud Architect', 'Mobile Developer'],
      description: 'Master programming, algorithms, and software development to build cutting-edge applications',
      demandTrend: '+25%',
      placementRate: 94,
      avgPackage: '₹8.5 LPA',
      topRoles: ['Full Stack Dev', 'Backend Engineer', 'Frontend Dev'],
      requiredSkills: ['Programming', 'Problem Solving', 'System Design', 'Databases'],
      optionalSkills: ['Cloud (AWS/Azure)', 'Docker/K8s', 'CI/CD', 'Microservices'],
      industryTools: ['Git', 'VS Code', 'Docker', 'AWS', 'Jenkins', 'Jira', 'Postman', 'Linux'],
      certifications: ['AWS Certified', 'Google Cloud', 'Microsoft Azure', 'Oracle Java'],
      projectExamples: ['E-commerce Platform', 'Social Media App', 'Cloud-based SaaS', 'Mobile Application', 'REST API Service', 'Real-time Chat App'],
      learningDuration: '12–18 months',
      difficultyLevel: 'Beginner to Advanced',
      marketOutlook: 'Excellent — Highest demand across all industries',
      salaryGrowth: ['Fresher: ₹4–6 LPA', '2–5 yrs: ₹8–15 LPA', '5+ yrs: ₹15–40 LPA'],
      topSkillsInDemand: ['React/Angular', 'Node.js', 'Python', 'AWS/Cloud', 'Kubernetes'],
      interviewTopics: ['DSA & Algorithms', 'System Design', 'OOPs Concepts', 'OS & DBMS', 'CS Fundamentals'],
      hackathonAreas: ['Open Innovation', 'FinTech', 'HealthTech', 'EdTech', 'Smart City'],
      researchDomains: ['Distributed Systems', 'Security & Cryptography', 'Human-Computer Interaction', 'Compilers'],
      alumniHighlight: { name: 'Ravi Kumar', role: 'SDE-III at Amazon', ctc: '₹42 LPA' },
      jobCount: '2.8L+',
      internshipRate: '78%',
      hotSkillBadge: '🔥 Highest Demand',
    },
    {
      icon: Brain,
      title: 'AI & Data Science',
      shortName: 'AI/DS',
      category: 'software',
      color: 'from-blue-600 to-cyan-500',
      accentColor: 'blue',
      emoji: '🤖',
      skills: ['Python & R Programming', 'ML / DL Algorithms', 'NLP & Computer Vision', 'Big Data Analytics', 'AI Deployment & MLOps', 'Statistical Modeling', 'Data Visualization'],
      skillLevels: [92, 88, 82, 78, 72, 85, 80],
      bgColor: 'bg-blue-600/5',
      borderColor: 'border-blue-500/20',
      students: '385+',
      courses: 18,
      avgSalary: '₹7–15 LPA',
      topCompanies: ['Google', 'IBM', 'Accenture', 'Wipro', 'Analytics Firms', 'Amazon', 'Microsoft'],
      careerPaths: ['Data Scientist', 'ML Engineer', 'AI Research', 'Business Analyst', 'Data Analyst', 'AI Consultant'],
      description: 'Dive into machine learning, deep learning, and AI to solve real-world problems at scale',
      demandTrend: '+35%',
      placementRate: 91,
      avgPackage: '₹10.2 LPA',
      topRoles: ['Data Scientist', 'ML Engineer', 'AI Specialist'],
      requiredSkills: ['Statistics', 'Python/R', 'Machine Learning', 'Data Analysis'],
      optionalSkills: ['Deep Learning', 'NLP', 'Computer Vision', 'Big Data'],
      industryTools: ['Jupyter', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Tableau', 'Power BI', 'Spark', 'Kafka'],
      certifications: ['Google Data Analytics', 'IBM Data Science', 'AWS ML', 'Microsoft AI'],
      projectExamples: ['Recommendation System', 'Image Recognition', 'Chatbot AI', 'Predictive Analytics', 'Fraud Detection', 'NLP Sentiment Analysis'],
      learningDuration: '15–24 months',
      difficultyLevel: 'Intermediate to Advanced',
      marketOutlook: 'Exceptional — Fastest growing field globally',
      salaryGrowth: ['Fresher: ₹6–8 LPA', '2–5 yrs: ₹10–20 LPA', '5+ yrs: ₹20–50 LPA'],
      topSkillsInDemand: ['Deep Learning', 'NLP', 'Computer Vision', 'MLOps', 'PyTorch'],
      interviewTopics: ['ML Theory', 'Statistics & Probability', 'Python & Pandas', 'SQL Querying', 'Model Evaluation'],
      hackathonAreas: ['Healthcare AI', 'Climate Tech', 'AgriTech', 'FinTech AI', 'Computer Vision'],
      researchDomains: ['Federated Learning', 'Explainable AI', 'Generative AI', 'Reinforcement Learning'],
      alumniHighlight: { name: 'Sneha Iyer', role: 'Data Scientist at Google', ctc: '₹38 LPA' },
      jobCount: '1.5L+',
      internshipRate: '82%',
      hotSkillBadge: '🚀 Fastest Growing',
    },
    {
      icon: Cpu,
      title: 'Electronics & Communication (ECE)',
      shortName: 'ECE',
      category: 'hardware',
      color: 'from-blue-600 to-cyan-500',
      accentColor: 'blue',
      emoji: '📡',
      skills: ['Analog & Digital Electronics', 'VLSI Design & Verification', 'Embedded Systems & IoT', 'Signal Processing', 'MATLAB & Proteus Simulations', 'RF & Microwave Engineering', 'Communication Systems'],
      skillLevels: [88, 82, 85, 75, 78, 65, 70],
      bgColor: 'bg-blue-600/5',
      borderColor: 'border-blue-500/20',
      students: '410+',
      courses: 22,
      avgSalary: '₹5–10 LPA',
      topCompanies: ['Intel', 'Qualcomm', 'Samsung', 'TI', 'MediaTek', 'Broadcom', 'NXP'],
      careerPaths: ['VLSI Engineer', 'Embedded Developer', 'Hardware Engineer', 'IoT Specialist', 'Design Verification', 'RF Engineer'],
      description: 'Explore electronics, VLSI design, and embedded systems for next-gen hardware innovation',
      demandTrend: '+18%',
      placementRate: 87,
      avgPackage: '₹7.2 LPA',
      topRoles: ['VLSI Engineer', 'Embedded Dev', 'IoT Engineer'],
      requiredSkills: ['Digital Electronics', 'Embedded C', 'Circuit Design', 'VLSI'],
      optionalSkills: ['Verilog/VHDL', 'FPGA', 'PCB Design', '5G Technology'],
      industryTools: ['Cadence', 'Synopsys', 'Xilinx', 'MATLAB', 'Proteus', 'ModelSim', 'LTSpice', 'Vivado'],
      certifications: ['ARM Embedded', 'Cadence Certified', 'VLSI Expert', 'IoT Professional'],
      projectExamples: ['Microcontroller Systems', 'VLSI Chip Design', 'IoT Smart Home', 'Signal Processor', 'FPGA Implementation', '5G Protocol Stack'],
      learningDuration: '18–24 months',
      difficultyLevel: 'Intermediate to Advanced',
      marketOutlook: 'Very Good — Growing rapidly with IoT & 5G revolution',
      salaryGrowth: ['Fresher: ₹4–6 LPA', '2–5 yrs: ₹7–14 LPA', '5+ yrs: ₹14–30 LPA'],
      topSkillsInDemand: ['VLSI Design', 'Embedded Systems', 'IoT', 'FPGA', '5G'],
      interviewTopics: ['Digital Circuits', 'Microprocessors', 'Communication Theory', 'Control Systems', 'VLSI Concepts'],
      hackathonAreas: ['Smart Devices', 'Wearable Tech', 'Industrial IoT', 'Smart Agriculture', 'Edge Computing'],
      researchDomains: ['5G/6G Communication', 'Neuromorphic Chips', 'Quantum Computing Hardware', 'Photonics'],
      alumniHighlight: { name: 'Arjun Mehta', role: 'VLSI Engineer at Intel', ctc: '₹28 LPA' },
      jobCount: '95K+',
      internshipRate: '74%',
      hotSkillBadge: '📡 5G Era Boom',
    },
    {
      icon: Zap,
      title: 'Electrical & Electronics (EEE)',
      shortName: 'EEE',
      category: 'core',
      color: 'from-blue-600 to-cyan-500',
      accentColor: 'blue',
      emoji: '⚡',
      skills: ['Power Systems & Generation', 'Electrical Machines & Drives', 'Control Systems & Automation', 'EV Technology & Smart Grids', 'MATLAB / PSCAD / ETAP', 'Renewable Energy Systems', 'Industrial Automation & PLC'],
      skillLevels: [85, 80, 82, 88, 75, 78, 70],
      bgColor: 'bg-blue-600/5',
      borderColor: 'border-blue-500/20',
      students: '320+',
      courses: 20,
      avgSalary: '₹5–11 LPA',
      topCompanies: ['Siemens', 'ABB', 'GE', 'L&T', 'BHEL', 'Schneider', 'Honeywell'],
      careerPaths: ['Power Engineer', 'Control Systems Engineer', 'EV Engineer', 'Grid Analyst', 'Energy Consultant', 'Automation Engineer'],
      description: 'Master electrical power, machines, and renewable energy for a sustainable electrified future',
      demandTrend: '+22%',
      placementRate: 85,
      avgPackage: '₹7.8 LPA',
      topRoles: ['Power Engineer', 'EV Engineer', 'Grid Analyst'],
      requiredSkills: ['Power Systems', 'Control Systems', 'Electrical Machines', 'Circuit Analysis'],
      optionalSkills: ['Renewable Energy', 'EV Technology', 'Smart Grids', 'PLC Programming'],
      industryTools: ['MATLAB', 'ETAP', 'PSCAD', 'AutoCAD Electrical', 'PLC Software', 'SCADA', 'LabVIEW'],
      certifications: ['PLC Certified', 'Power Systems Expert', 'EV Technology', 'Energy Management'],
      projectExamples: ['Smart Grid System', 'EV Charging Station', 'Renewable Energy System', 'Industrial Automation', 'Solar Power Design', 'Motor Drive Controller'],
      learningDuration: '18–24 months',
      difficultyLevel: 'Intermediate',
      marketOutlook: 'Excellent — Booming with EV & Renewable Energy revolution',
      salaryGrowth: ['Fresher: ₹4–6 LPA', '2–5 yrs: ₹8–16 LPA', '5+ yrs: ₹16–35 LPA'],
      topSkillsInDemand: ['EV Technology', 'Smart Grids', 'Renewable Energy', 'PLC', 'SCADA'],
      interviewTopics: ['Power Systems Analysis', 'Machines & Drives', 'Control Theory', 'Circuit Laws', 'Power Electronics'],
      hackathonAreas: ['EV & Mobility', 'Smart Grid', 'Energy Harvesting', 'Solar/Wind Systems', 'Microgrid Design'],
      researchDomains: ['Wide Bandgap Power Electronics', 'Grid Stability AI', 'EV Battery Management', 'Wireless Power Transfer'],
      alumniHighlight: { name: 'Pooja Reddy', role: 'EV Engineer at Tata Motors', ctc: '₹18 LPA' },
      jobCount: '1.1L+',
      internshipRate: '71%',
      hotSkillBadge: '⚡ EV Revolution',
    },
    {
      icon: Cog,
      title: 'Mechanical Engineering',
      shortName: 'MECH',
      category: 'core',
      color: 'from-blue-600 to-cyan-500',
      accentColor: 'blue',
      emoji: '⚙️',
      skills: ['CAD / CAM & Design', 'SolidWorks & CATIA', 'ANSYS & FEA Analysis', 'Manufacturing & Automation', 'Robotics & Mechatronics', 'Thermodynamics & Fluid Mechanics', 'Industry 4.0 & Digital Manufacturing'],
      skillLevels: [88, 85, 80, 75, 70, 82, 65],
      bgColor: 'bg-blue-600/5',
      borderColor: 'border-blue-500/20',
      students: '360+',
      courses: 19,
      avgSalary: '₹4–9 LPA',
      topCompanies: ['Bosch', 'Tata Motors', 'Mahindra', 'L&T', 'Ashok Leyland', 'Maruti', 'Hero'],
      careerPaths: ['Design Engineer', 'Production Engineer', 'CAD Specialist', 'Automation Engineer', 'Quality Engineer', 'R&D Engineer'],
      description: 'Design, analyze, and manufacture mechanical systems with industry-standard simulation tools',
      demandTrend: '+15%',
      placementRate: 83,
      avgPackage: '₹6.3 LPA',
      topRoles: ['Design Engineer', 'CAD Specialist', 'Production Eng'],
      requiredSkills: ['CAD Design', 'Thermodynamics', 'Manufacturing', 'Mechanics'],
      optionalSkills: ['FEA/CFD', 'Robotics', 'Automation', '3D Printing'],
      industryTools: ['SolidWorks', 'CATIA', 'ANSYS', 'AutoCAD', 'CREO', 'NX', 'Hypermesh', 'Mastercam'],
      certifications: ['SolidWorks Certified', 'CATIA Expert', 'ANSYS Professional', 'AutoCAD Mechanical'],
      projectExamples: ['Engine Design', 'Robotic Arm', 'Manufacturing System', 'Thermal Analysis', 'Drone Frame Design', 'Heat Exchanger Simulation'],
      learningDuration: '18–24 months',
      difficultyLevel: 'Intermediate',
      marketOutlook: 'Good — Growing strongly with Industry 4.0 & robotics',
      salaryGrowth: ['Fresher: ₹3–5 LPA', '2–5 yrs: ₹6–12 LPA', '5+ yrs: ₹12–25 LPA'],
      topSkillsInDemand: ['CAD/CAM', 'ANSYS', 'Robotics', 'Automation', 'FEA'],
      interviewTopics: ['Engineering Mechanics', 'Thermodynamics', 'Manufacturing Processes', 'Machine Design', 'Fluid Mechanics'],
      hackathonAreas: ['Drone Tech', 'Robotics Challenge', 'Sustainable Manufacturing', 'Smart Vehicles', '3D Printing Innovation'],
      researchDomains: ['Additive Manufacturing', 'Composite Materials', 'Bio-Mechanics', 'Advanced Robotics'],
      alumniHighlight: { name: 'Karan Singh', role: 'Design Lead at Bosch', ctc: '₹22 LPA' },
      jobCount: '1.3L+',
      internshipRate: '69%',
      hotSkillBadge: '🤖 Robotics Surge',
    },
    {
      icon: Building,
      title: 'Civil Engineering',
      shortName: 'CIVIL',
      category: 'core',
      color: 'from-blue-600 to-cyan-500',
      accentColor: 'blue',
      emoji: '🏗️',
      skills: ['AutoCAD & Structural Design', 'STAAD Pro & ETABS', 'Quantity Surveying & Estimation', 'Construction Management', 'Smart Cities & Sustainability', 'BIM & Revit Modeling', 'Geotechnical Engineering'],
      skillLevels: [90, 85, 78, 80, 72, 75, 68],
      bgColor: 'bg-blue-600/5',
      borderColor: 'border-blue-500/20',
      students: '290+',
      courses: 16,
      avgSalary: '₹4–8 LPA',
      topCompanies: ['L&T', 'Shapoorji', 'DLF', 'Tata Projects', 'GMR', 'Larsen & Toubro', 'ACC'],
      careerPaths: ['Structural Engineer', 'Site Engineer', 'Project Manager', 'Quantity Surveyor', 'Urban Planner', 'Construction Manager'],
      description: 'Build tomorrow\'s infrastructure with structural design, BIM modeling, and smart city planning',
      demandTrend: '+20%',
      placementRate: 80,
      avgPackage: '₹5.8 LPA',
      topRoles: ['Site Engineer', 'Structural Eng', 'Project Manager'],
      requiredSkills: ['AutoCAD', 'Structural Analysis', 'Construction Planning', 'Surveying'],
      optionalSkills: ['BIM', 'Project Management', 'GIS', 'Green Building'],
      industryTools: ['AutoCAD', 'STAAD Pro', 'ETABS', 'Revit', 'Primavera', 'MS Project', 'GIS/ArcMap', 'SAP2000'],
      certifications: ['AutoCAD Certified', 'PMP', 'STAAD Pro Expert', 'Revit BIM'],
      projectExamples: ['Bridge Design', 'Building Structure', 'Highway Planning', 'Smart City Infrastructure', 'Water Treatment Plant', 'Foundation Analysis'],
      learningDuration: '18–24 months',
      difficultyLevel: 'Beginner to Intermediate',
      marketOutlook: 'Very Good — Infrastructure boom across India & Middle East',
      salaryGrowth: ['Fresher: ₹3–5 LPA', '2–5 yrs: ₹5–10 LPA', '5+ yrs: ₹10–20 LPA'],
      topSkillsInDemand: ['AutoCAD', 'STAAD Pro', 'BIM', 'Project Management', 'Estimation'],
      interviewTopics: ['Structural Analysis', 'RCC Design', 'Surveying Concepts', 'Construction Materials', 'Soil Mechanics'],
      hackathonAreas: ['Smart Infrastructure', 'Green Buildings', 'Disaster-Resistant Structures', 'Urban Mobility', 'Sustainable Housing'],
      researchDomains: ['Smart Materials', 'Seismic Retrofitting', 'Net-Zero Buildings', 'Urban Resilience'],
      alumniHighlight: { name: 'Priya Nair', role: 'Project Manager at L&T', ctc: '₹16 LPA' },
      jobCount: '85K+',
      internshipRate: '66%',
      hotSkillBadge: '🏗️ Infra Boom',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Branches', icon: Target },
    { id: 'software', label: 'Software', icon: Code },
    { id: 'hardware', label: 'Hardware', icon: Cpu },
    { id: 'core', label: 'Core Engineering', icon: Cog },
  ];

  const getCardTab = (index: number): TabId => cardTab[index] || 'overview';

  const setTab = (index: number, tab: TabId) => {
    setCardTab(prev => ({ ...prev, [index]: tab }));
  };

  const toggleCompare = (index: number) => {
    setCompareList(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : prev.length < 2 ? [...prev, index] : prev
    );
  };

  const filteredBranches = branches.filter(branch => {
    const matchesCategory = filterCategory === 'all' || branch.category === filterCategory;
    const matchesSearch = searchQuery === '' ||
      branch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const overallStats = [
    { icon: Users, label: 'Active Students', value: '1,000+', color: 'from-blue-600 to-cyan-500', desc: 'across all branches' },
    { icon: BookOpen, label: 'Total Courses', value: '10+', color: 'from-blue-600 to-cyan-500', desc: 'industry-curated' },
    { icon: Briefcase, label: 'Placement Support', value: '100%', color: 'from-blue-600 to-cyan-500', desc: 'guaranteed support' },
    { icon: Award, label: 'Industry Certs', value: '24+', color: 'from-blue-600 to-cyan-500', desc: 'globally recognized' },
    { icon: Building2, label: 'Partner Companies', value: '10+', color: 'from-blue-600 to-cyan-500', desc: 'hiring partners' },
    { icon: Trophy, label: 'Avg CTC Achieved', value: '₹7.2 LPA', color: 'from-blue-600 to-cyan-500', desc: 'top placements' },
  ];

  const tabConfig: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'skills', label: 'Skills', icon: Lightbulb },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'tools', label: 'Tools', icon: Wrench },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-page-bg via-surface to-page-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F8A06_1px,transparent_1px),linear-gradient(to_bottom,#0B4F8A06_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



        {/* ── 6-stat overview row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {overallStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, y: -3 }}
              className="bg-card-bg border border-card-border rounded-xl p-4 text-center hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2 relative z-10" />
              <div className="text-xl text-heading mb-0.5 relative z-10 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-xs text-text-muted relative z-10 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Search + Filter + Compare bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search branches, skills, tools…"
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-surface-border rounded-lg text-text-secondary placeholder-slate-500 focus:outline-none focus:border-blue-500/60 text-sm"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                  filterCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-surface text-text-secondary border border-surface-border hover:border-blue-500/40 hover:text-heading'
                }`}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Compare toggle */}
          <button
            onClick={() => { setCompareMode(!compareMode); setCompareList([]); }}
            className={`px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              compareMode
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-surface border border-surface-border text-text-secondary hover:border-blue-500/50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {compareMode ? 'Cancel Compare' : 'Compare Branches'}
          </button>
        </motion.div>

        {compareMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-4 bg-blue-600/10 border border-blue-500/30 rounded-xl text-sm text-blue-300 flex items-center gap-3"
          >
            <SlidersHorizontal className="w-4 h-4 shrink-0" />
            Select any 2 branches to compare them side-by-side. Selected: {compareList.length}/2
            {compareList.length === 2 && (
              <span className="ml-auto text-cyan-400 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Ready — scroll down to see comparison
              </span>
            )}
          </motion.div>
        )}

        {/* ── Branch Cards Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filterCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
          >
            {filteredBranches.length === 0 ? (
              <div className="col-span-3 text-center py-20 text-text-muted">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No branches match your search. Try a different keyword.</p>
              </div>
            ) : filteredBranches.map((branch, index) => {
              const globalIndex = branches.indexOf(branch);
              const activeTab = getCardTab(globalIndex);
              const isSelected = compareList.includes(globalIndex);

              return (
                <motion.div
                  key={globalIndex}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className={`${branch.bgColor} backdrop-blur-sm ${branch.borderColor} border-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/15 transition-all cursor-pointer relative group ${
                    isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950' : ''
                  }`}
                >
                  {/* Compare checkbox */}
                  {compareMode && (
                    <button
                      onClick={() => toggleCompare(globalIndex)}
                      className={`absolute top-3 right-3 z-20 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-cyan-500 border-cyan-400 text-white'
                          : 'bg-surface border-slate-600 text-text-muted hover:border-cyan-400'
                      }`}
                    >
                      {isSelected && <CheckCircle className="w-4 h-4" />}
                    </button>
                  )}

                  {/* Hot badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="text-xs px-2 py-1 bg-surface/40 backdrop-blur-sm text-heading rounded-full border border-surface-border">
                      {branch.hotSkillBadge}
                    </span>
                  </div>

                  {/* ── Card Header ── */}
                  <div className={`pt-10 pb-5 px-5 bg-gradient-to-br ${branch.color} relative`}>
                    <div className="absolute inset-0 bg-surface/25" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-white/15 backdrop-blur-sm rounded-xl">
                          <branch.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg text-heading leading-tight">{branch.title}</h3>
                          <p className="text-xs text-white/70 mt-0.5">{branch.description}</p>
                        </div>
                      </div>

                      {/* Quick stats row */}
                      <div className="grid grid-cols-4 gap-1.5 mt-3">
                        {[
                          { label: 'Students', value: branch.students },
                          { label: 'Courses', value: `${branch.courses}+` },
                          { label: 'Placed', value: `${branch.placementRate}%` },
                          { label: 'Jobs', value: branch.jobCount },
                        ].map((s, si) => (
                          <div key={si} className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
                            <div className="text-white text-xs">{s.value}</div>
                            <div className="text-white/55 text-[10px]">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── Tabs ── */}
                  <div className="flex border-b border-card-border bg-surface/40">
                    {tabConfig.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setTab(globalIndex, tab.id)}
                        className={`flex-1 py-2 text-xs flex items-center justify-center gap-1 transition-all ${
                          activeTab === tab.id
                            ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-500/5'
                            : 'text-text-muted hover:text-heading hover:bg-surface/30'
                        }`}
                      >
                        <tab.icon className="w-3 h-3" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* ── Tab Content ── */}
                  <div className="p-5">

                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                      <div className="space-y-4">
                        {/* Metrics row */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-card-bg rounded-lg p-2.5 text-center border border-card-border">
                            <div className="flex items-center justify-center gap-1 mb-0.5">
                              <TrendingUp className="w-3 h-3 text-green-400" />
                              <span className="text-xs text-green-400">{branch.demandTrend}</span>
                            </div>
                            <div className="text-[10px] text-text-muted">YoY Demand</div>
                          </div>
                          <div className="bg-card-bg rounded-lg p-2.5 text-center border border-card-border">
                            <div className="flex items-center justify-center gap-1 mb-0.5">
                              <DollarSign className="w-3 h-3 text-cyan-400" />
                              <span className="text-xs text-cyan-400">{branch.avgPackage}</span>
                            </div>
                            <div className="text-[10px] text-text-muted">Avg CTC</div>
                          </div>
                          <div className="bg-card-bg rounded-lg p-2.5 text-center border border-card-border">
                            <div className="flex items-center justify-center gap-1 mb-0.5">
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span className="text-xs text-amber-400">{branch.learningDuration.split('–')[0]}</span>
                            </div>
                            <div className="text-[10px] text-text-muted">Min Months</div>
                          </div>
                        </div>

                        {/* Placement bar */}
                        <div>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-text-muted">Placement Rate</span>
                            <span className="text-blue-400">{branch.placementRate}%</span>
                          </div>
                          <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${branch.placementRate}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              viewport={{ once: true }}
                              className={`h-full rounded-full bg-gradient-to-r ${branch.color}`}
                            />
                          </div>
                        </div>

                        {/* Salary growth */}
                        <div className="bg-card-bg rounded-lg p-3 border border-card-border">
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <LineChart className="w-3 h-3" /> Salary Growth Path
                          </div>
                          {branch.salaryGrowth.map((g, i) => (
                            <div key={i} className="flex justify-between text-xs mb-1 last:mb-0">
                              <span className="text-text-muted">{g.split(':')[0]}</span>
                              <span className="text-green-400">{g.split(':')[1]}</span>
                            </div>
                          ))}
                        </div>

                        {/* Alumni highlight */}
                        <div className={`bg-gradient-to-r ${branch.color} bg-opacity-10 rounded-lg p-3 border border-blue-500/20`}>
                          <div className="text-[10px] text-text-muted mb-1 flex items-center gap-1">
                            <Trophy className="w-3 h-3 text-amber-400" /> Alumni Success
                          </div>
                          <div className="text-sm text-white">{branch.alumniHighlight.name}</div>
                          <div className="text-xs text-text-secondary">{branch.alumniHighlight.role}</div>
                          <div className="text-xs text-green-400 mt-0.5">Earning {branch.alumniHighlight.ctc}</div>
                        </div>

                        {/* Market outlook */}
                        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-2.5">
                          <div className="text-[10px] text-text-muted mb-1 flex items-center gap-1">
                            <BarChart className="w-3 h-3" /> Market Outlook
                          </div>
                          <p className="text-xs text-blue-300">{branch.marketOutlook}</p>
                        </div>
                      </div>
                    )}

                    {/* SKILLS TAB */}
                    {activeTab === 'skills' && (
                      <div className="space-y-3">
                        {/* Skill proficiency bars */}
                        <div className="space-y-2">
                          {branch.skills.map((skill, si) => (
                            <div key={si}>
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-text-secondary">{skill}</span>
                                <span className="text-text-muted">{branch.skillLevels[si]}%</span>
                              </div>
                              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${branch.skillLevels[si]}%` }}
                                  transition={{ duration: 0.8, delay: si * 0.08, ease: 'easeOut' }}
                                  viewport={{ once: true }}
                                  className={`h-full rounded-full bg-gradient-to-r ${branch.color}`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Trending skills */}
                        <div>
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-400" /> Trending Skills
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {branch.topSkillsInDemand.map((s, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 rounded-full border border-blue-500/30">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Interview topics */}
                        <div>
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <Target className="w-3 h-3" /> Interview Topics
                          </div>
                          <div className="space-y-1">
                            {branch.interviewTopics.map((t, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] text-text-muted">
                                <CheckCircle className="w-3 h-3 text-blue-400 shrink-0" />
                                {t}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CAREER TAB */}
                    {activeTab === 'career' && (
                      <div className="space-y-3">
                        {/* Top roles */}
                        <div>
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> Top Job Roles
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {branch.careerPaths.map((r, i) => (
                              <span key={i} className={`text-[11px] px-2.5 py-1 rounded-lg bg-gradient-to-r ${branch.color} bg-opacity-10 text-blue-300 border border-blue-500/20`}>
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Top companies */}
                        <div>
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <Building2 className="w-3 h-3" /> Top Recruiters
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {branch.topCompanies.map((c, i) => (
                              <span key={i} className="text-[11px] px-2 py-1 bg-surface text-text-secondary rounded border border-surface-border">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Hackathon areas */}
                        <div>
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <Rocket className="w-3 h-3" /> Hackathon Domains
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {branch.hackathonAreas.map((h, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 bg-surface text-text-muted rounded-full border border-surface-border">
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Research domains */}
                        <div>
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <Microscope className="w-3 h-3" /> Research Areas
                          </div>
                          <div className="space-y-1">
                            {branch.researchDomains.map((rd, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] text-text-muted">
                                <ArrowRight className="w-3 h-3 text-cyan-500 shrink-0" />
                                {rd}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Internship rate */}
                        <div className="bg-card-bg rounded-lg p-3 border border-card-border flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-text-muted">Internship Conversion</div>
                            <div className="text-sm text-cyan-400">{branch.internshipRate}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-text-muted">Open Job Roles</div>
                            <div className="text-sm text-blue-400">{branch.jobCount}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TOOLS TAB */}
                    {activeTab === 'tools' && (
                      <div className="space-y-3">
                        {/* Industry tools */}
                        <div>
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <Wrench className="w-3 h-3" /> Industry Tools You'll Learn
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {branch.industryTools.map((tool, i) => (
                              <div key={i} className="flex items-center gap-2 bg-surface rounded-lg p-2 border border-surface-border">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${branch.color} shrink-0`} />
                                <span className="text-[11px] text-text-secondary">{tool}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Certifications */}
                        <div>
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <Award className="w-3 h-3" /> Certifications You Can Earn
                          </div>
                          <div className="space-y-1.5">
                            {branch.certifications.map((cert, i) => (
                              <div key={i} className="flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5">
                                <BadgeCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                <span className="text-[11px] text-text-secondary">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sample projects */}
                        <div>
                          <div className="text-[10px] text-text-muted mb-2 flex items-center gap-1">
                            <Package className="w-3 h-3" /> Sample Projects
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {branch.projectExamples.map((proj, i) => (
                              <div key={i} className="bg-surface rounded-lg p-2 border border-surface-border text-[11px] text-text-muted">
                                {proj}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 pb-5">
                    <button
                      onClick={() => setExpandedBranch(globalIndex)}
                      className={`w-full py-2.5 rounded-lg bg-gradient-to-r ${branch.color} text-white text-sm hover:shadow-xl transition-all flex items-center justify-center gap-2 group`}
                    >
                      <span>Full Branch Details</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>

                  {/* Bottom glow bar */}
                  <div className={`h-0.5 w-full bg-gradient-to-r ${branch.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Branch Comparison Panel ── */}
        {compareMode && compareList.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14 bg-card-bg backdrop-blur-sm border border-blue-500/30 rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-card-border">
              <h3 className="text-xl text-heading flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-blue-400" />
                Branch Comparison
              </h3>
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-800">
              {/* Labels column */}
              <div className="p-6 space-y-5">
                {['Placement Rate', 'Avg Package', 'Demand Trend', 'Learning Duration', 'Difficulty', 'Job Market', 'Top Role'].map(label => (
                  <div key={label} className="h-8 flex items-center text-sm text-text-muted">{label}</div>
                ))}
              </div>
              {compareList.map(idx => {
                const b = branches[idx];
                return (
                  <div key={idx} className="p-6 space-y-5">
                    <div className="flex items-center gap-2 mb-4 -mt-2">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${b.color}`}>
                        <b.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-white">{b.shortName}</span>
                    </div>
                    {[
                      <span className="text-blue-400">{b.placementRate}%</span>,
                      <span className="text-green-400">{b.avgPackage}</span>,
                      <span className="text-cyan-400">{b.demandTrend}</span>,
                      <span className="text-amber-400">{b.learningDuration}</span>,
                      <span className="text-text-secondary">{b.difficultyLevel}</span>,
                      <span className="text-text-secondary text-xs">{b.jobCount} roles</span>,
                      <span className="text-text-secondary text-xs">{b.topRoles[0]}</span>,
                    ].map((val, vi) => (
                      <div key={vi} className="h-8 flex items-center text-sm">{val}</div>
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Why EduPulseX Feature Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-14"
        >
          {[
            {
              icon: BookOpen,
              title: 'Comprehensive Curriculum',
              description: 'From fundamentals to advanced topics with hands-on projects and real-world applications',
              color: 'from-blue-600 to-cyan-500',
              points: ['Core subject mastery', 'Live industry projects', 'Research-grade content'],
            },
            {
              icon: TrendingUp,
              title: 'Industry-Aligned Skills',
              description: 'Learn tools, technologies, and methodologies used by top companies worldwide',
              color: 'from-blue-600 to-cyan-500',
              points: ['Latest tech stack', 'Soft skills training', 'Mock interviews'],
            },
            {
              icon: Briefcase,
              title: '100% Placement Support',
              description: 'Interview prep, resume building, mock interviews, and direct company connections',
              color: 'from-blue-600 to-cyan-500',
              points: ['1-on-1 mentorship', 'HR interview prep', 'Job referrals'],
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="bg-gradient-to-br from-slate-900/60 to-slate-800/30 border border-card-border rounded-xl p-6 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/15 transition-all relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4 shadow-lg relative z-10`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base text-heading mb-2 relative z-10">{feature.title}</h3>
              <p className="text-sm text-text-muted mb-4 relative z-10">{feature.description}</p>
              <ul className="space-y-1 relative z-10">
                {feature.points.map((pt, pi) => (
                  <li key={pi} className="flex items-center gap-2 text-xs text-text-muted">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900/25 to-cyan-900/20 rounded-2xl border border-blue-500/30 p-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-full text-xs mb-5">
            <Compass className="w-3.5 h-3.5" />
            Free Career Guidance Session
          </div>
          <h3 className="text-3xl text-heading mb-3">
            Not Sure Which Branch to Choose?
          </h3>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-sm">
            Book a free 1-on-1 counseling session with our career experts. We'll map your
            strengths and interests to the perfect engineering pathway.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform hover:scale-105 flex items-center gap-2 text-sm">
              <PlayCircle className="w-5 h-5" />
              Book Free Counseling
            </button>
            <button className="px-8 py-3.5 bg-surface border border-surface-border text-text-secondary rounded-lg hover:bg-surface hover:border-blue-500/50 transition-all flex items-center gap-2 text-sm">
              <Download className="w-5 h-5" />
              Download Branch Guide
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Expanded Branch Modal ── */}
      <AnimatePresence>
        {expandedBranch !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-0 sm:p-4"
            onClick={() => setExpandedBranch(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              onClick={e => e.stopPropagation()}
              className="bg-surface sm:rounded-2xl max-w-5xl w-full h-full sm:h-auto sm:max-h-[92vh] overflow-y-auto border border-card-border shadow-2xl"
            >
              {branches[expandedBranch] && (() => {
                const b = branches[expandedBranch];
                const Icon = b.icon;
                return (
                  <div>
                    {/* Modal header */}
                    <div className={`p-5 sm:p-8 bg-gradient-to-br ${b.color} relative`}>
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="relative z-10 flex items-start justify-between gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                          <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                          </div>
                          <div>
                            <div className="text-sm text-white/60 mb-1">{b.hotSkillBadge}</div>
                            <h3 className="text-3xl text-heading mb-1">{b.title}</h3>
                            <p className="text-white/75 text-sm">{b.description}</p>
                          </div>
                        </div>
                        <button onClick={() => setExpandedBranch(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>

                      {/* Header stats */}
                      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
                        {[
                          { i: 0, label: 'Students', value: b.students },
                          { i: 1, label: 'Avg CTC', value: b.avgPackage },
                          { i: 2, label: 'Placement', value: `${b.placementRate}%` },
                          { i: 3, label: 'Job Demand', value: b.demandTrend },
                          { i: 4, label: 'Open Jobs', value: b.jobCount },
                        ].map((s) => (
                          <div key={s.i} className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 text-center">
                            <div className="text-base sm:text-xl text-heading mb-0.5 sm:mb-1">{s.value}</div>
                            <div className="text-white/55 text-[10px] sm:text-[11px]">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Modal body */}
                    <div className="p-5 sm:p-8 grid md:grid-cols-2 gap-8">

                      {/* All Skills with bars */}
                      <div>
                        <h4 className="text-lg text-heading mb-4 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Skills & Proficiency
                        </h4>
                        <div className="space-y-3">
                          {b.skills.map((skill, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-text-secondary">{skill}</span>
                                <span className="text-text-muted">{b.skillLevels[i]}%</span>
                              </div>
                              <div className="h-2 bg-surface rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${b.skillLevels[i]}%` }}
                                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                                  className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Required + Optional */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-base text-heading mb-3 flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-400" /> Required Skills
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {b.requiredSkills.map((s, i) => (
                              <div key={i} className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 text-xs text-text-secondary">{s}</div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base text-heading mb-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Optional/Bonus Skills
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {b.optionalSkills.map((s, i) => (
                              <div key={i} className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2.5 text-xs text-text-secondary">{s}</div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Industry Tools */}
                      <div>
                        <h4 className="text-base text-heading mb-3 flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Industry Tools
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {b.industryTools.map((tool, i) => (
                            <div key={i} className="flex items-center gap-2 bg-surface rounded-lg p-2.5 border border-surface-border">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${b.color}`} />
                              <span className="text-xs text-text-secondary">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h4 className="text-base text-heading mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-400" /> Industry Certifications
                        </h4>
                        <div className="space-y-2">
                          {b.certifications.map((cert, i) => (
                            <div key={i} className="flex items-center gap-3 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-500/25 rounded-lg p-3">
                              <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span className="text-sm text-text-secondary">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Career Paths */}
                      <div>
                        <h4 className="text-base text-heading mb-3 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-emerald-400" /> Career Paths
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {b.careerPaths.map((path, i) => (
                            <div key={i} className={`bg-gradient-to-br ${b.color} bg-opacity-10 border border-blue-500/25 rounded-lg p-2.5 text-center`}>
                              <span className="text-xs text-blue-600 dark:text-blue-300">{path}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Projects */}
                      <div>
                        <h4 className="text-base text-heading mb-3 flex items-center gap-2">
                          <Package className="w-4 h-4 text-cyan-400" /> Sample Projects
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {b.projectExamples.map((proj, i) => (
                            <div key={i} className="bg-surface border border-surface-border rounded-lg p-3 hover:border-blue-500/40 transition-all">
                              <div className="flex items-start gap-2">
                                <div className={`w-2 h-2 rounded-full mt-1 bg-gradient-to-r ${b.color} shrink-0`} />
                                <span className="text-xs text-text-secondary">{proj}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Salary growth */}
                      <div>
                        <h4 className="text-base text-heading mb-3 flex items-center gap-2">
                          <LineChart className="w-4 h-4 text-green-400" /> Salary Growth Timeline
                        </h4>
                        <div className="space-y-3">
                          {b.salaryGrowth.map((g, i) => {
                            const bars = [60, 80, 100];
                            return (
                              <div key={i}>
                                <div className="flex justify-between text-xs mb-1.5">
                                  <span className="text-text-muted">{g.split(':')[0]}</span>
                                  <span className="text-green-400">{g.split(':')[1]}</span>
                                </div>
                                <div className="h-2 bg-surface rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${bars[i]}%` }}
                                    transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
                                    className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-400"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interview + Research */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-base text-heading mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-amber-400" /> Interview Topics
                          </h4>
                          <div className="space-y-1.5">
                            {b.interviewTopics.map((t, i) => (
                              <div key={i} className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-xs text-text-secondary">
                                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                {t}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base text-heading mb-3 flex items-center gap-2">
                            <Microscope className="w-4 h-4 text-purple-400" /> Research Domains
                          </h4>
                          <div className="space-y-1.5">
                            {b.researchDomains.map((rd, i) => (
                              <div key={i} className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2 text-xs text-text-secondary">
                                <Atom className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                {rd}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Market outlook banner */}
                    <div className="mx-8 mb-8 bg-gradient-to-r from-blue-600/15 to-cyan-500/15 border border-blue-500/30 rounded-xl p-5 flex items-start gap-4">
                      <BarChart className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-heading dark:text-white mb-1">Market Outlook</div>
                        <p className="text-sm text-blue-600 dark:text-blue-300">{b.marketOutlook}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                          <span className="text-xs text-text-secondary">
                            Alumni spotlight: <span className="text-heading dark:text-white">{b.alumniHighlight.name}</span> — {b.alumniHighlight.role} earning <span className="text-green-600 dark:text-green-400">{b.alumniHighlight.ctc}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
