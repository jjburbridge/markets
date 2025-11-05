import { Button, Flex, Spinner } from '@sanity/ui';
import { BatchProcessState } from './types';

type ActionButtonsProps = {
  currentState: BatchProcessState;
  validDocuments: any[];
  invalidDocuments: any[];
  fullyTranslatedDocuments: any[];
  canTranslate: boolean;
  hasWorkToDo: boolean;
  isBatchTranslating: boolean;
  onBatchTranslate: () => void;
};

const ActionButtons = ({
  currentState,
  validDocuments,
  invalidDocuments,
  fullyTranslatedDocuments,
  canTranslate,
  hasWorkToDo,
  isBatchTranslating,
  onBatchTranslate,
}: ActionButtonsProps) => {
  const getButtonText = () => {
    if (currentState === 'LOCALES_SET_COMPLETE') {
      return "🚀 Start Batch Translation";
    }
    if (invalidDocuments.length > 0) {
      return `Fix ${invalidDocuments.length} document${invalidDocuments.length > 1 ? 's' : ''} first`;
    }
    if (!hasWorkToDo && fullyTranslatedDocuments.length > 0) {
      return "All documents fully translated";
    }
    if (validDocuments.length > 0 && fullyTranslatedDocuments.length > 0) {
      return `Translate ${validDocuments.length}, skip ${fullyTranslatedDocuments.length}`;
    }
    return "Bulk Auto Translate";
  };

  const getButtonTone = (): "default" | "primary" | "positive" => {
    if (currentState === 'LOCALES_SET_COMPLETE') return "positive";
    if (canTranslate && hasWorkToDo) return "primary";
    return "default";
  };

  const getButtonClassName = () => {
    const baseClass = 'flex-1';
    const pulseClass = currentState === 'LOCALES_SET_COMPLETE' ? 'animate-pulse' : '';
    return `${baseClass} ${pulseClass}`.trim();
  };

  return (
    <Flex gap={2} align="center" className='relative'>
      <Button
        tone={getButtonTone()}
        text={getButtonText()}
        onClick={onBatchTranslate}
        disabled={!canTranslate || !hasWorkToDo || isBatchTranslating}
        className={getButtonClassName()}
      />
      {isBatchTranslating && <Spinner size={1} className='!absolute !right-1/2 !-translate-x-1/2'/>}
    </Flex>
  );
};

export default ActionButtons;
