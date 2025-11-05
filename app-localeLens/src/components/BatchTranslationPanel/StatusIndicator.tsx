import { Badge, Box, Card, Flex, Text } from '@sanity/ui';
import { BatchProcessState } from './types';

type StatusIndicatorProps = {
  selectedDocumentsCount: number;
  currentState: BatchProcessState;
};

const getStateColorClass = (state: BatchProcessState): string => {
  switch (state) {
    case 'VALIDATING':
      return 'bg-yellow-500';
    case 'READY_TO_SET_LOCALES':
      return 'bg-red-500';
    case 'SETTING_LOCALES':
      return 'bg-yellow-500';
    case 'LOCALES_SET_COMPLETE':
      return 'bg-green-500';
    case 'READY_TO_TRANSLATE':
      return 'bg-blue-500';
    case 'TRANSLATING':
      return 'bg-yellow-500';
    case 'COMPLETE':
      return 'bg-green-500';
    default:
      return 'bg-gray-400';
  }
};

const getStateMessage = (state: BatchProcessState): string => {
  switch (state) {
    case 'VALIDATING':
      return 'Validating selected documents...';
    case 'READY_TO_SET_LOCALES':
      return 'Some documents are missing base language configuration';
    case 'SETTING_LOCALES':
      return 'Setting document locales...';
    case 'LOCALES_SET_COMPLETE':
      return '✨ Locales set successfully! Ready to translate';
    case 'READY_TO_TRANSLATE':
      return 'Documents ready for batch translation';
    case 'TRANSLATING':
      return 'Translation in progress...';
    case 'COMPLETE':
      return 'Batch process completed';
    default:
      return 'Unknown state';
  }
};

const StatusIndicator = ({ selectedDocumentsCount, currentState }: StatusIndicatorProps) => {
  return (
    <>
      <Flex gap={2} align="center">
        <Badge tone="primary" padding={2} radius={2}>
          {selectedDocumentsCount}
        </Badge>
        <Text size={1}>
          {selectedDocumentsCount === 1 ? 'document selected' : 'documents selected'}
        </Text>
      </Flex>

      {currentState !== 'SELECTING' && (
        <Card padding={2} radius={1} tone="transparent" className="border border-gray-200">
          <Flex gap={2} align="center">
            <Box className={`w-1.5 h-1.5 ${getStateColorClass(currentState)} rounded-full flex-shrink-0`} />
            <Text size={0} weight="medium">
              {getStateMessage(currentState)}
            </Text>
          </Flex>
        </Card>
      )}
    </>
  );
};

export default StatusIndicator;