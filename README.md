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

- `src/pages/` - routes
- `src/content/` - markdown content: `projects/`, `blog/`, `honors/`, `pythonworkshops/`
- `src/components/` - shared UI (`ProjectCard`, `CredentialList`)
- `src/layouts/Base.astro` - shared layout (nav, footer, meta)
- `src/styles/global.css` - global styles and theme variables
- `src/site-order.ts` - one place to control ordering and what's featured on the home page
- `public/` - static assets (images, PDFs, `CNAME`, the Sir Jester game)
- `templates/` - starter frontmatter for new content

See `CHEATSHEET.md` for how to add and edit content.
