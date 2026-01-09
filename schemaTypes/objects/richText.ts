import { defineField } from "sanity";

export const richText = defineField({
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [{type: 'block'}],
})