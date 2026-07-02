Dodge And Survive — asset upload
================================

The cloud agent cannot read files from your local Windows path directly.
To use your real project art instead of the generated draft icon:

1. Copy your folder into the repo:
   public/games/dodge-and-survive-source/

2. Analyze it locally or in the workspace:
   python3 scripts/analyze-game-folder.py "public/games/dodge-and-survive-source"

3. Copy the recommended image to the source slot:
   cp "<recommended-file>" public/games/dodge-and-survive.png

4. Regenerate all website formats:
   python3 scripts/generate-game-images.py dodge-and-survive

Typical icon locations in game projects:
- Android: app/src/main/res/mipmap-*/ic_launcher.png
- Unity: Assets/Icons/, ProjectSettings/Icon.png
- Godot: icon.png, project.godot
- Any PNG named icon.png, logo.png, or splash.png
