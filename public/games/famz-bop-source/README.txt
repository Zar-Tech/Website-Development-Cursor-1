Famz Bop — project upload
=========================

Copy your local folder here:

  c:\Users\zarno\Downloads\FamzBop_Final
  → public/games/famz-bop-source/

Then run:

  python3 scripts/import-game-from-folder.py public/games/famz-bop-source --slug famz-bop --title "Famz Bop"

The script will:
- Read README / Android strings / Unity project settings
- Pick the best icon image from the folder
- Generate website image formats
- Write public/games/famz-bop-import-report.json with title, tagline, description, and genre

After that, update src/data/content.js for the Famz Bop game entry.
