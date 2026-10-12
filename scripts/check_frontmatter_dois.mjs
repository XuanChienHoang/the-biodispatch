import fs from 'fs';
import path from 'path';

const postsDir = 'content/posts';
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
console.log('Total markdown post files:', files.length);

const list = [];
for (const f of files) {
  const c = fs.readFileSync(path.join(postsDir, f), 'utf8');
  const lines = c.split('\n');
  const dLine = lines.find(l => l.trim().startsWith('doi:'));
  if (dLine) {
    const val = dLine.replace('doi:', '').trim().replace(/['"]/g, '');
    list.push({ file: f, doi: val });
  }
}

console.log('Posts with frontmatter DOI:', list.length);
list.forEach(item => console.log(item.file, '->', item.doi));
