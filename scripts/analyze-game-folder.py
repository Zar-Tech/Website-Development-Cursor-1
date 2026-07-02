#!/usr/bin/env python3
"""Scan a local game project folder and pick the best source for app icon generation."""

import argparse
import json
from pathlib import Path

ICON_NAMES = {
    "icon.png",
    "icon.jpg",
    "app_icon.png",
    "appicon.png",
    "launcher.png",
    "512.png",
    "1024.png",
}

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp"}

SKIP_DIRS = {
    "node_modules",
    ".git",
    "Library",
    "Temp",
    "obj",
    "bin",
    "build",
    "dist",
}


def score_path(path: Path) -> int:
    name = path.name.lower()
    score = 0

    if name in ICON_NAMES:
        score += 100
    if "icon" in name:
        score += 60
    if "logo" in name:
        score += 40
    if "splash" in name:
        score += 25
    if "player" in name or "hero" in name or "character" in name:
        score += 15
    if path.suffix.lower() == ".png":
        score += 10
    if "android" in str(path).lower() or "ios" in str(path).lower():
        score += 20

    try:
        size = path.stat().st_size
        if 20_000 <= size <= 2_000_000:
            score += 10
    except OSError:
        return -1

    return score


def find_candidates(root: Path):
    candidates = []
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in IMAGE_EXTS:
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        score = score_path(path)
        if score >= 0:
            candidates.append((score, path))
    candidates.sort(key=lambda item: (-item[0], -item[1].stat().st_size))
    return candidates


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("folder", type=Path, help="Path to the game project folder")
    parser.add_argument("--limit", type=int, default=10)
    args = parser.parse_args()

    root = args.folder.expanduser().resolve()
    if not root.exists():
        raise SystemExit(f"Folder not found: {root}")

    candidates = find_candidates(root)
    if not candidates:
        raise SystemExit(f"No image candidates found in {root}")

    print(f"Analyzed: {root}\n")
    print("Top icon candidates:")
    for score, path in candidates[: args.limit]:
        rel = path.relative_to(root)
        print(f"  [{score:3}] {rel}")

    best = candidates[0][1]
    print(f"\nRecommended source: {best}")
    print(
        json.dumps(
            {
                "folder": str(root),
                "recommendedSource": str(best),
                "score": candidates[0][0],
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
