/**
 * Shared taxonomy values for the `resource` document type.
 *
 * Imported by:
 *   - `schemaTypes/resources.tsx` (Studio schema option lists)
 *   - `app/src/lib/resourceTaxonomy.ts` (App SDK filter dropdowns)
 *
 * Keeping these here means the Studio's allowed values and the App's filter
 * dropdowns stay in lockstep — change a value here and both update.
 *
 * The file has no Sanity / React dependencies on purpose so it can be
 * consumed by either workspace without dependency leakage.
 */

export type TaxonomyOption = {title: string; value: string}

export const KEY_STAGES: TaxonomyOption[] = [
  {title: 'EYFS (Ages 3–5)', value: 'eyfs'},
  {title: 'Key Stage 1 (Ages 5–7)', value: 'ks1'},
  {title: 'Key Stage 2 (Ages 7–11)', value: 'ks2'},
  {title: 'Key Stage 3 (Ages 11–14)', value: 'ks3'},
  {title: 'Key Stage 4 (Ages 14–16)', value: 'ks4'},
  {title: 'Key Stage 5 (Ages 16–18)', value: 'ks5'},
]

export const YEAR_GROUPS: TaxonomyOption[] = [
  {title: 'Nursery', value: 'nursery'},
  {title: 'Reception', value: 'reception'},
  {title: 'Year 1', value: 'year-1'},
  {title: 'Year 2', value: 'year-2'},
  {title: 'Year 3', value: 'year-3'},
  {title: 'Year 4', value: 'year-4'},
  {title: 'Year 5', value: 'year-5'},
  {title: 'Year 6', value: 'year-6'},
  {title: 'Year 7', value: 'year-7'},
  {title: 'Year 8', value: 'year-8'},
  {title: 'Year 9', value: 'year-9'},
  {title: 'Year 10', value: 'year-10'},
  {title: 'Year 11', value: 'year-11'},
  {title: 'Year 12', value: 'year-12'},
  {title: 'Year 13', value: 'year-13'},
]

export const SUBJECTS: TaxonomyOption[] = [
  {title: 'English', value: 'english'},
  {title: 'Maths', value: 'maths'},
  {title: 'Science', value: 'science'},
  {title: 'History', value: 'history'},
  {title: 'Geography', value: 'geography'},
  {title: 'Art & Design', value: 'art-and-design'},
  {title: 'Design & Technology', value: 'design-and-technology'},
  {title: 'Computing', value: 'computing'},
  {title: 'Music', value: 'music'},
  {title: 'PE', value: 'pe'},
  {title: 'PSHE / RSHE', value: 'pshe'},
  {title: 'RE', value: 're'},
  {title: 'Languages', value: 'languages'},
  {title: 'SEND / Inclusion', value: 'send'},
  {title: 'Phonics', value: 'phonics'},
  {title: 'Topics & Themes', value: 'topics'},
  {title: 'Assessment', value: 'assessment'},
]

export const RESOURCE_TYPES: TaxonomyOption[] = [
  {title: 'Worksheet / Activity Sheet', value: 'worksheet'},
  {title: 'PowerPoint', value: 'powerpoint'},
  {title: 'Template', value: 'template'},
  {title: 'Display Pack', value: 'display'},
  {title: 'Lesson Plan', value: 'lesson-plan'},
  {title: 'Scheme of Work', value: 'scheme-of-work'},
  {title: 'Knowledge Organiser', value: 'knowledge-organiser'},
  {title: 'Assessment', value: 'assessment'},
  {title: 'Game', value: 'game'},
  {title: 'Interactive Activity', value: 'interactive'},
  {title: 'Video', value: 'video'},
  {title: 'Audio', value: 'audio'},
  {title: 'eBook / Story', value: 'ebook'},
  {title: 'Fact File', value: 'fact-file'},
  {title: 'Poster', value: 'poster'},
  {title: 'Flashcards', value: 'flashcards'},
  {title: 'Colouring Page', value: 'colouring'},
  {title: 'Craft Activity', value: 'craft'},
]

export const FILE_FORMATS: TaxonomyOption[] = [
  {title: 'PDF', value: 'pdf'},
  {title: 'PowerPoint (PPTX)', value: 'pptx'},
  {title: 'Word (DOCX)', value: 'docx'},
  {title: 'Google Slides', value: 'gslides'},
  {title: 'Google Docs', value: 'gdocs'},
  {title: 'Image (PNG/JPG)', value: 'image'},
  {title: 'Video (MP4)', value: 'mp4'},
  {title: 'Audio (MP3)', value: 'mp3'},
]

export const REGIONS: TaxonomyOption[] = [
  {title: 'England (UK)', value: 'uk'},
  {title: 'Scotland', value: 'scotland'},
  {title: 'Wales', value: 'wales'},
  {title: 'Northern Ireland', value: 'ni'},
  {title: 'Republic of Ireland', value: 'roi'},
  {title: 'United States', value: 'usa'},
  {title: 'Australia', value: 'au'},
  {title: 'New Zealand', value: 'nz'},
  {title: 'Canada', value: 'ca'},
  {title: 'South Africa', value: 'za'},
  {title: 'International', value: 'international'},
]
