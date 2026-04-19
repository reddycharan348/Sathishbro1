import {
  Briefcase, Search, X, ChevronDown, TrendingUp,
  DollarSign, Building, MapPin, Star, Zap, ArrowUpRight,
  Code, Cpu, Brain, Wrench, Building2, BadgeCheck,
  Clock, Target, Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo, memo } from 'react';

/* ───────────── constants ───────────── */
const BRANCH_ICONS: Record<string, React.ElementType> = {
  'CSE': Code, 'CSE AI & DS': Brain, 'CSE AI & ML': Brain,
  'ECE': Cpu, 'VLSI': Cpu, 'EEE': Zap, 'MEC': Wrench, 'CIVIL': Building2,
};

const DEMAND_META = {
  High:     { cls: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/25',  dot: 'bg-blue-600 dark:bg-blue-400',  label: 'High Demand'   },
  Medium:   { cls: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/25',  dot: 'bg-cyan-600 dark:bg-cyan-400',  label: 'Steady Demand' },
  Emerging: { cls: 'text-blue-500 dark:text-blue-300 bg-blue-400/10 border-blue-400/20',  dot: 'bg-blue-500 dark:bg-blue-300',  label: 'Emerging'      },
};

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: 'openings', label: 'Most Openings'  },
  { value: 'salary',   label: 'Highest Salary' },
  { value: 'title',    label: 'A → Z'          },
];

/* ───────────── data ───────────── */
const JOB_ROLES = [
  // ── CSE ──
  { id: 1,  title: 'Full Stack Developer',        branch: 'CSE',        salary: '₹6–12 LPA',  salaryMax: 12, experience: '0–2 yrs',  skills: ['React', 'Node.js', 'MongoDB', 'Express'],            companies: ['Google', 'Microsoft', 'Amazon'],         openings: 500,  type: 'Software Dev',    demand: 'High',     desc: 'Build end-to-end web apps with modern JS stacks.',        link: 'https://www.linkedin.com/jobs/search/?keywords=Full+Stack+Developer' },
  { id: 2,  title: 'Backend Developer',           branch: 'CSE',        salary: '₹5–10 LPA',  salaryMax: 10, experience: '0–2 yrs',  skills: ['Java', 'Spring Boot', 'MySQL', 'REST API'],          companies: ['Flipkart', 'PayTM', 'Swiggy'],           openings: 400,  type: 'Software Dev',    demand: 'High',     desc: 'Design scalable server-side systems and APIs.',           link: 'https://www.linkedin.com/jobs/search/?keywords=Backend+Developer' },
  { id: 3,  title: 'Frontend Developer',          branch: 'CSE',        salary: '₹5–9 LPA',   salaryMax: 9,  experience: '0–2 yrs',  skills: ['HTML/CSS', 'JavaScript', 'React', 'Vue.js'],         companies: ['Zomato', 'OLA', 'BookMyShow'],           openings: 350,  type: 'Software Dev',    demand: 'High',     desc: 'Create responsive, pixel-perfect UIs.',                   link: 'https://www.linkedin.com/jobs/search/?keywords=Frontend+Developer' },
  { id: 4,  title: 'DevOps Engineer',             branch: 'CSE',        salary: '₹7–14 LPA',  salaryMax: 14, experience: '1–3 yrs',  skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],              companies: ['Amazon', 'Microsoft', 'Google'],         openings: 200,  type: 'Cloud & DevOps',  demand: 'High',     desc: 'Automate deployments and manage cloud infrastructure.',   link: 'https://www.linkedin.com/jobs/search/?keywords=DevOps+Engineer' },
  { id: 5,  title: 'Cloud Engineer',              branch: 'CSE',        salary: '₹6–13 LPA',  salaryMax: 13, experience: '0–2 yrs',  skills: ['AWS', 'Azure', 'GCP', 'Terraform'],                  companies: ['TCS', 'Infosys', 'Wipro'],               openings: 300,  type: 'Cloud & DevOps',  demand: 'High',     desc: 'Architect and manage scalable cloud solutions.',          link: 'https://www.linkedin.com/jobs/search/?keywords=Cloud+Engineer' },
  { id: 6,  title: 'Cybersecurity Analyst',       branch: 'CSE',        salary: '₹6–12 LPA',  salaryMax: 12, experience: '0–2 yrs',  skills: ['Ethical Hacking', 'SIEM', 'Firewall', 'Pentest'],    companies: ['Cisco', 'Palo Alto', 'CrowdStrike'],     openings: 150,  type: 'Security',        demand: 'High',     desc: 'Protect systems from cyber threats and vulnerabilities.', link: 'https://www.linkedin.com/jobs/search/?keywords=Cybersecurity+Analyst' },
  { id: 7,  title: 'Mobile App Developer',        branch: 'CSE',        salary: '₹5–11 LPA',  salaryMax: 11, experience: '0–2 yrs',  skills: ['React Native', 'Flutter', 'Android', 'iOS'],         companies: ['Swiggy', 'Zomato', 'PhonePe'],           openings: 250,  type: 'Mobile Dev',      demand: 'High',     desc: 'Build cross-platform mobile apps for Android and iOS.',   link: 'https://www.linkedin.com/jobs/search/?keywords=Mobile+App+Developer' },
  { id: 8,  title: 'Blockchain Developer',        branch: 'CSE',        salary: '₹8–15 LPA',  salaryMax: 15, experience: '1–3 yrs',  skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3'],   companies: ['Polygon', 'Coinbase', 'WazirX'],         openings: 80,   type: 'Emerging Tech',   demand: 'Emerging', desc: 'Build decentralized apps and smart contract systems.',    link: 'https://www.linkedin.com/jobs/search/?keywords=Blockchain+Developer' },
  { id: 9,  title: 'UI/UX Designer',              branch: 'CSE',        salary: '₹5–10 LPA',  salaryMax: 10, experience: '0–2 yrs',  skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'], companies: ['Adobe', 'Canva', 'Freshworks'],           openings: 200,  type: 'Design',          demand: 'Medium',   desc: 'Design intuitive, beautiful product experiences.',        link: 'https://www.linkedin.com/jobs/search/?keywords=UI+UX+Designer' },
  { id: 10, title: 'Site Reliability Engineer',   branch: 'CSE',        salary: '₹9–16 LPA',  salaryMax: 16, experience: '1–3 yrs',  skills: ['SRE', 'Monitoring', 'Kubernetes', 'Python'],         companies: ['Google', 'Netflix', 'LinkedIn'],         openings: 120,  type: 'Cloud & DevOps',  demand: 'High',     desc: 'Ensure reliability and performance of large-scale systems.',link: 'https://www.linkedin.com/jobs/search/?keywords=Site+Reliability+Engineer' },
  { id: 11, title: 'Database Administrator',      branch: 'CSE',        salary: '₹5–10 LPA',  salaryMax: 10, experience: '1–3 yrs',  skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],          companies: ['Oracle', 'IBM', 'SAP'],                  openings: 100,  type: 'Database',        demand: 'Medium',   desc: 'Design, manage, and optimize database systems.',          link: 'https://www.linkedin.com/jobs/search/?keywords=Database+Administrator' },
  { id: 12, title: 'Technical Support Engineer',  branch: 'CSE',        salary: '₹3–6 LPA',   salaryMax: 6,  experience: '0–1 yrs',  skills: ['Troubleshooting', 'Ticketing', 'Linux', 'Networking'], companies: ['HP', 'Dell', 'Lenovo'],                  openings: 500,  type: 'IT Support',      demand: 'Medium',   desc: 'Resolve technical issues and support enterprise clients.', link: 'https://www.linkedin.com/jobs/search/?keywords=Technical+Support+Engineer' },
  // ── CSE AI & DS ──
  { id: 13, title: 'Machine Learning Engineer',   branch: 'CSE AI & DS', salary: '₹8–16 LPA', salaryMax: 16, experience: '0–2 yrs',  skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn'],   companies: ['Google', 'Microsoft', 'Amazon'],         openings: 300,  type: 'AI & ML',         demand: 'High',     desc: 'Build and deploy production-grade ML models.',            link: 'https://www.linkedin.com/jobs/search/?keywords=Machine+Learning+Engineer' },
  { id: 14, title: 'Data Scientist',              branch: 'CSE AI & DS', salary: '₹7–15 LPA', salaryMax: 15, experience: '0–2 yrs',  skills: ['Python', 'R', 'SQL', 'Statistics'],                  companies: ['Flipkart', 'PayTM', 'Walmart Labs'],     openings: 400,  type: 'Data Science',    demand: 'High',     desc: 'Extract insights from data to drive business decisions.',  link: 'https://www.linkedin.com/jobs/search/?keywords=Data+Scientist' },
  { id: 15, title: 'Data Analyst',                branch: 'CSE AI & DS', salary: '₹5–10 LPA', salaryMax: 10, experience: '0–2 yrs',  skills: ['Excel', 'SQL', 'Tableau', 'Power BI'],               companies: ['Deloitte', 'EY', 'PwC'],                 openings: 500,  type: 'Analytics',       demand: 'High',     desc: 'Analyze datasets and visualize business insights.',        link: 'https://www.linkedin.com/jobs/search/?keywords=Data+Analyst' },
  { id: 16, title: 'AI Research Engineer',        branch: 'CSE AI & DS', salary: '₹10–20 LPA',salaryMax: 20, experience: '1–3 yrs',  skills: ['Deep Learning', 'NLP', 'Computer Vision', 'Research'],companies: ['OpenAI', 'DeepMind', 'Meta AI'],         openings: 100,  type: 'Research',        demand: 'Emerging', desc: 'Develop state-of-the-art AI algorithms and models.',       link: 'https://www.linkedin.com/jobs/search/?keywords=AI+Research+Engineer' },
  { id: 17, title: 'NLP Engineer',                branch: 'CSE AI & DS', salary: '₹8–15 LPA', salaryMax: 15, experience: '0–2 yrs',  skills: ['NLP', 'BERT', 'Transformers', 'spaCy'],              companies: ['Google', 'Amazon', 'Microsoft'],         openings: 200,  type: 'AI & ML',         demand: 'High',     desc: 'Build language understanding and text processing systems.', link: 'https://www.linkedin.com/jobs/search/?keywords=NLP+Engineer' },
  { id: 18, title: 'Computer Vision Engineer',    branch: 'CSE AI & DS', salary: '₹8–16 LPA', salaryMax: 16, experience: '1–3 yrs',  skills: ['OpenCV', 'YOLO', 'CNN', 'Image Processing'],         companies: ['Tesla', 'NVIDIA', 'Intel'],              openings: 150,  type: 'Computer Vision', demand: 'High',     desc: 'Develop vision models for detection and segmentation.',    link: 'https://www.linkedin.com/jobs/search/?keywords=Computer+Vision+Engineer' },
  { id: 19, title: 'MLOps Engineer',              branch: 'CSE AI & DS', salary: '₹8–15 LPA', salaryMax: 15, experience: '1–3 yrs',  skills: ['MLflow', 'Kubernetes', 'Docker', 'CI/CD'],           companies: ['Databricks', 'AWS', 'Azure ML'],         openings: 120,  type: 'MLOps',           demand: 'High',     desc: 'Operationalize ML pipelines from research to production.', link: 'https://www.linkedin.com/jobs/search/?keywords=MLOps+Engineer' },
  { id: 20, title: 'Big Data Engineer',           branch: 'CSE AI & DS', salary: '₹7–14 LPA', salaryMax: 14, experience: '1–3 yrs',  skills: ['Hadoop', 'Spark', 'Kafka', 'Hive'],                  companies: ['Cloudera', 'MapR', 'HCL'],               openings: 250,  type: 'Big Data',        demand: 'Medium',   desc: 'Process and manage petabyte-scale datasets.',             link: 'https://www.linkedin.com/jobs/search/?keywords=Big+Data+Engineer' },
  { id: 21, title: 'Business Intelligence Analyst',branch: 'CSE AI & DS',salary: '₹6–12 LPA', salaryMax: 12, experience: '0–2 yrs',  skills: ['Power BI', 'Tableau', 'SQL', 'Data Warehousing'],    companies: ['Accenture', 'Deloitte', 'KPMG'],         openings: 300,  type: 'Analytics',       demand: 'Medium',   desc: 'Create dashboards and reports for strategic decisions.',   link: 'https://www.linkedin.com/jobs/search/?keywords=Business+Intelligence+Analyst' },
  { id: 22, title: 'Quantitative Analyst',        branch: 'CSE AI & DS', salary: '₹10–18 LPA',salaryMax: 18, experience: '0–2 yrs',  skills: ['Python', 'Statistics', 'Financial Modeling', 'Maths'], companies: ['Goldman Sachs', 'Morgan Stanley', 'JP Morgan'], openings: 80, type: 'Finance',        demand: 'Emerging', desc: 'Apply math and ML to financial market strategies.',        link: 'https://www.linkedin.com/jobs/search/?keywords=Quantitative+Analyst' },
  // ── CSE AI & ML ──
  { id: 23, title: 'Deep Learning Engineer',      branch: 'CSE AI & ML', salary: '₹9–17 LPA', salaryMax: 17, experience: '1–3 yrs',  skills: ['PyTorch', 'TensorFlow', 'Neural Networks', 'CUDA'],  companies: ['NVIDIA', 'Intel', 'AMD'],                openings: 200,  type: 'Deep Learning',   demand: 'High',     desc: 'Design deep neural nets for vision, NLP, and GenAI.',     link: 'https://www.linkedin.com/jobs/search/?keywords=Deep+Learning+Engineer' },
  { id: 24, title: 'AI Product Manager',          branch: 'CSE AI & ML', salary: '₹10–20 LPA',salaryMax: 20, experience: '2–4 yrs',  skills: ['Product Management', 'AI/ML', 'Agile', 'Strategy'],  companies: ['Google', 'Meta', 'Amazon'],              openings: 100,  type: 'Product',         demand: 'Emerging', desc: 'Drive AI product roadmaps from concept to launch.',       link: 'https://www.linkedin.com/jobs/search/?keywords=AI+Product+Manager' },
  { id: 25, title: 'Robotics Engineer',           branch: 'CSE AI & ML', salary: '₹8–15 LPA', salaryMax: 15, experience: '1–3 yrs',  skills: ['ROS', 'Computer Vision', 'Control Systems', 'Python'],companies: ['Boston Dynamics', 'ABB', 'KUKA'],        openings: 80,   type: 'Robotics',        demand: 'Emerging', desc: 'Build autonomous robots with perception and navigation.', link: 'https://www.linkedin.com/jobs/search/?keywords=Robotics+Engineer' },
  { id: 26, title: 'Autonomous Systems Engineer', branch: 'CSE AI & ML', salary: '₹10–18 LPA',salaryMax: 18, experience: '1–3 yrs',  skills: ['Self-Driving', 'SLAM', 'Sensor Fusion', 'Deep Learning'],companies: ['Tesla', 'Waymo', 'Cruise'],             openings: 50,   type: 'Autonomous',      demand: 'Emerging', desc: 'Develop perception and planning for self-driving systems.',link: 'https://www.linkedin.com/jobs/search/?keywords=Autonomous+Systems+Engineer' },
  { id: 27, title: 'Reinforcement Learning Engineer',branch:'CSE AI & ML',salary:'₹10–18 LPA',salaryMax: 18, experience: '1–3 yrs',  skills: ['RL Algorithms', 'OpenAI Gym', 'PyTorch', 'Game AI'],  companies: ['DeepMind', 'OpenAI', 'Meta'],            openings: 60,   type: 'RL',              demand: 'Emerging', desc: 'Train agents to solve sequential decision-making tasks.',  link: 'https://www.linkedin.com/jobs/search/?keywords=Reinforcement+Learning+Engineer' },
  { id: 28, title: 'AI Solutions Architect',      branch: 'CSE AI & ML', salary: '₹12–22 LPA',salaryMax: 22, experience: '2–5 yrs',  skills: ['AI/ML', 'Cloud Architecture', 'System Design', 'Consulting'],companies: ['AWS', 'Azure', 'GCP'],              openings: 100,  type: 'Architecture',    demand: 'High',     desc: 'Design enterprise AI systems and cloud ML platforms.',    link: 'https://www.linkedin.com/jobs/search/?keywords=AI+Solutions+Architect' },
  { id: 29, title: 'Conversational AI Developer', branch: 'CSE AI & ML', salary: '₹7–14 LPA', salaryMax: 14, experience: '0–2 yrs',  skills: ['Chatbots', 'Dialogflow', 'RASA', 'LLMs'],            companies: ['Amazon', 'Google', 'Microsoft'],         openings: 150,  type: 'Conversational AI',demand: 'High',    desc: 'Build voice and chat AI experiences using LLMs.',         link: 'https://www.linkedin.com/jobs/search/?keywords=Conversational+AI+Developer' },
  { id: 30, title: 'Speech Recognition Engineer', branch: 'CSE AI & ML', salary: '₹7–14 LPA', salaryMax: 14, experience: '0–2 yrs',  skills: ['ASR', 'Speech Processing', 'Deep Learning', 'Audio'], companies: ['Amazon Alexa', 'Google', 'Apple'],       openings: 100,  type: 'Speech AI',       demand: 'Medium',   desc: 'Build ASR systems for voice assistants and accessibility.',link: 'https://www.linkedin.com/jobs/search/?keywords=Speech+Recognition+Engineer' },
  // ── ECE ──
  { id: 31, title: 'VLSI Design Engineer',        branch: 'ECE',         salary: '₹6–12 LPA', salaryMax: 12, experience: '0–2 yrs',  skills: ['Verilog', 'VHDL', 'FPGA', 'ASIC'],                  companies: ['Intel', 'Qualcomm', 'Broadcom'],         openings: 200,  type: 'VLSI',            demand: 'High',     desc: 'Design digital chips from RTL to GDSII.',                 link: 'https://www.linkedin.com/jobs/search/?keywords=VLSI+Design+Engineer' },
  { id: 32, title: 'Embedded Systems Engineer',   branch: 'ECE',         salary: '₹5–11 LPA', salaryMax: 11, experience: '0–2 yrs',  skills: ['C', 'C++', 'Microcontrollers', 'RTOS'],              companies: ['Bosch', 'Continental', 'Denso'],         openings: 300,  type: 'Embedded',        demand: 'High',     desc: 'Program firmware and real-time systems for hardware.',    link: 'https://www.linkedin.com/jobs/search/?keywords=Embedded+Systems+Engineer' },
  { id: 33, title: 'RF & Wireless Engineer',      branch: 'ECE',         salary: '₹6–13 LPA', salaryMax: 13, experience: '1–3 yrs',  skills: ['RF Design', 'Antenna', '5G', 'Signal Processing'],   companies: ['Qualcomm', 'Ericsson', 'Nokia'],         openings: 150,  type: 'RF & Wireless',   demand: 'High',     desc: 'Design RF circuits for 5G, WiFi, and radar systems.',     link: 'https://www.linkedin.com/jobs/search/?keywords=RF+Engineer' },
  { id: 34, title: 'Telecom Engineer',            branch: 'ECE',         salary: '₹5–10 LPA', salaryMax: 10, experience: '0–2 yrs',  skills: ['5G NR', 'LTE', 'Network Planning', 'Protocols'],     companies: ['Jio', 'Airtel', 'Vi'],                  openings: 250,  type: 'Telecom',         demand: 'Medium',   desc: 'Plan and optimize 4G/5G cellular networks.',              link: 'https://www.linkedin.com/jobs/search/?keywords=Telecom+Engineer' },
  { id: 35, title: 'Signal Processing Engineer',  branch: 'ECE',         salary: '₹6–12 LPA', salaryMax: 12, experience: '0–2 yrs',  skills: ['DSP', 'MATLAB', 'FFT', 'Filter Design'],             companies: ['TI', 'Analog Devices', 'NXP'],           openings: 120,  type: 'Signal Processing',demand: 'Medium',   desc: 'Develop algorithms for audio, image, and radar signals.',  link: 'https://www.linkedin.com/jobs/search/?keywords=Signal+Processing+Engineer' },
  { id: 36, title: 'Hardware Design Engineer',    branch: 'ECE',         salary: '₹5–11 LPA', salaryMax: 11, experience: '0–2 yrs',  skills: ['PCB Design', 'Altium', 'Schematic', 'Testing'],      companies: ['Samsung', 'LG', 'Sony'],                 openings: 200,  type: 'Hardware',        demand: 'Medium',   desc: 'Design PCBs and hardware circuits for electronic products.',link: 'https://www.linkedin.com/jobs/search/?keywords=Hardware+Design+Engineer' },
  { id: 37, title: 'IoT Engineer',                branch: 'ECE',         salary: '₹5–11 LPA', salaryMax: 11, experience: '0–2 yrs',  skills: ['IoT Protocols', 'Embedded', 'Cloud', 'Sensors'],     companies: ['Bosch', 'Siemens', 'GE'],                openings: 250,  type: 'IoT',             demand: 'High',     desc: 'Connect devices to cloud platforms using IoT protocols.', link: 'https://www.linkedin.com/jobs/search/?keywords=IoT+Engineer' },
  { id: 38, title: 'Optical Communication Engineer',branch:'ECE',         salary: '₹6–12 LPA', salaryMax: 12, experience: '1–3 yrs',  skills: ['Fiber Optics', 'Photonics', 'WDM', 'DWDM'],          companies: ['Ciena', 'Corning', 'Infinera'],          openings: 80,   type: 'Optical',         demand: 'Medium',   desc: 'Design fiber optic links for high-speed communication.',   link: 'https://www.linkedin.com/jobs/search/?keywords=Optical+Communication+Engineer' },
  // ── VLSI ──
  { id: 39, title: 'Physical Design Engineer',    branch: 'VLSI',        salary: '₹7–14 LPA', salaryMax: 14, experience: '0–2 yrs',  skills: ['Cadence', 'Synopsys', 'Place & Route', 'Timing'],    companies: ['Intel', 'Qualcomm', 'NVIDIA'],           openings: 150,  type: 'Physical Design', demand: 'High',     desc: 'Convert gate-level netlists to chip layouts meeting timing.',link: 'https://www.linkedin.com/jobs/search/?keywords=Physical+Design+Engineer' },
  { id: 40, title: 'Verification Engineer',       branch: 'VLSI',        salary: '₹6–13 LPA', salaryMax: 13, experience: '0–2 yrs',  skills: ['SystemVerilog', 'UVM', 'Simulation', 'Assertion'],   companies: ['AMD', 'Broadcom', 'Marvell'],             openings: 200,  type: 'Verification',    demand: 'High',     desc: 'Verify chip functionality using constrained-random methods.',link: 'https://www.linkedin.com/jobs/search/?keywords=Chip+Verification+Engineer' },
  { id: 41, title: 'RTL Design Engineer',         branch: 'VLSI',        salary: '₹6–12 LPA', salaryMax: 12, experience: '0–2 yrs',  skills: ['Verilog', 'VHDL', 'RTL Coding', 'Synthesis'],       companies: ['Intel', 'Samsung', 'TSMC'],              openings: 180,  type: 'RTL Design',      demand: 'High',     desc: 'Write synthesizable RTL code for digital logic blocks.',  link: 'https://www.linkedin.com/jobs/search/?keywords=RTL+Design+Engineer' },
  { id: 42, title: 'ASIC Design Engineer',        branch: 'VLSI',        salary: '₹7–15 LPA', salaryMax: 15, experience: '1–3 yrs',  skills: ['ASIC Design', 'Low Power', 'Clock Domain', 'Synthesis'],companies: ['Qualcomm', 'Broadcom', 'Intel'],         openings: 120,  type: 'ASIC',            demand: 'High',     desc: 'Design full-custom application-specific integrated circuits.',link: 'https://www.linkedin.com/jobs/search/?keywords=ASIC+Design+Engineer' },
  { id: 43, title: 'DFT Engineer',                branch: 'VLSI',        salary: '₹6–13 LPA', salaryMax: 13, experience: '0–2 yrs',  skills: ['DFT', 'ATPG', 'BIST', 'Scan Insertion'],            companies: ['Intel', 'AMD', 'NVIDIA'],                openings: 100,  type: 'DFT',             demand: 'Medium',   desc: 'Insert testability structures to improve chip yield.',    link: 'https://www.linkedin.com/jobs/search/?keywords=DFT+Engineer+VLSI' },
  { id: 44, title: 'Analog Design Engineer',      branch: 'VLSI',        salary: '₹7–14 LPA', salaryMax: 14, experience: '1–3 yrs',  skills: ['Analog Circuit', 'SPICE', 'Layout', 'Characterization'],companies: ['TI', 'Analog Devices', 'Maxim'],         openings: 80,   type: 'Analog',          demand: 'Medium',   desc: 'Design high-performance analog and mixed-signal circuits.', link: 'https://www.linkedin.com/jobs/search/?keywords=Analog+Design+Engineer' },
  { id: 45, title: 'CAD/EDA Engineer',            branch: 'VLSI',        salary: '₹6–13 LPA', salaryMax: 13, experience: '1–3 yrs',  skills: ['EDA Tools', 'TCL/Python', 'Automation', 'Scripting'],companies: ['Synopsys', 'Cadence', 'Siemens EDA'],    openings: 100,  type: 'CAD',             demand: 'Medium',   desc: 'Develop and maintain EDA scripts and design automation.',  link: 'https://www.linkedin.com/jobs/search/?keywords=EDA+CAD+Engineer' },
  // ── EEE ──
  { id: 46, title: 'Power Systems Engineer',      branch: 'EEE',         salary: '₹5–11 LPA', salaryMax: 11, experience: '0–2 yrs',  skills: ['Power Systems', 'MATLAB', 'ETAP', 'Protection'],     companies: ['NTPC', 'PGCIL', 'Power Grid'],           openings: 300,  type: 'Power Systems',   demand: 'High',     desc: 'Analyze and design electrical power generation and grids.', link: 'https://www.linkedin.com/jobs/search/?keywords=Power+Systems+Engineer' },
  { id: 47, title: 'Electrical Design Engineer',  branch: 'EEE',         salary: '₹5–10 LPA', salaryMax: 10, experience: '0–2 yrs',  skills: ['AutoCAD', 'ETAP', 'Electrical Design', 'Lighting'],  companies: ['L&T', 'Siemens', 'ABB'],                 openings: 250,  type: 'Design',          demand: 'Medium',   desc: 'Design electrical systems for buildings and industries.',  link: 'https://www.linkedin.com/jobs/search/?keywords=Electrical+Design+Engineer' },
  { id: 48, title: 'Control Systems Engineer',    branch: 'EEE',         salary: '₹6–12 LPA', salaryMax: 12, experience: '0–2 yrs',  skills: ['PLC', 'SCADA', 'DCS', 'Industrial Automation'],      companies: ['Honeywell', 'Rockwell', 'Schneider'],    openings: 200,  type: 'Automation',      demand: 'High',     desc: 'Automate industrial processes using PLCs and SCADA.',     link: 'https://www.linkedin.com/jobs/search/?keywords=Control+Systems+Engineer' },
  { id: 49, title: 'Renewable Energy Engineer',   branch: 'EEE',         salary: '₹5–11 LPA', salaryMax: 11, experience: '0–2 yrs',  skills: ['Solar PV', 'Wind', 'Energy Storage', 'Grid Integration'],companies: ['Suzlon', 'Adani Green', 'Tata Power'],  openings: 180,  type: 'Renewable Energy',demand: 'High',     desc: 'Design solar and wind energy systems for the grid.',      link: 'https://www.linkedin.com/jobs/search/?keywords=Renewable+Energy+Engineer' },
  { id: 50, title: 'Power Electronics Engineer',  branch: 'EEE',         salary: '₹6–13 LPA', salaryMax: 13, experience: '0–2 yrs',  skills: ['Converters', 'Inverters', 'SMPS', 'Gate Drivers'],   companies: ['GE', 'Siemens', 'ABB'],                  openings: 150,  type: 'Power Electronics',demand: 'High',    desc: 'Design DC-DC converters, inverters, and motor drives.',   link: 'https://www.linkedin.com/jobs/search/?keywords=Power+Electronics+Engineer' },
  { id: 51, title: 'Electric Vehicle Engineer',   branch: 'EEE',         salary: '₹6–12 LPA', salaryMax: 12, experience: '0–2 yrs',  skills: ['EV Systems', 'BMS', 'Charging', 'Power Electronics'],companies: ['Ola Electric', 'Tata Motors', 'Mahindra'],openings: 200,  type: 'Electric Vehicles',demand: 'High',    desc: 'Develop BMS and charging systems for electric vehicles.', link: 'https://www.linkedin.com/jobs/search/?keywords=Electric+Vehicle+Engineer' },
  { id: 52, title: 'Energy Auditor',              branch: 'EEE',         salary: '₹4–9 LPA',  salaryMax: 9,  experience: '0–2 yrs',  skills: ['Energy Audit', 'Power Quality', 'Conservation', 'ISO'],companies: ['BEE', 'Consultants', 'Industries'],     openings: 100,  type: 'Energy Management',demand: 'Medium',  desc: 'Audit and optimize energy usage in industrial facilities.',link: 'https://www.linkedin.com/jobs/search/?keywords=Energy+Auditor' },
  // ── MEC ──
  { id: 53, title: 'Design Engineer',             branch: 'MEC',         salary: '₹5–10 LPA', salaryMax: 10, experience: '0–2 yrs',  skills: ['AutoCAD', 'SolidWorks', 'CATIA', 'GD&T'],            companies: ['L&T', 'Tata Motors', 'Mahindra'],        openings: 300,  type: 'Design',          demand: 'High',     desc: 'Design mechanical components using 3D CAD tools.',        link: 'https://www.linkedin.com/jobs/search/?keywords=Mechanical+Design+Engineer' },
  { id: 54, title: 'Production Engineer',         branch: 'MEC',         salary: '₹4–9 LPA',  salaryMax: 9,  experience: '0–2 yrs',  skills: ['Manufacturing', 'Quality Control', 'Lean', 'Six Sigma'],companies: ['Maruti Suzuki', 'Hero MotoCorp', 'Bajaj'],openings: 400,  type: 'Production',      demand: 'High',     desc: 'Manage manufacturing processes and production quality.',  link: 'https://www.linkedin.com/jobs/search/?keywords=Production+Engineer' },
  { id: 55, title: 'Automobile Engineer',         branch: 'MEC',         salary: '₹5–11 LPA', salaryMax: 11, experience: '0–2 yrs',  skills: ['Vehicle Dynamics', 'CAD', 'NVH', 'Crash Analysis'],  companies: ['Tata Motors', 'Mahindra', 'Ford India'],  openings: 250,  type: 'Automobile',      demand: 'High',     desc: 'Design and test automotive systems and sub-assemblies.', link: 'https://www.linkedin.com/jobs/search/?keywords=Automobile+Engineer' },
  { id: 56, title: 'CAD/CAM Engineer',            branch: 'MEC',         salary: '₹5–10 LPA', salaryMax: 10, experience: '0–2 yrs',  skills: ['CAD', 'CAM', 'CNC Programming', 'NX CAM'],           companies: ['Siemens', 'Dassault', 'PTC'],            openings: 200,  type: 'CAD/CAM',         demand: 'Medium',   desc: 'Program CNC machines from 3D CAD models.',               link: 'https://www.linkedin.com/jobs/search/?keywords=CAD+CAM+Engineer' },
  { id: 57, title: 'Thermal/HVAC Engineer',       branch: 'MEC',         salary: '₹5–11 LPA', salaryMax: 11, experience: '0–2 yrs',  skills: ['HVAC Design', 'CFD', 'Thermodynamics', 'Heat Transfer'],companies: ['Carrier', 'Daikin', 'Johnson Controls'], openings: 200,  type: 'Thermal/HVAC',    demand: 'Medium',   desc: 'Design HVAC systems and thermal management solutions.',   link: 'https://www.linkedin.com/jobs/search/?keywords=HVAC+Thermal+Engineer' },
  { id: 58, title: 'Robotics & Automation Engineer',branch: 'MEC',       salary: '₹6–13 LPA', salaryMax: 13, experience: '1–3 yrs',  skills: ['Robotics', 'PLC', 'ROS', 'Control Systems'],         companies: ['ABB', 'KUKA', 'Fanuc'],                  openings: 100,  type: 'Robotics',        demand: 'Emerging', desc: 'Automate manufacturing processes with robotic cells.',    link: 'https://www.linkedin.com/jobs/search/?keywords=Robotics+Automation+Engineer' },
  { id: 59, title: 'R&D Engineer',                branch: 'MEC',         salary: '₹6–12 LPA', salaryMax: 12, experience: '0–2 yrs',  skills: ['Research', 'FEA', 'Prototyping', 'Testing'],         companies: ['ISRO', 'DRDO', 'BARC'],                  openings: 80,   type: 'R&D',             demand: 'Emerging', desc: 'Innovate and prototype next-generation mechanical systems.',link: 'https://www.linkedin.com/jobs/search/?keywords=Mechanical+R%26D+Engineer' },
  { id: 60, title: 'Quality Engineer',            branch: 'MEC',         salary: '₹4–9 LPA',  salaryMax: 9,  experience: '0–2 yrs',  skills: ['Quality Control', 'Six Sigma', 'APQP', 'CMM'],       companies: ['Bosch', 'Continental', 'Valeo'],         openings: 300,  type: 'Quality',         demand: 'Medium',   desc: 'Ensure product quality through SPC and lean techniques.', link: 'https://www.linkedin.com/jobs/search/?keywords=Quality+Engineer+Manufacturing' },
  // ── CIVIL ──
  { id: 61, title: 'Site Engineer',               branch: 'CIVIL',       salary: '₹4–8 LPA',  salaryMax: 8,  experience: '0–2 yrs',  skills: ['Site Management', 'AutoCAD', 'MS Project', 'Surveying'],companies: ['L&T', 'Shapoorji Pallonji', 'Tata Projects'],openings: 500, type: 'Construction',    demand: 'High',     desc: 'Manage day-to-day construction site activities.',         link: 'https://www.linkedin.com/jobs/search/?keywords=Civil+Site+Engineer' },
  { id: 62, title: 'Structural Engineer',         branch: 'CIVIL',       salary: '₹5–11 LPA', salaryMax: 11, experience: '0–2 yrs',  skills: ['STAAD Pro', 'ETABS', 'IS Codes', 'RCC Design'],      companies: ['L&T', 'Arup', 'WSP'],                    openings: 250,  type: 'Structural',      demand: 'High',     desc: 'Design load-bearing structures for buildings and bridges.',link: 'https://www.linkedin.com/jobs/search/?keywords=Structural+Engineer' },
  { id: 63, title: 'BIM Engineer',                branch: 'CIVIL',       salary: '₹6–12 LPA', salaryMax: 12, experience: '0–2 yrs',  skills: ['Revit', 'BIM 360', 'Navisworks', '3D Coordination'], companies: ['Turner & Townsend', 'Arcadis', 'AECOM'],  openings: 180,  type: 'BIM',             demand: 'High',     desc: 'Model and coordinate building information across all trades.',link: 'https://www.linkedin.com/jobs/search/?keywords=BIM+Engineer' },
  { id: 64, title: 'Construction Manager',        branch: 'CIVIL',       salary: '₹6–13 LPA', salaryMax: 13, experience: '2–4 yrs',  skills: ['Project Management', 'Cost Estimation', 'Planning', 'Leadership'],companies: ['L&T', 'DLF', 'Godrej Properties'], openings: 200, type: 'Management',      demand: 'High',     desc: 'Lead construction projects from planning to handover.',   link: 'https://www.linkedin.com/jobs/search/?keywords=Construction+Project+Manager' },
  { id: 65, title: 'Transportation Engineer',     branch: 'CIVIL',       salary: '₹5–10 LPA', salaryMax: 10, experience: '0–2 yrs',  skills: ['Highway Design', 'Traffic Engineering', 'GIS', 'AutoCAD'],companies: ['NHAI', 'RITES', 'STUP'],              openings: 150,  type: 'Transportation',  demand: 'Medium',   desc: 'Design roads, highways, and urban transport infrastructure.',link: 'https://www.linkedin.com/jobs/search/?keywords=Transportation+Engineer' },
  { id: 66, title: 'Environmental Engineer',      branch: 'CIVIL',       salary: '₹5–10 LPA', salaryMax: 10, experience: '0–2 yrs',  skills: ['EIA', 'Waste Management', 'Sustainability', 'Compliance'],companies: ['Env. Consultants', 'CPCB', 'Industries'], openings: 100, type: 'Environmental',   demand: 'Emerging', desc: 'Assess and mitigate environmental impact of construction.', link: 'https://www.linkedin.com/jobs/search/?keywords=Environmental+Engineer' },
  { id: 67, title: 'Geotechnical Engineer',       branch: 'CIVIL',       salary: '₹5–11 LPA', salaryMax: 11, experience: '1–3 yrs',  skills: ['Soil Mechanics', 'Foundation Design', 'PLAXIS', 'Testing'],companies: ['L&T', 'RITES', 'Fugro'],              openings: 80,   type: 'Geotechnical',    demand: 'Medium',   desc: 'Investigate soil and design foundations for structures.',  link: 'https://www.linkedin.com/jobs/search/?keywords=Geotechnical+Engineer' },
  { id: 68, title: 'Quantity Surveyor',           branch: 'CIVIL',       salary: '₹4–9 LPA',  salaryMax: 9,  experience: '0–2 yrs',  skills: ['BOQ', 'Cost Estimation', 'Tendering', 'Contracts'],   companies: ['L&T', 'Shapoorji', 'Real Estate Cos'],   openings: 250,  type: 'Quantity Survey', demand: 'Medium',   desc: 'Estimate construction costs and manage project budgets.',  link: 'https://www.linkedin.com/jobs/search/?keywords=Quantity+Surveyor' },
];

const ALL_BRANCHES = ['All', ...Array.from(new Set(JOB_ROLES.map(r => r.branch)))];
const ALL_TYPES    = ['All Types', ...Array.from(new Set(JOB_ROLES.map(r => r.type))).sort()];

/* ───────────── sub-components ───────────── */
const DemandBadge = memo(({ demand }: { demand: string }) => {
  const m = DEMAND_META[demand as keyof typeof DEMAND_META] ?? DEMAND_META.Medium;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border ${m.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
});

/* ───────────── role card ───────────── */
function RoleCard({ role, idx }: { role: typeof JOB_ROLES[0]; idx: number }) {
  const BIcon = BRANCH_ICONS[role.branch] ?? Briefcase;
  const salaryPct = Math.min(100, (role.salaryMax / 22) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (idx % PAGE_SIZE) * 0.04, type: 'spring', stiffness: 90 }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <div className="relative bg-card-bg border border-card-border rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
        {/* top accent */}
        <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />

        <div className="flex-1 flex flex-col p-6">
          {/* header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <h3 className="text-base text-heading leading-snug mb-2 group-hover:text-blue-300 transition-colors">
                {role.title}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full border text-blue-400 bg-blue-500/10 border-blue-500/25">
                  <BIcon className="w-3 h-3" /> {role.branch}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full border text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
                  {role.type}
                </span>
              </div>
            </div>
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center">
              <BIcon className="w-5 h-5 text-blue-400" />
            </div>
          </div>

          {/* description */}
          <p className="text-xs text-text-muted mb-4 leading-relaxed">{role.desc}</p>

          {/* salary bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-text-muted flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-blue-400" /> Salary
              </span>
              <span className="text-sm text-heading">{role.salary}</span>
            </div>
            <div className="h-1.5 bg-surface rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${salaryPct}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
              />
            </div>
          </div>

          {/* experience + demand */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="flex items-center gap-1 text-xs text-text-muted bg-surface border border-surface-border px-2.5 py-1 rounded-lg">
              <Clock className="w-3 h-3 text-blue-400" /> {role.experience}
            </span>
            <DemandBadge demand={role.demand} />
          </div>

          {/* skills */}
          <div className="mb-4">
            <p className="text-xs text-text-secondary mb-2">Required Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {role.skills.map((sk, i) => (
                <span key={i} className="text-xs px-2.5 py-0.5 rounded-full border text-blue-400 bg-blue-500/8 border-blue-500/20">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* companies */}
          <div className="mb-5">
            <p className="text-xs text-text-secondary mb-2 flex items-center gap-1">
              <Building className="w-3 h-3" /> Hiring Companies
            </p>
            <p className="text-xs text-text-muted">{role.companies.join('  ·  ')}</p>
          </div>

          {/* footer */}
          <div className="mt-auto pt-4 border-t border-card-border flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-400 font-medium">{role.openings.toLocaleString()}+</span>
              <span>openings</span>
            </div>
            <a href={role.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.04] transition-all">
              Explore <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────── featured card ───────────── */
function FeaturedRoleCard({ role }: { role: typeof JOB_ROLES[0] }) {
  const BIcon = BRANCH_ICONS[role.branch] ?? Briefcase;
  const salaryPct = Math.min(100, (role.salaryMax / 22) * 100);

  return (
    <div className="bg-card-bg border border-blue-500/35 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 mb-10">
      <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* left */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs px-3 py-1.5 rounded-full bg-blue-600 text-white flex items-center gap-1.5">
                <Star className="w-3 h-3" /> Top Pick
              </span>
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full border text-blue-400 bg-blue-500/10 border-blue-500/25">
                <BIcon className="w-3 h-3" /> {role.branch}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full border text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
                {role.type}
              </span>
              <DemandBadge demand={role.demand} />
            </div>

            <h3 className="text-2xl text-heading mb-2">{role.title}</h3>
            <p className="text-text-muted text-sm mb-5 leading-relaxed">{role.desc}</p>

            {/* skills */}
            <div className="mb-5">
              <p className="text-xs text-text-secondary mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((sk, i) => (
                  <span key={i} className="text-sm px-3 py-1 rounded-full border text-blue-400 bg-blue-500/10 border-blue-500/25">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* companies */}
            <div>
              <p className="text-xs text-text-secondary mb-2">Top Hiring Companies</p>
              <p className="text-sm text-text-muted">{role.companies.join('  ·  ')}</p>
            </div>
          </div>

          {/* right */}
          <div className="lg:w-56 space-y-5">
            <div className="bg-surface border border-surface-border rounded-xl p-5 space-y-4">
              <div>
                <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-blue-400" /> Annual Salary
                </p>
                <p className="text-xl text-heading">{role.salary}</p>
                <div className="h-1.5 bg-surface rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${salaryPct}%` }}
                    transition={{ duration: 0.9 }} viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400" /> Experience
                </p>
                <p className="text-sm text-heading">{role.experience}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" /> Openings
                </p>
                <p className="text-xl text-blue-400">{role.openings.toLocaleString()}+</p>
              </div>
            </div>

            <a href={role.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-sm hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-[1.03]">
              <Briefcase className="w-4 h-4" /> Find Jobs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── main section ───────────── */
export function JobRolesSection() {
  const [branch,   setBranch]   = useState('All');
  const [typeF,    setTypeF]    = useState('All Types');
  const [demand,   setDemand]   = useState('All');
  const [search,   setSearch]   = useState('');
  const [sort,     setSort]     = useState('openings');
  const [page,     setPage]     = useState(1);

  const filtered = useMemo(() => {
    let list = JOB_ROLES.filter(r => {
      const q  = search.toLowerCase();
      const mb = branch === 'All'       || r.branch === branch;
      const mt = typeF  === 'All Types' || r.type   === typeF;
      const md = demand === 'All'       || r.demand  === demand;
      const mq = !q ||
        r.title.toLowerCase().includes(q) ||
        r.skills.some(s => s.toLowerCase().includes(q)) ||
        r.companies.some(c => c.toLowerCase().includes(q)) ||
        r.type.toLowerCase().includes(q);
      return mb && mt && md && mq;
    });
    if (sort === 'openings') list = [...list].sort((a, b) => b.openings - a.openings);
    if (sort === 'salary')   list = [...list].sort((a, b) => b.salaryMax - a.salaryMax);
    if (sort === 'title')    list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [branch, typeF, demand, search, sort]);

  const featuredRole = useMemo(() => [...JOB_ROLES].sort((a, b) => b.openings - a.openings)[0], []);
  const visible      = filtered.slice(0, page * PAGE_SIZE);
  const hasMore      = visible.length < filtered.length;
  const totalOpenings = JOB_ROLES.reduce((s, r) => s + r.openings, 0);
  const isFiltered   = branch !== 'All' || typeF !== 'All Types' || demand !== 'All' || !!search;

  const clearFilters = () => { setBranch('All'); setTypeF('All Types'); setDemand('All'); setSearch(''); setPage(1); };

  return (
    <div className="py-20 bg-page-bg relative overflow-hidden theme-transition">

      {/* bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F8A05_1px,transparent_1px),linear-gradient(to_bottom,#0B4F8A05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



        {/* ══════ STATS ══════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {([
            { icon: Briefcase,   value: `${JOB_ROLES.length}+`,    label: 'Job Roles',       sub: 'Across 8 branches' },
            { icon: Building,    value: '100+',                     label: 'Hiring Companies',sub: 'Top MNCs & startups' },
            { icon: TrendingUp,  value: '₹4–22 LPA',               label: 'Salary Range',    sub: 'Fresher to senior' },
            { icon: MapPin,      value: `${(totalOpenings/1000).toFixed(1)}K+`, label: 'Total Openings', sub: 'Live positions' },
          ] as const).map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }} whileHover={{ y: -4 }}
              className="bg-card-bg border border-card-border rounded-2xl p-5 text-center hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <s.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl text-heading bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">{s.value}</div>
              <div className="text-sm text-text-secondary mb-0.5">{s.label}</div>
              <div className="text-xs text-text-muted">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ══════ FEATURED ROLE ══════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-text-muted">Most In-Demand Role</span>
          </div>
          <FeaturedRoleCard role={featuredRole} />
        </motion.div>

        {/* ══════ FILTERS ══════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="space-y-4 mb-8">

          {/* search + sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by title, skill, or company…"
                className="w-full pl-11 pr-10 py-3 bg-surface border border-surface-border rounded-xl text-text-secondary placeholder-text-muted focus:outline-none focus:border-blue-500 focus:bg-surface text-sm transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-text-muted hover:text-heading transition-colors" />
                </button>
              )}
            </div>
            <div className="relative">
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
                className="appearance-none pl-4 pr-10 py-3 bg-surface border border-surface-border rounded-xl text-text-secondary text-sm focus:outline-none focus:border-blue-500 transition-all">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>

          {/* branch tabs */}
          <div className="flex flex-wrap gap-2">
            {ALL_BRANCHES.map(b => {
              const Icon = BRANCH_ICONS[b];
              const count = b === 'All' ? JOB_ROLES.length : JOB_ROLES.filter(r => r.branch === b).length;
              return (
                <button key={b} onClick={() => { setBranch(b); setPage(1); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all ${
                    branch === b
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-surface text-text-secondary border border-surface-border hover:border-blue-500/40 hover:text-heading'
                  }`}>
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {b === 'All' ? 'All Branches' : b}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${branch === b ? 'bg-white/20' : 'bg-surface text-text-muted'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* demand + type chips */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-text-secondary flex items-center gap-1"><Zap className="w-3 h-3" />Demand:</span>
              {['All', 'High', 'Medium', 'Emerging'].map(d => (
                <button key={d} onClick={() => { setDemand(d); setPage(1); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                    demand === d ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-surface text-text-muted border border-surface-border hover:border-blue-500/40 hover:text-heading'
                  }`}>{d === 'All' ? 'All Demand' : d}</button>
              ))}
            </div>
          </div>

          {/* result count + clear */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Showing <span className="text-blue-400">{Math.min(visible.length, filtered.length)}</span> of{' '}
              <span className="text-blue-400">{filtered.length}</span> roles
               {search && <> for "<span className="text-heading">{search}</span>"</>}
            </p>
            {isFiltered && (
              <button onClick={clearFilters} className="text-xs text-text-muted hover:text-blue-400 transition-colors">
                Clear filters ×
              </button>
            )}
          </div>
        </motion.div>

        {/* ══════ GRID ══════ */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-24 text-center">
              <Search className="w-14 h-14 mx-auto mb-4 text-text-muted opacity-40" />
              <p className="text-base text-text-muted mb-2">No roles match your search.</p>
              <button onClick={clearFilters} className="text-sm text-blue-400 hover:underline">Clear all filters</button>
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((role, idx) => (
                <RoleCard key={role.id} role={role} idx={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════ LOAD MORE ══════ */}
        {hasMore && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex justify-center mt-10">
            <motion.button onClick={() => setPage(p => p + 1)}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="px-10 py-3.5 bg-surface border border-surface-border text-text-secondary rounded-xl text-sm hover:border-blue-500/40 hover:text-white hover:shadow-lg hover:shadow-blue-500/10 transition-all flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              Load More Roles ({filtered.length - visible.length} remaining)
            </motion.button>
          </motion.div>
        )}

        {/* ══════ TOP COMPANIES ══════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 bg-card-bg border border-card-border rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Building className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg text-heading">Top Hiring Companies</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {['Google', 'Microsoft', 'Amazon', 'Intel', 'Qualcomm', 'L&T', 'Tata Motors', 'NVIDIA',
              'Flipkart', 'Infosys', 'Wipro', 'TCS', 'Siemens', 'ABB', 'Bosch', 'ISRO'].map((co, i) => (
              <motion.div key={i} whileHover={{ y: -3 }}
                className="border border-blue-500/20 bg-blue-500/5 rounded-xl p-3 text-center hover:border-blue-400/40 hover:bg-blue-500/10 transition-all">
                <p className="text-xs text-blue-400">{co}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══════ BRANCH QUICK NAV ══════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {ALL_BRANCHES.filter(b => b !== 'All').map(b => {
            const Icon = BRANCH_ICONS[b] ?? Briefcase;
            const count = JOB_ROLES.filter(r => r.branch === b).length;
            return (
              <motion.button key={b} onClick={() => { setBranch(b); setPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }}
                className="bg-card-bg border border-card-border rounded-2xl p-4 text-center hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                <div className="w-9 h-9 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs text-heading mb-0.5">{b}</div>
                <div className="text-xs text-text-muted opacity-80">{count} roles</div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ══════ CTA ══════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-8 bg-surface border border-surface-border rounded-2xl p-10 relative overflow-hidden theme-transition">
        <div className="absolute inset-0 bg-blue-600/5" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl text-heading">Ready to Land Your Dream Job?</h3>
              </div>
              <p className="text-text-muted max-w-lg text-sm leading-relaxed">
                Get personalized career guidance, AI-powered resume review, mock interviews,
                and direct connections to top recruiters through EduPulseX.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {['Personalized Roadmap', 'Resume Builder', 'Mock Interviews'].map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs text-text-muted">
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-400" /> {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-sm hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 justify-center">
                <Briefcase className="w-5 h-5" /> Start Career Prep
              </motion.button>
              <motion.a href="https://www.linkedin.com/jobs/" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-surface border border-surface-border text-text-secondary rounded-xl text-sm hover:border-blue-500/40 hover:text-white transition-all flex items-center gap-2 justify-center">
                <Globe className="w-4 h-4" /> Browse LinkedIn Jobs
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
