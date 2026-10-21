import os
import shutil
import glob
import json
import sys

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

root_dir = r"c:\Hoang's projects\the-biodispatch"
posts_dir = os.path.join(root_dir, "content", "posts")
backup_dir = os.path.join(root_dir, "_backups", "posts_backup_pre_dedup")
archive_dir = os.path.join(root_dir, "_backups", "posts_dedup_archive")

os.makedirs(backup_dir, exist_ok=True)
os.makedirs(archive_dir, exist_ok=True)

# 1. Full Backup
all_posts = glob.glob(os.path.join(posts_dir, "*.md"))
print(f"📦 Đang sao lưu {len(all_posts)} bài viết vào {backup_dir}...")
for fp in all_posts:
    shutil.copy2(fp, backup_dir)
print("✅ Sao lưu toàn bộ bài viết thành công!")

# 2. Redundant duplicate files to archive
# Each list represents duplicate/redundant markdown files superseded by a canonical higher-quality pair
REDUNDANT_FILES = [
    # 1. Collagen stub (superseded by collagen-peptide-thuy-phan-su-that-sinh-hoc-vi-mo-vi)
    "collagen-peptide-thuy-phan-hap-thu-ruot-va-da-vi.md",
    "hydrolyzed-collagen-peptides-intestinal-absorption-skin-en.md",

    # 2. Walking duplicates (canonical is di-bo-sau-an-giai-ma-chuyen-hoa-glut4-khong-can-insulin-vi)
    "di-bo-sau-an-giam-duong-huyet-vi-sao-hieu-qua-vi.md",
    "post-meal-walking-blood-sugar-mechanisms-en.md",
    "di-bo-10-phut-sau-bua-an-kich-hoat-co-bap-vi.md",
    "ten-minute-post-meal-walk-glucose-clearance-en.md",

    # 3. Leaky gut duplicates (canonical is co-che-ro-ri-ruot-va-xu-huong-viêm-he-thong-vi)
    "co-che-zonulin-va-hoi-chung-ro-ri-ruot-vi.md",
    "zonulin-mechanism-and-leaky-gut-syndrome-en.md",
    "giai-ma-hoi-chung-ro-ri-ruot-zonulin-lps-vi.md",
    "deciphering-leaky-gut-zonulin-lps-en.md",

    # 4. L-Theanine & Caffeine duplicate (canonical is tra-xanh-l-theanine-va-caffeine-tinh-tao-em-ai-vi)
    "l-theanine-va-caffeine-song-nao-alpha-vi.md",
    "l-theanine-and-caffeine-alpha-brain-waves-en.md",

    # 5. Mitohormesis duplicate (canonical is nghich-ly-mitohormesis-va-suc-manh-cua-stress-oxy-hoa-co-kiem-soat-vi)
    "mitohormesis-va-nghich-ly-stress-oxi-hoa-vi.md",
    "mitohormesis-and-the-oxidative-stress-paradox-en.md",

    # 6. Chewing duplicates (canonical is nhai-ky-no-lau-giam-calo.md & chewing-slowly-satiety-gut-hormones.md)
    "thoi-quen-nhai-ky-noi-sinh-hoc-tieu-hoa-vi.md",
    "thoi-quen-nhai-ky-noi-sinh-hoc-tieu-hoa-en.md",
    "thoi-quen-nhai-ky-no-lau-vi-sinh-duong-ruot-vi.md",
    "thoi-quen-nhai-ky-no-lau-vi-sinh-duong-ruot-en.md",

    # 7. Gut-Brain Vagus GABA duplicate (canonical is tam-trang-bat-an-bat-nguon-tu-duong-ruot-vagus-nerve-gaba-vi)
    "truc-nao-ruot-va-con-duong-phe-vi-vi-khuan-gaba-vi.md",
    "gut-brain-axis-vagal-gaba-pathway-en.md",
    "truc-nao-ruot-gaba-vi-khuan-vi.md",
    "gut-brain-axis-gaba-microbiota-en.md",

    # 8. Vitamin D3 K2 MK7 duplicate (canonical is vitamin-d3-k2-mk7-chong-voi-hoa-dong-mach-vi)
    "vitamin-d3-k2-nghich-ly-canxi-vi.md",
    "vitamin-d3-k2-calcium-paradox-en.md",

    # 9. AKG duplicate (canonical is alpha-ketoglutarate-dao-nguoc-dong-ho-bieu-sinh-vi)
    "alpha-ketoglutarate-tre-hoa-bieu-gen-vi.md",
    "alpha-ketoglutarate-epigenetic-rejuvenation-en.md",

    # 10. Yersinia pestis duplicate (canonical is co-che-tiet-doc-to-loai-iii-cua-yersinia-pestis-vi-chi-huy-pha-vo-hang-rao-mien-dich-vi)
    "dich-hach-yersinia-pestis-t3ss-doc-luc-vi.md",
    "yersinia-pestis-t3ss-virulence-lab-leak-en.md",

    # 11. H5N1 duplicate (canonical is cu-h5n1-va-o-khoa-acid-sialic-vi-sao-virus-kho-lay-nhung-gay-viem-phoi-nang-vi)
    "cum-gia-cam-h5n1-thu-the-acid-sialic-vi.md",
    "avian-flu-h5n1-sialic-acid-receptors-en.md"
]

print(f"\n🧹 Đang chuyển {len(REDUNDANT_FILES)} file bài viết bị lặp sang thư mục lưu trữ {archive_dir}...")
archived_count = 0
for fn in REDUNDANT_FILES:
    src_path = os.path.join(posts_dir, fn)
    dest_path = os.path.join(archive_dir, fn)
    if os.path.exists(src_path):
        shutil.move(src_path, dest_path)
        archived_count += 1
        print(f"  ↪ Đã lưu trữ: {fn}")
    else:
        print(f"  ⚠️ Không tìm thấy file: {fn}")

remaining_posts = glob.glob(os.path.join(posts_dir, "*.md"))
print(f"\n🎉 Hoàn tất thu gọn bài viết! Đã lưu trữ {archived_count} file trùng lặp.")
print(f"📊 Số lượng bài viết còn lại trong kho: {len(remaining_posts)} file chuẩn hóa độc bản.")
