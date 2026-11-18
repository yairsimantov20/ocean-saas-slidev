#!/usr/bin/env python3
"""Combine exported slide PNGs into one contact sheet.

Usage: python3 scripts/contact-sheet.py <png-dir> <out.png>
Needs Pillow (pip install pillow).
"""
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

src, out = Path(sys.argv[1]), Path(sys.argv[2])
files = sorted(src.glob('*.png'), key=lambda p: int(re.sub(r'\D', '', p.stem) or 0))
files = [f for f in files if f.name != out.name]
cols, tw, pad, lab = 4, 560, 28, 30
first = Image.open(files[0])
th = round(tw * first.height / first.width)
rows = (len(files) + cols - 1) // cols
W = cols * tw + (cols + 1) * pad
H = rows * (th + lab) + (rows + 1) * pad
sheet = Image.new('RGB', (W, H), (234, 236, 240))
draw = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype('DejaVuSansMono.ttf', 16)
except OSError:
    font = ImageFont.load_default()
for i, f in enumerate(files):
    r, c = divmod(i, cols)
    x = pad + c * (tw + pad)
    y = pad + r * (th + lab + pad)
    im = Image.open(f).convert('RGB').resize((tw, th), Image.LANCZOS)
    sheet.paste(im, (x, y))
    draw.rectangle([x - 1, y - 1, x + tw, y + th], outline=(209, 213, 219))
    draw.text((x, y + th + 7), f'{i + 1:02d}', fill=(75, 85, 99), font=font)
sheet.save(out, optimize=True)
print(f'{out} ({W}x{H}, {len(files)} slides)')
