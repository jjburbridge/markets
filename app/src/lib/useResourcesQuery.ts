import {useQuery} from '@sanity/sdk-react'
import type {ResourceFilters, ResourceRow} from './types'

/**
 * GROQ for the resources report.
 *
 * Each filter clause uses the pattern:
 *     (count($selected) == 0 || count(field[@ in $selected]) > 0)
 * which means "no selection → skip this filter; selection → match any-of".
 *
 * Scalar filters (market / language) use:
 *     (count($selected) == 0 || field in $selected)
 *
 * `previewImageUrl` is resolved against the asset doc so the PDF generator
 * can fetch the binary without another round-trip.
 */
const RESOURCES_QUERY = /* groq */ `
  *[
    _type == "resource"
    && (count($subjects) == 0 || count(subjects[@ in $subjects]) > 0)
    && (count($keyStages) == 0 || count(keyStages[@ in $keyStages]) > 0)
    && (count($yearGroups) == 0 || count(yearGroups[@ in $yearGroups]) > 0)
    && (count($resourceTypes) == 0 || count(resourceTypes[@ in $resourceTypes]) > 0)
    && (count($regions) == 0 || count(regions[@ in $regions]) > 0)
    && (count($markets) == 0 || market in $markets)
    && (count($languages) == 0 || language in $languages)
  ] | order(coalesce(publishedAt, _updatedAt) desc) {
    _id,
    title,
    resourceCode,
    shortDescription,
    publishedAt,
    market,
    language,
    "previewImageUrl": previewImage.asset->url
  }
`

export function useResourcesQuery(filters: ResourceFilters) {
  const result = useQuery<ResourceRow[]>({
    query: RESOURCES_QUERY,
    params: {
      subjects: filters.subjects,
      keyStages: filters.keyStages,
      yearGroups: filters.yearGroups,
      resourceTypes: filters.resourceTypes,
      regions: filters.regions,
      markets: filters.markets,
      languages: filters.languages,
    },
  })

  return {
    rows: result.data ?? [],
    isPending: result.isPending,
  }
}
