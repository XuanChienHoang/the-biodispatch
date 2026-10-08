import os
import zipfile

branding_dir = 'public/branding'
zip_path = os.path.join(branding_dir, 'Phytocodex_Official_Branding_Kit.zip')

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(branding_dir):
        for f in files:
            if f.endswith('.zip'):
                continue
            full = os.path.join(root, f)
            rel = os.path.relpath(full, branding_dir)
            z.write(full, rel)

print(f"Created ZIP: {zip_path} ({os.path.getsize(zip_path) / 1024:.1f} KB)")
