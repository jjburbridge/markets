import type {TaxonomyOption} from './resourceTaxonomy'

/**
 * Markets and languages that show up in `resource.market` / `resource.language`
 * (set on documents via initial-value templates by the Studio).
 *
 * Kept here rather than imported from `lib/markets.ts` because that module
 * carries Sanity Studio runtime types (Market / Language) we don't need in
 * the app. Update both if you add a new market in the Studio.
 */
export const MARKETS: TaxonomyOption[] = [
  {title: '🇺🇸 USA', value: 'US'},
  {title: '🇨🇦 Canada', value: 'CA'},
  {title: '🇬🇧 United Kingdom', value: 'UK'},
  {title: '🇮🇳 India', value: 'IN'},
  {title: '🇯🇵 Japan', value: 'JP'},
]

export const LANGUAGES: TaxonomyOption[] = [
  {title: 'English', value: 'en'},
  {title: 'French', value: 'fr'},
  {title: 'Hindi', value: 'hi'},
  {title: 'Japanese', value: 'jp'},
]
