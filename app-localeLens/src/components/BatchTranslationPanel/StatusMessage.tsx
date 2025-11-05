import { Card, Text } from '@sanity/ui';
import { BatchTranslationStatus, DocumentValidationStatus } from './types';

type StatusMessageProps = {
  invalidDocuments: any[];
  fullyTranslatedDocuments: any[];
  canTranslate: boolean;
  hasWorkToDo: boolean;
  batchTranslationStatus: { message?: string; success?: boolean } | null;
};

const StatusMessage = ({
  invalidDocuments,
  fullyTranslatedDocuments,
  canTranslate,
  hasWorkToDo,
  batchTranslationStatus
}: StatusMessageProps) => {
  const getMessage = () => {
    if (invalidDocuments.length > 0) {
      return "All documents must have a base language set before batch translation can proceed. Click on documents without base languages to configure them.";
    }
    if (!hasWorkToDo && fullyTranslatedDocuments.length > 0) {
      return "All selected documents are already fully translated. No work needed.";
    }
    if (canTranslate && hasWorkToDo) {
      if (fullyTranslatedDocuments.length > 0) {
        return "This will create missing translations for documents that need them. Fully translated documents will be automatically skipped.";
      }
      return "This will create missing translations for all selected documents based on their existing content and available languages.";
    }
    return "Select documents to enable batch translation.";
  };

  return (
    <>
      {batchTranslationStatus && (
        <Card
          padding={3}
          radius={1}
          tone={batchTranslationStatus.success === false ? 'critical' :
                 batchTranslationStatus.success === true ? 'positive' : 'default'}
        >
          <Text size={1}>
            {batchTranslationStatus.message}
          </Text>
        </Card>
      )}

      <Text size={0} muted>
        {getMessage()}
      </Text>
    </>
  );
};

export default StatusMessage;