import { Card, Stack, Text } from '@sanity/ui';

const EmptyState = () => {
  return (
    <Card padding={5} tone="primary">
      <Stack space={3}>
        <Text size={2} weight="semibold">
          Select a post to view details
        </Text>
        <Text size={1} muted>
          Click on any post in the list to see its full content and translations.
        </Text>
      </Stack>
    </Card>
  );
};

export default EmptyState;
