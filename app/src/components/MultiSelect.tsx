import {Badge, Box, Button, Card, Checkbox, Flex, Menu, MenuButton, Stack, Text} from '@sanity/ui'
import {ChevronDownIcon} from '@sanity/icons'
import {useId, useMemo} from 'react'
import type {TaxonomyOption} from '../lib/resourceTaxonomy'

type MultiSelectProps = {
  label: string
  options: TaxonomyOption[]
  selected: string[]
  onChange: (next: string[]) => void
}

/**
 * Lightweight multi-select dropdown built from `@sanity/ui` primitives.
 * Sanity UI doesn't ship a native multi-select, so this composes
 * a Menu of Checkbox rows behind a button trigger.
 */
export function MultiSelect({label, options, selected, onChange}: MultiSelectProps) {
  const id = useId()
  const selectedSet = useMemo(() => new Set(selected), [selected])

  const toggle = (value: string) => {
    const next = new Set(selectedSet)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    onChange(options.map((o) => o.value).filter((v) => next.has(v)))
  }

  const summary =
    selected.length === 0
      ? 'Any'
      : selected.length === 1
        ? (options.find((o) => o.value === selected[0])?.title ?? selected[0])
        : `${selected.length} selected`

  return (
    <Stack space={2}>
      <Text as="label" htmlFor={id} size={1} weight="medium">
        {label}
      </Text>
      <MenuButton
        id={id}
        button={
          <Button
            mode="ghost"
            padding={3}
            style={{width: '100%', justifyContent: 'space-between', minWidth: 0}}
          >
            <Flex align="center" gap={2} justify="space-between" style={{width: '100%', minWidth: 0}}>
              <Box flex={1} style={{minWidth: 0, overflow: 'hidden'}}>
                <Text size={1} textOverflow="ellipsis">
                  {summary}
                </Text>
              </Box>
              <Flex align="center" gap={2} style={{flexShrink: 0}}>
                {selected.length > 0 && <Badge tone="primary">{selected.length}</Badge>}
                <ChevronDownIcon />
              </Flex>
            </Flex>
          </Button>
        }
        menu={
          <Menu>
            <Card padding={2} style={{minWidth: 240, maxHeight: 320, overflowY: 'auto'}}>
              <Stack space={1}>
                {options.map((option) => {
                  const isOn = selectedSet.has(option.value)
                  return (
                    <Card
                      key={option.value}
                      padding={2}
                      radius={2}
                      tone={isOn ? 'primary' : 'default'}
                      style={{cursor: 'pointer'}}
                      onClick={() => toggle(option.value)}
                    >
                      <Flex align="center" gap={3}>
                        <Checkbox
                          checked={isOn}
                          readOnly
                          tabIndex={-1}
                          style={{pointerEvents: 'none'}}
                        />
                        <Box flex={1}>
                          <Text size={1}>{option.title}</Text>
                        </Box>
                      </Flex>
                    </Card>
                  )
                })}
              </Stack>
            </Card>
          </Menu>
        }
        popover={{portal: true, placement: 'bottom-start'}}
      />
    </Stack>
  )
}
