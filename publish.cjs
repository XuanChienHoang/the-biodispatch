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
  run('npx -y vercel --prod --yes');
  console.log('\n✅ HOÀN TẤT! Bài viết đã lên sóng tại: https://the-biodispatch.vercel.app');
} catch (err) {
  console.error('❌ Lỗi khi publish:', err.message);
  process.exit(1);
}
