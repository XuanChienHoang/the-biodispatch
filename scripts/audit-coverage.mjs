import fs from 'fs';
import path from 'path';

const posts = fs.readdirSync('content/posts').filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
const store = fs.readFileSync('src/lib/store.ts', 'utf8');

const seedKeys = [];
const lines = store.split('\n');
for (const line of lines) {
  const m = line.match(/^\s*"([a-zA-Z0-9\-_]+)":\s*\[/);
  if (m) {
    seedKeys.push(m[1]);
  }
}

const missingInStore = posts.filter(p => !seedKeys.includes(p));
console.log('Total markdown posts:', posts.length);
console.log('Total keys in SEED_REFS:', seedKeys.length);
console.log('Posts without SEED_REFS entry:', missingInStore.length);
if (missingInStore.length) {
  console.log('Missing slugs:', missingInStore);
}
