// ─────────────────────────────────────────────────────────────────────────
//  ONE PLACE to control ordering + what's featured on the home page.
//
//  • Order   - items appear top-to-bottom in the order listed here.
//  • Feature - put a "*" in front of a slug to feature it on the home page.
//  • The slug is the markdown filename without ".md"
//    (e.g. src/content/honors/putnam.md  →  "putnam").
//  • Anything NOT listed here still shows up, after the listed items
//    (blog posts fall back to newest-first; others to alphabetical).
//
//  To reorder: move a line up or down.
//  To feature/unfeature: add or remove the leading "*".
// ─────────────────────────────────────────────────────────────────────────

export const ordering = {
  projects: [
    '*cardiotoxicity',
    '*gliograde',
    '*compprog',
    'sirjester',
    'novascriptscentral',
    'gansbias',
    'thermostability',
    'pencilballistics',
    'pythonworkshops',
  ],

  blog: [
    'sorting',
    '*ycsus',
    'first',
  ],

  honors: [
    '*putnam',
    '*icpclatam',
    '*regeneron',
    'citadeldiscover',
    'conrad',
    'umdhspc',
    'usacoplat',
    'amcaime',
  ],
} satisfies Record<string, string[]>;

export type OrderedCollection = keyof typeof ordering;

// ─────────────────────────────────────────────────────────────────────────
//  Which tags show up in the filter bar on /blog, left-to-right.
//
//  • Only tags listed here become filter buttons - leave one out and it still
//    shows as a chip on the post, it just isn't filterable.
//  • A listed tag that no published post uses is skipped automatically, so a
//    typo or a stale tag fails safe (no dead button).
//  • Matching is case-insensitive.
//  • Empty list → the whole filter bar is hidden.
// ─────────────────────────────────────────────────────────────────────────
export const blogTags: string[] = [
  'featured',
];
