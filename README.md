# VitalTools - Health Utility Website Template

Hostinger-ready static website template for health calculators + AdSense monetization.

## Included pages

- `index.html` - home page and tools grid
- `ui-preview.html` - theme and component preview
- `about.html`, `privacy.html`, `disclaimer.html`, `contact.html`
- 10 calculator pages in `tools/`

## Calculator pages

- BMI
- BMR
- TDEE
- Calorie Goal
- Water Intake
- Body Fat (U.S. Navy method)
- Ideal Weight (Devine formula)
- Heart Rate Zones (Karvonen)
- Pregnancy Due Date
- Ovulation Window

## UI color schemes

Use theme buttons in the header (top-right):

1. Mint (default healthcare style)
2. Sunrise (warm style)
3. Violet (modern style)

Theme choice is saved in browser local storage.

## AdSense setup

1. Replace ad placeholders (`<div class="ad-slot">`) with your AdSense ad code.
2. Update `ads.txt` with your real publisher ID.
3. Replace `https://yourdomain.com` entries in `sitemap.xml` and `robots.txt`.
4. Add your AdSense script in `<head>` of each page:

```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
  crossorigin="anonymous"
></script>
```

## Hostinger upload

1. In Hostinger choose **Custom PHP/HTML website**
2. Upload all files and folders to `public_html`
3. Visit `https://yourdomain.com/ui-preview.html` to pick theme
4. Submit sitemap to Google Search Console

## Notes

- This template is educational and does not provide medical advice.
- Update legal pages with your exact business details before going live.
