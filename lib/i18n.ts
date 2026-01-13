export type SchemaItem = {
  kind: 'list' | 'singleton'
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
  {kind: 'list', schemaType: `collection`, title: 'Collection'},
  {kind: 'list', schemaType: `collectionSync`, title: 'Collection Sync'},
  {kind: 'divider'},
  {kind: 'singleton', schemaType: `migrations`, title: 'Migrations'},
]
