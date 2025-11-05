import { useDocumentProjection } from '@sanity/sdk-react';
import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui';
import { BATCH_DOCUMENT_PREVIEW_QUERY } from '../../queries/documentQueries';
import TranslationProgress from './TranslationProgress';
import { BatchProcessState, DocumentTranslationProgress, Language } from './types';

type DocumentItemProps = {
  document: any;
  isValid: boolean;
  isInvalid: boolean;
  isFullyTranslated: boolean;
  translationProgress?: DocumentTranslationProgress;
  currentState: BatchProcessState;
  languages: Language[];
  fallbackDocumentId?: string;
  dataMap?: any;
};

const DocumentItem = ({
  document,
  isValid,
  isInvalid,
  isFullyTranslated,
  translationProgress,
  currentState,
  languages,
  fallbackDocumentId,
  dataMap,
}: DocumentItemProps) => {

  if (!document && fallbackDocumentId) {
    return (
      <Card key={fallbackDocumentId} padding={2} radius={1} tone="caution" className="border border-gray-200">
        <Stack space={2}>
          <Flex gap={2} align="center">
            <Box className="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0" />
            <Text size={1} weight="medium">
              Document (validation pending)
            </Text>
          </Flex>
          <Flex gap={2} align="flex-start" paddingLeft={2}>
            <Text size={0} className="text-yellow-500 leading-none">
              ⚠️
            </Text>
            <Stack space={1} className="flex-1">
              <Text size={0} muted>
                Unable to validate - may still be processed
              </Text>
              <Text size={0} muted className="font-mono opacity-50">
                ID: {fallbackDocumentId.substring(0, 8)}...
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </Card>
    );
  }

  if (!document) return null;

  let statusIcon: string;
  let statusColorClass: string;
  let statusTextColorClass: string;
  let statusMessage: string;
  let badgeTone: 'default' | 'neutral' | 'primary' | 'suggest' | 'positive' | 'caution' | 'critical';
  let cardTone: 'default' | 'neutral' | 'primary' | 'suggest' | 'positive' | 'caution' | 'critical' | 'transparent';

  if (isValid) {
    statusIcon = '✅';
    statusColorClass = 'bg-gray-500';
    statusTextColorClass = 'text-gray-500';
    statusMessage = 'Will create missing translations';
    badgeTone = 'default';
    cardTone = 'default';
  } else if (isFullyTranslated) {
    statusIcon = '⚪';
    statusColorClass = 'bg-green-500';
    statusTextColorClass = 'text-green-500';
    statusMessage = 'Already fully translated - (we\'ll skip this one)';
    badgeTone = 'positive';
    cardTone = 'positive';
  } else if (isInvalid) {
    statusIcon = '⚠️';
    statusColorClass = 'bg-yellow-500';
    statusTextColorClass = 'text-yellow-500';
    statusMessage = 'Missing base language - needs to be configured first';
    badgeTone = 'caution';
    cardTone = 'caution';
  } else {
    statusIcon = '⚠️';
    statusColorClass = 'bg-yellow-500';
    statusTextColorClass = 'text-yellow-500';
    statusMessage = 'Unknown status';
    badgeTone = 'caution';
    cardTone = 'caution';
  }


  const {data} = useDocumentProjection<any>({
    ...dataMap,
    projection: BATCH_DOCUMENT_PREVIEW_QUERY,
  });

  return (
    <Card key={document._id} padding={2} radius={1} tone={cardTone} className="border border-gray-200">
      <Stack space={2}>
        <Flex gap={2} align="center">
          <Box className={`w-1.5 h-1.5 ${statusColorClass} rounded-full flex-shrink-0`} />
          <Text size={1} weight="medium" className="flex-1">
            {document.title || 'Untitled'}
          </Text>
          {document.language && (
            <Badge tone={badgeTone} padding={1} radius={1} fontSize={0}>
              {document.language}
            </Badge>
          )}
        </Flex>
        <Flex gap={2} align="center" paddingLeft={2}>
          <Text size={0} className={`${statusTextColorClass} leading-none`}>
            {statusIcon}
          </Text>
          <Stack space={1} className="flex-1">
            <Text size={0} muted>
              {statusMessage}
            </Text>
            <Text size={0} muted className="font-mono opacity-50">
              ID: {document._id.substring(0, 8)}...
            </Text>
          </Stack>
        </Flex>

        <TranslationProgress
          documentId={document._id}
          progress={translationProgress!}
          currentState={currentState}
          languages={languages}
          documentLanguage={document.language}
          isFullyTranslated={isFullyTranslated}
          existingTranslations={data?._translations || []}
        />
      </Stack>
    </Card>
  );
};

export default DocumentItem;
