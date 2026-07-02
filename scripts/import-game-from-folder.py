#!/usr/bin/env python3
"""Import game metadata and icon assets from a local project folder."""

import argparse
import json
import re
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_GAMES = ROOT / "public" / "games"
CONTENT_FILE = ROOT / "src" / "data" / "content.js"
ANALYZE_SCRIPT = ROOT / "scripts" / "analyze-game-folder.py"

TEXT_CANDIDATES = [
    "README.md",
    "README.txt",
    "readme.md",
    "description.txt",
    "store-listing.txt",
    "STORE_LISTING.txt",
    "about.txt",
]

SKIP_DIRS = {
    "node_modules",
    ".git",
    "Library",
    "Temp",
    "obj",
    "bin",
    "build",
    "dist",
    "Packages",
}


def read_text_file(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="ignore").strip()
    except OSError:
        return ""


def find_text_sources(root: Path) -> list[Path]:
    found = []
    for name in TEXT_CANDIDATES:
        path = root / name
        if path.is_file():
            found.append(path)
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.name.lower() in {n.lower() for n in TEXT_CANDIDATES}:
            if path not in found:
                found.append(path)
    return found


def parse_strings_xml(root: Path) -> dict[str, str]:
    values = {}
    for path in root.rglob("strings.xml"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        try:
            tree = ET.parse(path)
        except ET.ParseError:
            continue
        for item in tree.findall(".//string"):
            name = item.attrib.get("name")
            text = (item.text or "").strip()
            if name and text:
                values[name] = text
    return values


def parse_unity_settings(root: Path) -> dict[str, str]:
    settings = {}
    for path in root.rglob("ProjectSettings.asset"):
        text = read_text_file(path)
        if not text:
            continue
        for key in ("productName", "companyName"):
            match = re.search(rf"^\s*{key}:\s*(.+)$", text, re.MULTILINE)
            if match:
                settings[key] = match.group(1).strip()
    return settings


def first_sentence(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return ""
    match = re.match(r"^(.{12,140}?[.!?])(?:\s|$)", text)
    return match.group(1) if match else text[:120]


def short_tagline(text: str) -> str:
    sentence = first_sentence(text)
    return sentence[:90]


def pick_description(text_blocks: list[str]) -> str:
    for block in text_blocks:
        cleaned = re.sub(r"\s+", " ", block).strip()
        if len(cleaned) >= 40:
            return cleaned[:280]
    return ""


def infer_genre(text: str) -> str:
    lower = text.lower()
    if any(word in lower for word in ("rhythm", "music", "beat", "bop", "dance")):
        return "Rhythm"
    if any(word in lower for word in ("party", "multiplayer", "friends")):
        return "Party"
    if any(word in lower for word in ("card", "blackjack", "poker")):
        return "Casino"
    if any(word in lower for word in ("trivia", "quiz")):
        return "Trivia"
    if any(word in lower for word in ("puzzle", "tic-tac", "x and o")):
        return "Puzzle"
    if any(word in lower for word in ("arcade", "dodge", "survive")):
        return "Arcade"
    return "Casino"


def run_analyze(folder: Path) -> Path | None:
    result = subprocess.run(
        [sys.executable, str(ANALYZE_SCRIPT), str(folder)],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        print(result.stderr or result.stdout)
        return None

    for line in result.stdout.splitlines():
        if line.startswith("Recommended source:"):
            return Path(line.split(":", 1)[1].strip())
    return None


def generate_assets(slug: str) -> None:
    subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "generate-game-images.py"), slug],
        check=True,
    )


def build_metadata(folder: Path, slug: str, title: str) -> dict:
    text_blocks = []
    for path in find_text_sources(folder):
        text_blocks.append(read_text_file(path))

    strings = parse_strings_xml(folder)
    unity = parse_unity_settings(folder)

    app_name = strings.get("app_name") or unity.get("productName") or title
    description = (
        strings.get("full_description")
        or strings.get("description")
        or pick_description(text_blocks)
        or f"{app_name} is a FAMZ Games mobile title built for quick, fun play sessions."
    )
    short_desc = strings.get("short_description") or short_tagline(description)

    return {
        "title": app_name,
        "tagline": short_desc or f"Play {app_name} from FAMZ Games.",
        "description": description,
        "genre": infer_genre(" ".join([description, short_desc, app_name])),
        "slug": slug,
        "sourceFolder": str(folder),
        "textSources": [str(p.relative_to(folder)) for p in find_text_sources(folder)],
        "androidStrings": strings,
        "unitySettings": unity,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("folder", type=Path, help="Game project folder to import")
    parser.add_argument("--slug", default="famz-bop")
    parser.add_argument("--title", default="Famz Bop")
    parser.add_argument("--copy-source-to", type=Path, default=PUBLIC_GAMES / "famz-bop-source")
    args = parser.parse_args()

    folder = args.folder.expanduser().resolve()
    if not folder.exists():
        raise SystemExit(f"Folder not found: {folder}")

    metadata = build_metadata(folder, args.slug, args.title)
    icon_source = run_analyze(folder)
    if not icon_source:
        raise SystemExit("Could not find a suitable icon image in the folder.")

    args.copy_source_to.mkdir(parents=True, exist_ok=True)
    if folder != args.copy_source_to.resolve():
        for item in folder.iterdir():
            dest = args.copy_source_to / item.name
            if item.is_dir():
                if dest.exists():
                    shutil.rmtree(dest)
                shutil.copytree(item, dest)
            else:
                shutil.copy2(item, dest)

    target_png = PUBLIC_GAMES / f"{args.slug}.png"
    shutil.copy2(icon_source, target_png)
    generate_assets(args.slug)

    report = {
        **metadata,
        "iconSource": str(icon_source),
        "generatedIcon": f"/games/{args.slug}-icon.png",
        "generatedCard": f"/games/{args.slug}-card.jpg",
    }

    report_path = PUBLIC_GAMES / f"{args.slug}-import-report.json"
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print(json.dumps(report, indent=2))
    print(f"\nSaved import report to {report_path}")
    print("Next: update src/data/content.js using the report fields above.")


if __name__ == "__main__":
    main()
