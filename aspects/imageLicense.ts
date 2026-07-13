import {defineAssetAspect, defineField} from 'sanity'

export default defineAssetAspect({
  name: 'imageLicense',
  type: 'object',
  public: true,
  fields: [
    defineField({
      name: 'license',
      description: 'The type of license that this image is being used under.',
      type: 'string',
      options: {
        list: [
          {title: 'CC0', value: 'cc0'},
          {title: 'CC BY', value: 'cc-by'},
          {title: 'Royalty-free', value: 'royalty-free'},
          {title: 'Rights-managed', value: 'rights-managed'},
          {title: 'Proprietary / Exclusive', value: 'proprietary-exclusive'},
        ],
      },
    }),
    defineField({
      name: 'licenseUrl',
      title: 'License URL',
      description: 'Link to the full license terms or purchase record (if applicable).',
      type: 'url',
    }),
    defineField({
      name: 'permittedTerritories',
      description: 'The territories where the image can be used.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'United States and Canada', value: 'us-canada'},
          {title: 'United Kingdom and Europe', value: 'uk-europe'},
          {title: 'Australia and New Zealand', value: 'au-nz'},
          {title: 'Asia', value: 'asia'},
          {title: 'Latin America', value: 'latin-america'},
          {title: 'Africa', value: 'africa'},
          {title: 'Middle East', value: 'middle-east'},
          {title: 'Russia and CIS', value: 'russia-cis'},
        ],
      },
    }),
    defineField({
      name: 'permittedUses',
      description: 'The uses that are permitted under the license.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Print', value: 'print'},
          {title: 'Digital', value: 'digital'},
          {title: 'Social Media', value: 'social'},
        ],
      },
    }),
    defineField({
      name: 'licenseExpirationDate',
      type: 'date',
      description:
        'The date when the license will expire. Leave blank if the license is perpetual.',
    }),
    defineField({
      name: 'userDownloads',
      type: 'array',
      description: 'a list of users who have downloaded the image.',
      of: [{type: 'string'}],
    }),
  ],
})
