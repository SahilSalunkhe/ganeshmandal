# श्री गणेश मंडळ 🌺

A premium, modern, mobile-first Ganesh Mandal website built with **pure HTML, CSS & JavaScript** (no frameworks).

## 🚀 Deploy to Vercel (Fix for "NOT_FOUND" error)

The `NOT_FOUND` error on Vercel happens when Vercel **cannot find the files** to serve.  
Follow these exact steps:

### Method 1 – Import from GitHub (Recommended)

1. **Create a GitHub repository** and upload these files **at the root level** (NOT inside a subfolder):
   ```
   index.html
   style.css
   script.js
   vercel.json
   ```

2. Go to [vercel.com/new](https://vercel.com/new)

3. Select **Import** your GitHub repository.

4. **IMPORTANT Settings in Vercel:**
   - **Framework Preset:** `Other`
   - **Root Directory:** `.` (leave empty/root)
   - **Build Command:** *(leave empty)*
   - **Output Directory:** *(leave empty)*
   - **Install Command:** *(leave empty)*

5. Click **Deploy**. Vercel will automatically detect the static site using `vercel.json`.

### Quick Checks if you still see NOT_FOUND

| Possible Cause | Fix |
|---|---|
| Files uploaded inside a sub-folder (e.g., `my-site/index.html`) | Move `index.html` to repo **root** |
| Vercel "Root Directory" set to a sub-folder | Set Root Directory to `.` or the correct folder |
| Vercel project set to a wrong Framework Preset | Set Framework Preset to `Other` |
| Old cached deployment | Create a **new** deployment (Deployments → Redeploy) |
| DNS / domain pointing elsewhere | Check your custom domain settings in Vercel |

### Previews
- Vercel uses `index.html` at the root as the entry point.
- `vercel.json` enables clean URLs and correct routing.

## 📁 Project Structure

```
├── index.html   → All 13 sections (semantic HTML)
├── style.css    → Black & Gold theme, glassmorphism
├── script.js    → Countdown, lightbox, animations, etc.
├── vercel.json  → Vercel static config
├── images/      → Add your images here
└── audio/       → Add audio files here
```

## 📱 Sections

1. Sticky Navbar (hamburger on mobile)
2. Hero + Countdown
3. Book Story (magic book page flip)
4. Ganpati Darshan
5. Timeline (Agman → Visarjan)
6. Gallery (lightbox)
7. Sponsors (auto-scroll)
8. Donation (UPI + QR)
9. Google Maps
10. Committee Members
11. Live Updates
12. Contact Form
13. Premium Footer

## ⚙️ Customization

- **UPI ID:** Update `upiId` in `script.js`
- **Gallery images:** Add files to `images/` and update the gallery section
- **Agman date:** Update in `script.js` (countdown) and `index.html`

### Local preview
Simply open `index.html` in a browser — no build step needed.

गणपती बाप्पा मोरया! 🙏

