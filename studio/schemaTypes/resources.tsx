import {defineField, defineType} from 'sanity'
import {MdLibraryBooks as icon} from 'react-icons/md'
import {
  FILE_FORMATS,
  KEY_STAGES,
  REGIONS,
  RESOURCE_TYPES,
  SUBJECTS,
  YEAR_GROUPS,
} from '../lib/resourceTaxonomy'

export default defineType({
  name: 'resource',
  title: 'Educational Resource',
  type: 'document',
  icon,
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'content', title: 'Content'},
    {name: 'classification', title: 'Classification'},
    {name: 'files', title: 'Files & Downloads'},
    {name: 'curriculum', title: 'Curriculum'},
    {name: 'related', title: 'Related'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The display title of the resource, e.g. "The Very Hungry Caterpillar Story Sequencing".',
      validation: (Rule) => Rule.required().max(160),
      group: 'overview',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 120,
        isUnique: () => true,
      },
      validation: (Rule) => Rule.required(),
      group: 'overview',
    }),
    defineField({
      name: 'resourceCode',
      title: 'Resource Code',
      type: 'string',
      description:
        'Unique reference code for this resource (e.g. "t-l-4553"). Useful for support, search, and cross-referencing.',
      group: 'overview',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description:
        'A concise summary shown in search results, listings, and resource cards. Aim for 1–2 sentences.',
      validation: (Rule) => Rule.max(280),
      group: 'overview',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description: 'Thumbnail / hero image shown on the resource page and in listings.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'internationalizedArrayString',
        }),
      ],
      group: 'overview',
    }),
    defineField({
      name: 'previewGallery',
      title: 'Preview Gallery',
      type: 'array',
      description: 'Additional preview pages (e.g. inside pages of a PDF worksheet).',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'internationalizedArrayString',
            }),
          ],
        },
      ],
      group: 'overview',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'richText',
      description:
        'Long-form description: how to use the resource, what is included, learning objectives, suggested activities, etc.',
      group: 'content',
    }),
    defineField({
      name: 'learningObjectives',
      title: 'Learning Objectives',
      type: 'array',
      description: 'Bullet list of objectives or skills this resource targets.',
      of: [{type: 'string'}],
      group: 'content',
    }),
    defineField({
      name: 'keyStages',
      title: 'Key Stages',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: KEY_STAGES},
      validation: (Rule) => Rule.unique(),
      group: 'classification',
    }),
    defineField({
      name: 'yearGroups',
      title: 'Year Groups',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: YEAR_GROUPS},
      validation: (Rule) => Rule.unique(),
      group: 'classification',
    }),
    defineField({
      name: 'ageRange',
      title: 'Age Range',
      type: 'object',
      description: 'The recommended age range for this resource (inclusive).',
      fields: [
        defineField({
          name: 'min',
          title: 'Minimum Age',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(21).integer(),
        }),
        defineField({
          name: 'max',
          title: 'Maximum Age',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(21).integer(),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true
          const {min, max} = value as {min?: number; max?: number}
          if (typeof min === 'number' && typeof max === 'number' && min > max) {
            return 'Minimum age must be less than or equal to maximum age.'
          }
          return true
        }),
      group: 'classification',
    }),
    defineField({
      name: 'subjects',
      title: 'Subjects',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: SUBJECTS},
      validation: (Rule) => Rule.required().min(1).unique(),
      group: 'classification',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      description:
        'Free-form topics and themes (e.g. "Dinosaurs", "Romans", "Fractions"). Used for grouping and search.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'classification',
    }),
    defineField({
      name: 'resourceTypes',
      title: 'Resource Types',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: RESOURCE_TYPES},
      validation: (Rule) => Rule.required().min(1).unique(),
      group: 'classification',
    }),
    defineField({
      name: 'regions',
      title: 'Regions',
      type: 'array',
      description:
        'Curriculum regions this resource is aligned to. Distinct from `market`, which controls the translated copy.',
      of: [{type: 'string'}],
      options: {list: REGIONS},
      validation: (Rule) => Rule.unique(),
      group: 'classification',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Free-form keywords (powers "related searches" and on-site search).',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'classification',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      description: 'Files made available for download from the resource page.',
      of: [
        {
          type: 'object',
          name: 'download',
          title: 'Download',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Display name, e.g. "Black & White Version" or "Editable PowerPoint".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'file',
              title: 'File',
              type: 'file',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'format',
              title: 'Format',
              type: 'string',
              options: {list: FILE_FORMATS},
            }),
            defineField({
              name: 'pageCount',
              title: 'Number of Pages',
              type: 'number',
              validation: (Rule) => Rule.min(1).integer(),
            }),
            defineField({
              name: 'isEditable',
              title: 'Editable',
              type: 'boolean',
              description: 'Whether teachers can edit this file (e.g. editable PowerPoint or Word).',
              initialValue: false,
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'format', media: 'file'},
          },
        },
      ],
      group: 'files',
    }),
    defineField({
      name: 'externalLinks',
      title: 'External Links',
      type: 'array',
      description: 'Links to external tools, videos, or interactive activities.',
      of: [
        {
          type: 'object',
          name: 'externalLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
      group: 'files',
    }),
    defineField({
      name: 'curriculumLinks',
      title: 'Curriculum Links',
      type: 'array',
      description:
        'Specific curriculum objectives this resource addresses (e.g. National Curriculum, Australian Curriculum).',
      of: [
        {
          type: 'object',
          name: 'curriculumLink',
          fields: [
            defineField({
              name: 'framework',
              title: 'Framework',
              type: 'string',
              description: 'e.g. "National Curriculum (England)", "Australian Curriculum v9", "CCSS".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'code',
              title: 'Objective Code',
              type: 'string',
              description: 'Reference code, e.g. "Y2-E-W-6" or "ACELY1670".',
            }),
            defineField({
              name: 'description',
              title: 'Objective Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {title: 'framework', subtitle: 'code', description: 'description'},
            prepare: ({title, subtitle, description}) => ({
              title: subtitle ? `${title} · ${subtitle}` : title,
              subtitle: description,
            }),
          },
        },
      ],
      group: 'curriculum',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      description: 'Educators and contributors credited on this resource.',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      group: 'overview',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'overview',
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Last Reviewed At',
      type: 'datetime',
      description: 'When this resource was last reviewed for accuracy and curriculum alignment.',
      group: 'overview',
    }),
    defineField({
      name: 'relatedResources',
      title: 'Related Resources',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}]}],
      group: 'related',
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'string',
      description: 'Optional collection/series this resource belongs to (e.g. "Twinkl Originals", "PlanIt").',
      group: 'related',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      group: 'overview',
    }),
    defineField({
      name: 'baseLanguage',
      title: 'Base Language',
      type: 'string',
      readOnly: true,
      group: 'overview',
    }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      readOnly: true,
      group: 'overview',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      resourceCode: 'resourceCode',
      media: 'previewImage',
      subject0: 'subjects.0',
      ks0: 'keyStages.0',
    },
    prepare: ({title, resourceCode, media, subject0, ks0}) => {
      const tags = [ks0, subject0].filter(Boolean).join(' · ')
      const subtitle = [resourceCode, tags].filter(Boolean).join(' — ')
      return {
        title: title || 'Untitled resource',
        subtitle: subtitle || undefined,
        media,
      }
    },
  },
})
