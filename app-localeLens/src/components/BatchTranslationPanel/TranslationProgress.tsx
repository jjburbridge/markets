import { Badge, Box, Flex, Spinner, Stack, Text } from '@sanity/ui';
import { BatchProcessState, DocumentTranslationProgress, Language } from './types';

type TranslationProgressProps = {
  documentId: string;
  progress: DocumentTranslationProgress;
  currentState: BatchProcessState;
  languages: Language[];
  documentLanguage: string | null;
  isFullyTranslated?: boolean;
  existingTranslations?: any[];
};

const TranslationProgress = ({
  progress,
  currentState,
  languages,
  isFullyTranslated,
  existingTranslations = [],
}: TranslationProgressProps) => {
  const hasProgress = !!progress;
  const isTranslating = currentState === 'TRANSLATING';
  const isComplete = currentState === 'COMPLETE';

  // Show existing translations if we have any
  if (existingTranslations.length > 0) {
    return (
      <Box paddingLeft={3} className="border-l-2 border-gray-200 ml-2">
        <Stack space={1}>
          {existingTranslations.filter(translation => translation && translation.language).map(translation => {
            const lang = languages.find(l => l.id === translation.language);
            return (
              <Flex key={translation.language} gap={2} align="center" paddingY={1}>
                <Box className="w-1 h-1 bg-green-500 rounded-full flex-shrink-0" />
                <Text size={0} className="flex-1">
                  {lang?.title || translation.language}
                </Text>
                <Badge tone="positive" padding={1} radius={1} fontSize={0}>
                  {translation.language}
                </Badge>
                <Text size={0} className="text-green-500">
                  ✓
                </Text>
              </Flex>
            );
          })}
        </Stack>
      </Box>
    );
  }

  if (!hasProgress) return null;

  return (
    <Box paddingLeft={3} className="border-l-2 border-gray-200 ml-2">
      <Stack space={1}>
        {progress.translations.map((translation) => (
          <Flex key={translation.languageId} gap={2} align="center" paddingY={1}>
            <Box className={`w-1 h-1 rounded-full flex-shrink-0 ${
              translation.status === 'created' ? 'bg-green-500' :
              translation.status === 'creating' ? 'bg-yellow-500' :
              translation.status === 'failed' ? 'bg-red-500' :
              'bg-gray-400'
            }`} />
            <Text size={0} className="flex-1">
              {translation.languageTitle}
            </Text>
            <Badge
              tone={
                translation.status === 'created' ? 'positive' :
                translation.status === 'creating' ? 'caution' :
                translation.status === 'failed' ? 'critical' :
                'default'
              }
              padding={1}
              radius={1}
              fontSize={0}
            >
              {translation.languageId}
            </Badge>
            {translation.status === 'creating' && (
              <Spinner size={0} />
            )}
            {translation.status === 'created' && (
              <Text size={0} className="text-green-500">
                ✓
              </Text>
            )}
            {translation.status === 'failed' && (
              <Text size={0} className="text-red-500">
                ✗
              </Text>
            )}
          </Flex>
        ))}
        {progress.currentlyTranslating && (
          <Text size={0} muted className="pl-3 italic">
            Creating {progress.currentlyTranslating}...
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default TranslationProgress;
