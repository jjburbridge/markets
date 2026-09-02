import {createClient} from '@sanity/client'
import {scheduledEventHandler} from '@sanity/functions'

/** Document types with a `content` field of type `richText` */
const DOC_TYPES = ['section', 'page']

/** Todo annotations stored as span marks, alongside inline `todo` children */
const MARK_TYPES = ['todo', 'todoHighlight']

type Span = {_type?: string; text?: string; marks?: string[]}

type TodoNode = {
  _type: string
  _key: string
  comment?: string | null
  dueDate?: string | null
}

type Block = {
  _type?: string
  _key?: string
  children?: (Span | TodoNode)[]
  markDefs?: TodoNode[]
}

/** Internationalized-array item wrapping its own set of blocks */
type IntlItem = {_type?: string; language?: string; value?: Block[]}

type Doc = {
  _id: string
  _type: string
  title?: string | null
  content?: Block[] | IntlItem[]
}

type DueTodo = {
  documentId: string
  documentType: string
  documentTitle: string | null
  language?: string
  kind: 'inline' | 'mark'
  markType?: string
  comment: string | null
  dueDate: string
  /** Highlighted phrase for marks, surrounding block text for inline todos */
  context: string
}

/**
 * Only documents holding at least one todo annotation due after `$today`, so a day with
 * nothing upcoming costs a single query. Handles `content` as plain Portable Text blocks
 * and as internationalized-array items that nest blocks under `value`.
 */
const QUERY = /* groq */ `*[
  _type in $types && (
    count(content[_type == "block" && (
      count(markDefs[_type in $markTypes && dueDate > $today]) > 0 ||
      count(children[_type == "todo" && dueDate > $today]) > 0
    )]) > 0 ||
    count(content[count(value[_type == "block" && (
      count(markDefs[_type in $markTypes && dueDate > $today]) > 0 ||
      count(children[_type == "todo" && dueDate > $today]) > 0
    )]) > 0]) > 0
  )
]{_id, _type, title, content}`

function isBlock(node: unknown): node is Block {
  return typeof node === 'object' && node !== null && (node as Block)._type === 'block'
}

function isInlineTodo(child: Span | TodoNode): child is TodoNode {
  return (child as TodoNode)._type === 'todo'
}

/** Groups blocks by language when `content` is an internationalized array. */
function blockGroups(content: Doc['content']): {language?: string; blocks: Block[]}[] {
  if (!Array.isArray(content) || content.length === 0) return []

  const first = content[0] as IntlItem
  const isIntl =
    typeof first._type === 'string' &&
    first._type.startsWith('internationalizedArray') &&
    Array.isArray(first.value)

  if (isIntl) {
    return (content as IntlItem[]).map((item) => ({
      language: item.language,
      blocks: (item.value ?? []).filter(isBlock),
    }))
  }

  return [{blocks: (content as unknown[]).filter(isBlock)}]
}

function truncate(text: string, max = 80): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

function blockText(block: Block): string {
  return (block.children ?? [])
    .map((child) => (isInlineTodo(child) ? '' : ((child as Span).text ?? '')))
    .join('')
    .trim()
}

/** Text covered by a single mark, which is the phrase the annotation highlights. */
function markText(block: Block, markKey: string): string {
  return (block.children ?? [])
    .map((child) =>
      !isInlineTodo(child) && (child as Span).marks?.includes(markKey)
        ? ((child as Span).text ?? '')
        : '',
    )
    .join('')
    .trim()
}

function dueTodosFor(doc: Doc, today: string): DueTodo[] {
  const todos: DueTodo[] = []

  for (const {language, blocks} of blockGroups(doc.content)) {
    for (const block of blocks) {
      const base = {
        documentId: doc._id,
        documentType: doc._type,
        documentTitle: doc.title ?? null,
        language,
      }

      for (const child of block.children ?? []) {
        if (!isInlineTodo(child)) continue
        if (!child.dueDate || child.dueDate <= today) continue
        todos.push({
          ...base,
          kind: 'inline',
          comment: child.comment ?? null,
          dueDate: child.dueDate,
          context: truncate(blockText(block)),
        })
      }

      for (const def of block.markDefs ?? []) {
        if (!MARK_TYPES.includes(def._type)) continue
        if (!def.dueDate || def.dueDate <= today) continue
        todos.push({
          ...base,
          kind: 'mark',
          markType: def._type,
          comment: def.comment ?? null,
          dueDate: def.dueDate,
          context: truncate(markText(block, def._key) || blockText(block)),
        })
      }
    }
  }

  return todos
}

export const handler = scheduledEventHandler(async ({context}) => {
  // Scheduled functions are not triggered by a document, so `clientOptions` carries no
  // project or dataset: both have to come from the environment.
  const projectId = context.clientOptions?.projectId ?? process.env.SANITY_STUDIO_SANITY_PROJECT_ID
  const dataset = context.clientOptions?.dataset ?? process.env.SANITY_STUDIO_SANITY_DATASET

  if (!projectId || !dataset) {
    throw new Error(
      'Missing SANITY_STUDIO_SANITY_PROJECT_ID or SANITY_STUDIO_SANITY_DATASET for todo-due-check',
    )
  }

  const client = createClient({
    ...context.clientOptions,
    projectId,
    dataset,
    apiVersion: '2025-05-08',
    useCdn: false,
    // Todos are editorial notes, so the in-progress draft is the version that matters
    perspective: 'drafts',
  })

  const today = new Date().toISOString().slice(0, 10)

  const docs = await client.fetch<Doc[]>(QUERY, {
    types: DOC_TYPES,
    markTypes: MARK_TYPES,
    today,
  })

  const todos = docs
    .flatMap((doc) => dueTodosFor(doc, today))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))

  if (todos.length === 0) {
    console.log(`No todo annotations due after ${today}`)
    return
  }

  console.log(
    `${todos.length} todo annotation(s) due after ${today} across ${docs.length} document(s)`,
  )
  for (const todo of todos) {
    console.log(
      [
        todo.dueDate,
        `${todo.documentType}/${todo.documentId}`,
        todo.documentTitle ?? '(untitled)',
        todo.language ? `[${todo.language}]` : null,
        todo.kind === 'mark' ? `(${todo.markType})` : '(inline)',
        todo.comment ? `— ${todo.comment}` : null,
        todo.context ? `on "${todo.context}"` : null,
      ]
        .filter(Boolean)
        .join(' '),
    )
  }
})
