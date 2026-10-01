# Revisit website

Marketing site for **Revisit**: AI-powered customer retention for restaurants.

> Bring your customers back. Automatically.

A static site: plain HTML, CSS and JavaScript. No build step, no dependencies.

## Pages

The site is a single `index.html` with hash routing:

| Page | URL |
|---|---|
| Home | `/#home` |
| Solutions | `/#solutions` |
| Contact | `/#contact` |
| Privacy | `/#privacy` |
| Terms | `/#terms` |

## Project structure

```
revisit-website/
├── index.html            # All page markup
├── assets/
│   ├── css/styles.css    # Styles (design tokens at the top)
│   ├── js/main.js        # Routing, mobile menu, contact form, copy-email
│   └── img/              # Product screenshots and customer logos
├── .nojekyll             # Lets GitHub Pages serve the site as-is
└── .gitignore
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Revisit website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/revisit-website.git
   git push -u origin main
   ```
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. The site goes live at `https://<your-username>.github.io/revisit-website/` within a few minutes.

It also deploys as-is to Netlify, Vercel or Cloudflare Pages (no build command, publish directory = root).

## Common edits

- **Business email:** change `CONFIG.email` at the top of `assets/js/main.js`. It updates every email on the site. The address also appears as fallback text in `index.html`.
- **Colors and fonts:** edit the variables in `:root` at the top of `assets/css/styles.css`.
- **Customer logos:** add a file to `assets/img/` and a `<div class="logo">` in the "Restaurants using Revisit" section of `index.html`.
- **Screenshots:** replace `assets/img/dashboard.webp` or `assets/img/guests.webp` (keep the same file names, or update the `src` in `index.html`).

## Contact form

The form validates input and shows a thank-you message, but it does not send anything yet. To receive submissions, connect a form service (for example Formspree or Basin) or your own endpoint: in `assets/js/main.js`, find the comment `To connect a backend` inside the submit handler and send `Object.fromEntries(new FormData(form))` there.

## Contact

revisit.atl@gmail.com
