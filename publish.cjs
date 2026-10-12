const { execSync } = require('child_process');
const path = require('path');

const repoDir = path.resolve(__dirname);
const env = {
  ...process.env,
  PATH: `C:\\Program Files\\Git\\cmd;C:\\Program Files\\GitHub CLI;c:\\Hoang's projects\\nodejs;${process.env.PATH || ''}`
};

function run(cmd) {
  console.log(`> ${cmd}`);
  return execSync(cmd, { cwd: repoDir, env, stdio: 'inherit' });
}

try {
  console.log('🔄 Đang đồng bộ và cập nhật The BioDispatch...');
  run('git add .');
  const commitMsg = process.argv[2] || 'content: update dispatches and research articles';
  try {
    run(`git commit -m "${commitMsg}"`);
  } catch (e) {
    console.log('ℹ️ Không có thay đổi mới để commit.');
  }
  run('git push origin main');
  console.log('🚀 Đang deploy bản mới nhất lên Vercel...');
  let vercelToken = process.env.VERCEL_TOKEN || '';
  if (!vercelToken) {
    const fs = require('fs');
    const candPaths = [
      path.resolve(repoDir, '.env.local'),
      path.resolve(repoDir, '../01_DIGITAL_PRODUCT_STUDIO/deploy_to_vercel.bat')
    ];
    for (const p of candPaths) {
      if (fs.existsSync(p)) {
        const text = fs.readFileSync(p, 'utf8');
        const m = text.match(/VERCEL_TOKEN=["']?([a-zA-Z0-9_-]+)["']?/);
        if (m && m[1]) {
          vercelToken = m[1];
          break;
        }
      }
    }
  }
  const tokenArg = vercelToken ? ` --token ${vercelToken}` : '';
  run(`npx -y vercel deploy --prod${tokenArg} --yes`);
  console.log('\n✅ HOÀN TẤT! Bài viết đã lên sóng tại: https://www.phyto-codex.org');
} catch (err) {
  console.error('❌ Lỗi khi publish:', err.message);
  process.exit(1);
}
