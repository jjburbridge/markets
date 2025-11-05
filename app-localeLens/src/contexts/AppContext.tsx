import { DocumentHandle } from '@sanity/sdk';
import React, {
  createContext,
  ReactNode,
  startTransition,
  useContext,
  useState,
} from 'react';

type Status =
  | 'all'
  | 'untranslated'
  | 'partially-translated'
  | 'fully-translated'

type LanguageData = {
  id: string
  title: string
}

type TranslationProgress = {
  current: number;
  total: number;
  status: 'creating' | 'created' | 'skipped';
  subProgress?: number; // 0-1 representing progress within current translation
} | null;

type AppContextType = {
  defaultLanguage: string | null
  setDefaultLanguage: (language: string | null) => void
  selectedType: DocumentHandle | null
  updateSelectedType: (handle: DocumentHandle | null) => void
  status: Status | null
  setStatus: (status: Status | null) => void
  languages: LanguageData[]
  setLanguages: (languages: LanguageData[]) => void
  getLanguages: (client: any) => Promise<LanguageData[]>
  selectedPost: any | null
  setSelectedPost: (post: any | null) => void
  translationProgress: TranslationProgress;
  setTranslationProgress: (progress: TranslationProgress) => void;
  clearTranslationProgress: () => void;
  clearCreationStatus: () => void;
  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
  creationStatus: { success?: boolean; message?: string } | null;
  setCreationStatus: (status: { success?: boolean; message?: string } | null) => void;
  // Add document ID tracking for translations
  translationDocumentId: string | null;
  setTranslationDocumentId: (id: string | null) => void;
  // Batch translation functionality
  selectedDocuments: string[];
  setSelectedDocuments: (documents: string[]) => void;
  toggleDocumentSelection: (documentId: string) => void;
  clearSelection: () => void;
  isBatchMode: boolean;
  setIsBatchMode: (mode: boolean) => void;
  isBatchTranslating: boolean;
  setIsBatchTranslating: (translating: boolean) => void;
  batchTranslationStatus: { message?: string; success?: boolean } | null;
  setBatchTranslationStatus: (status: { message?: string; success?: boolean } | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode
  config: any
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  config,
  children,
}) => {
  const getLanguages = async (client: any): Promise<LanguageData[]> => {
    if (Array.isArray(config.supportedLanguages)) {
      return config.supportedLanguages;
    }
    if (typeof config.supportedLanguages === 'function') {
      return await config.supportedLanguages(client);
    }
    // Fallback for query-based approach

    const data = await client.fetch(config.supportedLanguages);
    return data;
  };

  const [selectedType, setSelectedType] = useState<DocumentHandle | null>(null);
  const updateSelectedType = (handle: DocumentHandle | null) =>
    startTransition(() => setSelectedType(handle));

  const [defaultLanguage, setDefaultLanguage] = useState<string | null>(
    config.defaultLanguage || null,
  );
  const [status, setStatus] = useState<Status | null>('all');
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [translationProgress, setTranslationProgress] = useState<TranslationProgress>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [creationStatus, setCreationStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [translationDocumentId, setTranslationDocumentId] = useState<string | null>(null);

  // Batch translation state
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [isBatchTranslating, setIsBatchTranslating] = useState(false);
  const [batchTranslationStatus, setBatchTranslationStatus] = useState<{ message?: string; success?: boolean } | null>(null);

  const clearTranslationProgress = () => {
    setTranslationProgress(null);
  };

  const clearCreationStatus = () => {
    setCreationStatus(null);
  };

  // Batch selection helper functions
  const toggleDocumentSelection = (documentId: string) => {
    setSelectedDocuments(prev =>
      prev.includes(documentId)
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const clearSelection = () => {
    setSelectedDocuments([]);
  };

  const value: AppContextType = {
    defaultLanguage,
    setDefaultLanguage,
    selectedType,
    updateSelectedType,
    status,
    setStatus,
    languages,
    setLanguages,
    getLanguages,
    selectedPost,
    setSelectedPost,
    translationProgress,
    setTranslationProgress,
    clearTranslationProgress,
    clearCreationStatus,
    isCreating,
    setIsCreating,
    creationStatus,
    setCreationStatus,
    translationDocumentId,
    setTranslationDocumentId,
    // Batch translation properties
    selectedDocuments,
    setSelectedDocuments,
    toggleDocumentSelection,
    clearSelection,
    isBatchMode,
    setIsBatchMode,
    isBatchTranslating,
    setIsBatchTranslating,
    batchTranslationStatus,
    setBatchTranslationStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
};
