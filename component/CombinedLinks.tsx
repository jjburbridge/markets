import groq from 'groq'
import {useEffect, useState} from 'react'
import {ArrayFieldProps, useClient, useFormValue} from 'sanity'

const query = groq`*[_type == "collection" && _id == $id]{
  links[]->,
  removedLinks[]->{_id},
  parentCollection->{
    links[]->,
    removedLinks[]->{_id},
    parentCollection->{
      links[]->,
      removedLinks[]->{_id},
      parentCollection->{
        links[]->,
        removedLinks[]->{_id},
        parentCollection->{
          links[]->,
          removedLinks[]->{_id},
        }
      }
    }
  }
}`

export const CombinedLinks = (props: ArrayFieldProps) => {
  const [combinedLinks, setCombinedLinks] = useState<any[]>([])
  const id = useFormValue(['_id'])
  const client = useClient({apiVersion: '2025-05-08'})
  useEffect(() => {
    if (!id) {
      return
    }

    client
      .fetch(query, {
        id: id,
      })
      .then((data) => {
        if (!data || !data[0]) {
          setCombinedLinks([])
          return
        }

        const collection = data[0]

        // Helper function to recursively collect links and removed links
        const collectLinks = (col: any, depth = 0): {links: any[]; removedIds: string[]} => {
          if (!col || depth > 4) {
            return {links: [], removedIds: []}
          }

          const currentLinks = [...(col.links || [])]
          const currentRemovedIds = col.removedLinks?.map((link: any) => link._id) || []

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

        const {links: allLinks, removedIds: allRemovedIds} = collectLinks(collection)

        // Filter out removed links
        const filteredLinks = allLinks.filter((link: any) => {
          return link && link._id && !allRemovedIds.includes(link._id)
        })

        // Remove duplicates based on _id
        const uniqueLinks = Array.from(
          new Map(filteredLinks.map((link: any) => [link._id, link])).values(),
        )

        setCombinedLinks(uniqueLinks)
      })
  }, [id, client])

  // if (!combinedLinks.length) {
  //   return <div>{props.renderDefault(props)}</div>
  // }
  // const client = useClient()
  // const parentLinks = await client.fetch(`*[_type == "collection" && _id == $parent._ref].links`, {
  //   parent: parent,
  // })
  // console.log(parentLinks)
  return (
    <>
      <div>Combined Links with parent collections</div>
      {combinedLinks.map((link) => (
        <div key={link._id}>{link.title}</div>
      ))}
      <div>{props.renderDefault(props)}</div>
    </>
  )
}
