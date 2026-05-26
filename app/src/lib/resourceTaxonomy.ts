/**
 * Re-export the taxonomy values from the repo's shared file. This is the only
 * place the App reaches outside `app/src` — every other module imports from
 * here so the cross-package boundary stays explicit and easy to vendor later.
 */
export {
  KEY_STAGES,
  YEAR_GROUPS,
  SUBJECTS,
  RESOURCE_TYPES,
  REGIONS,
  type TaxonomyOption,
} from '../../../studio/lib/resourceTaxonomy'
