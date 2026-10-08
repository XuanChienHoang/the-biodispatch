import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/app/editorial-policy/page.tsx',
  'src/app/impressum/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/feed.xml/route.ts',
  'src/app/gizmos/page.tsx',
  'src/app/gizmos/[slug]/page.tsx',
  'src/app/blog/[slug]/page.tsx',
  'src/components/Citation.tsx',
  'src/components/gizmo/Chassis.tsx',
  'src/components/admin/AdminLogin.tsx',
  'src/components/admin/AdminDashboard.tsx',
  'src/lib/medical-analogies.ts',
  'scripts/generate-daily-dispatch.mjs',
  'scripts/validate-dispatch.mjs',
  'scripts/gemini-topic-generator.mjs',
  'scripts/citation-verifier.mjs',
  'EDITORIAL_GUIDELINES.md'
];

let totalReplacements = 0;

for (const relPath of filesToUpdate) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;

  // Replace The BioDispatch -> Phytocodex
  content = content.replace(/The BioDispatch/g, 'Phytocodex');
  // Replace BioDispatch -> Phytocodex
  content = content.replace(/BioDispatch/g, 'Phytocodex');
  // Replace THE BIODISPATCH -> PHYTOCODEX
  content = content.replace(/THE BIODISPATCH/g, 'PHYTOCODEX');

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${relPath}`);
    totalReplacements++;
  }
}

console.log(`\n🎉 Completed rebranding in ${totalReplacements} files!`);
