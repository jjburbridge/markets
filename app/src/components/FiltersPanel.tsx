import {Card, Flex, Grid, Stack, Text} from '@sanity/ui'
import {useCallback} from 'react'
import {
  KEY_STAGES,
  REGIONS,
  RESOURCE_TYPES,
  SUBJECTS,
  YEAR_GROUPS,
  type TaxonomyOption,
} from '../lib/resourceTaxonomy'
import {LANGUAGES, MARKETS} from '../lib/marketOptions'
import type {ResourceFilters} from '../lib/types'
import {MultiSelect} from './MultiSelect'

type FiltersPanelProps = {
  filters: ResourceFilters
  onChange: (next: ResourceFilters) => void
  onReset: () => void
}

type FilterKey = keyof ResourceFilters

type FilterDef = {
  key: FilterKey
  label: string
  options: TaxonomyOption[]
}

const FILTER_DEFS: FilterDef[] = [
  {key: 'subjects', label: 'Subjects', options: SUBJECTS},
  {key: 'keyStages', label: 'Key Stages', options: KEY_STAGES},
  {key: 'yearGroups', label: 'Year Groups', options: YEAR_GROUPS},
  {key: 'resourceTypes', label: 'Resource Types', options: RESOURCE_TYPES},
  {key: 'regions', label: 'Regions', options: REGIONS},
  {key: 'markets', label: 'Markets', options: MARKETS},
  {key: 'languages', label: 'Languages', options: LANGUAGES},
]

export function FiltersPanel({filters, onChange, onReset}: FiltersPanelProps) {
  const setFilter = useCallback(
    (key: FilterKey, values: string[]) => onChange({...filters, [key]: values}),
    [filters, onChange],
  )

  const totalSelected = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <Card padding={4} radius={3} shadow={1} tone="default">
      <Stack space={4}>
        <Flex align="center" justify="space-between">
          <Text size={2} weight="semibold">
            Filters
          </Text>
          <Text size={1} muted>
            {totalSelected === 0
              ? 'No filters applied — showing all resources'
              : `${totalSelected} filter${totalSelected === 1 ? '' : 's'} applied`}
            {' · '}
            <button
              type="button"
              onClick={onReset}
              style={{
                background: 'none',
                border: 0,
                padding: 0,
                color: 'inherit',
                textDecoration: 'underline',
                cursor: 'pointer',
                font: 'inherit',
              }}
            >
              Reset
            </button>
          </Text>
        </Flex>

        <Grid columns={[1, 2, 3]} gap={3}>
          {FILTER_DEFS.map((def) => (
            <MultiSelect
              key={def.key}
              label={def.label}
              options={def.options}
              selected={filters[def.key]}
              onChange={(values) => setFilter(def.key, values)}
            />
          ))}
        </Grid>
      </Stack>
    </Card>
  )
}
