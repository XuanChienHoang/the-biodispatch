import os
from PIL import Image, ImageOps

os.makedirs('public/branding', exist_ok=True)
os.makedirs('public/branding/logos', exist_ok=True)

img = Image.open('public/images/phytocodex-emblem.jpg').convert('RGBA')
bg_color = (12, 23, 41)

datas = img.getdata()
color_trans_data = []
black_trans_data = []
white_trans_data = []

for item in datas:
    r, g, b, a = item
    dist = ((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2)**0.5
    
    if dist < 22:
        # Background: completely transparent
        color_trans_data.append((255, 255, 255, 0))
        black_trans_data.append((0, 0, 0, 0))
        white_trans_data.append((255, 255, 255, 0))
    elif dist < 45:
        # Edge transition anti-aliasing
        alpha = int(255 * (dist - 22) / 23)
        color_trans_data.append((r, g, b, alpha))
        
        # Monochrome monochrome lum
        lum = int(0.299 * r + 0.587 * g + 0.114 * b)
        # For black logo on light background
        black_trans_data.append((15, 23, 42, alpha))
        # For white logo on dark background
        white_trans_data.append((255, 255, 255, alpha))
    else:
        # Fully opaque emblem body
        color_trans_data.append((r, g, b, 255))
        
        # For pure monochrome versions:
        # Distinct shades based on lightness (Gold vs Emerald)
        lum = int(0.299 * r + 0.587 * g + 0.114 * b)
        
        # Black monochrome logo
        black_trans_data.append((15, 23, 42, 255))
        
        # White monochrome logo
        white_trans_data.append((255, 255, 255, 255))

# 1. Color Emblem Transparent
img_color = Image.new('RGBA', img.size)
img_color.putdata(color_trans_data)
img_color.save('public/branding/logos/phytocodex-icon-color-transparent.png')

# 2. Black Monochrome Transparent
img_black = Image.new('RGBA', img.size)
img_black.putdata(black_trans_data)
img_black.save('public/branding/logos/phytocodex-icon-black-transparent.png')

# 3. White Monochrome Transparent
img_white = Image.new('RGBA', img.size)
img_white.putdata(white_trans_data)
img_white.save('public/branding/logos/phytocodex-icon-white-transparent.png')

# 4. Color on Original Luxury Navy Background
img.convert('RGB').save('public/branding/logos/phytocodex-icon-color-navy-bg.jpg', quality=95)

# 5. Color on Crisp White Background
white_bg = Image.new('RGBA', img.size, (255, 255, 255, 255))
white_bg.paste(img_color, (0, 0), img_color)
white_bg.convert('RGB').save('public/branding/logos/phytocodex-icon-color-white-bg.jpg', quality=95)

# 6. Black on White Background
black_bg = Image.new('RGBA', img.size, (255, 255, 255, 255))
black_bg.paste(img_black, (0, 0), img_black)
black_bg.convert('RGB').save('public/branding/logos/phytocodex-icon-black-white-bg.jpg', quality=95)

# 7. White on Dark Navy Background
navy_bg = Image.new('RGBA', img.size, (11, 21, 38, 255))
navy_bg.paste(img_white, (0, 0), img_white)
navy_bg.convert('RGB').save('public/branding/logos/phytocodex-icon-white-navy-bg.jpg', quality=95)

print("Standard icons generated in public/branding/logos/")
