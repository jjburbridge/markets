import { useDocumentProjection } from '@sanity/sdk-react';
import { Stack } from '@sanity/ui';
import { useCallback, useEffect, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useLanguages } from '../../hooks/useLanguages';
import { DOCUMENT_DETAIL_QUERY } from '../../queries/documentQueries';
import Loading from '../Loading';
import AvailableLanguages from './AvailableLanguages';
import CreateTranslationsCard from './CreateTranslationsCard';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import Header from './Header';
import SetDocumentLanguage from './SetDocumentLanguage';
import TranslationsList from './TranslationsList';

type DocumentDetailData = {
  _id: string
  title: string | null
  language: string | null
  mainImage?: any
  _translationStatus: 'none' | 'partial' | 'fully translated' | null
  _translations: any[]
}

type DocumentDetailProps = {
  selectedPost: any | null;
}

const DocumentDetailContent = ({ selectedPost }: { selectedPost: any }) => {
  const languages = useLanguages();
  const { setSelectedPost, isCreating, setCreationStatus, clearTranslationProgress } = useApp();
  const previousDocumentId = useRef<string | null>(null);

  const handleClose = () => {
    setSelectedPost(null);
  };

  const handleLanguageSet = useCallback((languageId: string) => {
    // Force a refresh of the document data after language is set
    // This will trigger the useDocumentProjection to refetch
    if (selectedPost) {
      setSelectedPost({ ...selectedPost, _updated: Date.now() });
    }
  }, [selectedPost, setSelectedPost]);

  // Clear translation context state only when switching to a different document
  useEffect(() => {
    if (selectedPost) {
      const currentDocumentId = selectedPost._id;

      // Only clear if we're switching to a different document (not the same one)
      if (previousDocumentId.current && previousDocumentId.current !== currentDocumentId) {
        if (!isCreating) {
          setCreationStatus(null);
          clearTranslationProgress();
        }
      }

      // Update the previous document ID
      previousDocumentId.current = currentDocumentId;
    }
  }, [selectedPost?._id, isCreating, setCreationStatus, clearTranslationProgress]);

  const { data, isPending } = useDocumentProjection<DocumentDetailData>({
    ...selectedPost,
    projection: DOCUMENT_DETAIL_QUERY,
  });

  if (isPending) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorState />;
  }

  // Create source document object for the modal
  const sourceDocument = {
    _id: data._id,
    _type: selectedPost.schemaType || 'post',
    title: data.title,
    language: data.language,
  };

  return (
    <Stack space={4} padding={4}>
      <Header
        title={data.title}
        translationStatus={data._translationStatus}
        language={data.language}
        onClose={handleClose}
        languages={languages}
        translations={data._translations}
        documentId={data._id}
        mainImage={data.mainImage}
      />

      {data._translationStatus === 'none' && (
        <SetDocumentLanguage
          documentId={data._id}
          sourceDocument={sourceDocument}
          schemaType={selectedPost.schemaType || 'post'}
          languages={languages}
          onLanguageSet={handleLanguageSet}
        />
      )}
      {/* Only show CreateTranslationsCard if there are missing translations */}
      {(data._translationStatus !== 'none' && data._translations.length < languages.length) || isCreating ? (
        <CreateTranslationsCard
          baseDocumentId={data._id}
          baseLanguage={data.language}
          availableLanguages={languages}
        />
      ) : null}

      {data._translations.length > 0 && (
        <TranslationsList
          translations={data._translations}
          currentLanguage={data.language}
        />
      )}
      <AvailableLanguages
        languages={languages}
        currentLanguage={data.language}
        translations={data._translations}
      />
    </Stack>
  );
};

const DocumentDetail = ({ selectedPost }: DocumentDetailProps) => {
  if (!selectedPost) {
    return <EmptyState />;
  }

  return <DocumentDetailContent selectedPost={selectedPost} />;
};

export default DocumentDetail;
