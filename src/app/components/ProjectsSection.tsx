import {
  Code, GitBranch, Star, Users, ExternalLink, Github, Award,
  BookOpen, Video, Search, X, Filter, Clock, ChevronDown,
  Cpu, Zap, Wrench, Building2, Brain, Sparkles,
  BadgeCheck, Target, TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';

/* ─────────────────────── branch config ─────────────────────── */
const BRANCH_META: Record<string, { gradient: string; accent: string; icon: React.ElementType; color: string }> = {
  'CS/IT':       { gradient: 'from-blue-600 to-indigo-600',   accent: 'blue',    icon: Code,      color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/25' },
  'AI/DS':       { gradient: 'from-teal-500 to-cyan-600',     accent: 'teal',    icon: Brain,     color: 'text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/25' },
  'ECE':         { gradient: 'from-violet-600 to-purple-600', accent: 'violet',  icon: Cpu,       color: 'text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/25' },
  'EEE':         { gradient: 'from-amber-600 to-orange-600',  accent: 'amber',   icon: Zap,       color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25' },
  'Mechanical':  { gradient: 'from-emerald-600 to-teal-600',  accent: 'emerald', icon: Wrench,    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
  'Civil':       { gradient: 'from-rose-600 to-pink-600',     accent: 'rose',    icon: Building2, color: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/25' },
};

const DIFFICULTY_META: Record<string, { cls: string; dot: string }> = {
  'Beginner':     { cls: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25', dot: 'bg-emerald-500 dark:bg-emerald-400' },
  'Intermediate': { cls: 'text-amber-600 dark:text-amber-400  bg-amber-500/10  border-amber-500/25',     dot: 'bg-amber-500 dark:bg-amber-400'  },
  'Advanced':     { cls: 'text-red-600 dark:text-red-400    bg-red-500/10    border-red-500/25',       dot: 'bg-red-500 dark:bg-red-400'    },
};

/* ─────────────────────── project data ─────────────────────── */
const PROJECTS = [
  // ── CS/IT ──
  {
    id: 1, title: 'Full-Stack E-Commerce Platform', branch: 'CS/IT', difficulty: 'Advanced',
    team: '4–6', duration: '8 weeks', stars: 312, forks: 127,
    description: 'Complete e-commerce solution with payment gateway, admin panel, real-time analytics, and cart management.',
    outcomes: ['Integrate Stripe payment gateway end-to-end', 'Build admin dashboard with analytics charts', 'Implement JWT auth & role-based access'],
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?w=800',
    github: 'https://github.com/amazinganddy/mern-stack-ecommerce',
    demo: 'https://mern-ecommerce-demo.netlify.app',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 2, title: 'Real-Time Chat Application', branch: 'CS/IT', difficulty: 'Intermediate',
    team: '2–3', duration: '4 weeks', stars: 289, forks: 94,
    description: 'WebSocket-based chat app with private messaging, group chats, file sharing, and notifications.',
    outcomes: ['Implement WebSocket real-time communication', 'Build group chat with file sharing', 'Add push notifications via Firebase'],
    tech: ['Socket.io', 'React', 'Express', 'MongoDB', 'WebRTC'],
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800',
    github: 'https://github.com/adrianhajdin/project_chat_application',
    demo: 'https://chat-app-demo.vercel.app',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 3, title: 'Task Management & Project Tracker', branch: 'CS/IT', difficulty: 'Intermediate',
    team: '2–4', duration: '5 weeks', stars: 245, forks: 82,
    description: 'Kanban-style project management tool with drag-and-drop, team collaboration, and time tracking.',
    outcomes: ['Build drag-and-drop Kanban board', 'Implement team collaboration features', 'Add time-tracking and reporting'],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    github: 'https://github.com/oldboyxx/jira_clone',
    demo: 'https://jira-clone-demo.vercel.app',
    hasVideo: false, hasDocs: true,
  },
  {
    id: 4, title: 'Social Media Dashboard', branch: 'CS/IT', difficulty: 'Advanced',
    team: '3–5', duration: '7 weeks', stars: 198, forks: 67,
    description: 'Full-featured social platform with posts, comments, likes, followers, and real-time notifications.',
    outcomes: ['Design social feed with infinite scroll', 'Implement follow/follower system', 'Real-time notifications with Firebase'],
    tech: ['React', 'Firebase', 'Material-UI', 'Redux', 'Cloud Functions'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    github: 'https://github.com/saadpasta/react-blog-github',
    demo: 'https://social-dashboard-demo.netlify.app',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 5, title: 'Online Code Editor & Compiler', branch: 'CS/IT', difficulty: 'Advanced',
    team: '3–4', duration: '6 weeks', stars: 423, forks: 156,
    description: 'Web-based IDE supporting multiple languages with syntax highlighting, autocomplete, and execution.',
    outcomes: ['Integrate Monaco Editor in a web app', 'Execute user code securely via Docker', 'Support 10+ programming languages'],
    tech: ['Monaco Editor', 'Docker', 'Node.js', 'WebSockets', 'Redis'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    github: 'https://github.com/cdr/code-server',
    demo: 'https://code-editor-demo.vercel.app',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 6, title: 'Restaurant Management System', branch: 'CS/IT', difficulty: 'Intermediate',
    team: '3–4', duration: '6 weeks', stars: 167, forks: 54,
    description: 'POS system with order management, inventory tracking, billing, and kitchen display system.',
    outcomes: ['Build a full POS billing interface', 'Track inventory with low-stock alerts', 'Manage kitchen display orders live'],
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Vuex', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    github: 'https://github.com/nashville-software-school/restaurant-pos',
    demo: null,
    hasVideo: false, hasDocs: true,
  },
  {
    id: 7, title: 'Expense Tracker & Budget Planner', branch: 'CS/IT', difficulty: 'Beginner',
    team: '1–2', duration: '3 weeks', stars: 134, forks: 45,
    description: 'Personal finance app with expense categorization, budget limits, charts, and export to CSV.',
    outcomes: ['Visualize spending with interactive charts', 'Set & track monthly budget limits', 'Export transaction history to CSV'],
    tech: ['React', 'Chart.js', 'LocalStorage', 'CSS3', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    github: 'https://github.com/Sujith-Barve/Expense-Tracker',
    demo: 'https://expense-tracker-demo.netlify.app',
    hasVideo: true, hasDocs: false,
  },
  {
    id: 8, title: 'Weather Forecasting App', branch: 'CS/IT', difficulty: 'Beginner',
    team: '1–2', duration: '2 weeks', stars: 98, forks: 34,
    description: 'Weather app with location search, 7-day forecast, hourly predictions, and weather alerts.',
    outcomes: ['Consume a public REST weather API', 'Display 7-day forecast with animated icons', 'Add geolocation-based auto-detection'],
    tech: ['React', 'OpenWeather API', 'Geolocation', 'Axios', 'CSS3'],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800',
    github: 'https://github.com/javascript-tutorial/weather-app',
    demo: 'https://weather-forecast-demo.netlify.app',
    hasVideo: false, hasDocs: false,
  },

  // ── AI/DS ──
  {
    id: 9, title: 'AI-Powered Medical Diagnosis', branch: 'AI/DS', difficulty: 'Advanced',
    team: '3–5', duration: '8 weeks', stars: 543, forks: 189,
    description: 'Deep learning model for disease prediction using medical imaging, X-rays, and patient data analysis.',
    outcomes: ['Train CNN on chest X-ray datasets', 'Achieve 90%+ diagnostic accuracy', 'Deploy model as a Flask REST API'],
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Flask'],
    image: 'https://images.unsplash.com/photo-1674544362969-a4269ef0ea69?w=800',
    github: 'https://github.com/ieee8023/covid-chestxray-dataset',
    demo: 'https://medical-diagnosis-demo.herokuapp.com',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 10, title: 'Sentiment Analysis for Social Media', branch: 'AI/DS', difficulty: 'Intermediate',
    team: '2–3', duration: '5 weeks', stars: 312, forks: 98,
    description: 'NLP-based sentiment analyzer for tweets and social posts with real-time emotion detection.',
    outcomes: ['Pre-process and tokenize tweet datasets', 'Train classifier with scikit-learn', 'Deploy interactive Streamlit dashboard'],
    tech: ['Python', 'NLTK', 'scikit-learn', 'Pandas', 'Streamlit'],
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800',
    github: 'https://github.com/abdulfatir/twitter-sentiment-analysis',
    demo: 'https://sentiment-analysis-demo.streamlit.app',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 11, title: 'Face Recognition Attendance', branch: 'AI/DS', difficulty: 'Intermediate',
    team: '2–4', duration: '6 weeks', stars: 289, forks: 112,
    description: 'Automated attendance marking using facial recognition with database integration and reporting.',
    outcomes: ['Register & recognize faces in real-time', 'Auto-mark attendance in SQLite database', 'Generate PDF attendance reports'],
    tech: ['Python', 'OpenCV', 'dlib', 'face_recognition', 'SQLite'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    github: 'https://github.com/BapanMandal/Face-Recognition-Attendance-System',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 12, title: 'Stock Price Prediction with LSTM', branch: 'AI/DS', difficulty: 'Advanced',
    team: '2–3', duration: '6 weeks', stars: 456, forks: 167,
    description: 'Time-series forecasting model using LSTM networks to predict stock market trends and prices.',
    outcomes: ['Prepare time-series stock data', 'Build & train LSTM model in TensorFlow', 'Visualize predictions with Plotly'],
    tech: ['Python', 'TensorFlow', 'Keras', 'Yahoo Finance API', 'Plotly'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    github: 'https://github.com/NourozR/Stock-Price-Prediction-LSTM',
    demo: 'https://stock-prediction-demo.streamlit.app',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 13, title: 'NLP Chatbot with Intent Recognition', branch: 'AI/DS', difficulty: 'Intermediate',
    team: '2–3', duration: '5 weeks', stars: 234, forks: 87,
    description: 'Intelligent conversational AI chatbot with intent recognition and contextual responses.',
    outcomes: ['Build intent classification with TensorFlow', 'Create conversational dialogue flow', 'Deploy as a web chatbot with Flask'],
    tech: ['Python', 'TensorFlow', 'NLTK', 'Flask', 'JSON'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
    github: 'https://github.com/patrickloeber/chatbot-deployment',
    demo: 'https://nlp-chatbot-demo.herokuapp.com',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 14, title: 'Image Classification with CNN', branch: 'AI/DS', difficulty: 'Intermediate',
    team: '2–3', duration: '5 weeks', stars: 367, forks: 123,
    description: 'Transfer learning-based image classifier using pre-trained models for multi-class classification.',
    outcomes: ['Fine-tune ResNet/VGG on custom dataset', 'Achieve 95%+ classification accuracy', 'Build Flask web UI for predictions'],
    tech: ['Python', 'PyTorch', 'torchvision', 'ResNet', 'Flask'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    github: 'https://github.com/pytorch/vision',
    demo: 'https://image-classifier-demo.herokuapp.com',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 15, title: 'Handwritten Digit Recognition', branch: 'AI/DS', difficulty: 'Beginner',
    team: '1–2', duration: '3 weeks', stars: 212, forks: 74,
    description: 'CNN-based model to recognize handwritten digits using MNIST dataset with 98%+ accuracy.',
    outcomes: ['Build CNN from scratch using Keras', 'Train on MNIST to 98%+ accuracy', 'Create interactive drawing canvas UI'],
    tech: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Matplotlib'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800',
    github: 'https://github.com/codebasics/deep-learning-keras-tf-tutorial',
    demo: 'https://digit-recognition-demo.streamlit.app',
    hasVideo: true, hasDocs: false,
  },

  // ── ECE ──
  {
    id: 16, title: 'Smart IoT Home Automation', branch: 'ECE', difficulty: 'Advanced',
    team: '2–4', duration: '6 weeks', stars: 256, forks: 92,
    description: 'Complete IoT system with ESP32, sensors, MQTT protocol, and mobile app for smart home control.',
    outcomes: ['Program ESP32 with MQTT communication', 'Connect sensors to cloud Firebase', 'Control appliances via Flutter app'],
    tech: ['ESP32', 'MQTT', 'Firebase', 'Flutter', 'Arduino'],
    image: 'https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?w=800',
    github: 'https://github.com/debsahu/ESP-MQTT-AWS-IoT-Core',
    demo: 'https://iot-home-demo.web.app',
    hasVideo: true, hasDocs: true,
  },
  {
    id: 17, title: 'FPGA-based Digital Signal Processing', branch: 'ECE', difficulty: 'Advanced',
    team: '2–3', duration: '8 weeks', stars: 143, forks: 48,
    description: 'Hardware implementation of DSP algorithms using FPGA with Verilog/VHDL programming.',
    outcomes: ['Implement FIR/IIR filters in Verilog', 'Synthesize and simulate with Vivado', 'Test on Xilinx Artix-7 FPGA board'],
    tech: ['Verilog', 'VHDL', 'Xilinx Vivado', 'MATLAB', 'Quartus'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    github: 'https://github.com/MiguelBragaGarcia/FPGA-DSP',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 18, title: 'Wireless Sensor Network for Agriculture', branch: 'ECE', difficulty: 'Intermediate',
    team: '3–4', duration: '6 weeks', stars: 198, forks: 67,
    description: 'WSN system for monitoring soil moisture, temperature, humidity with LoRa communication.',
    outcomes: ['Wire soil & humidity sensors to Arduino', 'Transmit data via LoRa protocol', 'Visualize live data on ThingSpeak'],
    tech: ['Arduino', 'LoRa', 'Sensors', 'ThingSpeak', 'ESP8266'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    github: 'https://github.com/CongducPham/LowCostLoRaGw',
    demo: 'https://thingspeak.com/channels/wsn-demo',
    hasVideo: false, hasDocs: true,
  },
  {
    id: 19, title: 'Smart Traffic Light Controller', branch: 'ECE', difficulty: 'Intermediate',
    team: '2–3', duration: '5 weeks', stars: 167, forks: 52,
    description: 'Adaptive traffic light system using sensors and microcontrollers for congestion management.',
    outcomes: ['Design adaptive timing with IR sensors', 'Control traffic LEDs via Arduino', 'Simulate traffic flow with real data'],
    tech: ['Arduino', 'IR Sensors', 'LED', 'C++', 'LCD Display'],
    image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800',
    github: 'https://github.com/akshaybahadur21/Smart-Traffic-Lights',
    demo: null,
    hasVideo: true, hasDocs: false,
  },

  // ── EEE ──
  {
    id: 20, title: 'Solar MPPT Charge Controller', branch: 'EEE', difficulty: 'Advanced',
    team: '3–4', duration: '7 weeks', stars: 234, forks: 78,
    description: 'Maximum Power Point Tracking system for solar panels with battery management and monitoring.',
    outcomes: ['Implement Perturb & Observe MPPT algorithm', 'Design buck converter circuit', 'Display power metrics on LCD'],
    tech: ['Arduino', 'Buck Converter', 'MPPT Algorithm', 'LCD', 'Sensors'],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    github: 'https://github.com/danjulio/MPPT-Solar-Charger',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 21, title: 'EV Charging Station Design', branch: 'EEE', difficulty: 'Advanced',
    team: '2–4', duration: '8 weeks', stars: 198, forks: 64,
    description: 'EV charging infrastructure design with power management, billing system, and grid integration.',
    outcomes: ['Model EV charger in MATLAB Simulink', 'Design power electronics circuit', 'Integrate IoT billing & monitoring'],
    tech: ['MATLAB', 'Simulink', 'Power Electronics', 'IoT', 'Arduino'],
    image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=800',
    github: 'https://github.com/SDNick484/ev_charging_station',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 22, title: 'Smart Grid Energy Management', branch: 'EEE', difficulty: 'Advanced',
    team: '3–5', duration: '8 weeks', stars: 176, forks: 59,
    description: 'Intelligent power distribution system with renewable energy integration and demand response.',
    outcomes: ['Simulate renewable energy integration', 'Implement demand-response algorithms', 'Visualize grid data with SCADA'],
    tech: ['MATLAB', 'Simulink', 'SCADA', 'Python', 'IoT'],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    github: 'https://github.com/pandapower-org/pandapower',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 23, title: 'Home Energy Monitoring System', branch: 'EEE', difficulty: 'Intermediate',
    team: '2–3', duration: '5 weeks', stars: 189, forks: 62,
    description: 'Real-time electricity consumption monitor with mobile app integration and cost analysis.',
    outcomes: ['Read current with SCT-013 sensor', 'Upload data to Firebase via ESP32', 'Display consumption & cost on Blynk'],
    tech: ['ESP32', 'Current Sensor', 'Blynk', 'Firebase', 'Arduino'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd91?w=800',
    github: 'https://github.com/CircuitSetup/Split-Single-Phase-Energy-Meter',
    demo: 'https://blynk.io/energy-monitor',
    hasVideo: true, hasDocs: true,
  },

  // ── Mechanical ──
  {
    id: 24, title: 'Autonomous Mobile Robot', branch: 'Mechanical', difficulty: 'Advanced',
    team: '3–4', duration: '8 weeks', stars: 287, forks: 96,
    description: 'Self-navigating robot with obstacle avoidance, path planning, SLAM, and autonomous navigation.',
    outcomes: ['Set up ROS environment and robot model', 'Implement A* path planning algorithm', 'Run SLAM on real environment map'],
    tech: ['ROS', 'Python', 'Arduino', 'LIDAR', 'Raspberry Pi'],
    image: 'https://images.unsplash.com/photo-1699602048487-f52024260d3a?w=800',
    github: 'https://github.com/ros-planning/navigation2',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 25, title: '3D Printed Robotic Arm', branch: 'Mechanical', difficulty: 'Intermediate',
    team: '2–3', duration: '6 weeks', stars: 234, forks: 81,
    description: '6-DOF robotic arm with servo control, inverse kinematics, and pick-and-place functionality.',
    outcomes: ['3D print and assemble 6-DOF arm', 'Implement inverse kinematics solver', 'Program pick-and-place with Arduino'],
    tech: ['Arduino', 'Servo Motors', '3D Printing', 'Inverse Kinematics', 'Python'],
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=800',
    github: 'https://github.com/BCN3D/BCN3D-Moveo',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 26, title: 'Quadcopter Drone Design', branch: 'Mechanical', difficulty: 'Advanced',
    team: '3–5', duration: '10 weeks', stars: 356, forks: 124,
    description: 'Custom quadcopter with flight controller, GPS navigation, camera gimbal, and FPV system.',
    outcomes: ['Build & calibrate quadcopter frame', 'Program PID stabilization controller', 'Add GPS waypoint navigation'],
    tech: ['Arduino', 'Flight Controller', 'Brushless Motors', 'PID Control', 'GPS'],
    image: 'https://images.unsplash.com/photo-1508614999368-9260051292e5?w=800',
    github: 'https://github.com/betaflight/betaflight',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 27, title: 'CNC Drawing Machine', branch: 'Mechanical', difficulty: 'Intermediate',
    team: '2–4', duration: '7 weeks', stars: 198, forks: 67,
    description: '2-axis CNC plotter for drawing and engraving with G-code interpreter and motor control.',
    outcomes: ['Build X-Y gantry with stepper motors', 'Implement G-code interpreter in Arduino', 'Generate toolpaths from SVG/DXF files'],
    tech: ['Arduino', 'Stepper Motors', 'GRBL', 'G-code', 'CAD/CAM'],
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800',
    github: 'https://github.com/gnea/grbl',
    demo: null,
    hasVideo: true, hasDocs: true,
  },

  // ── Civil ──
  {
    id: 28, title: 'BIM-based Building Information System', branch: 'Civil', difficulty: 'Advanced',
    team: '3–5', duration: '8 weeks', stars: 234, forks: 78,
    description: 'Complete BIM model with structural analysis, MEP coordination, clash detection, and 4D scheduling.',
    outcomes: ['Create full parametric BIM model in Revit', 'Run clash detection with Navisworks', 'Automate 4D scheduling with Dynamo'],
    tech: ['Revit', 'AutoCAD', 'Navisworks', 'Python', 'Dynamo'],
    image: 'https://images.unsplash.com/photo-1756227584303-f1400daaa69d?w=800',
    github: 'https://github.com/DynamoDS/DynamoRevit',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 29, title: 'Structural Analysis Software', branch: 'Civil', difficulty: 'Advanced',
    team: '2–4', duration: '10 weeks', stars: 167, forks: 53,
    description: 'FEM-based structural analysis tool for beams, trusses, and frames with graphical interface.',
    outcomes: ['Implement finite element method in Python', 'Analyze beams, trusses and frames', 'Visualize deflection and stress diagrams'],
    tech: ['Python', 'NumPy', 'Matplotlib', 'Finite Element Method', 'GUI'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
    github: 'https://github.com/cclauss/PyNite',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
  {
    id: 30, title: 'Earthquake Resistant Building Design', branch: 'Civil', difficulty: 'Advanced',
    team: '3–4', duration: '8 weeks', stars: 143, forks: 46,
    description: 'Seismic analysis and design of multi-story building with base isolation and dampers.',
    outcomes: ['Run response spectrum analysis in ETABS', 'Design base isolation system', 'Prepare IS 1893 seismic design report'],
    tech: ['ETABS', 'SAP2000', 'STAAD Pro', 'Seismic Codes', 'Analysis'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    github: 'https://github.com/seismic-analysis/earthquake-design',
    demo: null,
    hasVideo: true, hasDocs: true,
  },
];

const BRANCHES = ['All', 'CS/IT', 'AI/DS', 'ECE', 'EEE', 'Mechanical', 'Civil'];
const DIFFICULTIES = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const SORT_OPTIONS = [
  { value: 'stars', label: 'Most Popular' },
  { value: 'duration-asc', label: 'Shortest First' },
  { value: 'duration-desc', label: 'Longest First' },
];

const PAGE_SIZE = 9;

/* ─────────────────────── helpers ─────────────────────── */
function durationWeeks(d: string) { return parseInt(d); }

function DifficultyDot({ level }: { level: string }) {
  const m = DIFFICULTY_META[level] ?? DIFFICULTY_META['Beginner'];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border ${m.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {level}
    </span>
  );
}

/* ─────────────────────── card ─────────────────────── */
function ProjectCard({ project, idx }: { project: typeof PROJECTS[0]; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const meta = BRANCH_META[project.branch] ?? BRANCH_META['CS/IT'];
  const BranchIcon = meta.icon;

  return (
    <motion.div
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (idx % PAGE_SIZE) * 0.05, type: 'spring', stiffness: 90 }}
      viewport={{ once: true }}
    >
      <div className={`group h-full flex flex-col bg-card-bg border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 ${
        expanded ? 'border-blue-500/50 shadow-xl shadow-blue-900/20' : 'border-card-border hover:border-blue-500/50'
      }`}>

        {/* ── image ── */}
        <div className="relative h-44 overflow-hidden shrink-0">
          <motion.img src={project.image} alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }} transition={{ duration: 0.4 }} />
          <div className={`absolute inset-0 bg-gradient-to-t ${meta.gradient} opacity-50`} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

          {/* branch pill + icon */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-surface/55 backdrop-blur-sm rounded-full border border-surface-border/15">
            <BranchIcon className="w-3 h-3 text-heading" />
            <span className="text-xs text-heading">{project.branch}</span>
          </div>

          {/* badges: video / docs */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {project.hasVideo && (
              <div className="flex items-center gap-1 px-2 py-1 bg-surface/55 backdrop-blur-sm rounded-full border border-surface-border/15">
                <Video className="w-3 h-3 text-red-400" />
                <span className="text-xs text-heading">Video</span>
              </div>
            )}
            {project.hasDocs && (
              <div className="flex items-center gap-1 px-2 py-1 bg-surface/55 backdrop-blur-sm rounded-full border border-surface-border/15">
                <BookOpen className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-heading">Docs</span>
              </div>
            )}
          </div>

          {/* bottom meta */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <DifficultyDot level={project.difficulty} />
            <div className="flex items-center gap-3 text-xs text-heading/70">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{project.duration}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.team}</span>
            </div>
          </div>
        </div>

        {/* ── body ── */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg font-bold text-heading leading-snug mb-2 group-hover:text-blue-300 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-lg text-text-muted leading-relaxed mb-4 line-clamp-2">{project.description}</p>

          {/* tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t, i) => (
              <span key={i} className={`text-xs px-2.5 py-1 rounded-full border ${meta.color}`}>{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-full border border-surface-border bg-surface text-text-muted">+{project.tech.length - 4}</span>
            )}
          </div>

          {/* expandable outcomes */}
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}
                className="overflow-hidden mb-4">
                <div className="bg-surface border border-surface-border border border-surface-border/60 rounded-xl p-4">
                  <p className="text-xs text-text-muted mb-2.5">What you'll build</p>
                  <ul className="space-y-2">
                    {project.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* stats */}
          <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {project.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitBranch className="w-3.5 h-3.5" />
              {project.forks} forks
            </span>
          </div>

          {/* actions */}
          <div className="flex items-center gap-2 mt-auto">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-surface-border bg-surface border border-surface-border text-text-secondary text-xs hover:border-slate-500 hover:text-heading transition-all hover:scale-[1.02]">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r ${meta.gradient} text-heading text-xs hover:shadow-lg transition-all hover:scale-[1.02]`}>
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            ) : (
              <button onClick={() => setExpanded(e => !e)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs transition-all hover:scale-[1.02] ${
                  expanded
                    ? 'border-blue-500/40 bg-blue-600/10 text-blue-400'
                    : 'border-surface-border bg-surface border border-surface-border text-text-muted hover:border-blue-500/30 hover:text-heading'
                }`}>
                <Target className="w-3.5 h-3.5" />
                {expanded ? 'Hide Details' : 'What You\'ll Build'}
              </button>
            )}
            {project.demo && (
              <button onClick={() => setExpanded(e => !e)}
                className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
                  expanded
                    ? 'border-blue-500/40 bg-blue-600/10 text-blue-400'
                    : 'border-surface-border bg-surface border border-surface-border text-text-muted hover:border-blue-500/30 hover:text-heading'
                }`}>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* bottom accent line */}
        <div className={`h-0.5 bg-gradient-to-r ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
      </div>
    </motion.div>
  );
}

/* ─────────────────────── featured card ─────────────────────── */
function FeaturedProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const meta = BRANCH_META[project.branch] ?? BRANCH_META['CS/IT'];
  const BranchIcon = meta.icon;

  return (
    <div className="relative bg-surface/80 border border-blue-500/35 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 hover:shadow-blue-900/40 transition-all group mb-8">
      <div className="grid md:grid-cols-5">
        {/* image */}
        <div className="md:col-span-2 relative h-52 md:h-auto overflow-hidden">
          <motion.img src={project.image} alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} />
          <div className={`absolute inset-0 bg-gradient-to-r ${meta.gradient} opacity-55`} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80" />
          <div className="absolute top-4 left-4">
            <span className="text-xs px-3 py-1.5 rounded-full bg-amber-500/90 text-heading">⭐ Most Popular</span>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className={`p-3 bg-gradient-to-br ${meta.gradient} rounded-xl`}>
              <BranchIcon className="w-6 h-6 text-heading" />
            </div>
          </div>
        </div>

        {/* content */}
        <div className="md:col-span-3 p-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs px-3 py-1 rounded-full border ${meta.color}`}>{project.branch}</span>
              <DifficultyDot level={project.difficulty} />
              <span className="text-xs text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{project.duration}</span>
              <span className="text-xs text-text-muted flex items-center gap-1"><Users className="w-3 h-3" />{project.team} members</span>
            </div>
            <h3 className="text-3xl font-bold text-heading mb-4 leading-snug group-hover:text-blue-300 transition-colors">{project.title}</h3>
            <p className="text-xl text-text-muted mb-6 leading-relaxed">{project.description}</p>

            <ul className="space-y-2 mb-5">
              {project.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <BadgeCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, i) => (
                <span key={i} className={`text-xs px-2.5 py-1 rounded-full border ${meta.color}`}>{t}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-card-border mt-5">
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{project.stars} stars</span>
              <span className="flex items-center gap-1.5"><GitBranch className="w-3.5 h-3.5" />{project.forks} forks</span>
              {project.hasVideo && <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-red-400" />Video Guide</span>}
            </div>
            <div className="flex gap-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 bg-surface border border-surface-border text-text-secondary rounded-xl text-sm hover:border-slate-500 hover:text-heading transition-all flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className={`px-5 py-2.5 bg-gradient-to-r ${meta.gradient} text-heading rounded-xl text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2`}>
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.gradient}`} />
    </div>
  );
}

/* ─────────────────────── main section ─────────────────────── */
export function ProjectsSection() {
  const [branch, setBranch]       = useState('All');
  const [difficulty, setDifficulty] = useState('All Levels');
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('stars');
  const [page, setPage]           = useState(1);

  const filtered = useMemo(() => {
    let list = PROJECTS.filter(p => {
      const q = search.toLowerCase();
      const matchBranch = branch === 'All' || p.branch === branch;
      const matchDiff   = difficulty === 'All Levels' || p.difficulty === difficulty;
      const matchQ      = !q || p.title.toLowerCase().includes(q) ||
                          p.tech.some(t => t.toLowerCase().includes(q)) ||
                          p.branch.toLowerCase().includes(q);
      return matchBranch && matchDiff && matchQ;
    });

    if (sort === 'stars')         list = [...list].sort((a, b) => b.stars - a.stars);
    if (sort === 'duration-asc')  list = [...list].sort((a, b) => durationWeeks(a.duration) - durationWeeks(b.duration));
    if (sort === 'duration-desc') list = [...list].sort((a, b) => durationWeeks(b.duration) - durationWeeks(a.duration));

    return list;
  }, [branch, difficulty, search, sort]);

  const topProject = useMemo(() => [...PROJECTS].sort((a, b) => b.stars - a.stars)[0], []);
  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const clearFilters = () => { setBranch('All'); setDifficulty('All Levels'); setSearch(''); setPage(1); };
  const isFiltered   = branch !== 'All' || difficulty !== 'All Levels' || search;

  return (
    <div className="py-20 bg-page-bg theme-transition relative overflow-hidden">

      {/* ── background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F8A06_1px,transparent_1px),linear-gradient(to_bottom,#0B4F8A06_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



        {/* ════════ STATS STRIP ════════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {([
            { value: `${PROJECTS.length}+`, label: 'Projects',          sub: 'Across 6 branches'     },
            { value: '6',                   label: 'Engineering Branches', sub: 'CSE to Civil'        },
            { value: '3',                   label: 'Difficulty Levels',  sub: 'Beginner to Advanced'  },
            { value: '100%',                label: 'Open Source',        sub: 'Free GitHub access'    },
          ] as const).map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }} whileHover={{ y: -4 }}
              className="bg-card-bg border border-card-border rounded-2xl p-5 text-center hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="text-3xl font-bold text-heading bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">{s.value}</div>
              <div className="text-base font-medium text-text-secondary mb-1">{s.label}</div>
              <div className="text-sm text-slate-600">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ════════ FEATURED PROJECT ════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-text-muted">Featured Project</span>
          </div>
          <FeaturedProjectCard project={topProject} />
        </motion.div>

        {/* ════════ FILTER BAR ════════ */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="space-y-4 mb-8">

          {/* search + sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by project name, tech or branch…"
                className="w-full pl-11 pr-4 py-3 bg-surface/70 border border-surface-border rounded-xl text-text-secondary placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-surface text-sm transition-all" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-text-muted hover:text-heading transition-colors" />
                </button>
              )}
            </div>
            {/* sort */}
            <div className="relative">
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
                className="appearance-none pl-4 pr-10 py-3 bg-surface/70 border border-surface-border rounded-xl text-text-secondary text-sm focus:outline-none focus:border-blue-500 transition-all">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>

          {/* branch tabs */}
          <div className="flex flex-wrap gap-2">
            {BRANCHES.map(b => {
              const meta = BRANCH_META[b];
              const Icon = meta?.icon;
              return (
                <button key={b} onClick={() => { setBranch(b); setPage(1); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                    branch === b
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-heading shadow-lg shadow-blue-500/20'
                      : 'bg-surface/70 text-text-secondary border border-surface-border hover:border-blue-500/40 hover:text-heading'
                  }`}>
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {b}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    branch === b ? 'bg-white/20 text-heading' : 'bg-surface text-text-muted'
                  }`}>
                    {b === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.branch === b).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* difficulty chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-600 mr-1 flex items-center gap-1"><Filter className="w-3 h-3" />Level:</span>
            {DIFFICULTIES.map(d => (
              <button key={d} onClick={() => { setDifficulty(d); setPage(1); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                  difficulty === d
                    ? 'bg-blue-600 text-heading shadow-lg shadow-blue-500/25'
                    : 'bg-surface/70 text-text-muted border border-surface-border hover:border-blue-500/40 hover:text-heading'
                }`}>{d}</button>
            ))}
          </div>

          {/* result count + clear */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Showing <span className="text-blue-400">{Math.min(visible.length, filtered.length)}</span> of{' '}
              <span className="text-blue-400">{filtered.length}</span> projects
              {search && <> for "<span className="text-heading">{search}</span>"</>}
            </p>
            {isFiltered && (
              <button onClick={clearFilters} className="text-xs text-text-muted hover:text-blue-400 transition-colors">
                Clear filters ×
              </button>
            )}
          </div>
        </motion.div>

        {/* ════════ PROJECTS GRID ════════ */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-24 text-center">
              <Search className="w-14 h-14 mx-auto mb-4 text-slate-700" />
              <p className="text-base text-text-muted mb-2">No projects match your search.</p>
              <button onClick={clearFilters} className="text-sm text-blue-400 hover:underline">Clear all filters</button>
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((project, idx) => (
                <ProjectCard key={project.id} project={project} idx={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════ LOAD MORE ════════ */}
        {hasMore && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex justify-center mt-10">
            <motion.button onClick={() => setPage(p => p + 1)}
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="px-10 py-3.5 bg-surface/70 border border-surface-border text-text-secondary rounded-xl text-sm hover:border-blue-500/40 hover:text-heading hover:shadow-lg hover:shadow-blue-500/10 transition-all flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              Load More Projects ({filtered.length - visible.length} remaining)
            </motion.button>
          </motion.div>
        )}

        {/* ════════ BRANCH BREAKDOWN ════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(BRANCH_META).map(([name, meta]) => {
            const Icon = meta.icon;
            const count = PROJECTS.filter(p => p.branch === name).length;
            return (
              <motion.button key={name} onClick={() => { setBranch(name); setPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }}
                className="bg-card-bg border border-card-border rounded-2xl p-4 text-center hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
                <div className={`w-10 h-10 mx-auto mb-2.5 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-heading" />
                </div>
                <div className="text-sm text-heading mb-0.5">{name}</div>
                <div className="text-xs text-text-muted">{count} projects</div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ════════ BOTTOM CTA ════════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-8 bg-gradient-to-br from-blue-900/25 to-cyan-900/15 border border-blue-500/30 rounded-2xl p-10 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(11,79,138,0.15),transparent_60%)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl text-heading">Contribute Your Project</h3>
              </div>
              <p className="text-text-muted max-w-lg leading-relaxed text-sm">
                Built something amazing? Share your project with the Tectonix community!
                Get featured, help fellow students, and showcase your skills to recruiters.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {['Open-Source', 'All Branches Welcome', 'Get Featured'].map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs text-text-muted">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <motion.a href="https://github.com/Tectonix" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-heading rounded-xl text-sm hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 justify-center">
                <Github className="w-5 h-5" /> Submit on GitHub
              </motion.a>
              <motion.a href="https://github.com/Tectonix" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-surface/70 border border-surface-border text-text-secondary rounded-xl text-sm hover:border-blue-500/40 hover:text-heading transition-all flex items-center gap-2 justify-center">
                <TrendingUp className="w-4 h-4" /> View All on GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}