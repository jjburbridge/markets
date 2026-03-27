import {BookmarkIcon} from '@sanity/icons'
import {Box, Card, Code, Heading, Stack, Text} from '@sanity/ui'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useClient} from 'sanity'
import {IntentLink} from 'sanity/router'

type PtSpan = {
  _type?: string
  text?: string
  marks?: string[]
}

/** Mark-based todos: legacy `todo` or current `todoHighlight` annotations */
type TodoMarkDef = {
  _type: string
  _key: string
  comment?: string
  dueDate?: string | null
}

/** Stored mark defs that represent a todo-style annotation */
const TODO_MARK_TYPES = new Set(['todo', 'todoHighlight'])

function isTodoMarkDef(def: TodoMarkDef): boolean {
  return TODO_MARK_TYPES.has(def._type)
}

/** Inline `block.of` todo (current schema) */
type TodoInlineChild = {
  _type: 'todo'
  _key: string
  comment?: string
  dueDate?: string | null
}

type PtChild = PtSpan | TodoInlineChild | {_type?: string; _key?: string}

type PtBlock = {
  _type?: string
  _key?: string
  children?: PtChild[]
  markDefs?: TodoMarkDef[]
}

type IntlArrayItem = {
  _type?: string
  language?: string
  value?: PtBlock[]
}

function isPortableTextBlock(node: unknown): node is PtBlock {
  return (
    typeof node === 'object' &&
    node !== null &&
    (node as PtBlock)._type === 'block'
  )
}

function isTodoInline(child: PtChild): child is TodoInlineChild {
  return typeof child === 'object' && child !== null && (child as TodoInlineChild)._type === 'todo'
}

/** `richText` may be plain PT blocks or internationalized-array items with `.value`. */
function blocksFromRichTextField(field: unknown): {language?: string; blocks: PtBlock[]}[] {
  if (!field || !Array.isArray(field) || field.length === 0) {
    return []
  }

  const first = field[0] as IntlArrayItem
  const isIntl =
    typeof first === 'object' &&
    first !== null &&
    typeof first._type === 'string' &&
    first._type.startsWith('internationalizedArray') &&
    Array.isArray(first.value)

  if (isIntl) {
    return (field as IntlArrayItem[]).map((item) => ({
      language: item.language,
      blocks: (item.value ?? []).filter(isPortableTextBlock),
    }))
  }

  const blocks = (field as unknown[]).filter(isPortableTextBlock)
  return [{blocks}]
}

function textForMark(block: PtBlock, markKey: string): string {
  const parts: string[] = []
  for (const child of block.children ?? []) {
    if (isTodoInline(child)) continue
    const span = child as PtSpan
    if (span._type !== 'span' && span._type !== undefined) continue
    if (!span.marks?.includes(markKey)) continue
    parts.push(span.text ?? '')
  }
  return parts.join('')
}

/** Span text between the previous todo child and the next todo child (excludes todo nodes). */
function spanTextAroundTodoChild(children: PtChild[], todoChildIndex: number): string {
  let prevTodo = -1
  for (let i = 0; i < todoChildIndex; i++) {
    if (isTodoInline(children[i])) prevTodo = i
  }
  let nextTodo = children.length
  for (let i = todoChildIndex + 1; i < children.length; i++) {
    if (isTodoInline(children[i])) {
      nextTodo = i
      break
    }
  }
  const parts: string[] = []
  for (let i = prevTodo + 1; i < nextTodo; i++) {
    if (i === todoChildIndex) continue
    const c = children[i]
    if (isTodoInline(c)) continue
    if (c._type === 'span' || !c._type) parts.push((c as PtSpan).text ?? '')
  }
  return parts.join('')
}

export type TodoAnnotationRow = {
  sectionId: string
  sectionTitle: string | null
  language?: string
  /** Inline `block.of` todo vs span mark (`todo` / `todoHighlight`) */
  kind: 'inline' | 'mark'
  /** Mark schema name when `kind === 'mark'` */
  markType?: string
  highlightedText: string
  comment: string | null
  dueDate: string | null
  sortKey: string
  rowKey: string
}

function rowsFromSection(doc: {
  _id: string
  title?: string | null
  content?: unknown
}): TodoAnnotationRow[] {
  const out: TodoAnnotationRow[] = []
  const groups = blocksFromRichTextField(doc.content)

  for (const {language, blocks} of groups) {
    for (const block of blocks) {
      const children = block.children ?? []

      // New schema: inline `todo` objects in block children
      children.forEach((child, index) => {
        if (!isTodoInline(child)) return
        const highlightedText = spanTextAroundTodoChild(children, index)
        const dueDate = child.dueDate ?? null
        out.push({
          sectionId: doc._id,
          sectionTitle: doc.title ?? null,
          language,
          kind: 'inline',
          highlightedText,
          comment: child.comment ?? null,
          dueDate,
          sortKey: dueDate ?? '9999-12-31',
          rowKey: `${doc._id}-inline-${child._key}`,
        })
      })

      // Span annotations: `todoHighlight` (current) or `todo` (legacy) in markDefs
      for (const def of block.markDefs ?? []) {
        if (!isTodoMarkDef(def)) continue
        const highlightedText = textForMark(block, def._key)
        const dueDate = def.dueDate ?? null
        out.push({
          sectionId: doc._id,
          sectionTitle: doc.title ?? null,
          language,
          kind: 'mark',
          markType: def._type,
          highlightedText,
          comment: def.comment ?? null,
          dueDate,
          sortKey: dueDate ?? '9999-12-31',
          rowKey: `${doc._id}-mark-${def._type}-${def._key}`,
        })
      }
    }
  }

  return out
}

/** Block has an inline todo and/or todo / todoHighlight span marks */
const blockHasTodo =
  'count(markDefs[_type in ["todo", "todoHighlight"]]) > 0 || count(children[_type == "todo"]) > 0'

/**
 * Only sections whose rich text actually contains todos (plain PT or internationalized-array `value`).
 */
const QUERY = `*[
  _type == "section" &&
  (
    count(content[_type == "block" && (${blockHasTodo})]) > 0 ||
    count(content[count(value[_type == "block" && (${blockHasTodo})]) > 0]) > 0
  )
]{ _id, title, content }`

export function todoAnnotationsTool() {
  return {
    name: 'todo-annotations',
    title: 'Todo annotations',
    icon: BookmarkIcon,
    component: TodoAnnotationsToolComponent,
  }
}

function TodoAnnotationsToolComponent() {
  const client = useClient({apiVersion: '2025-03-26'})
  const [rows, setRows] = useState<TodoAnnotationRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const docs = await client.fetch<
        {_id: string; title?: string | null; content?: unknown}[]
      >(QUERY)
      const flat = docs.flatMap(rowsFromSection)
      flat.sort((a, b) => a.sortKey.localeCompare(b.sortKey))
      setRows(flat)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setRows(null)
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    void load()
  }, [load])

  const empty = useMemo(() => rows && rows.length === 0, [rows])

  return (
    <Card padding={4} tone="transparent">
      <Stack space={4}>
        <Heading as="h1" size={1}>
          Section todo annotations
        </Heading>
        <Text muted size={1}>
          Inline todo blocks and highlighted (todoHighlight / todo) annotations in section content,
          ordered by due date (no date last).
        </Text>

        {loading && <Text>Loading…</Text>}
        {error && (
          <Card padding={3} tone="critical" border>
            <Text>{error}</Text>
          </Card>
        )}
        {!loading && !error && empty && (
          <Text muted>No inline todos or todo annotations found in section content.</Text>
        )}

        {!loading && !error && rows && rows.length > 0 && (
          <Stack as="ol" space={3}>
            {rows.map((row) => (
              <Card key={row.rowKey} padding={3} border tone="default">
                <Stack space={3}>
                  <Text size={1} weight="semibold">
                    <IntentLink intent="edit" params={{id: row.sectionId, type: 'section'}}>
                      {row.sectionTitle?.trim() || row.sectionId}
                    </IntentLink>
                    {row.language ? (
                      <Text as="span" muted size={1}>
                        {' '}
                        · {row.language}
                      </Text>
                    ) : null}
                  </Text>
                  <Text muted size={1}>
                    {row.kind === 'inline'
                      ? 'Inline todo'
                      : row.markType === 'todoHighlight'
                        ? 'Highlighted annotation (todoHighlight)'
                        : 'Todo annotation (mark)'}
                  </Text>
                  <Box>
                    <Text size={1} weight="medium">
                      {row.kind === 'inline' ? 'Surrounding text' : 'Highlighted text'}
                    </Text>
                    <IntentLink intent="edit" params={{id: row.sectionId, type: 'section'}}>
                      <Code size={2}>{row.highlightedText || '(empty)'}</Code>
                    </IntentLink>
                  </Box>
                  <Box>
                    <Text size={1} weight="medium">
                      Comment
                    </Text>
                    <Text size={1}>{row.comment ?? '—'}</Text>
                  </Box>
                  <Box>
                    <Text size={1} weight="medium">
                      Due date
                    </Text>
                    <Text size={1}>{row.dueDate ?? '—'}</Text>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  )
}
