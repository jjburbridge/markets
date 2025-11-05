import { LaunchIcon } from '@sanity/icons';
import { Badge, Box, Button, Card, Flex, Stack, Text, Tooltip } from '@sanity/ui';
import SanityImage from '../SanityImage';

// Custom CSS for rainbow gradient animation
const rainbowStyles = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    100% { background-position: 400% 50%; }
  }
`;

type TranslationItemProps = {
  translation: {
    language: string;
    title: string;
    _id: string;
    mainImage?: any;
  };
  onOpenInStudio: (documentId: string) => void;
  isSelected?: boolean;
};

const TranslationItem = ({ translation, onOpenInStudio, isSelected = false }: TranslationItemProps) => {
  return (
    <>
      <style>{rainbowStyles}</style>
      <Card
        border
        radius={2}
        tone={isSelected ?  'transparent' : 'default'}
        className={`${isSelected && '!border-slate-400 shadow-sm'}`}

      >
      <Stack space={2} padding={3} className='bg-transparent'>
        <Flex gap={2} justify="space-between" align="center">
          <Flex gap={2} align="center" style={{ flex: 1, minWidth: 0 }}>
          <SanityImage
              image={translation.mainImage}
              alt={translation.title || 'Translation image'}
              width={40}
              height={40}
            />
            <Badge
              tone="primary"
              radius={4}
              padding={2}
              fontSize={1}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'hover:bg-gray-100 hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
              }`}
            >
              {translation.language}
            </Badge>
            <Text
              size={1}
              weight="semibold"
              onClick={() => onOpenInStudio(translation._id)}
              className="cursor-pointer hover:bg-gray-50/50 transition-all duration-200 hover:shadow-[0_2px_0_0_rgba(59,130,246,0.5)]"
            >
              {translation.title || 'Untitled'}
            </Text>

          </Flex>

          <Tooltip
            className="cursor-pointer"
            content={
              <Box padding={1}>
                <Text muted size={1}>
                  {translation._id.includes('drafts') ? 'Draft' : 'Published'}
                </Text>
              </Box>
            }
        >
          <span className={`w-1.5 h-1.5 flex rounded-full ${translation._id.includes('drafts') ? 'bg-[var(--card-badge-caution-dot-color)]' : 'bg-[var(--card-badge-positive-dot-color)]'}`} />
        </Tooltip>

          <Button
            mode="bleed"
            icon={LaunchIcon}
            onClick={() => onOpenInStudio(translation._id)}
            padding={2}
            fontSize={0}
            title="Open in Studio"
            className="cursor-pointer hover:bg-gray-50/50 transition-all duration-200 hover:shadow-[0_2px_0_0_rgba(59,130,246,0.5)]"
          />
        </Flex>
      </Stack>
      </Card>
    </>
  );
};

export default TranslationItem;
