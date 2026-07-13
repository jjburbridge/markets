import {useEffect, useMemo, useState} from 'react'
import {createClient} from '@sanity/client'
import {Badge, Card, Container, Flex, Heading, Spinner, Stack, Text} from '@sanity/ui'
import {WarningOutlineIcon} from '@sanity/icons'

const MEDIA_LIBRARY_ID = 'mlxWjOAlTnS6'
const EXPIRY_WINDOW_MS = 3 * 7 * 24 * 60 * 60 * 1000 // 3 weeks
const DAY_MS = 24 * 60 * 60 * 1000

interface ExpiringAsset {
  _id: string
  _type: 'sanity.imageAsset'
  title?: string
  originalFilename?: string
  expiresAt: string
  license?: {
    licenseType?: string
  }
}

type BadgeTone = 'positive' | 'primary' | 'caution' | 'critical' | 'default'

const LICENSE_TONES: Record<string, BadgeTone> = {
  cc0: 'positive',
  'cc-by': 'positive',
  'royalty-free': 'primary',
  'rights-managed': 'caution',
  'proprietary-exclusive': 'critical',
}

const LICENSE_LABELS: Record<string, string> = {
  cc0: 'CC0',
  'cc-by': 'CC BY',
  'royalty-free': 'Royalty-free',
  'rights-managed': 'Rights-managed',
  'proprietary-exclusive': 'Proprietary / Exclusive',
}

function daysUntil(dateStr: string): number {
  const target = new Date(`${dateStr}T00:00:00Z`).getTime()
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  return Math.round((target - today.getTime()) / DAY_MS)
}

function formatExpiry(dateStr: string): {label: string; tone: BadgeTone} {
  const days = daysUntil(dateStr)
  if (days < 0) return {label: `Expired ${-days}d ago`, tone: 'critical'}
  if (days === 0) return {label: 'Expires today', tone: 'critical'}
  if (days <= 7) return {label: `In ${days}d`, tone: 'critical'}
  return {label: `In ${days}d`, tone: 'caution'}
}

function useExpiringLicenses() {
  const [data, setData] = useState<ExpiringAsset[] | undefined>(undefined)
  const [error, setError] = useState<Error | null>(null)

  const client = useMemo(
    () =>
      createClient({
        apiVersion: 'vX',
        useCdn: false,
        withCredentials: true,
        resource: {
          type: 'media-library',
          id: MEDIA_LIBRARY_ID,
        },
      }),
    [],
  )

  useEffect(() => {
    let cancelled = false
    const threshold = new Date(Date.now() + EXPIRY_WINDOW_MS).toISOString().slice(0, 10)

    client
      .fetch<ExpiringAsset[]>(
        `*[_type == 'sanity.asset' && defined(aspects.imageLicense) && defined(aspects.imageLicense.licenseExpirationDate) && aspects.imageLicense.licenseExpirationDate <= $threshold] {_id, title, originalFilename, "expiresAt": aspects.imageLicense.licenseExpirationDate, "license": aspects.imageLicense} | order(aspects.imageLicense.licenseExpirationDate asc)`,
        {threshold},
      )
      .then((response) => {
        if (!cancelled) setData(response ?? [])
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)))
      })

    return () => {
      cancelled = true
    }
  }, [client])

  return {data, error, loading: data === undefined && !error}
}

const cellStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--card-border-color)',
  verticalAlign: 'middle',
  textAlign: 'left',
}

const headerCellStyle: React.CSSProperties = {
  ...cellStyle,
  fontWeight: 600,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  color: 'var(--card-muted-fg-color)',
}

function ReportTable({rows}: {rows: ExpiringAsset[]}) {
  if (rows.length === 0) {
    return (
      <Card padding={4} radius={2} tone="transparent" border>
        <Text align="center" muted>
          No image licenses expiring within 3 weeks.
        </Text>
      </Card>
    )
  }

  return (
    <Card radius={2} border overflow="auto">
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Title</th>
            <th style={headerCellStyle}>Filename</th>
            <th style={headerCellStyle}>Expires</th>
            <th style={headerCellStyle}>License</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const expiry = formatExpiry(row.expiresAt)
            const licenseTone = row.license?.licenseType ? (LICENSE_TONES[row.license.licenseType] ?? 'default') : 'default'
            const licenseLabel = row.license?.licenseType
              ? (LICENSE_LABELS[row.license.licenseType] ?? row.license.licenseType)
              : 'Unknown'

            return (
              <tr key={row._id}>
                <td style={cellStyle}>
                  <Text weight="medium">{row.title || '—'}</Text>
                </td>
                <td style={cellStyle}>
                  <Text muted size={1}>
                    {row.originalFilename || '—'}
                  </Text>
                </td>
                <td style={cellStyle}>
                  <Stack space={2}>
                    <Text size={1}>{row.expiresAt}</Text>
                    <Badge tone={expiry.tone} fontSize={0}>
                      {expiry.label}
                    </Badge>
                  </Stack>
                </td>
                <td style={cellStyle}>
                  <Badge tone={licenseTone}>{licenseLabel}</Badge>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}

export function ImageLicenseReport() {
  const {data, error, loading} = useExpiringLicenses()
  console.log('data', data)

  return (
    <Container width={5} padding={4}>
      <Stack space={4}>
        <Stack space={2}>
          <Heading as="h1">Image license expiry report</Heading>
          <Text muted size={1}>
            Images with licenses expiring within the next 3 weeks (includes already-expired).
          </Text>
        </Stack>

        {error && (
          <Card tone="critical" padding={3} radius={2}>
            <Text>Failed to load: {error.message}</Text>
          </Card>
        )}

        {loading && (
          <Flex justify="center" padding={4}>
            <Spinner muted />
          </Flex>
        )}

        {!loading && !error && data && <ReportTable rows={data} />}
      </Stack>
    </Container>
  )
}

ImageLicenseReport.icon = WarningOutlineIcon

export default ImageLicenseReport
