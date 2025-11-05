import { Card, Stack, Text } from '@sanity/ui';
import useStudioNavigation from '../../hooks/useStudioNavigation';
import TranslationItem from './TranslationItem';

export type Translation = {
  _id: string;
  title: string;
  language: string;
};

type TranslationsListProps = {
  translations: Translation[];
  currentLanguage?: string | null;
};

const TranslationsList = ({ translations, currentLanguage }: TranslationsListProps) => {
  const { openInStudio } = useStudioNavigation();

  // Filter out null or invalid translations
  const validTranslations = translations.filter((translation) => translation && translation.language);

  return (
    <Card padding={3} border>
      <Stack space={3}>
        <Text size={2} weight="semibold">
          Translations ({validTranslations.length})
        </Text>
        <Stack space={2}>
          {validTranslations.map((translation, index) => (
            <TranslationItem
              key={index}
              translation={translation}
              onOpenInStudio={openInStudio}
              isSelected={translation.language === currentLanguage}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default TranslationsList;
