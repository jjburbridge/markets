import { Card, Stack } from '@sanity/ui';
import { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useBatchProcessState } from '../../hooks/useBatchProcessState';
import { useBatchTranslationsWithProgress } from '../../hooks/useBatchTranslationsWithProgress';
import { useBulkSetDocumentLanguage } from '../../hooks/useBulkSetDocumentLanguage';
import { useLanguages } from '../../hooks/useLanguages';
import ActionButtons from './ActionButtons';
import { BulkLanguageCard, BulkLanguageProgress } from './BulkLanguageCard';
import DocumentsList from './DocumentsList';
import Header from './Header';
import StatusIndicator from './StatusIndicator';
import StatusMessage from './StatusMessage';
import { DocumentTranslationProgress } from './types';

type BatchTranslationPanelProps = Record<string, never>;

const BatchTranslationPanel = (_props: BatchTranslationPanelProps) => {
  const {
    selectedDocuments,
    clearSelection,
    isBatchTranslating,
    batchTranslationStatus,
    setBatchTranslationStatus,
    setIsBatchMode,
    defaultLanguage,
  } = useApp();

  const languages = useLanguages();
  const { batchTranslateDocumentsWithProgress, validateSelectedDocuments, clearBatchStatus } = useBatchTranslationsWithProgress();
  const { bulkSetDocumentLanguage, isBulkSettingLanguage, bulkLanguageProgress } = useBulkSetDocumentLanguage();

  const [validDocuments, setValidDocuments] = useState<any[]>([]);
  const [invalidDocuments, setInvalidDocuments] = useState<any[]>([]);
  const [fullyTranslatedDocuments, setFullyTranslatedDocuments] = useState<any[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState<Record<string, DocumentTranslationProgress>>({});

  const {
    currentState,
  } = useBatchProcessState(validDocuments, invalidDocuments, fullyTranslatedDocuments, isValidating);

  useEffect(() => {
    const validateDocuments = async () => {
      if (selectedDocuments.length === 0) {
        setValidDocuments([]);
        setInvalidDocuments([]);
        setFullyTranslatedDocuments([]);
        return;
      }

      setIsValidating(true);
      try {
        const result = await validateSelectedDocuments(selectedDocuments);
        setValidDocuments(result.validDocuments);
        setInvalidDocuments(result.invalidDocuments);
        setFullyTranslatedDocuments(result.fullyTranslatedDocuments);
      } catch (error) {
        console.error('Failed to validate documents:', error);
        setValidDocuments([]);
        setInvalidDocuments([]);
        setFullyTranslatedDocuments([]);
      } finally {
        setIsValidating(false);
      }
    };

    validateDocuments();
  }, [selectedDocuments, validateSelectedDocuments]);

  const handleBatchTranslate = async () => {
    if (selectedDocuments.length === 0 || invalidDocuments.length > 0) return;

    try {
      if (currentState === 'LOCALES_SET_COMPLETE') {
        setBatchTranslationStatus(null);
      }

      const initialProgress: Record<string, DocumentTranslationProgress> = {};

      validDocuments.forEach(doc => {
        const missingLanguages = languages.filter(lang => lang.id !== doc.language);
        if (missingLanguages.length > 0) {
          initialProgress[doc._id] = {
            translations: missingLanguages.map(lang => ({
              languageId: lang.id,
              languageTitle: lang.title,
              status: 'pending',
            })),
          };
        }
      });

      fullyTranslatedDocuments.forEach(doc => {
        const allLanguages = languages.filter(lang => lang.id !== doc.language);
        initialProgress[doc._id] = {
          translations: allLanguages.map(lang => ({
            languageId: lang.id,
            languageTitle: lang.title,
            status: 'created',
          })),
        };
      });

      setTranslationProgress(initialProgress);

      await batchTranslateDocumentsWithProgress(selectedDocuments, languages, (documentId, progress) => {
        setTranslationProgress(prev => ({
          ...prev,
          [documentId]: progress,
        }));
      });
    } catch (error) {
      console.error('Batch translation failed:', error);
    }
  };

  const handleBulkSetLanguage = async () => {
    if (invalidDocuments.length === 0 || !defaultLanguage) return;

    try {
      const invalidDocumentIds = invalidDocuments.map(doc => doc._id);
      await bulkSetDocumentLanguage({
        documentIds: invalidDocumentIds,
        languageId: defaultLanguage,
        schemaType: 'post',
        availableLanguages: languages,
      });

      setTimeout(() => {
        const validateDocuments = async () => {
          try {
            const result = await validateSelectedDocuments(selectedDocuments);
            setValidDocuments(result.validDocuments);
            setInvalidDocuments(result.invalidDocuments);
            setFullyTranslatedDocuments(result.fullyTranslatedDocuments);

            setBatchTranslationStatus({
              message: 'Document locales have been set! Ready to start batch translation.',
              success: undefined,
            });
          } catch (error) {
            console.error('Failed to re-validate after language setting:', error);
          }
        };
        validateDocuments();
      }, 1000);
    } catch (error) {
      console.error('Bulk language setting failed:', error);
    }
  };

  const handleClose = () => {
    clearSelection();
    clearBatchStatus();
    setTranslationProgress({});
    setIsBatchMode(false);
  };

  const canTranslate = (validDocuments.length > 0 || fullyTranslatedDocuments.length > 0) && invalidDocuments.length === 0 && !isValidating;
  const hasWorkToDo = validDocuments.length > 0;

  if (selectedDocuments.length === 0) {
    return null;
  }

  return (
    <Card padding={4} radius={2} shadow={1} className="border-l-4 border-gray-200 relative">
      <Stack space={4}>
        <Header onClose={handleClose} isBatchTranslating={isBatchTranslating} />

        <Stack space={2}>
          <StatusIndicator
            selectedDocumentsCount={selectedDocuments.length}
            currentState={currentState}
          />
        </Stack>

        <DocumentsList
          selectedDocuments={selectedDocuments}
          validDocuments={validDocuments}
          invalidDocuments={invalidDocuments}
          fullyTranslatedDocuments={fullyTranslatedDocuments}
          isValidating={isValidating}
          translationProgress={translationProgress}
          currentState={currentState}
          languages={languages}
        />

        {bulkLanguageProgress && (
          <BulkLanguageProgress bulkLanguageProgress={bulkLanguageProgress} />
        )}

        <BulkLanguageCard
          invalidDocuments={invalidDocuments}
          isBulkSettingLanguage={isBulkSettingLanguage}
          defaultLanguage={defaultLanguage}
          bulkLanguageProgress={bulkLanguageProgress}
          onBulkSetLanguage={handleBulkSetLanguage}
        />

        <ActionButtons
          currentState={currentState}
          validDocuments={validDocuments}
          invalidDocuments={invalidDocuments}
          fullyTranslatedDocuments={fullyTranslatedDocuments}
          canTranslate={canTranslate}
          hasWorkToDo={hasWorkToDo}
          isBatchTranslating={isBatchTranslating}
          onBatchTranslate={handleBatchTranslate}
        />

        <StatusMessage
          invalidDocuments={invalidDocuments}
          fullyTranslatedDocuments={fullyTranslatedDocuments}
          canTranslate={canTranslate}
          hasWorkToDo={hasWorkToDo}
          batchTranslationStatus={batchTranslationStatus}
        />
      </Stack>
    </Card>
  );
};

export default BatchTranslationPanel;
