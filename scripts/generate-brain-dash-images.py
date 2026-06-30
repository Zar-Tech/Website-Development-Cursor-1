#!/usr/bin/env python3
"""Generate Brain Dash images for each layout aspect ratio."""

from PIL import Image, ImageDraw, ImageFilter

SRC = "/workspace/public/games/brain-dash.jpg"
OUT_DIR = "/workspace/public/games"

# Brain Dash brand colors
BG_TOP = (8, 14, 35)
BG_BOTTOM = (20, 12, 48)
GLOW = (120, 80, 220, 80)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_gradient(size):
    w, h = size
    img = Image.new("RGB", size)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        color = lerp(BG_TOP, BG_BOTTOM, t)
        draw.line([(0, y), (w, y)], fill=color)
    return img


def add_glow(base, cx, cy, radius, color=GLOW):
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    draw.ellipse(
        (cx - radius, cy - radius, cx + radius, cy + radius),
        fill=color,
    )
    glow = glow.filter(ImageFilter.GaussianBlur(radius // 2))
    base_rgba = base.convert("RGBA")
    return Image.alpha_composite(base_rgba, glow).convert("RGB")


def composite_icon(canvas, icon, scale=0.62, y_offset=0):
    w, h = canvas.size
    iw, ih = icon.size
    target = int(min(w, h) * scale)
    icon_scaled = icon.resize((target, target), Image.Resampling.LANCZOS)
    x = (w - target) // 2
    y = (h - target) // 2 + y_offset
    canvas.paste(icon_scaled, (x, y), icon_scaled)
    return canvas


def generate(name, size, scale=0.62, y_offset=0, glow_y=None):
    icon = Image.open(SRC).convert("RGBA")
    canvas = make_gradient(size)
    if glow_y is None:
        glow_y = size[1] // 2 + y_offset
    canvas = add_glow(canvas, size[0] // 2, glow_y, int(min(size) * 0.45))
    canvas = composite_icon(canvas, icon, scale=scale, y_offset=y_offset)
    path = f"{OUT_DIR}/{name}"
    canvas.save(path, "JPEG", quality=92, optimize=True)
    print(f"Created {path} ({size[0]}x{size[1]})")


if __name__ == "__main__":
    # Hero slider + carousel: 16:10
    generate("brain-dash-hero.jpg", (1280, 800), scale=0.58, y_offset=-20)
    generate("brain-dash-card.jpg", (960, 600), scale=0.62, y_offset=-10)

    # Home game grid tiles: 3:4 portrait
    generate("brain-dash-tile.jpg", (720, 960), scale=0.72, y_offset=0)

    # Games page wide panel: ~16:10 landscape
    generate("brain-dash-panel.jpg", (1200, 750), scale=0.55, y_offset=-15)

    # Square icon (copy as png for clarity)
    icon = Image.open(SRC).convert("RGBA")
    icon.save(f"{OUT_DIR}/brain-dash-icon.png", "PNG", optimize=True)
    print(f"Created {OUT_DIR}/brain-dash-icon.png")
