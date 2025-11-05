import { Flex, Stack, Text } from '@sanity/ui';
import LocaleFallbackMessage from '../LocaleFallbackMessage';

// this is a little component to show which languages are translated and which are not
const LangsComparison = ({
  langs,
  translations,
}: {
  langs: any
  translations: any
}) => {
  // Show fallback message if no languages are available
  if (!langs || langs.length === 0) {
    return (
      <LocaleFallbackMessage
        title="No Languages Available"
        message="Cannot display language comparison without available languages."
        suggestion="Please wait for languages to load or refresh the page."
        buttonText="Refresh Page"
        variant="warning"
      />
    );
  }

  return (
    <Stack space={2}>
      {langs?.map((lang: any) => {
        const hasTranslation = translations?.some(
          (translation: any) => translation && translation.language === lang.id,
        );
        return (
          <Text key={lang.id} muted={!hasTranslation} size={12}>
            <Flex padding={0} justify="space-between" align="center" gap={2}>
              <span>{lang.id}</span>
              <span style={{ fontSize: '10px' }}>
                {hasTranslation ? '✅' : '❌'}
              </span>
            </Flex>
          </Text>
        );
      })}
    </Stack>
  );
};

export default LangsComparison;
