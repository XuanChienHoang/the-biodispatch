/**
 * Vercel Deployment Auto-Pruner
 * Dr. Xuan Chien Hoang (Phytocodex Engine)
 * 
 * Tự động giữ số lượng deployments ở mức tối thiểu an toàn (mặc định: 3 bản).
 * Xóa ngay các bản deploy cũ để không bao giờ bị tích tụ đầy bộ nhớ Deployment Storage.
 */

const token = process.env.VERCEL_TOKEN;
const teamId = process.env.VERCEL_TEAM_ID || 'team_sb63kYQfodHHtx84G0OON8Cj';
const projectId = process.env.VERCEL_PROJECT_ID || 'prj_w8Xykc46u5feLU53G0juoidSxBnq';
const KEEP_MAX = 3; // Chỉ giữ bản đang chạy + 2 bản dự phòng gần nhất

export async function autoPruneDeployments() {
  if (!token) {
    console.log('[Auto-Prune] Không tìm thấy VERCEL_TOKEN, bỏ qua bước dọn dẹp.');
    return;
  }

  try {
    // 1. Xác định bản Production hiện tại để bảo vệ tuyệt đối
    const pRes = await fetch(`https://api.vercel.com/v9/projects/${projectId}?teamId=${teamId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!pRes.ok) return;
    const pData = await pRes.json();
    const currentProdId = pData.targets?.production?.id;

    // 2. Lấy danh sách deployments hiện có
    const dRes = await fetch(`https://api.vercel.com/v6/deployments?projectId=${projectId}&teamId=${teamId}&limit=50`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!dRes.ok) return;
    const dData = await dRes.json();
    const deployments = dData.deployments || [];

    if (deployments.length <= KEEP_MAX) {
      console.log(`[Auto-Prune] Số bản deploy hiện tại (${deployments.length}) đã ở mức tối ưu (<= ${KEEP_MAX}).`);
      return;
    }

    // 3. Giữ lại bản Prod hiện tại và các bản mới nhất
    const keepIds = new Set();
    if (currentProdId) keepIds.add(currentProdId);
    for (let i = 0; i < Math.min(KEEP_MAX, deployments.length); i++) {
      keepIds.add(deployments[i].uid);
    }

    const toDelete = deployments.filter(d => !keepIds.has(d.uid) && d.state !== 'BUILDING');
    console.log(`[Auto-Prune] Phát hiện ${toDelete.length} bản deploy dư thừa. Đang tự động dọn dẹp...`);

    let count = 0;
    for (const d of toDelete) {
      const delRes = await fetch(`https://api.vercel.com/v13/deployments/${d.uid}?teamId=${teamId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (delRes.ok) count++;
      await new Promise(r => setTimeout(r, 100));
    }

    console.log(`✅ [Auto-Prune] Đã giải phóng thành công ${count} bản deploy cũ. Duy trì đúng ${keepIds.size} bản an toàn.`);
  } catch (err) {
    console.warn(`[Auto-Prune Warning]:`, err.message);
  }
}

// Chạy trực tiếp nếu được gọi từ CLI
if (process.argv[1] && process.argv[1].endsWith('auto-prune-deployments.mjs')) {
  autoPruneDeployments();
}
