# Tinytide website

Public pages for the Tinytide (摇摇) iOS app, served with GitHub Pages:

| Page | Path | Used for |
|---|---|---|
| Home | `/` | Marketing URL in App Store Connect |
| Privacy Policy | `/privacy/` | Privacy Policy URL in App Store Connect and in the app (`PRIVACY_POLICY_URL`) |
| Support | `/support/` | Support URL in App Store Connect |

Plain HTML and CSS, no build step. Every page is bilingual: text is marked `data-l="en"` or `data-l="zh"`, and `assets/site.js` shows one language based on the browser language or the toggle in the header.

## Publishing

Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)`.

Custom domain: `tinytide.app` (the `CNAME` file). DNS is on Cloudflare: four `A` and four `AAAA`
records on the apex pointing at GitHub Pages, plus `www` → `junyuanz1.github.io`, all **DNS only**
(grey cloud). Enable **Enforce HTTPS** in the Pages settings once the certificate is issued.

## Previewing locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

When the privacy policy changes, update both languages and the "Last updated" date in `privacy/index.html`, and keep `PRIVACY.md` in the app repository in sync.
