const fs = require('fs');
const path = require('path');

const dir = 'src/app/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  [/bg-slate-950(?!\/)/g, 'bg-page-bg'],
  [/bg-slate-900\/[0-9]+/g, 'bg-card-bg'],
  [/bg-slate-800\/[0-9]+/g, 'bg-surface'],
  [/bg-slate-900(?!\/)/g, 'bg-surface'],
  [/bg-slate-800(?!\/)/g, 'bg-surface'],
  [/border-slate-800\/[0-9]+/g, 'border-card-border'],
  [/border-slate-800(?!\/)/g, 'border-card-border'],
  [/border-slate-700\/[0-9]+/g, 'border-surface-border'],
  [/border-slate-700(?!\/)/g, 'border-surface-border'],
  [/text-slate-400/g, 'text-text-muted'],
  [/text-slate-300/g, 'text-text-secondary'],
  [/text-slate-500/g, 'text-text-muted'],
  [/text-slate-200/g, 'text-heading'],
  // Be careful with text-white, it might be used on colored backgrounds
  // We'll only replace text-white if it's likely main text. We will skip text-white here
  // because replacing all text-white can break text on blue buttons.
];

let changedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let code = fs.readFileSync(filePath, 'utf-8');
  let originalCode = code;
  
  for (const [regex, replacement] of replacements) {
    code = code.replace(regex, replacement);
  }
  
  // Custom replacement for text-white where it's a heading
  code = code.replace(/text-[2-9]xl sm:text-[3-9]xl text-white/g, match => match.replace('text-white', 'text-heading'));
  code = code.replace(/text-[2-9]xl text-white/g, match => match.replace('text-white', 'text-heading'));
  code = code.replace(/text-xl text-white/g, match => match.replace('text-white', 'text-heading'));
  code = code.replace(/text-lg text-white/g, match => match.replace('text-white', 'text-heading'));
  code = code.replace(/text-base text-white/g, match => match.replace('text-white', 'text-heading'));

  if (code !== originalCode) {
    fs.writeFileSync(filePath, code);
    changedCount++;
  }
}

console.log(`Updated ${changedCount} files.`);
