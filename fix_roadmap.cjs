const fs = require('fs');
let code = fs.readFileSync('src/app/components/RoadmapSection.tsx', 'utf-8');

// Replace global dark mode classes with theme-aware classes
code = code.replace(/bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950/g, 'bg-page-bg theme-transition');
code = code.replace(/text-white/g, 'text-heading');
code = code.replace(/text-slate-400/g, 'text-text-muted');
code = code.replace(/bg-slate-900\/70/g, 'bg-card-bg');
code = code.replace(/bg-slate-900\/80/g, 'bg-card-bg');
code = code.replace(/border-slate-800/g, 'border-card-border');
code = code.replace(/bg-slate-900\/60/g, 'bg-card-bg');
code = code.replace(/bg-slate-800\/40/g, 'bg-surface');
code = code.replace(/border-slate-700\/60/g, 'border-surface-border');
code = code.replace(/border-slate-700/g, 'border-surface-border');
code = code.replace(/bg-slate-800\/60/g, 'bg-surface');
code = code.replace(/bg-slate-800\/70/g, 'bg-surface');
code = code.replace(/bg-slate-800\/50/g, 'bg-surface');
code = code.replace(/bg-slate-800/g, 'bg-surface');
code = code.replace(/text-slate-300/g, 'text-text-secondary');
code = code.replace(/text-slate-200/g, 'text-heading');

// Fix the inline expansion structure
// Find the start of EXPANDED DETAIL PANEL
let expandedPanelStartIdx = code.indexOf('{/* ════════ EXPANDED DETAIL PANEL ════════ */}');
let expandedPanelEndIdx = code.indexOf('{/* ════════ BOTTOM CTA ════════ */}');

let expandedPanelCode = code.substring(expandedPanelStartIdx, expandedPanelEndIdx);
code = code.substring(0, expandedPanelStartIdx) + code.substring(expandedPanelEndIdx);

// Now insert the expanded panel code inside the filtered.map loop
// Need to find where the card body ends
let cardEnd = `                    </div>

                  </div>
                </motion.div>`;
                
// modify the motion.div to add the col-span and layout
code = code.replace(
  `                <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }} viewport={{ once: true }}>`,
  `                <motion.div key={course.id} layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, layout: { duration: 0.3 } }} viewport={{ once: true }}
                  className={isOpen ? 'sm:col-span-2 lg:col-span-4' : ''}>`
);

// We need to modify the expandedPanelCode to not use AnimatePresence because it will be wrapped by the card, 
// actually we can just put AnimatePresence around the expanded content inside the card.
// Also the panel uses `course` and `activeTab`, which are defined in the panel code. 
// Inside the filtered map, we already have `course` and can define `activeTab`.

let panelContentInner = expandedPanelCode
  .replace('{/* ════════ EXPANDED DETAIL PANEL ════════ */}', '')
  .replace('<AnimatePresence mode="wait">', '')
  .replace('{expandedCourse && (() => {', '')
  .replace('const course = courses.find(c => c.id === expandedCourse);', '')
  .replace('if (!course) return null;', '')
  .replace('const diff = getDiff(course.difficulty);', '')
  .replace(/const activeTab = getTab\(course\.id\);/g, '')
  .replace(/<motion\.div key=\{expandedCourse\}[^>]*>/, '<motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 24 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden w-full">')
  .replace(/}\)\(\)}/, '')
  .replace(/<\/AnimatePresence>/, '')
  .trim();

// The panel has 2 closing divs (for the motion.div and the inner bg div)
panelContentInner = panelContentInner.substring(0, panelContentInner.lastIndexOf('</div>') + 6);
panelContentInner = panelContentInner.substring(0, panelContentInner.lastIndexOf('</div>') + 6);

let newCardEnd = `                    </div>

                    {/* Inline Expanded Panel */}
                    <AnimatePresence>
                      {isOpen && (
                        ${panelContentInner}
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>`;

code = code.replace(cardEnd, newCardEnd);

// Also need to inject `const activeTab = getTab(course.id);` into the loop if it's missing, but let's check
code = code.replace(
  'const isOpen = expandedCourse === course.id;',
  'const isOpen = expandedCourse === course.id;\n              const activeTab = getTab(course.id);'
);

fs.writeFileSync('src/app/components/RoadmapSection.tsx', code);
console.log('Fixed RoadmapSection.tsx');
