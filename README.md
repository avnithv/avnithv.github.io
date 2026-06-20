# avnithvijayram.com

Personal site, built with [Astro](https://astro.build). Deployed to GitHub Pages
(custom domain `avnithvijayram.com`) via `.github/workflows/deploy.yml`.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # static output in ./dist
```

## Structure

- `src/pages/` — routes
- `src/content/` — markdown content: `projects/`, `blog/`, `honors/`, `pythonworkshops/`
- `src/layouts/Base.astro` — shared layout
- `public/` — static assets (images, PDFs, `CNAME`, the Sir Jester game)
- `templates/` — starter frontmatter for new content
