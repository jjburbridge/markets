import {Box, Card, Container, Flex, Heading, Stack, Text} from '@sanity/ui'
import {Suspense, useCallback, useState} from 'react'
import {emptyFilters, type ResourceFilters, type ResourceRow} from '../lib/types'
import {FiltersPanel} from './FiltersPanel'
import {GeneratePdfButton} from './GeneratePdfButton'
import {ResourcesTable} from './ResourcesTable'

export function ResourcesView() {
  const [filters, setFilters] = useState<ResourceFilters>(emptyFilters)
  const [rows, setRows] = useState<ResourceRow[]>([])

  const handleReset = useCallback(() => setFilters(emptyFilters), [])
  const handleRowsChange = useCallback((next: ResourceRow[]) => {
    // setState is allowed during render if the new value matches by ref; using
    // a quick length+id signature check keeps the parent stable when the query
    // re-runs with identical results.
    setRows((prev) => {
      if (prev === next) return prev
      if (prev.length === next.length && prev.every((r, i) => r._id === next[i]._id)) return prev
      return next
    })
  }, [])

  return (
    <Container width={3} padding={[3, 4, 5]} style={{minWidth: 0}}>
      <Stack gap={5} style={{minWidth: 0}}>
        <Flex align="flex-end" justify="space-between" gap={4} wrap="wrap">
          <Stack gap={2}>
            <Heading size={3}>Resources PDF Generator</Heading>
            <Text muted size={2}>
              Filter your educational resources and export a printable PDF report.
            </Text>
          </Stack>
          <GeneratePdfButton rows={rows} filters={filters} />
        </Flex>

        <FiltersPanel filters={filters} onChange={setFilters} onReset={handleReset} />

        <Suspense
          fallback={
            <Card padding={5} radius={3} shadow={1}>
              <Box>
                <Text muted align="center">
                  Loading resources…
                </Text>
              </Box>
            </Card>
          }
        >
          <ResourcesTable filters={filters} onRowsChange={handleRowsChange} />
        </Suspense>
      </Stack>
    </Container>
  )
}
