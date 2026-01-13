import {defineField, defineType} from 'sanity'

export const migrations = defineType({
  name: 'migrations',
  title: 'Migrations',
  type: 'document',
  fields: [
    defineField({
      name: 'migrations',
      type: 'array',
      of: [
        {
          name: 'migration',
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'ID',
              type: 'string',
            }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Completed',
                    value: 'completed',
                  },
                  {
                    title: 'Failed',
                    value: 'failed',
                  },
                ],
              },
            }),
            defineField({
              name: 'error',
              title: 'Error',
              type: 'string',
            }),
            defineField({
              name: 'timestamp',
              title: 'Timestamp',
              type: 'datetime',
            }),
            defineField({
              name: 'duration',
              title: 'Duration (seconds)',
              type: 'number',
            }),
          ],
        },
      ],
    }),
  ],
})
