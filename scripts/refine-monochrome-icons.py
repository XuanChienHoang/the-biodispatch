import os
from PIL import Image, ImageOps, ImageEnhance

os.makedirs('public/branding/logos', exist_ok=True)

# 1. Load the original color emblem
img = Image.open('public/images/phytocodex-emblem.jpg').convert('RGBA')
bg_color = (12, 23, 41)

# Color transparent
width, height = img.size
color_trans = Image.new('RGBA', (width, height))
for y in range(height):
    for x in range(width):
        r, g, b, a = img.getpixel((x, y))
        dist = ((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2)**0.5
        if dist < 22:
            color_trans.putpixel((x, y), (255, 255, 255, 0))
        elif dist < 45:
            alpha = int(255 * (dist - 22) / 23)
            color_trans.putpixel((x, y), (r, g, b, alpha))
        else:
            color_trans.putpixel((x, y), (r, g, b, 255))

color_trans.save('public/branding/logos/phytocodex-icon-color-transparent.png')

# 2. Refined Monochrome Icons:
# We preserve line art details!
# Gold lines in the logo are brighter (high R & G), emerald fill is medium green, background is dark.
# By mapping gold lines to pure black/white and fills to intermediate tone or clean linework,
# we get an exquisite luxury line-art emblem!

black_trans = Image.new('RGBA', (width, height))
white_trans = Image.new('RGBA', (width, height))

for y in range(height):
    for x in range(width):
        r, g, b, a = img.getpixel((x, y))
        dist = ((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2)**0.5
        if dist < 22:
            black_trans.putpixel((x, y), (0, 0, 0, 0))
            white_trans.putpixel((x, y), (255, 255, 255, 0))
        else:
            # Alpha feathering at boundary
            alpha_edge = min(255, int(255 * (dist - 22) / 23)) if dist < 45 else 255
            
            # Gold outline detection: gold has high R (>140), high G (>110), low-medium B (<85)
            is_gold_line = (r > 130 and g > 105 and r > b + 40)
            
            # Leaf vein or highlight
            is_vein = (r > 90 and g > 110 and b < 90)
            
            # Fill areas: deep emerald green
            is_fill = (g > 60 and g > r and g > b)
            
            if is_gold_line:
                # Primary accent stroke: deep solid
                black_trans.putpixel((x, y), (15, 23, 42, alpha_edge))
                white_trans.putpixel((x, y), (255, 255, 255, alpha_edge))
            elif is_vein:
                # Veins and internal highlights
                black_trans.putpixel((x, y), (30, 41, 59, int(alpha_edge * 0.9)))
                white_trans.putpixel((x, y), (241, 245, 249, int(alpha_edge * 0.9)))
            elif is_fill:
                # Shaded body
                black_trans.putpixel((x, y), (51, 65, 85, int(alpha_edge * 0.6)))
                white_trans.putpixel((x, y), (203, 213, 225, int(alpha_edge * 0.55)))
            else:
                # Other structures
                lum = int(0.299 * r + 0.587 * g + 0.114 * b)
                black_trans.putpixel((x, y), (15, 23, 42, int(alpha_edge * (lum / 255))))
                white_trans.putpixel((x, y), (255, 255, 255, int(alpha_edge * (lum / 255))))

black_trans.save('public/branding/logos/phytocodex-icon-black-transparent.png')
white_trans.save('public/branding/logos/phytocodex-icon-white-transparent.png')

# Solid Background JPEGs
white_bg_black = Image.new('RGBA', (width, height), (255, 255, 255, 255))
white_bg_black.paste(black_trans, (0, 0), black_trans)
white_bg_black.convert('RGB').save('public/branding/logos/phytocodex-icon-black-white-bg.jpg', quality=96)

navy_bg_white = Image.new('RGBA', (width, height), (11, 21, 38, 255))
navy_bg_white.paste(white_trans, (0, 0), white_trans)
navy_bg_white.convert('RGB').save('public/branding/logos/phytocodex-icon-white-navy-bg.jpg', quality=96)

print("High precision line-art icons updated!")
