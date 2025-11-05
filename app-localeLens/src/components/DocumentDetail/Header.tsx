import { CloseIcon } from '@sanity/icons';
import { Box, Button, Flex, Text, Tooltip } from '@sanity/ui';
import SanityImage from '../SanityImage';
import TranslationStatusBadge from '../TranslationStatusBadge';

type PostHeaderProps = {
  title: string | null;
  translationStatus: 'none' | 'partial' | 'fully translated' | null;
  language: string | null;
  mainImage?: any;
  onClose: () => void;
  languages: Array<{ id: string; title: string }>;
  translations: any[];
  documentId: string;
};

const Header = ({
  title,
  translationStatus,
  language,
  mainImage,
  onClose,
  languages,
  translations,
  documentId,
}: PostHeaderProps) => {
  return (

      <Flex gap={2} justify='flex-start' align='flex-start'>
        {/* Main Image */}
        {mainImage && (
          <SanityImage
            image={mainImage}
            alt={title || 'Document image'}
            width={60}
            height={60}
          />
        )}

        {/* Flex wrapper for title and document ID etc*/}
        <Flex gap={1} direction='column' justify="flex-start" align="flex-start" className=' w-full'>
          <Flex gap={1} align="center" justify="space-between" className='w-full' >
            {/* Title */}
            <Text size={3}>
              <strong>{typeof title === 'string' ? title : 'Untitled'}</strong>
            </Text>

            <Button
                mode="bleed"
                icon={CloseIcon}
                onClick={onClose}
                padding={2}
                fontSize={1}
                />
          </Flex>
          <Flex gap={1} align="center" justify="space-between" className='w-full' >
            {/* Translation Status */}
            {language && (
              <Text size={1} muted>
                Language: {language}
              </Text>
            )}
            {/* Translations */}
            {/* Translation Status Badge */}
            {translations.length > 0 && (
              <TranslationStatusBadge
              translationStatus={translationStatus}
              languages={languages}
              translations={translations}
              />
            )}
          </Flex>
          {/* Document ID */}
          <Tooltip
            content={
              <Box padding={2}>
                <Text size={1}>Click to copy document ID</Text>
              </Box>
            }
          >
            <Button
              mode="bleed"
              padding={2}
              fontSize={0}

              className='shadow-md !border !border-gray-200 rounded-md w-full'
              text={`${documentId.startsWith('draft.') ? '📝 ' : ''}ID: ${documentId}`}
              onClick={() => navigator.clipboard.writeText(documentId)}
            />
          </Tooltip>

    </Flex>
  </Flex>
  );
};

export default Header;
