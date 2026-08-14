# Site Cheat Sheet

Personal site built with [Astro](https://astro.build), deployed to GitHub Pages
(`avnithvijayram.com`) via `.github/workflows/deploy.yml` on push to `main`.

---

## Run & test locally

```bash
npm install          # once, after cloning or when deps change
npm run dev          # dev server w/ hot reload → http://localhost:4321
npm run build        # static production build → ./dist
npm run preview      # serve the built ./dist exactly as it deploys
```

- **Day-to-day editing:** `npm run dev`, leave it running, edit files, the
  browser refreshes automatically.
- **Before pushing:** run `npm run build`. If it fails, the deploy will fail too
  — usually a frontmatter typo (e.g. bad `date`, missing required field). Use
  `npm run preview` to sanity-check the final output.

---

## Where content lives

| Type            | Folder                  | URL              |
|-----------------|-------------------------|------------------|
| Blog posts      | `src/content/blog/`     | `/blog/<slug>`   |
| Projects        | `src/content/projects/` | `/projects/<slug>` |
| Honors & awards | `src/content/honors/`   | listed on `/projects`; optional detail page at `/honors/<slug>` |

Each item is one Markdown file. **The filename = the URL slug**
(`my-post.md` → `/blog/my-post`). Starter templates live in `templates/`.

Schemas are enforced in `src/content/config.ts` — if a build fails on content,
check the required fields there.

---

## Ordering & featuring — all in ONE place

Order and "what's featured on the home page" are **not** set in the markdown
files. They live in **`src/site-order.ts`**:

```ts
export const ordering = {
  projects: ['*gliograde', '*neuroflex', 'proteinfold', 'seqviz', ...],
  blog:     ['*research-notes', '*building-the-pineapple', 'hello', ...],
  honors:   ['*putnam', 'icpclatam', '*regeneron', 'conrad', ...],
};
```

- **Order** = top-to-bottom order in each list.
- **Feature on the home page** = put a `*` in front of the slug.
- **Slug** = the markdown filename without `.md`.
- Anything not listed still appears, *after* the listed items (blog → newest
  first; others → alphabetical). So a misspelled slug fails safe.

To reorder: move a line. To (un)feature: add/remove the `*`. That's it.

---

## Blog posts

Copy `templates/blog-post.md` into `src/content/blog/`, rename it, edit:

```markdown
---
title: Post Title
date: 2026-01-01          # YYYY-MM-DD (REQUIRED). Also the unlisted fallback sort
description: One-line summary shown on the list and in metadata.
tags: ["tag-one", "tag-two"]   # shown as chips; tag bar on /blog filters by these
draft: true               # false to publish; drafts are hidden from the list
# image: /blog/cover.svg  # optional cover; place file in public/blog/
---

Body in Markdown — headings, lists, links, images, code blocks.
```

Required: `title`, `date`. **To publish:** set `draft: false`.
**To order / feature it:** add the slug to `src/site-order.ts`.

### Writing style (site-wide)

- No em-dashes anywhere on the site (content, titles, meta descriptions,
  embedded HTML, comments in served files). Use commas, parentheses, colons,
  semicolons, or a plain hyphen; page-title separators use `" - "`.
- No bold (`**`) in site content; plain prose.
- `/revise` (`.claude/skills/revise/SKILL.md`) revises a post for grammar,
  spelling, consistency, and adds small skim-friendly section headers.

### Math in posts

`$...$` (inline) and `$$...$$` (display) contain **Typst math syntax** (not
LaTeX) — e.g. `$sum_(i=1)^n i$`, `$binom(n, 2)$`. For display math (own
line, centered) the `$$` fences must sit on **their own lines**:

```markdown
$$
integral_0^oo e^(-x^2) dif x
$$
```

`$$ ... $$` all on one line is treated as *inline* math (in-paragraph, not
centered). Set up via `remark-math` + `@myriaddreamin/rehype-typst` in
`astro.config.mjs`; equations compile to inline SVG at build time (no
client-side JS). The SVGs hardcode black fills, so `src/styles/global.css`
has `.typst-doc` overrides forcing `currentColor` (theme ink) and
`max-width: 100%` for mobile. A literal dollar sign in prose should be
escaped `\$` so it isn't parsed as a math delimiter.

### Collapsible detail sections (dropdowns)

Plain HTML `<details>` in the post body — no plugin. The **blank line after
`</summary>` is required**; without it the inner content stays raw HTML
instead of being rendered as Markdown.

```markdown
<details>
<summary>More detail on X</summary>

Any Markdown here — lists, code, math ($J_n = J_(n-1) + 2J_(n-2)$).

</details>
```

Styling lives in `src/styles/global.css` (`.prose details` / `.prose
summary`) — a bordered panel matching the blockquote callout, emerald
summary text that turns amber on hover.

### Highlighting important posts — the `featured` tag

Add `"featured"` to a post's `tags` and its card on `/blog` gets an amber ★
before the title. `featured` is also in `blogTags`, so it has a filter button.
(This is separate from the `*` prefix in `src/site-order.ts`, which controls
what appears on the home page.) The star style lives in
`src/styles/global.css` (`.featured-star`); the card also carries an
`.is-featured` class as a hook if a stronger treatment is wanted later.

### The tag filter bar on /blog

Which tags get a filter button — and their left-to-right order — is controlled
by **`blogTags`** in `src/site-order.ts` (same file as ordering):

```ts
export const blogTags: string[] = ['first', 'post'];
```

- A tag **not** listed still renders as a chip on the post; it just isn't
  filterable. This is how you keep one-off tags out of the bar.
- A listed tag that no published post uses is skipped automatically, so a typo
  or a stale tag fails safe (no dead button).
- Matching is case-insensitive. Empty list → the whole bar is hidden.

---

## Projects

Copy `templates/project.md` into `src/content/projects/`, rename it, edit:

```markdown
---
title: Project Name
year: "2026"             # string, in quotes (REQUIRED)
summary: One-line description shown on cards and at the top of the page. (REQUIRED)
tags: ["tag-one", "tag-two"]
# image: /projects/cover.svg   # optional cover; place file in public/projects/
# link: https://example.com    # optional; shown as "visit project →"
---

Full write-up in Markdown (renders at /projects/<slug>).
```

Required: `title`, `year`, `summary`. `link` can also point at a file under
`public/projects/<slug>/` (e.g. a PDF).
**To order / feature it:** add the slug to `src/site-order.ts`.

The `/projects` grid shows the first 6, then a **"see more"** toggle for the
rest (`PROJECT_LIMIT` in `src/pages/projects.astro`). Each card is rendered by
`src/components/ProjectCard.astro`.

---

## Honors & awards

Copy `templates/honor.md` into `src/content/honors/`, rename it, edit:

```markdown
---
title: Award Name
org: Granting Organization   # optional
year: "2024"                 # string, in quotes (REQUIRED)
description: "One-line — supports **bold**, _italics_, [links](/path)."  # optional
# link: https://example.com  # optional (see "Links" below)
# linkText: view certificate # optional label for the link
---

(optional body — see "Detail pages & materials" below)
```

Required: `title`, `year`. **To order / feature it:** add the slug to
`src/site-order.ts`.

---

## Detail pages & materials (honors)

The body of an honor file is **optional**:

- **Empty body** → no detail page.
- **Non-empty body** → a page is generated at **`/honors/<slug>`**, and the list
  shows a visible **"details →"** link (in the same slot the external link would
  use). Override the label with `linkText:`.

To attach materials (certificate image, PDF, etc.):

1. Put files in **`public/honors/<slug>/`** (mirrors `public/projects/<slug>/`).
2. Reference them from the body with a path starting `/honors/<slug>/`:
   ```md
   ![Certificate](/honors/example-certificate/certificate.svg)
   [Download (PDF)](/honors/example-certificate/cert.pdf)
   ```

See the working example: `src/content/honors/example-certificate.md` +
`public/honors/example-certificate/` → live at `/honors/example-certificate`.
(Delete both when you no longer need the demo.)

---

## Links: internal vs external

The `link:` field (honors) decides how it renders from the **URL form** — no
flag needed:

- `link: https://…` → **external**: shows `↗`, opens in a new tab.
- `link: /some/page` → **internal**: shows `→`, same tab.
- `linkText:` overrides the label (defaults: "learn more" external, "more"
  internal).

**The inline `link` only shows when the honor has no detail page.** If the honor
has a body (→ a `/honors/<slug>` page), the list shows a "details →" link to that
page instead and the inline `link` is hidden — put the external link inside the
page body, so there aren't two links for the same item.

Inside any `description`/`summary` you can also use inline Markdown links
`[text](/path)` directly.

---

## Markdown in descriptions/summaries

`description` (blog, honors) and `summary` (projects) render **inline Markdown**:
`**bold**`, `_italics_`, `` `code` ``, `[links](/path)`. It's *inline* only —
headings/lists/block elements don't render there (use the body for those).

---

## Prose helpers (project / honor bodies)

Body Markdown renders inside `.prose`, so a couple of inline-HTML helpers (styled
in `src/styles/global.css`) are available in tables and text:

- **Half star:** `<span class="half">★</span>` renders a real `★` with its right
  half faded — use it for `.5` ratings, e.g. `★★<span class="half">★</span>` = 2.5.
  (The dedicated half-star Unicode codepoints don't render in the site font.)
- **Favorite row:** wrap a cell's text in `<mark>…</mark>` and the whole table
  row gets a soft gold-yellow wash (via `tr:has(mark)`) — used to flag favorite
  problems. The `<mark>` itself shows no marker; it's just the hook.

---

## Images & files

Put assets in `public/` and reference them with an absolute path **without
`public`**:

- `public/blog/cover.svg`   → `image: /blog/cover.svg`
- `public/projects/foo.svg` → `image: /projects/foo.svg`
- `public/honors/<slug>/cert.svg` → `/honors/<slug>/cert.svg`
- PDFs / docs work the same way (e.g. `public/avnith_resume.pdf` → `/avnith_resume.pdf`).
- Standalone HTML pages (games, tools) work the same way too: put the file in
  `public/<section>/<slug>/` and it's served as its own page alongside the
  generated one (e.g. `public/projects/sirjester/game.html`,
  `public/blog/sorting/manual-sort.html`). To embed one inside a post, use an
  inline `<iframe src="/blog/<slug>/file.html">` in the Markdown body — see
  `src/content/blog/sorting.md`. The frame (full width, hairline border,
  rounded corners, `--bg` background) comes from `.prose iframe` in
  `src/styles/global.css`; the inline `style` only needs a `height`. Inside
  the embedded page, mirror the site tokens from `global.css` in its own
  `<style>` so it visually matches (e.g. `runs-graph.html`).

---

## Site theme (font & colors)

The theme lives in the `:root` block at the top of `src/styles/global.css` —
body font is `--sans` (Source Sans 3, loaded via the Google Fonts `<link>` in
`src/layouts/Base.astro`), background is `--bg` ("snow") with `--bg-2` for
raised panels and `--rule` for hairlines. To try a different font, add it to
the fonts `<link>` and swap `--sans`; to change the background, adjust those
three variables together.

---

## Common gotchas

- `year` is a **string in quotes** (`"2024"`), `date` is an **unquoted date**
  (`2026-01-01`). Mixing these up breaks the build.
- Quote any frontmatter value containing a ` #`, `:`, or other YAML-special
  char — e.g. `description: "ranked **#1** overall"` — or YAML drops the rest.
- New blog posts default to `draft: true` — they won't appear until you flip it.
- Added a blog tag but no filter button appeared? Add it to `blogTags` in
  `src/site-order.ts` — the bar is an explicit list, not derived from posts.
- Forgot to add a slug to `src/site-order.ts`? The item still shows, just at the
  end of its section and not featured.
- The honors list shows the first 3, then a **"see more"** toggle (it's the
  `limit` prop on `CredentialList`).
- Deploy is automatic on push to `main`; if the site doesn't update, check the
  **Actions** tab on GitHub for a failed `deploy.yml` run.
