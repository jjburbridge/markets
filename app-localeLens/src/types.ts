import type {
    KeyedObject,
    Reference,
} from 'sanity';

export type TranslationReference = KeyedObject & {
  _type: 'internationalizedArrayReferenceValue'
  value: Reference
}
