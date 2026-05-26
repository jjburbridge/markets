import {SanityApp, type SanityConfig} from '@sanity/sdk-react'
import {Box, Card, Spinner, Stack, Text, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {ResourcesView} from './components/ResourcesView'

const theme = buildTheme()

// Belt-and-braces: stop the page from horizontally scrolling even if a
// rogue descendant blows past its container.
const ROOT_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: '100%',
  overflowX: 'hidden',
  boxSizing: 'border-box',
}

const projectId = (process.env.SANITY_APP_PROJECT_ID as string | undefined) ?? ''
const dataset = (process.env.SANITY_APP_DATASET as string | undefined) ?? 'production'

const config: SanityConfig[] = [{projectId, dataset}]

function AppFallback({label}: {label: string}) {
  return (
    <Box padding={5}>
      <Card padding={5} radius={3} shadow={1}>
        <Stack space={3} style={{alignItems: 'center'}}>
          <Spinner muted />
          <Text muted size={1}>
            {label}
          </Text>
        </Stack>
      </Card>
    </Box>
  )
}

export default function App() {
  if (!projectId) {
    return (
      <ThemeProvider theme={theme}>
        <Box padding={5} style={ROOT_STYLE}>
          <Card padding={5} radius={3} shadow={1} tone="critical">
            <Stack space={3}>
              <Text size={2} weight="semibold">
                Missing Sanity project configuration
              </Text>
              <Text size={1}>
                Set <code>SANITY_APP_PROJECT_ID</code> (and optionally{' '}
                <code>SANITY_APP_DATASET</code>) in <code>app/.env.local</code>, then restart the
                dev server.
              </Text>
            </Stack>
          </Card>
        </Box>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <SanityApp config={config} fallback={<AppFallback label="Connecting to Sanity…" />}>
        <ResourcesView />
      </SanityApp>
    </ThemeProvider>
  )
}
