import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import {documentInternationalization} from '@sanity/document-internationalization'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

import {MARKETS, uniqueLanguagesObject} from './lib/markets'
import {SCHEMA_ITEMS} from './lib/i18n'
import {schemaTemplates} from './lib/schemaTemplate'
import {structure} from './lib/structure'
import {assist} from '@sanity/assist'

const pluginsBase = (marketName?: string) => {
  const market = MARKETS.find((m) => m.name === marketName)

  // Shared plugins across all "market" configs
  const base = [
    structureTool({
      structure: (S, context) => structure(S, context, marketName),
    }),
    visionTool(),
    // Used for field-level translation in some schemas
    internationalizedArray({
      languages: market ? market.languages : [],
      fieldTypes: ['string', 'richText'],
    }),
    assist({
      translate: {
        field: {
          documentTypes: ['home'],
          languages: market ? market.languages : [],
        },
      },
    }),
  ]

  const i18nSchemaTypes = SCHEMA_ITEMS.map((item) =>
    item.kind === 'list' ? item.schemaType : null,
  ).filter((item) => item !== null)

  if (market && market.languages.length > 1) {
    // Used for document-level translation on some schema types
    // If there is more than 1 language
    base.push(
      documentInternationalization({
        supportedLanguages: market.languages,
        schemaTypes: i18nSchemaTypes,
      }),
    )
  } else if (!market) {
    base.push(
      documentInternationalization({
        supportedLanguages: uniqueLanguagesObject,
        schemaTypes: i18nSchemaTypes,
      }),
    )
  }

  return base
}

// Shared config across all "market" configs
// Some elements are overwritten in the market-specific configs
const configBase = {
  basePath: '/global',
  name: 'global',
  projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_SANITY_DATASET as string,
  title: process.env.SANITY_STUDIO_SANITY_PROJECT_TITLE || 'Marketing.',
  schema: {
    types: schemaTypes,
    templates: (prev) => schemaTemplates(prev),
  },
  plugins: pluginsBase(),
}

export default defineConfig([
  ...MARKETS.map((market) => ({
    ...configBase,
    basePath: `/${market.name.toLowerCase()}`,
    name: market.name,
    title: [configBase.title, market.title].join(` `),
    plugins: pluginsBase(market.name),
  })),
  configBase,
])
