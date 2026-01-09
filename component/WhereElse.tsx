import {useEffect, useState} from 'react'
import {SanityDocumentLike} from 'sanity'
import {useClient} from 'sanity'
import {useIntentLink} from 'sanity/router'

const DocLink = ({doc}: {doc: SanityDocumentLike}) => {
  const {onClick, href} = useIntentLink({
    intent: 'edit',
    params: {
      id: doc._id,
    },
  })
  return (
    <div key={doc._id}>
      <a href={href} onClick={onClick}>
        {doc.title} - {doc._type} - {doc.market} - {doc.language}
      </a>
    </div>
  )
}

export const WhereElse = (props: any) => {
  console.log(props)

  const [sameSlug, setSameSlug] = useState([])
  const client = useClient({apiVersion: '2025-05-08'})

  useEffect(() => {
    if (!props.value?._id || !props.value?.slug?.current) return
    const fetchSameSlug = async () => {
      const sameSlug = await client.fetch(
        `*[slug.current == $slug && _id != $id]`,
        {
          slug: props.value?.slug?.current,
          id: props.value?._id,
        },
        {perspective: 'published'},
      )
      setSameSlug(sameSlug)
    }
    fetchSameSlug()
  }, [props.value?.slug?.current])

  return (
    <>
      <div>WhereElse</div>
      {sameSlug.map((item: SanityDocumentLike) => (
        <DocLink doc={item} key={item._id} />
      ))}
      {props.renderDefault(props)}
    </>
  )
}
