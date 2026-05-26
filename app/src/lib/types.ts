export type ResourceFilters = {
  subjects: string[]
  keyStages: string[]
  yearGroups: string[]
  resourceTypes: string[]
  regions: string[]
  markets: string[]
  languages: string[]
}

/**
 * Shape of one row in the resources query result. Kept narrow on purpose —
 * the GROQ projection in `useResourcesQuery` matches this exactly so we
 * only fetch the fields needed for the table and the PDF.
 */
export type ResourceRow = {
  _id: string
  title: string | null
  resourceCode: string | null
  shortDescription: string | null
  publishedAt: string | null
  market: string | null
  language: string | null
  previewImageUrl: string | null
}

export const emptyFilters: ResourceFilters = {
  subjects: [],
  keyStages: [],
  yearGroups: [],
  resourceTypes: [],
  regions: [],
  markets: [],
  languages: [],
}
