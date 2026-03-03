#!/usr/bin/env npx tsx
/**
 * Fetches media from Instagram's me/media endpoint.
 *
 * Requires INSTAGRAM_ACCESS_TOKEN. Load from .secrets (KEY=value format):
 *   echo 'INSTAGRAM_ACCESS_TOKEN=your_token' >> .secrets
 *   yarn fetch:instagram
 *
 * For Facebook Login API, set INSTAGRAM_API_HOST=https://graph.facebook.com
 * and optionally INSTAGRAM_USER_ID (otherwise /me/media is used).
 *
 * Uses Sanity to find the most recent instagramMedia timestamp and only fetches
 * content newer than that. Saves fetched media into Sanity as instagramMedia documents.
 *
 * Required env (add to .secrets):
 *   INSTAGRAM_ACCESS_TOKEN, SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN
 *
 * @see https://developers.facebook.com/docs/instagram-platform/reference/ig-user/media
 * @see https://developers.facebook.com/docs/instagram-platform/reference/instagram-media#fields
 */

import {config} from 'dotenv'
import {createClient} from '@sanity/client'

// Load .secrets if it exists (gitignored)
config({path: '.secrets'})

const API_VERSION = 'v25.0'
const DEFAULT_HOST = 'https://graph.instagram.com'

function normalizeHost(host: string): string {
  if (host.startsWith('http')) return host.replace(/\/$/, '')
  return `https://${host}`.replace(/\/$/, '')
}
const MEDIA_FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_url',
  'thumbnail_url',
  'permalink',
  'timestamp',
  'username',
  'like_count',
  'comments_count',
  'is_comment_enabled',
  'alt_text',
  'media_product_type',
  'is_shared_to_feed',
  'view_count',
  'shortcode',
  'legacy_instagram_media_id',
  'children{id,media_type,media_url,permalink,timestamp}',
].join(',')

interface InstagramMediaResponse {
  data: InstagramMediaItem[]
  paging?: {
    cursors: {before: string; after: string}
    next?: string
    previous?: string
  }
}

interface InstagramMediaItem {
  id: string
  caption?: string
  media_type?: 'CAROUSEL_ALBUM' | 'IMAGE' | 'VIDEO'
  media_url?: string
  thumbnail_url?: string
  permalink?: string
  timestamp?: string
  username?: string
  like_count?: number
  comments_count?: number
  is_comment_enabled?: boolean
  alt_text?: string
  media_product_type?: string
  is_shared_to_feed?: boolean
  view_count?: number
  shortcode?: string
  legacy_instagram_media_id?: string
  children?: {data: InstagramMediaItem[]}
}

async function fetchMediaPage(
  mediaEndpoint: string,
  accessToken: string,
  url?: string,
): Promise<InstagramMediaResponse> {
  const fetchUrl =
    url ||
    `${mediaEndpoint}?fields=${encodeURIComponent(MEDIA_FIELDS)}&access_token=${accessToken}&limit=25`
  const res = await fetch(fetchUrl)
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Instagram API error ${res.status}: ${err}`)
  }
  return res.json()
}

function getSanityClient() {
  const projectId =
    process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_SANITY_PROJECT_ID
  const dataset =
    process.env.SANITY_DATASET || process.env.SANITY_STUDIO_SANITY_DATASET
  const token = process.env.SANITY_API_TOKEN

  if (!projectId || !dataset) {
    throw new Error('Sanity config missing: SANITY_PROJECT_ID, SANITY_DATASET')
  }
  if (!token) {
    throw new Error(
      'SANITY_API_TOKEN required for writing. Create a token at sanity.io/manage.',
    )
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2025-01-01',
    useCdn: false,
    token,
  })
}

async function getMostRecentTimestamp(client: ReturnType<typeof createClient>): Promise<string | null> {
  const result = await client.fetch<{timestamp: string} | null>(
    `*[_type == "instagramMedia" && defined(timestamp)] | order(timestamp desc)[0]{timestamp}`,
  )
  return result?.timestamp ?? null
}

function omitUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T
}

function toSanityDocument(item: InstagramMediaItem): Record<string, unknown> {
  return omitUndefined({
    _id: `instagramMedia-${item.id}`,
    _type: 'instagramMedia',
    instagramId: item.id,
    legacyInstagramMediaId: item.legacy_instagram_media_id,
    shortcode: item.shortcode,
    mediaType: item.media_type,
    mediaProductType: item.media_product_type,
    mediaUrl: item.media_url,
    thumbnailUrl: item.thumbnail_url,
    permalink: item.permalink,
    caption: item.caption,
    altText: item.alt_text,
    timestamp: item.timestamp,
    username: item.username,
    likeCount: item.like_count,
    commentsCount: item.comments_count,
    viewCount: item.view_count,
    isCommentEnabled: item.is_comment_enabled,
    isSharedToFeed: item.is_shared_to_feed,
  })
}

function toSanityChildDocument(child: InstagramMediaItem): Record<string, unknown> {
  return omitUndefined({
    _id: `instagramMedia-${child.id}`,
    _type: 'instagramMedia',
    instagramId: child.id,
    mediaType: child.media_type,
    mediaUrl: child.media_url,
    permalink: child.permalink,
    timestamp: child.timestamp,
  })
}

async function saveToSanity(
  client: ReturnType<typeof createClient>,
  items: InstagramMediaItem[],
): Promise<number> {
  let saved = 0
  for (const item of items) {
    const children = item.children?.data
    if (children?.length) {
      for (const child of children) {
        const childDoc = toSanityChildDocument(child) as {_id: string; _type: string; [k: string]: unknown}
        await client.createOrReplace(childDoc)
        saved++
      }
    }
    const doc = toSanityDocument(item) as {_id: string; _type: string; [k: string]: unknown}
    if (children?.length) {
      doc.children = children.map((c) => ({
        _type: 'reference',
        _ref: `instagramMedia-${c.id}`,
      }))
    }
    await client.createOrReplace(doc)
    saved++
  }
  return saved
}

async function fetchMediaNewerThan(
  mediaEndpoint: string,
  accessToken: string,
  sinceTimestamp: string | null,
  maxPages = 50,
): Promise<InstagramMediaItem[]> {
  const all: InstagramMediaItem[] = []
  let nextUrl: string | undefined

  for (let page = 0; page < maxPages; page++) {
    const result = await fetchMediaPage(mediaEndpoint, accessToken, nextUrl)
    const items = result.data || []
    let shouldStop = false

    for (const item of items) {
      const ts = item.timestamp
      if (!ts) {
        all.push(item)
        continue
      }
      if (sinceTimestamp && ts <= sinceTimestamp) {
        shouldStop = true
        break
      }
      all.push(item)
    }

    if (shouldStop || !result.paging?.next) break
    nextUrl = result.paging.next
  }

  return all
}

async function main() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim()
  if (!accessToken) {
    console.error(
      'Missing INSTAGRAM_ACCESS_TOKEN. Set it in .secrets or pass it when running:\n' +
        '  INSTAGRAM_ACCESS_TOKEN=xxx yarn fetch:instagram',
    )
    process.exit(1)
  }

  const client = getSanityClient()
  const sinceTimestamp = await getMostRecentTimestamp(client)

  const host = normalizeHost(process.env.INSTAGRAM_API_HOST || DEFAULT_HOST)
  const userId = process.env.INSTAGRAM_USER_ID
  const path = userId ? `${userId}/media` : 'me/media'
  const mediaEndpoint = `${host}/${API_VERSION}/${path}`

  if (sinceTimestamp) {
    console.error(`Only fetching media newer than ${sinceTimestamp}`)
  } else {
    console.error(`Fetching all media (no existing instagramMedia in Sanity)`)
  }
  console.error(`Fetching from ${mediaEndpoint}...`)

  const media = await fetchMediaNewerThan(mediaEndpoint, accessToken, sinceTimestamp)
  console.error(`Fetched ${media.length} media items`)

  const saved = await saveToSanity(client, media)
  console.error(`Saved ${saved} documents to Sanity`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
