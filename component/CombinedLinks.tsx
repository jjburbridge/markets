import groq from 'groq'
import {ArrayFieldProps, getPublishedId, useFormValue} from 'sanity'
import {SanityApp, useQuery, type SanityConfig} from '@sanity/sdk-react'
import {ComponentType, Suspense} from 'react'
import { ReferenceChildLinkProps, usePaneRouter } from 'sanity/structure'

const config: SanityConfig = {
  studioMode: {
    enabled: true,
  },
  projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_SANITY_DATASET as string,
  // rest of config…
}

const query = groq`*[_type == "collection" && _id == $id][0]{
  _id,
  _originalId,
  links[]->,
  removedLinks[]->{_id},
  parentCollection->{
    _id,
    _originalId,
    links[]->,
    removedLinks[]->{_id},
    parentCollection->{
      _id,
      _originalId,
      links[]->,
      removedLinks[]->{_id},
      parentCollection->{
        _id,
        _originalId,
        links[]->,
        removedLinks[]->{_id},
        parentCollection->{
          _id,
          _originalId,
          links[]->,
          removedLinks[]->{_id},
        }
      }
    }
  }
}`

const Link = ({link, ReferenceChildLink}: {link: any, ReferenceChildLink: ComponentType<ReferenceChildLinkProps>}) => {

  return (
    <div>
      <ReferenceChildLink documentId={link._id} documentType={link._type} parentRefPath={[]}> {link.title} </ReferenceChildLink>
    </div>
  )
}

const Parents = ({id}: {id: string}) => {
  const {ReferenceChildLink} = usePaneRouter()
  const {data} = useQuery({query: query, params: {id: id}, perspective: 'drafts'})
  console.log({query, id, data})

  const collectLinks = (col: any, depth = 0): {links: any[]; removedIds: string[]} => {
    if (!col || depth > 4) {
      return {links: [], removedIds: []}
    }

    const currentLinks = [...(col.links || [])]
    const currentRemovedIds = col.removedLinks?.map((link: any) => link?._id) || []

    if (col.parentCollection) {
      const parentData = collectLinks(col.parentCollection, depth + 1)
      return {
        links: [...currentLinks, ...parentData.links],
        removedIds: [...currentRemovedIds, ...parentData.removedIds],
      }
    }

    return {
      links: currentLinks,
      removedIds: currentRemovedIds,
    }
  }

  const {links: allLinks, removedIds: allRemovedIds} = collectLinks(data)

  // Filter out removed links
  const filteredLinks = allLinks.filter((link: any) => {
    return link && link._id && !allRemovedIds.includes(link._id)
  })

  return (
    <div>
      <div>Parents</div>
      <Suspense fallback={<div>Loading...</div>}>
        {filteredLinks.map((link: any) => (
          <Link key={link._id} link={link} ReferenceChildLink={ReferenceChildLink} />
        ))}
      </Suspense>
    </div>
  )
}

export const CombinedLinks = (props: ArrayFieldProps, context: any) => {
  const id = useFormValue(['_id']) as string
  const publishedId = getPublishedId(id)
  console.log({id, publishedId})
  return (
    <SanityApp config={config} fallback={<div>Loading...</div>}>
      <div>Combined Links with parent collections</div>
      <Parents id={publishedId} />
      <div>{props.renderDefault(props)}</div>
    </SanityApp>
  )
}
