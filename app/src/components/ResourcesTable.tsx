import {Box, Card, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {useResourcesQuery} from '../lib/useResourcesQuery'
import {formatDate, truncate, thumbnailUrl} from '../lib/format'
import type {ResourceFilters, ResourceRow} from '../lib/types'

type ResourcesTableProps = {
  filters: ResourceFilters
  onRowsChange?: (rows: ResourceRow[]) => void
}

export function ResourcesTable({filters, onRowsChange}: ResourcesTableProps) {
  const {rows, isPending} = useResourcesQuery(filters)

  // Lift rows up so the PDF button has access to the same data without
  // re-querying.
  if (onRowsChange) onRowsChange(rows)

  return (
    <Card radius={3} shadow={1} padding={0} /* style={{overflow: 'hidden'}} */>
      <Stack>
        <Flex
          align="center"
          paddingX={4}
          paddingY={3}
          justify="space-between"
          style={{borderBottom: '1px solid var(--card-border-color)'}}
        >
          <Text weight="semibold" size={2}>
            {rows.length} matching {rows.length === 1 ? 'resource' : 'resources'}
          </Text>
          {isPending && (
            <Flex align="center" gap={2}>
              <Spinner muted />
              <Text size={1} muted>
                Updating…
              </Text>
            </Flex>
          )}
        </Flex>

        {rows.length === 0 ? (
          <Box padding={5}>
            <Text muted align="center">
              No resources match the current filters.
            </Text>
          </Box>
        ) : (
          <Box>
            <TableHeader />
            {rows.map((row) => (
              <TableRow key={row._id} row={row} />
            ))}
          </Box>
        )}
      </Stack>
    </Card>
  )
}

// `min-width: 0` is essential: without it, flex items default to
// `min-width: auto`, never shrink below their content's intrinsic width,
// and any long title / code / description pushes the row past the viewport.
const FLEX_CELL: React.CSSProperties = {minWidth: 0}

function TableHeader() {
  return (
    <Flex
      align="center"
      paddingX={4}
      paddingY={3}
      gap={3}
      style={{
        background: 'var(--card-bg2-color)',
        borderBottom: '1px solid var(--card-border-color)',
      }}
    >
      <Box style={{width: 56, flexShrink: 0}}>
        <Cell head>Preview</Cell>
      </Box>
      <Box flex={2} style={FLEX_CELL}>
        <Cell head>Title</Cell>
      </Box>
      <Box flex={1} style={FLEX_CELL}>
        <Cell head>Code</Cell>
      </Box>
      <Box flex={3} style={FLEX_CELL}>
        <Cell head>Description</Cell>
      </Box>
      <Box flex={1} style={FLEX_CELL}>
        <Cell head>Published</Cell>
      </Box>
    </Flex>
  )
}

function TableRow({row}: {row: ResourceRow}) {
  return (
    <Flex
      align="center"
      paddingX={4}
      paddingY={3}
      gap={3}
      style={{borderBottom: '1px solid var(--card-border-color)'}}
    >
      <Box style={{width: 56, flexShrink: 0}}>
        {row.previewImageUrl ? (
          <img
            src={thumbnailUrl(row.previewImageUrl, 96)}
            alt=""
            style={{
              width: 48,
              height: 48,
              objectFit: 'cover',
              borderRadius: 4,
              display: 'block',
            }}
          />
        ) : (
          <Card padding={2} radius={2} tone="transparent">
            <Text size={0} muted>
              —
            </Text>
          </Card>
        )}
      </Box>
      <Box flex={2} style={FLEX_CELL}>
        <Cell>{row.title || <Muted>Untitled</Muted>}</Cell>
      </Box>
      <Box flex={1} style={FLEX_CELL}>
        <Cell mono>{row.resourceCode || <Muted>—</Muted>}</Cell>
      </Box>
      <Box flex={3} style={FLEX_CELL}>
        <Cell>{truncate(row.shortDescription, 140) || <Muted>—</Muted>}</Cell>
      </Box>
      <Box flex={1} style={FLEX_CELL}>
        <Cell>{formatDate(row.publishedAt) || <Muted>—</Muted>}</Cell>
      </Box>
    </Flex>
  )
}

function Cell({
  children,
  head,
  mono,
}: {
  children: React.ReactNode
  head?: boolean
  mono?: boolean
}) {
  return (
    <Text
      size={1}
      weight={head ? 'semibold' : 'regular'}
      muted={head}
      style={{
        fontFamily: mono ? 'var(--font-family-mono, ui-monospace, monospace)' : undefined,
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        display: 'block',
      }}
    >
      {children}
    </Text>
  )
}

function Muted({children}: {children: React.ReactNode}) {
  return (
    <Text as="span" size={1} muted>
      {children}
    </Text>
  )
}
