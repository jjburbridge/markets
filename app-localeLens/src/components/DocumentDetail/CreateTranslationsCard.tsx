import { SparklesIcon } from '@sanity/icons';
import { Button, Card, Flex, Stack, Text } from '@sanity/ui';
import { useEffect } from 'react';
import { useCreateMissingTranslations } from '../../hooks';

type CreateTranslationsCardProps = {
  baseDocumentId?: string;
  baseLanguage?: string | null;
  availableLanguages: Array<{ id: string; title: string }>;
};

const CreateTranslationsCard = ({
  baseDocumentId,
  baseLanguage,
  availableLanguages,
}: CreateTranslationsCardProps) => {
  // Use the new hook for translation creation
  const {
    createMissingTranslations,
    isCreating,
    creationStatus,
    clearCreationStatus,
  } = useCreateMissingTranslations();

  // Clear status when component unmounts
  useEffect(() => {
    return () => {
      clearCreationStatus();
    };
  }, [clearCreationStatus]);

  const handleCreateTranslations = async () => {
    if (!baseDocumentId || !availableLanguages.length) {
      return;
    }

    // If baseLanguage is null, show the modal
    if (baseLanguage == null) {
      return;
    }

    // Otherwise proceed with translation creation
    await createTranslations(baseLanguage);
  };

  const createTranslations = async (selectedBaseLanguage: string) => {
    try {
      await createMissingTranslations(
        baseDocumentId,
        selectedBaseLanguage,
        availableLanguages,
      );

      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        clearCreationStatus();
      }, 3000);
    } catch (error) {
      // Auto-clear error message after 5 seconds
      setTimeout(() => {
        clearCreationStatus();
      }, 5000);
    }
  };


  return (
    <Card padding={4} border tone="primary">
      <Stack space={3}>
        <Flex gap={2} align="center">
          <SparklesIcon />
          <Text size={2} weight="semibold">
            Missing translations
          </Text>
        </Flex>
        <Text size={1} muted>
          Use AI to create and translate your missing locales.
        </Text>

        {creationStatus && !isCreating && (
          <Card
            padding={3}
            tone={creationStatus.success ? 'positive' : 'critical'}
            border
          >
            <Stack space={2}>
              <Text size={1}>
                {creationStatus.message}
              </Text>
              <Flex gap={2}>
                {!creationStatus.success ? (
                  <Button
                    mode="ghost"
                    tone="critical"
                    text="Retry"
                    onClick={() => {
                      if (baseLanguage) {
                        createTranslations(baseLanguage);
                      }
                    }}
                    disabled={isCreating}
                  />
                ) : (
                  <Button
                    mode="ghost"
                    tone="primary"
                    text="Clear"
                    onClick={clearCreationStatus}
                    disabled={isCreating}
                  />
                )}
              </Flex>
            </Stack>
          </Card>
        )}

        <Button
          mode="ghost"
          icon={SparklesIcon}
          onClick={handleCreateTranslations}
          text={isCreating ? 'Creating...' : 'Create missing translations with AI'}
          tone="primary"
          disabled={!baseDocumentId || !availableLanguages.length || isCreating}
          loading={isCreating}
        />
      </Stack>
    </Card>
  );
};

export default CreateTranslationsCard;
