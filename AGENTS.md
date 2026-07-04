# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is

This is **VitalTools**, a purely **static** health-calculators website (HTML + CSS + vanilla
JavaScript). There is **no backend, database, API, framework, package manager, or build step**.
All computation runs client-side in the browser.

> Note: the actual site files (`index.html`, `tools/`, `assets/`, etc.) currently live on the
> feature branch `cursor/health-tools-site-cc3c` and may not yet be merged into `main`. The
> guidance below applies wherever those files are checked out.

### Running the site (dev mode)

Serve the files over HTTP from the project root — do **not** open the HTML via `file://`, since
pages rely on relative paths for assets (`assets/...`) and cross-page navigation (`tools/...`):

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
# theme picker: http://localhost:8000/ui-preview.html
```

`python3` is preinstalled in this environment, so no installation is required. Any static file
server works (`npx serve`, `npx http-server`, etc.) if you prefer.

### Lint / test / build

- **Build:** none — the site ships as-is (deploy = upload all files to a static host).
- **Tests:** none configured (no test framework or test files).
- **Lint:** none configured (no linter or lint config).

There are no dependencies to install; the update script for this repo is intentionally a no-op
verification of `python3`.

### Verifying a change

The fastest end-to-end check is to serve the site and exercise a calculator in the browser
(e.g. open `tools/bmi-calculator.html`, enter weight/height, click **Calculate BMI**, and confirm
the result box updates). Calculator logic lives in `assets/js/calculators.js`; shared UI/theme
behavior lives in `assets/js/site.js`.
