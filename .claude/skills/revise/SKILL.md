---
name: revise
description: Revise a blog post (or other site content) for grammar, spelling, and consistency, and add small section headers. Use when the user asks to revise, proofread, or clean up a post. Not a content/structure rewrite.
---

Revise the given post (default: the most recently edited file in
`src/content/blog/`) following these rules, in this priority order:

## Scope

Don't focus on content. Focus on grammar and spelling. Never change what a
sentence claims, reorder ideas, or cut/add material. If a sentence is garbled
enough that fixing it requires guessing intent, make the minimal repair and
flag it in the change report.

## Grammar and spelling

Fix typos, misspellings, sentence fragments, comma splices, subject-verb
disagreements, and wrong homophones. Keep the author's casual voice, including
informal constructions, parentheticals, and humor. Do not formalize the tone.

## Consistency

Revise for consistency throughout the post. This includes but is not limited to:

- Terminology: the same thing should be called by the same name throughout
  (e.g. pick one of "merge sort" / "mergesort" / "Merge Sort" and use it
  everywhere; match capitalization in prose). If the post switches names
  without a proper introduction of the new term, unify to the earlier or
  more common one.
- Numbers: put numbers in math text (`$90$`, `$5$`) rather than plain text,
  matching how the rest of the post does it. Exception: spelled-out words
  inside idioms ("one less than") may stay words; flag the judgement call.
- Notation: consistent variable case and formatting inside math
  (e.g. don't mix $N$ and $n$ for the same quantity).

## Section headers

The author writes with a flow and no sections. Add `##` section headers in
appropriate places:

- Keep them small and the titles simple (one to three plain words, sentence
  case). Their only purpose is to split the text up so it is easier to skim
  and less intimidating. Don't make headings serve any other purpose.
- Ideally each section contains around 1-3 paragraphs; anything larger can
  probably be split further. Exceptions are fine, use judgement (e.g. never
  split a paragraph from a list or figure it introduces with a colon).
- The opening paragraphs can stay headerless as an intro.

## Site style rules (always apply)

- No em-dashes anywhere. Use commas, parentheses, colons, semicolons, or
  a plain hyphen, whichever reads best.
- No bold (`**`) in site content; write plain prose. List-item labels become
  plain "Name: description".

## Report

Document your changes when done, grouped by rule. If some changes don't
exactly fit the rules above or are a stretch (guessed intent, removed
words, reworded a garbled clause), explicitly call those out so the author
can review them.
