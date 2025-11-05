import { CloseIcon } from '@sanity/icons';
import { Button, Card, Flex, Stack, Text } from '@sanity/ui';
import { useCallback, useState } from 'react';
import { useSetDocumentLanguage } from '../hooks';
import LocaleFallbackMessage from './LocaleFallbackMessage';

type LanguageSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLanguageSelect: (languageId: string) => void;
  availableLanguages: Array<{ id: string; title: string }>;
  title?: string;
  documentId?: string;
  schemaType?: string;
  sourceDocument?: any;
};

const LanguageSelectionModal = ({
  isOpen,
  onClose,
  onLanguageSelect,
  availableLanguages,
  title = 'Select Base Language',
  documentId,
  schemaType = 'post',
  sourceDocument,
}: LanguageSelectionModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const { setDocumentLanguage, isSettingLanguage } = useSetDocumentLanguage();

  // Show fallback message if no languages are available
  if (!availableLanguages || availableLanguages.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
        <Card padding={4} radius={3} shadow={3} style={{ maxWidth: '400px', width: '90%' }}>
          <LocaleFallbackMessage
            title="No Languages Available"
            message="Cannot open language selection without available languages."
            suggestion="Please wait for languages to load or refresh the page."
            buttonText="Refresh Page"
            variant="error"
            onButtonClick={() => window.location.reload()}
          />
        </Card>
      </div>
    );
  }

  const handleConfirm = useCallback(async () => {
    if (!selectedLanguage || !documentId || !sourceDocument) {
      return;
    }

    try {
      await setDocumentLanguage({
        documentId,
        languageId: selectedLanguage,
        schemaType,
        sourceDocument,
        availableLanguages,
      });

      onLanguageSelect(selectedLanguage);
      setSelectedLanguage(null);
    } catch (error) {
      // Error handling is done in the hook
      console.error('Failed to set document language:', error);
    }
  }, [selectedLanguage, documentId, sourceDocument, availableLanguages, schemaType, setDocumentLanguage, onLanguageSelect]);

  const handleCancel = () => {
    setSelectedLanguage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card padding={4} radius={3} shadow={3} style={{ maxWidth: '400px', width: '90%' }}>
        <Stack space={4}>
          <Flex gap={2} justify="space-between" align="center">
            <Text size={3} weight="semibold">
              {title}
            </Text>
            <Button
              mode="bleed"
              icon={CloseIcon}
              onClick={handleCancel}
              padding={2}
              fontSize={1}
            />
          </Flex>

          <Text size={1} muted>
            This document doesn&apos;t have a base language set. Please select the language for this document to continue with translation creation.
          </Text>

          <Stack space={2}>
            {availableLanguages.map((language) => (
              <Button
                key={language.id}
                mode={selectedLanguage === language.id ? 'default' : 'ghost'}
                onClick={() => setSelectedLanguage(language.id)}
                text={`${language.title} (${language.id})`}
                style={{ justifyContent: 'flex-start' }}
              />
            ))}
          </Stack>

          <Flex gap={2} justify="flex-end">
            <Button
              mode="ghost"
              onClick={handleCancel}
              text="Cancel"
            />
            <Button
              mode="default"
              onClick={handleConfirm}
              text={isSettingLanguage ? 'Setting language...' : 'Confirm'}
              disabled={!selectedLanguage || isSettingLanguage || !sourceDocument}
              loading={isSettingLanguage}
            />
          </Flex>
        </Stack>
      </Card>
    </div>
  );
};

export default LanguageSelectionModal;
