# Tinytide website

Public pages for the Tinytide (摇摇) iOS app, served with GitHub Pages:

| Page | Path | Used for |
|---|---|---|
| Home | `/` | Marketing URL in App Store Connect |
| Privacy Policy | `/privacy/` | Privacy Policy URL in App Store Connect and in the app (`PRIVACY_POLICY_URL`) |
| Support | `/support/` | Support URL in App Store Connect |

Plain HTML, CSS and a little JavaScript, in 9 languages (English, 简体中文, 繁體中文, 日本語, 한국어, Español, Português (Brasil), Français, Deutsch). The English text is in the HTML; `assets/site.js` swaps in the visitor's language (browser language, or the picker in the header) from `assets/i18n.js`.

## Editing

The pages and `assets/i18n.js` are generated. Edit the sources in `src/`, then rebuild and commit everything:

```bash
python3 src/build.py
```

| Source | What it holds |
|---|---|
| `src/tpl/` | Page templates; `{{key}}` is replaced with the English text |
| `src/i18n/en.json` | English text for every key |
| `src/i18n/<language>.json` | The same keys in each other language (the build fails if one is missing) |

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

When the privacy policy changes, update every language and the `privacy.updated` date in `src/i18n/`, rebuild, and keep `PRIVACY.md` in the app repository in sync.
