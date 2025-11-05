import { Button, Flex, Text } from '@sanity/ui';

type HeaderProps = {
  onClose: () => void;
  isBatchTranslating: boolean;
};

const Header = ({ onClose, isBatchTranslating }: HeaderProps) => {
  return (
    <Flex justify="space-between" align="center">
      <Text size={2} weight="semibold">
        Batch Translation
      </Text>
      <Button
        mode="bleed"
        tone="default"
        text="Close"
        onClick={onClose}
        disabled={isBatchTranslating}
      />
    </Flex>
  );
};

export default Header;