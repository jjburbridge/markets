import { Button, Card, Flex, Spinner, Stack, Text } from '@sanity/ui';
import type { BulkLanguageProgress, DocumentValidationStatus } from './types';

type BulkLanguageCardProps = {
  invalidDocuments: any[];
  isBulkSettingLanguage: boolean;
  defaultLanguage: string | null;
  bulkLanguageProgress: { current: number; total: number; currentDocId?: string; } | null;
  onBulkSetLanguage: () => void;
};

const BulkLanguageCard = ({
  invalidDocuments,
  isBulkSettingLanguage,
  defaultLanguage,
  bulkLanguageProgress,
  onBulkSetLanguage
}: BulkLanguageCardProps) => {
  if (invalidDocuments.length === 0 || isBulkSettingLanguage || !defaultLanguage) return null;

  return (
    <Card padding={3} radius={1} tone="caution">
      <Stack space={3}>
        <Text size={1} weight="medium">
          💡 Bulk Language Setting Available
        </Text>
        <Text size={1}>
          {invalidDocuments.length} document{invalidDocuments.length > 1 ? 's' : ''} missing base language.
          Set them all to <strong>{defaultLanguage}</strong> to enable translation.
        </Text>
        <Button
          tone="primary"
          text={`Set ${invalidDocuments.length} document${invalidDocuments.length > 1 ? 's' : ''} to ${defaultLanguage}`}
          onClick={onBulkSetLanguage}
          disabled={isBulkSettingLanguage}
          size={1}
        />
      </Stack>
    </Card>
  );
};

const BulkLanguageProgress = ({ bulkLanguageProgress }: { bulkLanguageProgress: BulkLanguageProgress }) => (
  <Card padding={3} radius={1} tone="default">
    <Stack space={2}>
      <Flex gap={2} align="center">
        <Spinner size={0} />
        <Text size={1}>
          Setting language for document {bulkLanguageProgress.current} of {bulkLanguageProgress.total}...
        </Text>
      </Flex>
      {bulkLanguageProgress.currentDocId && (
        <Text size={0} muted className="font-mono">
          {bulkLanguageProgress.currentDocId.substring(0, 8)}...
        </Text>
      )}
    </Stack>
  </Card>
);

export { BulkLanguageCard, BulkLanguageProgress };