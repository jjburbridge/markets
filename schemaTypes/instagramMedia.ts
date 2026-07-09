import {defineField, defineType} from 'sanity'
import {MdPhotoLibrary as icon} from 'react-icons/md'

/**
 * Copyright check information from Instagram API.
 * @see https://developers.facebook.com/docs/instagram-platform/reference/instagram-media#fields
 */
export const instagramCopyrightCheckInfo = defineType({
  name: 'instagramCopyrightCheckInfo',
  title: 'Copyright Check Information',
  type: 'object',
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Completed', value: 'completed'},
          {title: 'Error', value: 'error'},
          {title: 'In Progress', value: 'in_progress'},
          {title: 'Not Started', value: 'not_started'},
        ],
      },
    }),
    defineField({
      name: 'matchesFound',
      title: 'Matches Found',
      type: 'boolean',
      description: 'True if the video violates copyright',
    }),
    defineField({
      name: 'copyrightMatches',
      title: 'Copyright Matches',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'author', title: 'Author', type: 'string'},
            {name: 'contentTitle', title: 'Content Title', type: 'string'},
            {
              name: 'matchedSegments',
              title: 'Matched Segments',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'durationInSeconds', title: 'Duration (seconds)', type: 'number'},
                    {
                      name: 'segmentType',
                      title: 'Segment Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Audio', value: 'AUDIO'},
                          {title: 'Video', value: 'VIDEO'},
                        ],
                      },
                    },
                    {name: 'startTimeInSeconds', title: 'Start Time (seconds)', type: 'number'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})

export default defineType({
  name: 'instagramMedia',
  title: 'Instagram Media',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'instagramId',
      title: 'Instagram Media ID',
      type: 'string',
      description: 'The media ID from the Instagram Graph API',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legacyInstagramMediaId',
      title: 'Legacy Instagram Media ID',
      type: 'string',
      description: 'ID for Marketing API endpoints v21.0 and older',
    }),
    defineField({
      name: 'shortcode',
      title: 'Shortcode',
      type: 'string',
      description: 'Shortcode to the media',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Carousel Album', value: 'CAROUSEL_ALBUM'},
          {title: 'Image', value: 'IMAGE'},
          {title: 'Video', value: 'VIDEO'},
        ],
      },
    }),
    defineField({
      name: 'mediaProductType',
      title: 'Media Product Type',
      type: 'string',
      description: 'Surface where the media is published (Facebook Login API only)',
      options: {
        list: [
          {title: 'Ad', value: 'AD'},
          {title: 'Feed', value: 'FEED'},
          {title: 'Story', value: 'STORY'},
          {title: 'Reels', value: 'REELS'},
        ],
      },
    }),
    defineField({
      name: 'mediaUrl',
      title: 'Media URL',
      type: 'url',
      description: 'URL for the media. Omitted if media contains copyrighted material.',
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail URL',
      type: 'url',
      description: 'Media thumbnail URL. Only available on VIDEO media.',
    }),
    defineField({
      name: 'permalink',
      title: 'Permalink',
      type: 'url',
      description: 'Permanent URL to the media. Not available on album children.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      description: 'Caption. Excludes album children.',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Descriptive text for images, for accessibility.',
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      description: 'ISO 8601 creation date in UTC',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      description: 'Username of user who created the media',
    }),
    defineField({
      name: 'ownerId',
      title: 'Owner ID',
      type: 'string',
      description: 'Instagram user ID who created the media (only returned if app user created it)',
    }),
    defineField({
      name: 'likeCount',
      title: 'Like Count',
      type: 'number',
      description: 'Count of likes. Excludes album children and promoted posts.',
    }),
    defineField({
      name: 'commentsCount',
      title: 'Comments Count',
      type: 'number',
      description: 'Count of comments. Excludes album children and caption.',
    }),
    defineField({
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      description: 'View count for Reels (Business Discovery API only). Includes paid and organic.',
    }),
    defineField({
      name: 'isCommentEnabled',
      title: 'Comments Enabled',
      type: 'boolean',
      description: 'Whether comments are enabled or disabled. Excludes album children.',
    }),
    defineField({
      name: 'isSharedToFeed',
      title: 'Shared to Feed',
      type: 'boolean',
      description: 'For Reels only. True = can appear in Feed and Reels tabs.',
    }),
    defineField({
      name: 'copyrightCheckInformation',
      title: 'Copyright Check Information',
      type: 'instagramCopyrightCheckInfo',
      description: 'Copyright detection status and matches for videos',
    }),
    defineField({
      name: 'children',
      title: 'Children',
      type: 'array',
      description: 'Media items in a carousel album',
      of: [
        {
          type: 'reference',
          to: [{type: 'instagramMedia'}],
        },
      ],
    }),
    defineField({
      name: 'boostEligibilityInfo',
      title: 'Boost Eligibility Info',
      type: 'object',
      description: 'Boosting eligibility info (Facebook Login API only)',
      fields: [
        {
          name: 'isEligible',
          title: 'Is Eligible',
          type: 'boolean',
        },
        {
          name: 'reason',
          title: 'Reason',
          type: 'string',
          description: 'Details if not eligible',
        },
      ],
    }),
    defineField({
      name: 'boostAdsList',
      title: 'Boost Ads List',
      type: 'array',
      description: 'Instagram ad info for organic media with ACTIVE ads (Facebook Login only)',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'adId', title: 'Ad ID', type: 'string'},
            {name: 'deliveryStatus', title: 'Delivery Status', type: 'string'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      mediaType: 'mediaType',
      username: 'username',
      instagramId: 'instagramId',
    },
    prepare({title, mediaType, username, instagramId}) {
      const displayTitle =
        title || (username ? `${username}'s ${mediaType || 'media'}` : `Media ${instagramId}`)
      return {
        title: displayTitle.length > 50 ? `${displayTitle.slice(0, 50)}...` : displayTitle,
        subtitle: mediaType ? `${mediaType} • @${username || 'unknown'}` : undefined,
      }
    },
  },
})
