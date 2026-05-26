/**
 * Append CDN transform params to a Sanity image URL.
 * Falls back to the original URL if it's not a Sanity CDN URL.
 */
export function thumbnailUrl(url: string, size: number): string {
  if (!url) return url
  try {
    const u = new URL(url)
    u.searchParams.set('w', String(size))
    u.searchParams.set('h', String(size))
    u.searchParams.set('fit', 'crop')
    u.searchParams.set('auto', 'format')
    return u.toString()
  } catch {
    return url
  }
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: '2-digit'})
}

export function truncate(value: string | null | undefined, max: number): string {
  if (!value) return ''
  if (value.length <= max) return value
  return `${value.slice(0, Math.max(0, max - 1)).trimEnd()}…`
}
