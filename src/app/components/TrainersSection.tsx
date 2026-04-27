import { motion } from 'motion/react';
import { GraduationCap, Award, Briefcase, Star, Linkedin, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const trainers = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    title: 'Lead AI & Machine Learning Expert',
    photo: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWNoJTIwaW5zdHJ1Y3RvciUyMHRlYWNoaW5nfGVufDF8fHx8MTc2OTQyNzg0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Passionate educator with over 15 years of experience in AI and Machine Learning. Former Google AI researcher and IIT Bombay faculty member. Committed to making complex AI concepts accessible to engineering students across all branches.',
    education: [
      'Ph.D. in Computer Science, IIT Bombay',
      'M.Tech in Artificial Intelligence, IIT Delhi',
      'B.Tech in Computer Science & Engineering'
    ],
    background: [
      'Senior AI Researcher at Google Research (2015-2020)',
      'AI/ML Consultant for Fortune 500 Companies',
      'Published 30+ research papers in top AI conferences',
      'Mentored 500+ students into top tech companies'
    ],
    specializations: ['Deep Learning', 'NLP', 'Computer Vision', 'MLOps'],
    experience: '15+ Years',
    rating: 4.9,
    studentsGuided: '2,500+',
    linkedin: '#',
    email: 'rajesh.kumar@tectonix.com'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    title: 'Full-Stack Development & Cloud Expert',
    photo: 'https://images.unsplash.com/photo-1573495612937-f01934eeaaa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNvZnR3YXJlJTIwZW5naW5lZXIlMjBtZW50b3J8ZW58MXx8fHwxNzY5NDI3ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Dynamic software architect specializing in modern web technologies and cloud computing. Ex-Microsoft engineer with a proven track record of training thousands of developers. Believes in hands-on project-based learning.',
    education: [
      'M.S. in Software Engineering, Stanford University',
      'B.Tech in Information Technology, BITS Pilani',
      'AWS Solutions Architect Professional Certified'
    ],
    background: [
      'Senior Software Architect at Microsoft Azure (2016-2021)',
      'Led development teams of 50+ engineers',
      'Designed scalable systems serving millions of users',
      'AWS & Azure certified trainer with 1000+ hours of teaching'
    ],
    specializations: ['React', 'Node.js', 'AWS/Azure', 'System Design'],
    experience: '12+ Years',
    rating: 4.8,
    studentsGuided: '1,800+',
    linkedin: '#',
    email: 'priya.sharma@tectonix.com'
  },
  {
    id: 3,
    name: 'Prof. Arun Patel',
    title: 'IoT & Embedded Systems Specialist',
    photo: 'https://images.unsplash.com/photo-1758685848208-e108b6af94cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHBlcmllbmNlZCUyMHRlY2hub2xvZ3klMjBwcm9mZXNzb3J8ZW58MXx8fHwxNzY5NDI3ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Industry veteran with extensive experience in IoT, embedded systems, and hardware-software integration. Previously worked with Texas Instruments and Intel. Specializes in making IoT accessible to ECE, EEE, and ME students.',
    education: [
      'Ph.D. in Electronics & Communication, IISc Bangalore',
      'M.Tech in VLSI Design, IIT Madras',
      'B.E. in Electronics Engineering'
    ],
    background: [
      'Principal Engineer at Intel Corporation (2012-2019)',
      'IoT Solutions Architect at Texas Instruments',
      'Holds 8 patents in embedded systems',
      'IEEE Senior Member with 40+ publications'
    ],
    specializations: ['IoT', 'Embedded C', 'VLSI', 'Sensor Networks'],
    experience: '18+ Years',
    rating: 4.9,
    studentsGuided: '1,500+',
    linkedin: '#',
    email: 'arun.patel@tectonix.com'
  },
  {
    id: 4,
    name: 'Dr. Meera Reddy',
    title: 'Data Science & Analytics Expert',
    photo: 'https://images.unsplash.com/photo-1762968286778-60e65336d5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMG1hY2hpbmUlMjBsZWFybmluZyUyMGV4cGVydHxlbnwxfHx8fDE3Njk0Mjc4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Data science pioneer with a passion for extracting insights from complex datasets. Former Amazon data scientist with expertise in big data technologies. Dedicated to helping students master Python, data analytics, and visualization.',
    education: [
      'Ph.D. in Data Science, Carnegie Mellon University',
      'M.S. in Statistics, University of California, Berkeley',
      'B.Tech in Computer Science'
    ],
    background: [
      'Senior Data Scientist at Amazon Web Services (2014-2020)',
      'Led data science teams for e-commerce analytics',
      'Expert in Python, R, and advanced statistics',
      'Kaggle Competitions Master with multiple gold medals'
    ],
    specializations: ['Python', 'Data Analytics', 'Big Data', 'Tableau'],
    experience: '14+ Years',
    rating: 4.9,
    studentsGuided: '2,000+',
    linkedin: '#',
    email: 'meera.reddy@tectonix.com'
  }
];

export function TrainersSection() {
  return (
    <section className="py-20 bg-page-bg theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Trainers Grid */}
        <div className="space-y-12">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card-bg backdrop-blur-sm rounded-2xl border border-card-border overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 theme-transition">
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  {/* Left Column - Photo and Quick Stats */}
                  <div className="md:col-span-1 space-y-6">
                    {/* Photo */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-cyan-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                      <ImageWithFallback
                        src={trainer.photo}
                        alt={trainer.name}
                        className="relative w-full h-80 object-cover rounded-2xl border-2 border-blue-500/30 group-hover:border-cyan-400/50 transition-all"
                      />
                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-600 to-cyan-500 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                        <Star className="w-4 h-4 text-white fill-white" />
                        <span className="text-sm text-white font-medium">{trainer.rating}</span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-3">
                      <div className="bg-surface rounded-lg p-4 border border-surface-border theme-transition">
                        <div className="flex items-center gap-2 text-cyan-500 mb-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-sm font-medium">Experience</span>
                        </div>
                        <p className="text-heading font-medium">{trainer.experience}</p>
                      </div>
                      <div className="bg-surface rounded-lg p-4 border border-surface-border theme-transition">
                        <div className="flex items-center gap-2 text-cyan-500 mb-1">
                          <GraduationCap className="w-4 h-4" />
                          <span className="text-sm font-medium">Students Guided</span>
                        </div>
                        <p className="text-heading font-medium">{trainer.studentsGuided}</p>
                      </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        <span className="text-sm">LinkedIn</span>
                      </button>
                      <button className="flex-1 px-4 py-2 bg-surface hover:bg-surface-hover border border-surface-border text-heading rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">Email</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Name and Title */}
                    <div>
                      <h3 className="text-3xl text-heading mb-2">
                        {trainer.name}
                      </h3>
                      <p className="text-xl bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent font-medium">
                        {trainer.title}
                      </p>
                    </div>

                    {/* Bio */}
                    <div>
                      <p className="text-text-secondary leading-relaxed">
                        {trainer.bio}
                      </p>
                    </div>

                    {/* Specializations */}
                    <div>
                      <h4 className="flex items-center gap-2 text-cyan-500 mb-3 font-medium">
                        <Award className="w-5 h-5" />
                        Specializations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trainer.specializations.map((spec, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-1.5 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-500/30 rounded-full text-sm text-blue-600 dark:text-cyan-400 font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h4 className="flex items-center gap-2 text-cyan-500 mb-3 font-medium">
                        <GraduationCap className="w-5 h-5" />
                        Education
                      </h4>
                      <div className="space-y-2">
                        {trainer.education.map((edu, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></div>
                            <p className="text-text-secondary">{edu}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Professional Background */}
                    <div>
                      <h4 className="flex items-center gap-2 text-cyan-500 mb-3 font-medium">
                        <Briefcase className="w-5 h-5" />
                        Professional Background
                      </h4>
                      <div className="space-y-2">
                        {trainer.background.map((bg, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                            <p className="text-text-secondary">{bg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-card-bg rounded-2xl border border-card-border p-8 sm:p-12 theme-transition">
            <h3 className="text-2xl sm:text-3xl text-heading mb-4 font-bold">
              Ready to Learn from the Best?
            </h3>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers under the guidance of our expert trainers. Get personalized mentorship and industry insights.
            </p>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 font-medium">
              Start Learning Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
