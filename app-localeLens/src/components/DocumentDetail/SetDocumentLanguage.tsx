import { Badge, Card, Flex, Stack, Text } from '@sanity/ui';
import { useCallback, useState } from 'react';
import LanguageSelectionModal from '../LanguageSelectionModal';

type SetDocumentLanguageProps = {
  documentId?: string;
  sourceDocument?: any;
  schemaType?: string;
  languages: Array<{ id: string; title: string }>;
  onLanguageSet?: (languageId: string) => void;
};

const SetDocumentLanguage = ({
  documentId,
  sourceDocument,
  schemaType = 'post',
  languages,
  onLanguageSet,
}: SetDocumentLanguageProps) => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleLanguageSelect = useCallback(async (languageId: string) => {
    setShowLanguageModal(false);

    if (onLanguageSet) {
      onLanguageSet(languageId);
    }
  }, [onLanguageSet]);

  const handleCloseModal = () => {
    setShowLanguageModal(false);
  };

  const handleSetLanguage = () => {
    if (documentId && sourceDocument) {
      setShowLanguageModal(true);
    }
  };

  return (
    <>
      <Card padding={3} border tone="primary">
        <Stack space={3}>
          <Flex gap={2} align="center">
            <Badge
              tone="critical"
              radius={2}
              padding={2}
              onClick={handleSetLanguage}
              style={{
                cursor: documentId && sourceDocument ? 'pointer' : 'default',
              }}
            >
              No Document Language Set
            </Badge>
          </Flex>
          <Text size={1} muted>
            This document doesn&apos;t have a language set. Click the badge above to select a language.
          </Text>
        </Stack>
      </Card>

      <LanguageSelectionModal
        isOpen={showLanguageModal}
        onClose={handleCloseModal}
        onLanguageSelect={handleLanguageSelect}
        availableLanguages={languages}
        title="Set Document Language"
        documentId={documentId}
        sourceDocument={sourceDocument}
        schemaType={schemaType}
      />
    </>
  );
};

export default SetDocumentLanguage;
