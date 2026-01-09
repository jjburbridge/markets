import {SCHEMA_ITEMS, SchemaItem} from './i18n'

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
    ],
    value: ({market, language}) => ({market, language, baseLanguage: language}),
  })),
]
