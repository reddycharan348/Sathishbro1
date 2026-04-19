const fs = require('fs');
let code = fs.readFileSync('src/app/components/ProjectsSection.tsx', 'utf-8');

// Replace global dark mode classes with theme-aware classes
code = code.replace(/bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950/g, 'bg-page-bg theme-transition');
code = code.replace(/bg-slate-950/g, 'bg-page-bg theme-transition');
code = code.replace(/text-white/g, 'text-heading');
code = code.replace(/text-slate-400/g, 'text-text-muted');
code = code.replace(/text-slate-300/g, 'text-text-secondary');
code = code.replace(/bg-slate-900\/60/g, 'bg-card-bg');
code = code.replace(/bg-slate-900\/70/g, 'bg-card-bg');
code = code.replace(/bg-slate-900/g, 'bg-surface');
code = code.replace(/border-slate-800/g, 'border-card-border');
code = code.replace(/hover:border-slate-600/g, 'hover:border-blue-500/50');
code = code.replace(/from-slate-900\/90/g, 'from-card-bg');
code = code.replace(/bg-slate-800\/50/g, 'bg-surface border border-surface-border');
code = code.replace(/bg-slate-800\/40/g, 'bg-surface border border-surface-border');
code = code.replace(/bg-slate-800/g, 'bg-surface');
code = code.replace(/border-slate-700/g, 'border-surface-border');
code = code.replace(/text-slate-200/g, 'text-heading');
code = code.replace(/text-slate-500/g, 'text-text-muted');

// Also for ProjectCard
code = code.replace(/<div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800\/80">/g, '<div className="flex flex-wrap gap-2 pt-4 border-t border-card-border">');

fs.writeFileSync('src/app/components/ProjectsSection.tsx', code);
console.log('Fixed ProjectsSection.tsx');
