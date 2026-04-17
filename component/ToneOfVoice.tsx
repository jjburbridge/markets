import {useCallback, useEffect, useRef, useState} from 'react'
import {
  type InputProps,
  isObjectInputProps,
  isStringInputProps,
  pathToString,
  set,
  useClient,
  useFormValue,
} from 'sanity'
import {Box, Button, Card, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {TONE_OF_VOICE_DOCUMENT_ID} from '../lib/toneOfVoiceConstants'
import {
  fetchToneSuggestions,
  truncateDocumentForSuggest,
  type ToneOfVoiceSuggestion,
} from '../lib/toneOfVoiceSuggest'

const toneDocQuery = `coalesce(
  *[_id == "drafts." + $publishedId][0],
  *[_id == $publishedId][0]
) { title, guidelines }`

function supportsToneAssist(props: InputProps): boolean {
  if (isObjectInputProps(props) && props.id === 'root') {
    return false
  }
  if (isStringInputProps(props)) {
    return true
  }
  return props.schemaType?.name === 'text'
}

function readFieldValue(props: InputProps): string {
  const v = (props as {value?: unknown}).value
  return typeof v === 'string' ? v : ''
}

export function ToneOfVoice(props: InputProps) {
  const client = useClient({apiVersion: '2024-01-01'})
  const documentValue = useFormValue([]) as Record<string, unknown> | undefined
  const [toneTitle, setToneTitle] = useState<string | null>(null)
  const [guidelines, setGuidelines] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<ToneOfVoiceSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const endpoint = process.env.SANITY_STUDIO_TONE_SUGGESTIONS_URL
  const assist = supportsToneAssist(props)
  const fieldPath = pathToString(props.path)
  const fieldValue = readFieldValue(props)

  useEffect(() => {
    let cancelled = false
    client
      .fetch<{title?: string; guidelines?: string} | null>(toneDocQuery, {
        publishedId: TONE_OF_VOICE_DOCUMENT_ID,
      })
      .then((doc) => {
        if (cancelled || !doc) {
          if (!cancelled) {
            setToneTitle(null)
            setGuidelines(null)
          }
          return
        }
        setToneTitle(doc.title ?? null)
        setGuidelines(doc.guidelines ?? null)
      })
      .catch(() => {
        if (!cancelled) {
          setToneTitle(null)
          setGuidelines(null)
        }
      })
    return () => {
      cancelled = true
    }
  }, [client])

  const runSuggest = useCallback(async () => {
    if (!assist || !guidelines?.trim()) {
      setSuggestions([])
      setError(
        !guidelines?.trim()
          ? 'Add tone of voice guidelines under Studio → Tone of voice.'
          : null,
      )
      return
    }
    if (!endpoint?.trim()) {
      setSuggestions([])
      setError('Set SANITY_STUDIO_TONE_SUGGESTIONS_URL to enable AI suggestions.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const list = await fetchToneSuggestions(endpoint, {
        fieldPath,
        fieldValue,
        documentJson: truncateDocumentForSuggest(documentValue),
        toneGuidelines: guidelines,
      })
      setSuggestions(list)
    } catch (e) {
      setSuggestions([])
      setError(e instanceof Error ? e.message : 'Suggestion request failed')
    } finally {
      setLoading(false)
    }
  }, [assist, documentValue, endpoint, fieldPath, fieldValue, guidelines])

  useEffect(() => {
    if (!assist || !props.focused) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
      return
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null
      void runSuggest()
    }, 400)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
        debounceRef.current = null
      }
    }
  }, [assist, props.focused, runSuggest])

  if (isObjectInputProps(props) && props.id === 'root') {
    return props.renderDefault(props)
  }

  if (!assist) {
    return props.renderDefault(props)
  }

  return (
    <Stack space={2}>
      {props.focused && (
        <Card padding={3} radius={2} shadow={1} tone="transparent">
          <Stack space={3}>
            <Flex align="center" gap={2} justify="space-between">
              <Text size={1} weight="semibold">
                Tone of voice
              </Text>
              {loading && <Spinner muted />}
            </Flex>
            {toneTitle && (
              <Text muted size={1}>
                Using: {toneTitle}
              </Text>
            )}
            {!guidelines?.trim() && (
              <Text muted size={1}>
                Define guidelines in the Tone of voice document (Studio section in the sidebar).
              </Text>
            )}
            {error && (
              <Text size={1} style={{color: 'var(--card-fg-color)'}}>
                {error}
              </Text>
            )}
            {suggestions.length > 0 && (
              <Stack space={2}>
                {suggestions.map((s, i) => (
                  <Box key={[s.title, i].join('-')}>
                    <Text size={1} weight="medium">
                      {s.title}
                    </Text>
                    {s.detail && (
                      <Text muted size={1}>
                        {s.detail}
                      </Text>
                    )}
                    {typeof s.replacement === 'string' && (
                      <Box marginTop={2}>
                        <Button
                          fontSize={1}
                          mode="ghost"
                          onClick={() => props.onChange(set(s.replacement))}
                          padding={2}
                          text="Apply suggested text"
                          tone="primary"
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
            )}
            <Button
              disabled={loading || !guidelines?.trim()}
              fontSize={1}
              mode="bleed"
              onClick={() => void runSuggest()}
              text="Scan again"
              tone="default"
            />
          </Stack>
        </Card>
      )}
      {props.renderDefault(props)}
    </Stack>
  )
}
