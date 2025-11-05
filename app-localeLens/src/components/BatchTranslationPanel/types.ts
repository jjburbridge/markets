export type DocumentValidationStatus = {
  _id: string;
  _type: string;
  title?: string;
  language: string | null;
  hasMetadata: boolean;
  _translationStatus?: string;
};

export type TranslationStatus = {
  languageId: string;
  languageTitle: string;
  status: 'pending' | 'creating' | 'created' | 'failed';
  translatedDocumentId?: string;
};

export type DocumentTranslationProgress = {
  translations: TranslationStatus[];
  currentlyTranslating?: string;
};

export type BatchProcessState =
  | 'SELECTING'
  | 'VALIDATING'
  | 'READY_TO_SET_LOCALES'
  | 'SETTING_LOCALES'
  | 'LOCALES_SET_COMPLETE'
  | 'READY_TO_TRANSLATE'
  | 'TRANSLATING'
  | 'COMPLETE';

export type Language = {
  id: string;
  title: string;
};

export type BulkLanguageProgress = {
  current: number;
  total: number;
  currentDocId?: string;
};

export type BatchTranslationStatus = {
  message?: string;
  success?: boolean;
};