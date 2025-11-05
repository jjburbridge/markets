import { useApp } from '../contexts/AppContext';
import { useBulkSetDocumentLanguage } from './useBulkSetDocumentLanguage';

// Define comprehensive batch process states
export type BatchProcessState =
  | 'SELECTING'           // User selecting documents
  | 'VALIDATING'          // System validating selected documents
  | 'READY_TO_SET_LOCALES' // Documents selected, some missing locales
  | 'SETTING_LOCALES'     // Actively setting document locales
  | 'LOCALES_SET_COMPLETE' // Locales set, ready to translate
  | 'READY_TO_TRANSLATE'  // Documents ready for translation
  | 'TRANSLATING'         // Actively translating documents
  | 'COMPLETE';           // Process finished

export interface BatchProcessStateInfo {
  currentState: BatchProcessState;
  shouldDisableDocumentSelection: boolean;
  shouldDisableBatchModeToggle: boolean;
  shouldShowTranslatePrompt: boolean;
  isProcessingState: boolean;
  canUserInteract: boolean;
}

export const useBatchProcessState = (
  validDocuments: any[] = [],
  invalidDocuments: any[] = [],
  fullyTranslatedDocuments: any[] = [],
  isValidating: boolean = false
): BatchProcessStateInfo => {
  const {
    selectedDocuments,
    isBatchTranslating,
    batchTranslationStatus
  } = useApp();

  const { isBulkSettingLanguage } = useBulkSetDocumentLanguage();

  // Compute the current batch process state
  const getBatchProcessState = (): BatchProcessState => {
    if (selectedDocuments.length === 0) return 'SELECTING';
    if (isValidating) return 'VALIDATING';
    if (isBulkSettingLanguage) return 'SETTING_LOCALES';
    if (isBatchTranslating) return 'TRANSLATING';

    // Check for completion states
    if (batchTranslationStatus?.success === true || batchTranslationStatus?.success === false) {
      return 'COMPLETE';
    }

    // Check for locales just set (success undefined is our special flag)
    if (batchTranslationStatus?.success === undefined && batchTranslationStatus?.message?.includes('locales have been set')) {
      return 'LOCALES_SET_COMPLETE';
    }

    // After validation, determine what state we're in
    if (invalidDocuments.length > 0 && validDocuments.length === 0 && fullyTranslatedDocuments.length === 0) {
      return 'READY_TO_SET_LOCALES';
    }
    if (invalidDocuments.length > 0) {
      return 'READY_TO_SET_LOCALES';
    }
    if (validDocuments.length > 0 || fullyTranslatedDocuments.length > 0) {
      return 'READY_TO_TRANSLATE';
    }

    return 'SELECTING';
  };

  const currentState = getBatchProcessState();

  // Determine what actions should be disabled based on current state
  const shouldDisableDocumentSelection = [
    'VALIDATING',
    'READY_TO_SET_LOCALES',
    'SETTING_LOCALES',
    'LOCALES_SET_COMPLETE',
    'READY_TO_TRANSLATE',
    'TRANSLATING'
  ].includes(currentState);

  const shouldDisableBatchModeToggle = [
    'VALIDATING',
    'READY_TO_SET_LOCALES',
    'SETTING_LOCALES',
    'LOCALES_SET_COMPLETE',
    'READY_TO_TRANSLATE',
    'TRANSLATING'
  ].includes(currentState);

  const shouldShowTranslatePrompt = currentState === 'LOCALES_SET_COMPLETE';

  const isProcessingState = ['VALIDATING', 'SETTING_LOCALES', 'TRANSLATING'].includes(currentState);

  const canUserInteract = currentState === 'SELECTING' || currentState === 'COMPLETE';

  return {
    currentState,
    shouldDisableDocumentSelection,
    shouldDisableBatchModeToggle,
    shouldShowTranslatePrompt,
    isProcessingState,
    canUserInteract
  };
};