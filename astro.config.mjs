import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeTypst from '@myriaddreamin/rehype-typst';

export default defineConfig({
  site: 'https://avnithvijayram.com',
  markdown: {
    // $...$ and $$...$$ in posts are Typst math syntax, rendered to inline SVG at build time.
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeTypst],
  },
});
