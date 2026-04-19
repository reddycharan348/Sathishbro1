import { motion, AnimatePresence } from 'motion/react';
import { Code, Cpu, Zap, Cog, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function ProjectIdeasSection() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const departments = [
    {
      id: 'cse',
      name: 'Computer Science',
      shortName: 'CSE',
      icon: Code,
      color: 'from-blue-600 to-cyan-500',
      description: 'Full-stack, AI/ML, Cloud & Mobile Development',
    },
    {
      id: 'ece',
      name: 'Electronics & Communication',
      shortName: 'ECE',
      icon: Cpu,
      color: 'from-cyan-600 to-blue-500',
      description: 'IoT, Embedded Systems, VLSI & Signal Processing',
    },
    {
      id: 'eee',
      name: 'Electrical & Electronics',
      shortName: 'EEE',
      icon: Zap,
      color: 'from-blue-500 to-cyan-600',
      description: 'Power Systems, Automation & Renewable Energy',
    },
    {
      id: 'mec',
      name: 'Mechanical Engineering',
      shortName: 'MEC',
      icon: Cog,
      color: 'from-cyan-500 to-blue-600',
      description: 'CAD/CAM, Robotics, Thermal & Manufacturing',
    },
  ];

  const projectIdeas = {
    cse: [
      { title: 'AI-Powered Chatbot with NLP', difficulty: 'Advanced', duration: '4 weeks' },
      { title: 'E-Commerce Platform with Payment Gateway', difficulty: 'Intermediate', duration: '6 weeks' },
      { title: 'Real-Time Face Recognition System', difficulty: 'Advanced', duration: '5 weeks' },
      { title: 'Social Media Analytics Dashboard', difficulty: 'Intermediate', duration: '4 weeks' },
      { title: 'Cloud-Based File Storage System', difficulty: 'Advanced', duration: '6 weeks' },
      { title: 'Machine Learning Price Predictor', difficulty: 'Advanced', duration: '5 weeks' },
      { title: 'Mobile App with React Native', difficulty: 'Intermediate', duration: '5 weeks' },
      { title: 'Blockchain-Based Voting System', difficulty: 'Advanced', duration: '7 weeks' },
      { title: 'AI Image Caption Generator', difficulty: 'Advanced', duration: '6 weeks' },
      { title: 'Restaurant Management System', difficulty: 'Beginner', duration: '3 weeks' },
    ],
    ece: [
      { title: 'IoT-Based Smart Home Automation', difficulty: 'Intermediate', duration: '5 weeks' },
      { title: 'RFID-Based Attendance System', difficulty: 'Beginner', duration: '3 weeks' },
      { title: 'Wireless Power Transfer System', difficulty: 'Advanced', duration: '6 weeks' },
      { title: 'Arduino-Based Weather Station', difficulty: 'Beginner', duration: '2 weeks' },
      { title: 'Gesture-Controlled Robot', difficulty: 'Intermediate', duration: '4 weeks' },
      { title: 'VLSI Design of ALU using Verilog', difficulty: 'Advanced', duration: '5 weeks' },
      { title: 'Voice-Controlled Home Automation', difficulty: 'Intermediate', duration: '4 weeks' },
      { title: 'Bluetooth-Based Smart Lock System', difficulty: 'Intermediate', duration: '3 weeks' },
      { title: 'Solar Tracking System with LDR', difficulty: 'Intermediate', duration: '4 weeks' },
      { title: 'Fire Alarm System using IoT', difficulty: 'Beginner', duration: '2 weeks' },
    ],
    eee: [
      { title: 'Solar Power Generation System', difficulty: 'Intermediate', duration: '5 weeks' },
      { title: 'Automatic Power Factor Correction', difficulty: 'Advanced', duration: '6 weeks' },
      { title: 'MATLAB-Based Load Flow Analysis', difficulty: 'Advanced', duration: '5 weeks' },
      { title: 'Wind Turbine Power Generation', difficulty: 'Intermediate', duration: '4 weeks' },
      { title: 'Electric Vehicle Charging Station', difficulty: 'Advanced', duration: '7 weeks' },
      { title: 'Smart Grid with IoT Integration', difficulty: 'Advanced', duration: '8 weeks' },
      { title: 'Transformer Health Monitoring', difficulty: 'Advanced', duration: '6 weeks' },
      { title: 'SCADA System for Power Distribution', difficulty: 'Advanced', duration: '7 weeks' },
      { title: 'Three-Phase Induction Motor Control', difficulty: 'Intermediate', duration: '4 weeks' },
      { title: 'Battery Management System (BMS)', difficulty: 'Advanced', duration: '6 weeks' },
    ],
    mec: [
      { title: 'CNC Machine Design in SolidWorks', difficulty: 'Advanced', duration: '6 weeks' },
      { title: 'Robotic Arm with Pick and Place', difficulty: 'Advanced', duration: '7 weeks' },
      { title: 'Solar Water Heater System', difficulty: 'Intermediate', duration: '4 weeks' },
      { title: 'Hydraulic Press Machine Design', difficulty: 'Intermediate', duration: '5 weeks' },
      { title: 'Automatic Car Parking System', difficulty: 'Advanced', duration: '6 weeks' },
      { title: 'Hovercraft Model Design', difficulty: 'Intermediate', duration: '4 weeks' },
      { title: 'Wind Turbine Blade Design in ANSYS', difficulty: 'Advanced', duration: '6 weeks' },
      { title: 'Pneumatic Scissor Lift Mechanism', difficulty: 'Intermediate', duration: '4 weeks' },
      { title: 'Heat Exchanger Design & Analysis', difficulty: 'Advanced', duration: '5 weeks' },
      { title: 'Automatic Gear Transmission System', difficulty: 'Advanced', duration: '6 weeks' },
    ],
  };

  return (
    <div className="py-20 bg-page-bg theme-transition relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-purple-600/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 rounded-full text-sm mb-4 flex items-center gap-2 mx-auto w-max font-medium">
            <Sparkles className="w-4 h-4" />
            Project Library
          </div>
          <h2 className="text-4xl sm:text-5xl text-heading mb-4 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent font-bold">
            100+ Industry-Ready Project Ideas
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Choose from our curated collection of real-world projects across all engineering branches.
            Build your portfolio with hands-on experience.
          </p>
        </motion.div>

        {/* Department cards & Inline expanded content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-start">
          {departments.map((dept, index) => {
            const isSelected = selectedDepartment === dept.id;
            
            return (
              <motion.div
                key={dept.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, layout: { duration: 0.3 } }}
                viewport={{ once: true }}
                className={`group relative text-left w-full ${
                  isSelected ? 'md:col-span-2 lg:col-span-4' : ''
                }`}
              >
                {/* The card itself */}
                <button
                  onClick={() => setSelectedDepartment(isSelected ? null : dept.id)}
                  className={`w-full text-left bg-card-bg backdrop-blur-sm border rounded-2xl p-6 transition-all theme-transition ${
                    isSelected
                      ? 'border-blue-500 shadow-2xl shadow-blue-500/20'
                      : 'border-card-border hover:border-blue-500/50'
                  }`}
                >
                  <div className={`flex ${isSelected ? 'flex-col sm:flex-row items-start sm:items-center justify-between gap-6' : 'flex-col'}`}>
                    <div>
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${dept.color} mb-4 shadow-lg`}
                      >
                        <dept.icon className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-xl text-heading mb-2 font-semibold">{dept.name}</h3>
                      <p className="text-xs text-text-secondary mb-3">{dept.shortName}</p>
                      {!isSelected && <p className="text-sm text-text-muted mb-4">{dept.description}</p>}
                    </div>

                    {/* Project count & expand icon */}
                    <div className={`flex items-center justify-between ${isSelected ? 'w-full sm:w-auto' : 'w-full'}`}>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {projectIdeas[dept.id as keyof typeof projectIdeas].length} Projects
                      </span>
                      <ChevronRight className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform ${
                        isSelected ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeDept"
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${dept.color} rounded-b-2xl`}
                    />
                  )}
                </button>

                {/* Inline Expanded Projects List */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden w-full"
                    >
                      <div className="bg-card-bg backdrop-blur-sm border border-card-border rounded-2xl p-6 sm:p-8 theme-transition">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                          <h3 className="text-2xl text-heading font-semibold">
                            {dept.name} Projects
                          </h3>
                          <span className="px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium w-max">
                            {projectIdeas[dept.id as keyof typeof projectIdeas].length} Available
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {projectIdeas[dept.id as keyof typeof projectIdeas].map((project, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.02 }}
                              whileHover={{ y: -4 }}
                              className="bg-surface border border-surface-border rounded-xl p-4 hover:border-blue-500/50 transition-all group cursor-pointer theme-transition"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="text-sm text-heading font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-1">
                                  {project.title}
                               </h4>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <span className={`px-2 py-1 rounded font-medium ${
                                  project.difficulty === 'Beginner'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-600/20 dark:text-green-400'
                                    : project.difficulty === 'Intermediate'
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-600/20 dark:text-amber-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-600/20 dark:text-red-400'
                                }`}>
                                  {project.difficulty}
                                </span>
                                <span className="text-text-muted">•</span>
                                <span className="text-text-secondary font-medium">{project.duration}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {!selectedDepartment && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-text-muted mb-4 font-medium">
              Select any department above to explore 20+ project ideas
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
