import type {SlugValue, ValidationContext} from 'sanity'

/**
 * Slug uniqueness across published + draft document pair (Sanity-recommended pattern).
 */
export function isSlugUniqueAcross(documentType: string, apiVersion = '2024-01-01') {
  return async (slug: SlugValue | undefined, context: ValidationContext) => {
    if (!slug?.current) return true

    const {document, getClient} = context
    const client = getClient({apiVersion})

    const id = document?._id?.replace(/^drafts\./, '')
    if (!id) return true

    const count = await client.fetch(
      `count(*[_type == $docType && slug.current == $slug && !(_id in [$publishedId, $draftId])])`,
      {
        docType: documentType,
        slug: slug.current,
        publishedId: id,
        draftId: `drafts.${id}`,
      },
    )

    return count === 0 || 'This slug is already in use'
  }
}
