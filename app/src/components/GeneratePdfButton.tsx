import {PDFDownloadLink} from '@react-pdf/renderer'
import {DownloadIcon} from '@sanity/icons'
import {Button, Flex, Spinner, Text} from '@sanity/ui'
import {useMemo} from 'react'
import {
  KEY_STAGES,
  REGIONS,
  RESOURCE_TYPES,
  SUBJECTS,
  YEAR_GROUPS,
  type TaxonomyOption,
} from '../lib/resourceTaxonomy'
import {LANGUAGES, MARKETS} from '../lib/marketOptions'
import type {ResourceFilters, ResourceRow} from '../lib/types'
import {ResourcesPdfDocument} from './ResourcesPdfDocument'

type GeneratePdfButtonProps = {
  rows: ResourceRow[]
  filters: ResourceFilters
}

function summariseFilters(filters: ResourceFilters): string {
  const labelFor = (options: TaxonomyOption[], values: string[]) =>
    values.map((v) => options.find((o) => o.value === v)?.title ?? v).join(', ')

  const pieces: string[] = []
  if (filters.subjects.length) pieces.push(`Subjects: ${labelFor(SUBJECTS, filters.subjects)}`)
  if (filters.keyStages.length) pieces.push(`Key Stages: ${labelFor(KEY_STAGES, filters.keyStages)}`)
  if (filters.yearGroups.length)
    pieces.push(`Year Groups: ${labelFor(YEAR_GROUPS, filters.yearGroups)}`)
  if (filters.resourceTypes.length)
    pieces.push(`Resource Types: ${labelFor(RESOURCE_TYPES, filters.resourceTypes)}`)
  if (filters.regions.length) pieces.push(`Regions: ${labelFor(REGIONS, filters.regions)}`)
  if (filters.markets.length) pieces.push(`Markets: ${labelFor(MARKETS, filters.markets)}`)
  if (filters.languages.length) pieces.push(`Languages: ${labelFor(LANGUAGES, filters.languages)}`)
  return pieces.join(' · ')
}

export function GeneratePdfButton({rows, filters}: GeneratePdfButtonProps) {
  const filterSummary = useMemo(() => summariseFilters(filters), [filters])

  const fileName = useMemo(() => {
    const stamp = new Date().toISOString().slice(0, 10)
    return `resources-${stamp}.pdf`
  }, [])

  const disabled = rows.length === 0

  if (disabled) {
    return (
      <Button
        icon={DownloadIcon}
        text="Generate PDF"
        tone="primary"
        disabled
        title="Adjust filters to include at least one resource"
      />
    )
  }

  return (
    <PDFDownloadLink
      document={<ResourcesPdfDocument rows={rows} filterSummary={filterSummary} />}
      fileName={fileName}
      style={{textDecoration: 'none'}}
    >
      {({loading, error}) =>
        loading ? (
          <Button mode="default" tone="primary" disabled>
            <Flex align="center" gap={2}>
              <Spinner />
              <Text>Building PDF…</Text>
            </Flex>
          </Button>
        ) : error ? (
          <Button
            icon={DownloadIcon}
            text="PDF failed — retry"
            tone="critical"
            title={error.message}
          />
        ) : (
          <Button
            icon={DownloadIcon}
            text={`Generate PDF (${rows.length})`}
            tone="primary"
            mode="default"
          />
        )
      }
    </PDFDownloadLink>
  )
}
