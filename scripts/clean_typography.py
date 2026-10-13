import glob, os, re

posts = glob.glob(r"c:\Hoang's projects\the-biodispatch\content\posts\*.md")
total_br = 0
total_emdash = 0
total_endash = 0
modified_files = 0

for p in posts:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    
    orig = c
    br_matches = len(re.findall(r'<br\s*/?>', c, flags=re.IGNORECASE))
    emdash_matches = c.count('—')
    endash_matches = c.count('–')
    
    if br_matches > 0 or emdash_matches > 0 or endash_matches > 0:
        total_br += br_matches
        total_emdash += emdash_matches
        total_endash += endash_matches
        
        # Replace <br>, <br/>, <br /> with ' - ' or space depending on context
        # In table header or cells: '**Author et al.**<br>Study Design' -> '**Author et al.** - Study Design'
        c = re.sub(r'<br\s*/?>', ' - ', c, flags=re.IGNORECASE)
        
        # Replace em-dash (—) and en-dash (–) with normal hyphen ' - '
        c = c.replace('—', ' - ')
        c = c.replace('–', ' - ')
        
        # Normalize multiple spaces around hyphens: '   -   ' -> ' - '
        # But do NOT touch lines starting with '- ' (markdown unordered lists) or frontmatter '---'
        lines = c.split('\n')
        new_lines = []
        for line in lines:
            if line.strip().startswith('---'):
                new_lines.append(line)
            elif line.lstrip().startswith('- '):
                # list item, normalize internal dashes only
                prefix = line[:len(line) - len(line.lstrip()) + 2]
                rest = line[len(prefix):]
                rest = re.sub(r'\s+-\s+', ' - ', rest)
                new_lines.append(prefix + rest)
            else:
                line = re.sub(r'\s+-\s+', ' - ', line)
                new_lines.append(line)
        c = '\n'.join(new_lines)
        
        if c != orig:
            with open(p, 'w', encoding='utf-8') as f:
                f.write(c)
            modified_files += 1

print(f"Cleaned {modified_files} files.")
print(f"Replaced {total_br} <br> tags, {total_emdash} em-dashes (—), and {total_endash} en-dashes (–).")
