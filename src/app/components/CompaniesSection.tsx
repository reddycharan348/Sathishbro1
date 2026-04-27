import { motion } from 'motion/react';
import googleLogo from '@/assets/companies/google.png';
import microsoftLogo from '@/assets/companies/microsoft.png';
import amazonLogo from '@/assets/companies/amazon.png';
import tcsLogo from '@/assets/companies/tcs.png';
import wiproLogo from '@/assets/companies/wipro.png';
import deloitteLogo from '@/assets/companies/deloitte.jpeg';
import ibmLogo from '@/assets/companies/ibm.jpg';
import cognizantLogo from '@/assets/companies/cognizant.png';
import techmahindraLogo from '@/assets/companies/techmahindra.png';
import hclLogo from '@/assets/companies/hcl.png';
import cursorLogo from '@/assets/companies/cursorai.png';

const companies = [
  { name: 'Google', logo: googleLogo },
  { name: 'Microsoft', logo: microsoftLogo },
  { name: 'Amazon', logo: amazonLogo },
  { name: 'TCS', logo: tcsLogo },
  { name: 'Wipro', logo: wiproLogo },
  { name: 'Deloitte', logo: deloitteLogo },
  { name: 'IBM', logo: ibmLogo },
  { name: 'Cognizant', logo: cognizantLogo },
  { name: 'Tech Mahindra', logo: techmahindraLogo },
  { name: 'HCL', logo: hclLogo },
  { name: 'Cursor', logo: cursorLogo },
];

export function CompaniesSection() {

  return (
    <div className="py-12 bg-surface/50 relative overflow-hidden theme-transition">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-500/5 to-blue-600/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-text-muted text-base font-medium mb-6">Our students got placed at</p>
        </motion.div>
      </div>

      {/* Full-width scrolling marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient overlays for smooth fading at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-r from-page-bg via-page-bg/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-l from-page-bg via-page-bg/80 to-transparent pointer-events-none" />

        <motion.div
          animate={{
            x: [0, -1500],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 sm:gap-12 items-center w-max"
        >
          {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 group py-6"
            >
              <div className="flex flex-col items-center gap-4 min-w-[180px] sm:min-w-[240px] px-10 sm:px-14 py-8 sm:py-10 bg-surface/40 backdrop-blur-md border border-surface-border/50 rounded-3xl shadow-sm hover:shadow-2xl hover:border-blue-500/50 transition-all theme-transition group-hover:scale-110 group-hover:-translate-y-2">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  loading="lazy"
                  decoding="async"
                  className="h-12 sm:h-20 w-auto object-contain transition-all"
                />
                <span className="text-sm font-black text-text-muted group-hover:text-blue-400 transition-colors uppercase tracking-widest">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
