/**
 * Local / deployed API for tone-of-voice suggestions. Run: yarn server:tone
 * Point SANITY_STUDIO_TONE_SUGGESTIONS_URL at this service (e.g. http://localhost:3847/tone-suggestions).
 */
import {config as loadEnv} from 'dotenv'
import {resolve} from 'node:path'
import cors from 'cors'
import express from 'express'
import type {
  ToneOfVoiceSuggestRequest,
  ToneOfVoiceSuggestResponse,
  ToneOfVoiceSuggestion,
} from '../lib/toneOfVoiceSuggest'

loadEnv({path: resolve(process.cwd(), '.env.local')})
loadEnv({path: resolve(process.cwd(), '.env')})

const PORT = Number(process.env.TONE_SUGGESTIONS_PORT ?? 3847)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? ''
const ANTHROPIC_MODEL =
  process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-20250514'

function parseCorsOrigin(): boolean | string | string[] {
  const raw = process.env.CORS_ORIGIN?.trim()
  if (!raw) {
    return true
  }
  const list = raw.split(',').map((s) => s.trim()).filter(Boolean)
  return list.length === 1 ? list[0]! : list
}

function isToneRequest(body: unknown): body is ToneOfVoiceSuggestRequest {
  if (!body || typeof body !== 'object') {
    return false
  }
  const o = body as Record<string, unknown>
  return (
    typeof o.fieldPath === 'string' &&
    typeof o.fieldValue === 'string' &&
    typeof o.documentJson === 'object' &&
    o.documentJson !== null &&
    typeof o.toneGuidelines === 'string'
  )
}

function normalizeSuggestions(raw: unknown): ToneOfVoiceSuggestion[] {
  if (!Array.isArray(raw)) {
    return []
  }
  const out: ToneOfVoiceSuggestion[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') {
      continue
    }
    const s = item as Record<string, unknown>
    const title = typeof s.title === 'string' ? s.title : ''
    const detail = typeof s.detail === 'string' ? s.detail : ''
    if (!title && !detail) {
      continue
    }
    const replacement = typeof s.replacement === 'string' ? s.replacement : undefined
    out.push(
      replacement !== undefined
        ? {title: title || 'Suggestion', detail, replacement}
        : {title: title || 'Suggestion', detail},
    )
  }
  return out.slice(0, 8)
}

function parseJsonFromModelText(text: string): unknown {
  const trimmed = text.trim()
  try {
    return JSON.parse(trimmed) as unknown
  } catch {
    const fence = /```(?:json)?\s*([\s\S]*?)```/
    const m = trimmed.match(fence)
    if (!m?.[1]) {
      throw new Error('Invalid JSON in model response')
    }
    return JSON.parse(m[1].trim()) as unknown
  }
}

async function anthropicSuggest(body: ToneOfVoiceSuggestRequest): Promise<ToneOfVoiceSuggestion[]> {
  const system = `You are an editorial assistant. Given company tone-of-voice guidelines, a field path, the current field text, and JSON context for the rest of the document, propose concise improvements.

Respond with a single JSON object (no markdown fences) with this shape exactly:
{"suggestions":[{"title":"string","detail":"string","replacement":"optional full replacement for this field only"}]}

Rules:
- suggestions: 1 to 5 items.
- title: short label.
- detail: one or two sentences, why this fits the tone guidelines.
- replacement: include only when you have a concrete full replacement for the field text (same language as the field); omit if you only want to explain.
- Do not invent facts; stay consistent with documentJson context when relevant.
- If the field is already aligned, return one suggestion explaining that with no replacement.`

  const user = JSON.stringify(
    {
      fieldPath: body.fieldPath,
      fieldValue: body.fieldValue,
      documentJson: body.documentJson,
      toneGuidelines: body.toneGuidelines,
    },
    null,
    0,
  )

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 4096,
      temperature: 0.4,
      system,
      messages: [{role: 'user', content: user}],
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(errText || `Anthropic error ${res.status}`)
  }

  const data = (await res.json()) as {
    content?: Array<{type?: string; text?: string}>
  }
  const blocks = data.content ?? []
  const text = blocks
    .filter((b) => b.type === 'text' && typeof b.text === 'string')
    .map((b) => b.text)
    .join('\n')
    .trim()

  if (!text) {
    throw new Error('Empty model response')
  }

  let parsed: unknown
  try {
    parsed = parseJsonFromModelText(text)
  } catch {
    throw new Error('Model returned non-JSON')
  }

  const suggestions = (parsed as {suggestions?: unknown}).suggestions
  return normalizeSuggestions(suggestions)
}

const app = express()
app.use(express.json({limit: '1mb'}))
app.use(cors({origin: parseCorsOrigin()}))

app.get('/health', (_req, res) => {
  res.json({ok: true})
})

app.post('/tone-suggestions', async (req, res) => {
  if (!ANTHROPIC_API_KEY) {
    res.status(503).json({error: 'ANTHROPIC_API_KEY is not set'})
    return
  }

  if (!isToneRequest(req.body)) {
    res.status(400).json({
      error: 'Invalid body: expected fieldPath, fieldValue, documentJson, toneGuidelines',
    })
    return
  }

  try {
    const suggestions = await anthropicSuggest(req.body)
    const payload: ToneOfVoiceSuggestResponse = {suggestions}
    res.json(payload)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Suggestion failed'
    res.status(502).json({error: message})
  }
})

app.listen(PORT, () => {
  console.log(`Tone suggestions server listening on http://localhost:${PORT}`)
  console.log(`  POST http://localhost:${PORT}/tone-suggestions`)
})
