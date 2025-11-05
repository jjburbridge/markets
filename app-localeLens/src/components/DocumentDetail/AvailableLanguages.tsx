import { Badge, Card, Flex, Stack, Text } from '@sanity/ui';

type Language = {
  id: string;
  title: string;
};

type Translation = {
  _id: string;
  title: string | null;
  language: string | null;
};

type AvailableLanguagesProps = {
  languages: Language[];
  currentLanguage: string | null;
  translations: Translation[];
};

const AvailableLanguages = ({ languages, currentLanguage, translations }: AvailableLanguagesProps) => {
  return (
    <Card padding={3} border>
      <Stack space={3}>
        <Text size={2} weight="semibold">
          Available Languages
        </Text>
        <Flex gap={2} wrap="wrap">
          {languages.map((lang) => {
            const hasTranslation = translations?.some(
              (t) => t && t.language === lang.id
            );
            const isCurrent = currentLanguage === lang.id;

            return (
              <Badge
                key={lang.id}
                tone={isCurrent ? 'primary' : hasTranslation ? 'positive' : 'caution'}
                radius={4}
                padding={3}
                fontSize={12}
              >
                {lang.title}
              </Badge>
            );
          })}
        </Flex>
      </Stack>
    </Card>
  );
};

export default AvailableLanguages;
