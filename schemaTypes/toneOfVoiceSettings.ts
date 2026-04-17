import {defineField, defineType} from 'sanity'
import {MdRecordVoiceOver as icon} from 'react-icons/md'

export default defineType({
  name: 'toneOfVoiceSettings',
  title: 'Tone of voice',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Company tone of voice',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guidelines',
      title: 'Guidelines',
      type: 'markdown',
      description:
        'Describe voice, terminology, reading level, words to avoid, and examples (Markdown). Used when suggesting edits in the editor.',
      validation: (Rule) => Rule.required().min(20),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Tone of voice'}
    },
  },
})
