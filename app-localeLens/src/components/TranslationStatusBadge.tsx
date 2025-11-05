import { Badge, Tooltip } from '@sanity/ui';
import LangsComparison from './DocumentPrevewItem/LangsComparison';

type TranslationStatusBadgeProps = {
  translationStatus: 'none' | 'partial' | 'fully translated' | null;
  languages: Array<{ id: string; title: string }>;
  translations: any[];
  showPlaceholder?: boolean;
};

const TranslationStatusBadge = ({
  translationStatus,
  languages,
  translations,
  showPlaceholder = false,
}: TranslationStatusBadgeProps) => {
  const tone = translationStatus === 'none'
    ? 'caution'
    : translationStatus === 'partial'
      ? 'default'
      : 'positive';

  const badgeProps = { radius: 2, padding: 2, fontSize: 1 };

  return (
    <>
      {/* If the translation status is none, show a badge with the text "No Document Language Set" */}
      {translationStatus === 'none' && (
        <Badge tone={tone} {...badgeProps}>
          {showPlaceholder ? '...' : 'No Document Language Set'}
          </Badge>
      )}
      {/* otherwise show the show a tooltip with the languages and translations */}
      {translationStatus !== 'none' && (
        <Tooltip
          content={
            <LangsComparison
              langs={languages}
              translations={translations}
            />
          }
        >
          <Badge tone={tone} {...badgeProps}>
            {showPlaceholder ? '...' : translationStatus}
          </Badge>
        </Tooltip>
      )}
    </>
  );
};

export default TranslationStatusBadge;
