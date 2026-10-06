import fs from 'fs';
import path from 'path';
import { validateFile } from './validate-dispatch.mjs';

const postsDir = path.resolve('content/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const results = [];
for (const file of files) {
  const fullPath = path.join(postsDir, file);
  const res = validateFile(fullPath);
  results.push({ file, ...res });
}

const failed = results.filter(r => !r.isValid);
console.log('Tổng số bài kiểm tra:', results.length);
console.log('Số bài ĐẠT chuẩn:', results.length - failed.length);
console.log('Số bài CHƯA ĐẠT:', failed.length);
console.log('\n--- DANH SÁCH BÀI CHƯA ĐẠT ---');
failed.forEach(f => {
  console.log(`\n❌ ${f.file} (${f.wordCount} từ):`);
  f.issues.forEach(i => console.log(`   - ${i}`));
});
