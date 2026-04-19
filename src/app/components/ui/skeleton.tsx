import { motion } from 'motion/react';

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div className={`relative overflow-hidden bg-surface-hover rounded-xl ${className}`}>
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
};

export const SectionSkeleton = () => (
  <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
    <div className="flex flex-col items-center space-y-4 mb-12">
      <Skeleton className="h-6 w-32 rounded-full" />
      <Skeleton className="h-12 w-3/4 sm:w-1/2" />
      <Skeleton className="h-4 w-2/3 sm:w-1/3" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-6 border border-surface-border rounded-2xl space-y-4">
          <Skeleton className="h-12 w-12" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  </div>
);
