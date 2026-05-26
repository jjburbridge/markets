import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer'
import {formatDate, thumbnailUrl, truncate} from '../lib/format'
import type {ResourceRow} from '../lib/types'

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#101112',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  meta: {
    fontSize: 9,
    color: '#5a6573',
    marginBottom: 16,
  },
  table: {
    borderTopWidth: 1,
    borderTopColor: '#d6dade',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f4f5f7',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#d6dade',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eceef1',
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 9,
    textTransform: 'uppercase',
    color: '#5a6573',
  },
  cell: {
    fontSize: 9,
    lineHeight: 1.4,
    paddingRight: 6,
  },
  cellMono: {
    fontFamily: 'Courier',
    fontSize: 9,
  },
  thumb: {
    width: 44,
    height: 44,
    objectFit: 'cover',
    borderRadius: 2,
    backgroundColor: '#f4f5f7',
  },
  thumbPlaceholder: {
    width: 44,
    height: 44,
    backgroundColor: '#f4f5f7',
    borderRadius: 2,
  },
  colImage: {width: 50, paddingRight: 6},
  colTitle: {flex: 2.4, paddingRight: 6},
  colCode: {flex: 1.1, paddingRight: 6},
  colDescription: {flex: 3.2, paddingRight: 6},
  colDate: {flex: 1.2},
  pageFooter: {
    position: 'absolute',
    left: 36,
    right: 36,
    bottom: 18,
    fontSize: 8,
    color: '#8995a3',
    textAlign: 'center',
  },
})

const COLUMNS = ['Preview', 'Title', 'Resource code', 'Description', 'Published'] as const

export type ResourcesPdfDocumentProps = {
  rows: ResourceRow[]
  generatedAt?: Date
  filterSummary?: string
}

export function ResourcesPdfDocument({
  rows,
  generatedAt = new Date(),
  filterSummary,
}: ResourcesPdfDocumentProps) {
  const generatedLabel = generatedAt.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <Document
      title="Resources report"
      author="Sanity Resources App"
      subject="Filtered list of educational resources"
    >
      <Page size="A4" orientation="landscape" style={styles.page} wrap>
        <Text style={styles.title}>Resources report</Text>
        <Text style={styles.meta}>
          Generated {generatedLabel} · {rows.length}{' '}
          {rows.length === 1 ? 'resource' : 'resources'}
          {filterSummary ? ` · ${filterSummary}` : ''}
        </Text>

        <View style={styles.table}>
          <View style={styles.headerRow} fixed>
            <View style={styles.colImage}>
              <Text style={styles.headerCell}>{COLUMNS[0]}</Text>
            </View>
            <View style={styles.colTitle}>
              <Text style={styles.headerCell}>{COLUMNS[1]}</Text>
            </View>
            <View style={styles.colCode}>
              <Text style={styles.headerCell}>{COLUMNS[2]}</Text>
            </View>
            <View style={styles.colDescription}>
              <Text style={styles.headerCell}>{COLUMNS[3]}</Text>
            </View>
            <View style={styles.colDate}>
              <Text style={styles.headerCell}>{COLUMNS[4]}</Text>
            </View>
          </View>

          {rows.map((row) => (
            <View key={row._id} style={styles.row} wrap={false}>
              <View style={styles.colImage}>
                {row.previewImageUrl ? (
                  <Image src={thumbnailUrl(row.previewImageUrl, 128)} style={styles.thumb} />
                ) : (
                  <View style={styles.thumbPlaceholder} />
                )}
              </View>
              <View style={styles.colTitle}>
                <Text style={styles.cell}>{row.title || 'Untitled'}</Text>
              </View>
              <View style={styles.colCode}>
                <Text style={[styles.cell, styles.cellMono]}>{row.resourceCode || '—'}</Text>
              </View>
              <View style={styles.colDescription}>
                <Text style={styles.cell}>{truncate(row.shortDescription, 280) || '—'}</Text>
              </View>
              <View style={styles.colDate}>
                <Text style={styles.cell}>{formatDate(row.publishedAt) || '—'}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text
          style={styles.pageFooter}
          render={({pageNumber, totalPages}) => `Page ${pageNumber} of ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  )
}
