export type SchemaItem = {
  kind: 'list'
  schemaType: string
  title: string
}

export type SchemaDivider = {
  kind: 'divider'
}

export const SCHEMA_ITEMS: (SchemaItem | SchemaDivider)[] = [
  {kind: 'list', schemaType: `home`, title: 'Home'},
  {kind: 'list', schemaType: `person`, title: 'People'},
  {kind: 'divider'},
  {kind: 'list', schemaType: `page`, title: 'Pages'},
  {kind: 'divider'},
  {kind: 'list', schemaType: `post`, title: 'Posts'},
  {kind: 'list', schemaType: `author`, title: 'Authors'},
  {kind: 'list', schemaType: `category`, title: 'Categories'},
  // {kind: 'list', schemaType: `blockContent`, title: 'Block Content'},
  // {kind: 'list', schemaType: `locale`, title: 'Locales'},
]
