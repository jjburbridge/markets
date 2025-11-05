import { useClient } from "@sanity/sdk-react";
import { useCallback } from "react";
import { getPublishedId } from "sanity";
import { useApp } from "../contexts/AppContext";
import { createReference } from "../ultils/createReference";

type AvailableLanguage = {
  id: string;
  title: string;
};

type BatchTranslationDoc = {
  _id: string;
  language: string | null;
  _type: string;
  title?: string;
  _translationStatus?: string;
};

type TranslationProgressCallback = (
  documentId: string,
  progress: {
    translations: Array<{
      languageId: string;
      languageTitle: string;
      status: "pending" | "creating" | "created" | "failed";
      translatedDocumentId?: string;
    }>;
    currentlyTranslating?: string;
  }
) => void;

const projectId = process.env.SANITY_APP_PROJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;


export const useBatchTranslationsWithProgress = () => {
  const client = useClient({
    projectId,
    dataset,
    apiVersion: "vX",
  });

  const {
    isBatchTranslating,
    setIsBatchTranslating,
    batchTranslationStatus,
    setBatchTranslationStatus,
    selectedDocuments,
    clearSelection,
  } = useApp();

  // Function to validate selected documents and categorize them
  const validateSelectedDocuments = useCallback(
    async (
      documentIds: string[]
    ): Promise<{
      validDocuments: BatchTranslationDoc[];
      invalidDocuments: BatchTranslationDoc[];
      fullyTranslatedDocuments: BatchTranslationDoc[];
    }> => {
      if (!documentIds.length) {
        return {
          validDocuments: [],
          invalidDocuments: [],
          fullyTranslatedDocuments: [],
        };
      }

      const documents = await client.fetch(
        `
      *[_id in $documentIds] {
        _id,
        _type,
        title,
        language,
        "hasMetadata": defined(*[_type == "translation.metadata" && references(^._id)][0]),
        "_translationStatus": select(
          count(*[
            _type == "translation.metadata"
            && references(^._id)
          ].translations[].value) == 0 => "none",
          count(*[
            _type == "translation.metadata"
            && references(^._id)
          ].translations[].value) == count(*[_type == "locale"]) => "fully translated",
          true => "partial"
        )
      }
    `,
        { documentIds }
      );

      const invalidDocuments = documents.filter(
        (
          doc: BatchTranslationDoc & {
            hasMetadata: boolean;
            _translationStatus: string;
          }
        ) => !doc.language || !doc.hasMetadata
      );

      const fullyTranslatedDocuments = documents.filter(
        (
          doc: BatchTranslationDoc & {
            hasMetadata: boolean;
            _translationStatus: string;
          }
        ) =>
          doc.language &&
          doc.hasMetadata &&
          doc._translationStatus === "fully translated"
      );

      const validDocuments = documents.filter(
        (
          doc: BatchTranslationDoc & {
            hasMetadata: boolean;
            _translationStatus: string;
          }
        ) =>
          doc.language &&
          doc.hasMetadata &&
          doc._translationStatus !== "fully translated"
      );

      return { validDocuments, invalidDocuments, fullyTranslatedDocuments };
    },
    [client]
  );

  const batchTranslateDocumentsWithProgress = useCallback(
    async (
      documentIds: string[],
      availableLanguages: AvailableLanguage[],
      onProgress: TranslationProgressCallback
    ): Promise<void> => {
      if (!documentIds.length) {
        setBatchTranslationStatus({
          message: "No documents selected for translation",
        });
        return;
      }

      setIsBatchTranslating(true);
      setBatchTranslationStatus({ message: "Starting batch translation..." });

      try {
        // Validate and categorize documents
        const { validDocuments, invalidDocuments, fullyTranslatedDocuments } =
          await validateSelectedDocuments(documentIds);

        if (!validDocuments.length && !fullyTranslatedDocuments.length) {
          setIsBatchTranslating(false);
          setBatchTranslationStatus({
            success: false,
            message: "No valid documents found for translation",
          });
          return;
        }

        const statusMessages = [];

        if (invalidDocuments.length > 0) {
          const invalidTitles = invalidDocuments
            .map((doc) => doc.title || "Untitled")
            .join(", ");
          statusMessages.push(
            `Skipping ${invalidDocuments.length} documents without language/metadata: ${invalidTitles}`
          );
        }

        if (fullyTranslatedDocuments.length > 0) {
          const fullyTranslatedTitles = fullyTranslatedDocuments
            .map((doc) => doc.title || "Untitled")
            .join(", ");
          statusMessages.push(
            `Skipping ${fullyTranslatedDocuments.length} fully translated documents: ${fullyTranslatedTitles}`
          );
        }

        if (statusMessages.length > 0) {
          setBatchTranslationStatus({ message: statusMessages.join(". ") });
        }

        if (!validDocuments.length) {
          setIsBatchTranslating(false);
          setBatchTranslationStatus({
            success: false,
            message:
              "No documents need translation. All selected documents are either fully translated or missing language configuration.",
          });
          return;
        }

        setBatchTranslationStatus({
          message: `Processing ${validDocuments.length} documents for batch translation...`,
        });

        let totalSuccessful = 0;
        let totalFailed = 0;
        const BATCH_SIZE = 2; // Conservative batch size to avoid rate limiting

        // Process documents in batches
        for (
          let batchStart = 0;
          batchStart < validDocuments.length;
          batchStart += BATCH_SIZE
        ) {
          const batchEnd = Math.min(
            batchStart + BATCH_SIZE,
            validDocuments.length
          );
          const currentBatch = validDocuments.slice(batchStart, batchEnd);

          setBatchTranslationStatus({
            message: `Processing batch ${Math.floor(batchStart / BATCH_SIZE) + 1} of ${Math.ceil(validDocuments.length / BATCH_SIZE)}...`,
          });

          // Process each document in the current batch
          for (const document of currentBatch) {
            try {
              const success = await processDocumentTranslationsWithProgress(
                document._id,
                document.language,
                availableLanguages,
                client,
                onProgress
              );
              if (success) {
                totalSuccessful++;
              } else {
                totalFailed++;
              }
            } catch (error) {
              console.error(
                `Failed to process document ${document._id}:`,
                error
              );
              totalFailed++;
            }
          }

          // Add delay between batches to avoid rate limiting
          if (batchEnd < validDocuments.length) {
            setBatchTranslationStatus({
              message: `Waiting 2 seconds before next batch...`,
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }

        // Final status
        setIsBatchTranslating(false);
        if (totalFailed === 0) {
          setBatchTranslationStatus({
            success: true,
            message: `Batch translation completed! ${totalSuccessful} documents processed successfully.`,
          });
        } else {
          setBatchTranslationStatus({
            success: false,
            message: `Batch translation completed with errors. ${totalSuccessful} successful, ${totalFailed} failed.`,
          });
        }
      } catch (error) {
        setIsBatchTranslating(false);
        setBatchTranslationStatus({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred during batch translation",
        });
        throw error;
      }
    },
    [
      client,
      setIsBatchTranslating,
      setBatchTranslationStatus,
      clearSelection,
      validateSelectedDocuments,
    ]
  );

  return {
    batchTranslateDocumentsWithProgress,
    validateSelectedDocuments,
    isBatchTranslating,
    batchTranslationStatus,
    clearBatchStatus: () => setBatchTranslationStatus(null),
  };
};

// Helper function to process translations for a single document with progress tracking
async function processDocumentTranslationsWithProgress(
  baseDocumentId: string,
  baseLanguage: string,
  availableLanguages: AvailableLanguage[],
  client: any,
  onProgress: TranslationProgressCallback
): Promise<boolean> {
  try {
    // Get the existing translation metadata document
    const existingMetadata = await client.fetch(
      `
      *[_type == "translation.metadata" && references($documentId)][0] {
        _id,
        translations
      }
    `,
      { documentId: baseDocumentId }
    );

    if (!existingMetadata) {
      console.warn(
        `No translation metadata found for document ${baseDocumentId}`
      );
      return false;
    }

    // Create missing locales array by filtering out languages that already exist in metadata
    const existingLanguageKeys = existingMetadata.translations.map(
      (translation: any) => translation._key
    );
    const missingLocales = availableLanguages.filter(
      (locale) => !existingLanguageKeys.includes(locale.id)
    );

    // Check if there are any missing locales to translate
    if (missingLocales.length === 0) {
      return true; // No translations needed - consider this success
    }

    // Initialize progress tracking for this document
    const initialProgress = {
      translations: missingLocales.map((locale) => ({
        languageId: locale.id,
        languageTitle: locale.title,
        status: "pending" as const,
      })),
    };
    onProgress(baseDocumentId, initialProgress);

    // Create translations for missing locales
    for (const locale of missingLocales) {
      if (!locale.id || !locale.title) {
        continue;
      }

      try {
        // Update progress to show currently translating
        onProgress(baseDocumentId, {
          translations: initialProgress.translations.map((t) =>
            t.languageId === locale.id
              ? { ...t, status: "creating" as const }
              : t
          ),
          currentlyTranslating: locale.title,
        });

        const result = await client.agent.action.translate({
          schemaId: "_.schemas.global",
          documentId: baseDocumentId,
          languageFieldPath: "language",
          targetDocument: { operation: "create" },
          fromLanguage: { id: baseLanguage, title: baseLanguage },
          toLanguage: { id: locale.id, title: locale.title },
        });

        // Extract the created document ID from the result
        if (result) {
          const transaction = client.transaction();

          const sourceReference = createReference(
            baseLanguage,
            baseDocumentId,
            "post",
            true
          );

          const newTranslationReference = createReference(
            locale.id,
            getPublishedId(result._id),
            "post",
            true
          );

          // Update the translated document's slug to include locale extension
          if (result?.slug?.current && locale.id !== baseLanguage) {
            const originalSlug = result.slug.current;
            const localizedSlug = `${originalSlug}-${locale.id}`;

            const slugPatch = client
              .patch(result._id)
              .set({
                "slug.current": localizedSlug,
              })
              .unset(["audioSummary"]);
            transaction.patch(slugPatch);
          }

          // Patch translation to metadata document
          const metadataPatch = client
            .patch(existingMetadata._id)
            .setIfMissing({ translations: [sourceReference] })
            .insert(`after`, `translations[-1]`, [newTranslationReference]);
          transaction.patch(metadataPatch);

          await transaction.commit();

          // pass in the draft id to get the published id
          const publishedId = getPublishedId(result._id);

          await client.action({
            actionType: "sanity.action.document.publish",
            draftId: result._id,
            publishedId: publishedId,
          });

          // Update progress to show created
          onProgress(baseDocumentId, {
            translations: initialProgress.translations.map((t) =>
              t.languageId === locale.id
                ? {
                    ...t,
                    status: "created" as const,
                    translatedDocumentId: result._id,
                  }
                : t
            ),
          });
        }
      } catch (error) {
        console.error(
          `Failed to create translation for ${locale.title} (${locale.id}) on document ${baseDocumentId}:`,
          error
        );

        // Update progress to show failed
        onProgress(baseDocumentId, {
          translations: initialProgress.translations.map((t) =>
            t.languageId === locale.id ? { ...t, status: "failed" as const } : t
          ),
        });

        throw error;
      }
    }

    return true;
  } catch (error) {
    console.error(`Failed to process document ${baseDocumentId}:`, error);
    return false;
  }
}
