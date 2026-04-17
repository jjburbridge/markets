/**
 * POST body sent to SANITY_STUDIO_TONE_SUGGESTIONS_URL.
 * Implement this endpoint on your server (never ship API keys in the Studio bundle).
 */
export type ToneOfVoiceSuggestRequest = {
  fieldPath: string
  fieldValue: string
  /** Truncated JSON snapshot of the document being edited (for context). */
  documentJson: Record<string, unknown>
  toneGuidelines: string
}

export type ToneOfVoiceSuggestion = {
  /** Short label for the suggestion */
  title: string
  /** Why this aligns with tone of voice */
  detail: string
  /** If set, "Apply" replaces the field with this string */
  replacement?: string
}

export type ToneOfVoiceSuggestResponse = {
  suggestions: ToneOfVoiceSuggestion[]
}

const MAX_DOC_JSON_LENGTH = 48_000

export function truncateDocumentForSuggest(
  doc: Record<string, unknown> | null | undefined,
): Record<string, unknown> {
  if (!doc || typeof doc !== 'object') return {}
  let raw = ''
  try {
    raw = JSON.stringify(doc)
  } catch {
    return {error: 'document_not_serializable'}
  }
  if (raw.length <= MAX_DOC_JSON_LENGTH) {
    return doc as Record<string, unknown>
  }
  return {
    _truncated: true,
    _originalLength: raw.length,
    _preview: raw.slice(0, MAX_DOC_JSON_LENGTH),
  }
}

export async function fetchToneSuggestions(
  endpoint: string,
  body: ToneOfVoiceSuggestRequest,
): Promise<ToneOfVoiceSuggestion[]> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Tone suggestions failed (${res.status})`)
  }
  const data = (await res.json()) as ToneOfVoiceSuggestResponse
  if (!data?.suggestions || !Array.isArray(data.suggestions)) {
    throw new Error('Invalid response: expected { suggestions: [...] }')
  }
  return data.suggestions
}
