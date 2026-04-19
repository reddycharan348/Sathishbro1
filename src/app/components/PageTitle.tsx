import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function PageTitle({ title, subtitle, icon }: PageTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-page-bg border-b border-surface-border py-8 sm:py-12 theme-transition"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/50"
          >
            {icon}
          </motion.div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 sm:mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto px-2">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
