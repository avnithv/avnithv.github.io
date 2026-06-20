import { getCollection, type CollectionEntry } from 'astro:content';
import { ordering, type OrderedCollection } from '../site-order';

// Parse one list from site-order.ts into a slug → { index, featured } map.
function parseOrder(list: readonly string[] = []) {
  const map = new Map<string, { index: number; featured: boolean }>();
  list.forEach((raw, i) => {
    const trimmed = raw.trim();
    const featured = trimmed.startsWith('*');
    const slug = trimmed.replace(/^\*\s*/, '').trim();
    map.set(slug, { index: i, featured });
  });
  return map;
}

// Return a collection's entries sorted per site-order.ts. Listed items come
// first in their listed order; unlisted items follow (newest-first if they
// have a date, otherwise alphabetical by title).
export async function getOrdered<K extends OrderedCollection>(
  name: K
): Promise<CollectionEntry<K>[]> {
  const entries = (await getCollection(name)) as CollectionEntry<K>[];
  const order = parseOrder(ordering[name]);
  const UNLISTED = Number.MAX_SAFE_INTEGER;

  return entries.sort((a, b) => {
    const ai = order.get(a.slug)?.index ?? UNLISTED;
    const bi = order.get(b.slug)?.index ?? UNLISTED;
    if (ai !== bi) return ai - bi;
    const ad = (a.data as any).date as Date | undefined;
    const bd = (b.data as any).date as Date | undefined;
    if (ad && bd) return bd.valueOf() - ad.valueOf();
    return String((a.data as any).title ?? '').localeCompare(String((b.data as any).title ?? ''));
  });
}

// Return only the entries marked featured ("*") in site-order.ts, in order.
export async function getFeatured<K extends OrderedCollection>(
  name: K
): Promise<CollectionEntry<K>[]> {
  const order = parseOrder(ordering[name]);
  const entries = await getOrdered(name);
  return entries.filter((e) => order.get(e.slug)?.featured);
}

// True when an entry has body content worth a detail page.
export function hasBody(entry: { body?: string }): boolean {
  return Boolean(entry.body && entry.body.trim().length > 0);
}
