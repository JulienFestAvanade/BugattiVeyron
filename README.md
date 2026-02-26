# Bugatti Veyron — premium mini website (EN)

A **static**, **shareable** mini site: Home, Technical brochure, Animated timeline, Masonry gallery with filters, Configurator-style “Other models”, and a Video page.

## Open locally
1. Unzip the folder.
2. Double‑click `index.html` (or right‑click → Open with → your browser).

## Replace the hero image with a real photo
1. Put your image into `assets/` (e.g. `assets/veyron.jpg`).
2. In `index.html`, replace:
   `assets/veyron-illustration.svg` → `assets/veyron.jpg`

### Fix “image is cropped”
The default CSS uses:
- `height: 420px` + `object-fit: contain` for the hero image (so it should **not** be cropped).
If you want it to scale naturally, edit `assets/styles.css` and set `.figure img` to `height:auto`.

## Gallery: add your own photos
Replace `assets/gallery-01.svg` … `assets/gallery-06.svg` with your own images
(keep the same filenames), or edit `gallery.html` to point to new files.

## PDF export
Open `technical.html` and click “Print / Save as PDF”.

## External links
- Club Bugatti France: https://www.clubbugatti.fr/  
- Île‑de‑France event page: https://www.clubbugatti.fr/event-details/rallye-ile-de-france-2025  
- Amazon goodies page (search): https://www.amazon.fr/Bugatti-Porte-cl%C3%A9s-Accessoires/s?k=Bugatti&rh=n%3A2711340031

## Pages
- `index.html`
- `technical.html`
- `timeline.html`
- `gallery.html`
- `other-models.html`
- `video.html`
