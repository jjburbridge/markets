import {SCHEMA_ITEMS, SchemaItem} from './i18n'
import {createClient} from '@sanity/client'

const onlySchemaItems = SCHEMA_ITEMS.filter((item) => item.kind === 'list')

export const schemaTemplates = (prev) => [
  ...prev,
  ...onlySchemaItems.map((schemaItem: SchemaItem) => ({
    id: [schemaItem.schemaType, `market`].join(`-`),
    title: `${schemaItem.title} with Market`,
    type: 'initialValueTemplateItem',
    schemaType: schemaItem.schemaType,
    parameters: [
      {name: `market`, title: `Market`, type: `string`},
      {name: `language`, title: `Language`, type: `string`},
      {name: `baseLanguage`, title: `Base Language`, type: `string`},
      {name: 'tag', title: 'Tag', type: 'string'},
    ],
    value: async ({market, language, tag}) => {
      const client = createClient({
        apiVersion: '2025-05-08',
        projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string,
        dataset: process.env.SANITY_STUDIO_SANITY_DATASET as string,
      })
      const authorisedUsers = await client.fetch<{_id: string; authorisedUsers?: unknown} | null>(
        `*[_type == "tag" && slug.current == $tagSlug][0]{_id, authorisedUsers}`,
        {tagSlug: tag},
      )
      return {
        market,
        language,
        baseLanguage: language,
        tag: {_type: 'reference', _ref: authorisedUsers?._id},
        authorisedUsers: authorisedUsers?.authorisedUsers,
      }
    },
  })),
]
