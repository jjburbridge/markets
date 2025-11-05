import { useDocuments } from '@sanity/sdk-react';
import { Card, Flex, Spinner, Stack, Text } from '@sanity/ui';
import DocumentItem from './DocumentItem';
import { BatchProcessState, DocumentTranslationProgress, Language } from './types';

type DocumentsListProps = {
  selectedDocuments: string[];
  validDocuments: any[];
  invalidDocuments: any[];
  fullyTranslatedDocuments: any[];
  isValidating: boolean;
  translationProgress: Record<string, DocumentTranslationProgress>;
  currentState: BatchProcessState;
  languages: Language[];
};

const DocumentsList = ({
  selectedDocuments,
  validDocuments,
  invalidDocuments,
  fullyTranslatedDocuments,
  isValidating,
  translationProgress,
  currentState,
  languages,
}: DocumentsListProps) => {
  if (selectedDocuments.length === 0) return null;

  const { data } = useDocuments({
    documentType: 'post',
    filter: `_id in [${selectedDocuments.map(id => `"${id}"`).join(', ')}]`,
    orderings: [{ field: '_createdAt', direction: 'desc' }],
    batchSize: 20,
  });

  return (
    <Card padding={3} radius={1} tone="transparent" className="max-h-300 overflow-y-auto sticky top-0">
      <Stack space={3}>
        <Text size={1} weight="semibold" muted>
          Selected documents:
        </Text>

        {isValidating && (
          <Flex gap={2} align="center" paddingY={2}>
            <Spinner size={0} />
            <Text size={1} muted>Validating documents...</Text>
          </Flex>
        )}

        {!isValidating && (
          <Stack space={3}>
            {selectedDocuments.map((docId) => {
              const validDoc = validDocuments.find(doc => doc._id === docId);
              const invalidDoc = invalidDocuments.find(doc => doc._id === docId);
              const fullyTranslatedDoc = fullyTranslatedDocuments.find(doc => doc._id === docId);

              const doc = validDoc || invalidDoc || fullyTranslatedDoc;

              const dataMap = data.find(d => d.documentId === docId);
              return (
                <DocumentItem
                  key={docId}
                  document={doc!}
                  isValid={!!validDoc}
                  isInvalid={!!invalidDoc}
                  isFullyTranslated={!!fullyTranslatedDoc}
                  translationProgress={translationProgress[docId]}
                  currentState={currentState}
                  languages={languages}
                  fallbackDocumentId={!doc ? docId : undefined}
                  dataMap={dataMap}
                />
              );
            })}
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default DocumentsList;
