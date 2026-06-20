import { defineCollection, z } from 'astro:content';

// Ordering and which items are featured on the home page are NOT set here —
// they live in one place: src/site-order.ts.

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    image: z.string().optional(),       // path to a cover image, e.g. /blog/foo.svg
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.string(),
    summary: z.string(),
    link: z.string().optional(),        // prominent link on the detail page (external site, or a file under public/projects/<slug>/)
    image: z.string().optional(),       // path to a cover image, e.g. /projects/foo.svg
    tags: z.array(z.string()).default([]),
  }),
});

// Honors & awards. Add one by dropping a markdown file in src/content/honors/.
// The body is optional — add one only if you want a detail page at
// /honors/<slug> (e.g. to show a certificate image). Drop materials in
// public/honors/<slug>/.
const honors = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    org: z.string().optional(),         // granting organization
    year: z.string(),
    description: z.string().optional(), // short one-liner (supports inline markdown)
    link: z.string().optional(),        // a URL: http(s)://… renders as external (↗); /path renders as internal (→)
    linkText: z.string().optional(),    // optional label for that link (e.g. "view certificate")
  }),
});

// Python Workshops — a migrated multi-page Jekyll site. The source markdown has
// no frontmatter, so every field is optional. Pages render under
// /projects/pythonworkshops/<path> via src/pages/projects/pythonworkshops/[...slug].astro.
const pythonworkshops = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { blog, projects, honors, pythonworkshops };
