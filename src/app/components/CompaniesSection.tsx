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

export function CompaniesSection() {
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
  ];

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
          <p className="text-text-muted text-sm mb-6">Our students got placed at</p>
        </motion.div>

        {/* Scrolling companies */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-6 sm:gap-12 items-center"
          >
            {[...companies, ...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 group"
              >
                <div className="flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-surface backdrop-blur-sm border border-surface-border rounded-xl hover:border-blue-500/50 transition-all theme-transition group-hover:scale-105">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    loading="lazy"
                    decoding="async"
                    className="h-6 sm:h-8 w-auto object-contain brightness-90 group-hover:brightness-100 transition-all"
                  />
                  <span className="text-text-secondary whitespace-nowrap text-sm sm:text-base font-medium">{company.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
