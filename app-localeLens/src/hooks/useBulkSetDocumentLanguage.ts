import { useClient } from "@sanity/sdk-react";
import { useToast } from "@sanity/ui";
import { uuid } from "@sanity/uuid";
import { useCallback, useState } from "react";
import { getPublishedId } from "sanity";

type BulkSetDocumentLanguageParams = {
  documentIds: string[];
  languageId: string;
  schemaType?: string;
  availableLanguages: Array<{ id: string; title: string }>;
};

const projectId = process.env.SANITY_APP_PROJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;

export const useBulkSetDocumentLanguage = () => {
  const client = useClient({
    projectId,
    dataset,
    apiVersion: "vX",
  });

  const toast = useToast();
  const [isBulkSettingLanguage, setIsBulkSettingLanguage] = useState(false);
  const [bulkLanguageProgress, setBulkLanguageProgress] = useState<{
    current: number;
    total: number;
    currentDocId?: string;
  } | null>(null);

  const bulkSetDocumentLanguage = useCallback(
    async ({
      documentIds,
      languageId,
      schemaType = "post",
      availableLanguages,
    }: BulkSetDocumentLanguageParams): Promise<void> => {
      if (!documentIds.length || !languageId) {
        throw new Error("Missing required parameters");
      }

      const language = availableLanguages.find(
        (lang) => lang.id === languageId
      );
      if (!language) {
        throw new Error(
          `Language ${languageId} not found in available languages`
        );
      }

      console.log("🌍 Bulk setting document language:", {
        documentCount: documentIds.length,
        languageId,
        language: language.title,
      });

      setIsBulkSettingLanguage(true);
      setBulkLanguageProgress({ current: 0, total: documentIds.length });

      let successCount = 0;
      let errorCount = 0;
      const errors: string[] = [];

      try {
        for (let i = 0; i < documentIds.length; i++) {
          const docId = documentIds[i];

          setBulkLanguageProgress({
            current: i + 1,
            total: documentIds.length,
            currentDocId: docId,
          });

          try {
            // 1. Check if document already has language set
            const existingDoc = await client.fetch(
              `*[_id == $docId][0]{ _id, language }`,
              { docId }
            );

            if (existingDoc?.language) {
              console.log(
                `⏭️  Skipping ${docId} - already has language: ${existingDoc.language}`
              );
              continue;
            }

            // 2. Set the language field on the document
            await client.patch(docId).set({ language: languageId }).commit();

            // 3. Create the metadata document
            const metadataId = uuid();
            const sourceReference = {
              _key: languageId,
              value: {
                _ref: getPublishedId(docId),
                _type: "internationalizedArrayReferenceValue",
              },
            };

            const metadataDocument = {
              _id: metadataId,
              _type: "translation.metadata",
              schemaTypes: [schemaType],
              translations: [sourceReference],
            };

            // 4. Create metadata document
            await client.create(metadataDocument);

            await client.action({
              actionType: "sanity.action.document.publish",
              draftId: docId,
              publishedId: getPublishedId(docId),
            });

            successCount++;
            console.log(
              `✅ Set language for document ${i + 1}/${documentIds.length}: ${docId}`
            );
          } catch (error) {
            errorCount++;
            const errorMsg =
              error instanceof Error ? error.message : "Unknown error";
            errors.push(`${docId}: ${errorMsg}`);
            console.error(`❌ Failed to set language for ${docId}:`, error);
          }
        }

        // Final results
        const message =
          errorCount === 0
            ? `Successfully set language to ${language.title} for ${successCount} documents`
            : `Completed with ${successCount} successes and ${errorCount} errors`;

        toast.push({
          title: `Bulk Language Setting Complete`,
          status: errorCount === 0 ? "success" : "warning",
          description: message,
        });

        if (errors.length > 0) {
          console.warn("Bulk language setting errors:", errors);
        }
      } catch (error) {
        console.error("❌ Bulk language setting failed:", error);

        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        toast.push({
          title: `Failed to bulk set document language`,
          status: "error",
          description: errorMessage,
        });

        throw error;
      } finally {
        setIsBulkSettingLanguage(false);
        setBulkLanguageProgress(null);
      }
    },
    [client, toast]
  );

  return {
    bulkSetDocumentLanguage,
    isBulkSettingLanguage,
    bulkLanguageProgress,
  };
};
