import { marked } from 'marked';

// Render a single line of Markdown to HTML without wrapping it in a <p>.
// Used for short fields (summaries, descriptions) so bold/italics/links/code
// render instead of showing as literal Markdown. Use with `set:html`.
export const inlineMd = (s: string): string => marked.parseInline(s) as string;
