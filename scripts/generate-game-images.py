#!/usr/bin/env python3
"""Generate layout-specific images from a square (or any) game icon."""

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

OUT_DIR = Path("/workspace/public/games")

FORMATS = {
    "hero": (1280, 800, 0.58, -20),
    "card": (960, 600, 0.62, -10),
    "tile": (720, 960, 0.72, 0),
    "panel": (1200, 750, 0.55, -15),
}


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_gradient(size, bg_top, bg_bottom):
    w, h = size
    img = Image.new("RGB", size)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        draw.line([(0, y), (w, y)], fill=lerp(bg_top, bg_bottom, t))
    return img


def add_glow(base, cx, cy, radius, glow_rgba):
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=glow_rgba)
    glow = glow.filter(ImageFilter.GaussianBlur(radius // 2))
    return Image.alpha_composite(base.convert("RGBA"), glow).convert("RGB")


def load_icon(path):
    icon = Image.open(path).convert("RGBA")
    # Fit square crop from center if landscape/portrait
    w, h = icon.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    if side < max(w, h):
        icon = icon.crop((left, top, left + side, top + side))
    return icon


def composite_icon(canvas, icon, scale=0.62, y_offset=0):
    w, h = canvas.size
    target = int(min(w, h) * scale)
    icon_scaled = icon.resize((target, target), Image.Resampling.LANCZOS)
    x = (w - target) // 2
    y = (h - target) // 2 + y_offset
    canvas.paste(icon_scaled, (x, y), icon_scaled)
    return canvas


def generate_all(slug, src, bg_top, bg_bottom, glow):
    icon = load_icon(src)
    icon_path = OUT_DIR / f"{slug}-icon.png"
    icon.save(icon_path, "PNG", optimize=True)
    print(f"Created {icon_path}")

    for name, (width, height, scale, y_off) in FORMATS.items():
        size = (width, height)
        canvas = make_gradient(size, bg_top, bg_bottom)
        glow_y = size[1] // 2 + y_off
        canvas = add_glow(canvas, size[0] // 2, glow_y, int(min(size) * 0.45), glow)
        canvas = composite_icon(canvas, icon, scale=scale, y_offset=y_off)
        out = OUT_DIR / f"{slug}-{name}.jpg"
        canvas.save(out, "JPEG", quality=92, optimize=True)
        print(f"Created {out} ({width}x{height})")


PRESETS = {
    "brain-dash": {
        "src": OUT_DIR / "brain-dash.jpg",
        "bg_top": (8, 14, 35),
        "bg_bottom": (20, 12, 48),
        "glow": (120, 80, 220, 80),
    },
    "xo-rivals": {
        "src": OUT_DIR / "xo-rivals.png",
        "bg_top": (8, 16, 42),
        "bg_bottom": (12, 10, 32),
        "glow": (59, 130, 246, 90),
    },
    "pocket-blackjack": {
        "src": OUT_DIR / "pocket-blackjack.png",
        "bg_top": (6, 28, 18),
        "bg_bottom": (4, 18, 12),
        "glow": (34, 197, 94, 90),
    },
}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("preset", choices=list(PRESETS.keys()), nargs="?", default=None)
    parser.add_argument("--slug", default=None)
    parser.add_argument("--src", default=None)
    args = parser.parse_args()

    if args.preset:
        p = PRESETS[args.preset]
        generate_all(args.preset, p["src"], p["bg_top"], p["bg_bottom"], p["glow"])
        return

    if not args.slug or not args.src:
        parser.print_help()
        sys.exit(1)

    generate_all(args.slug, args.src, (8, 14, 35), (20, 12, 48), (120, 80, 220, 80))


if __name__ == "__main__":
    main()
