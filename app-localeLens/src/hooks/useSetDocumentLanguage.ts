import { useClient } from "@sanity/sdk-react";
import { useToast } from "@sanity/ui";
import { uuid } from "@sanity/uuid";
import { useCallback, useState } from "react";
import { getPublishedId } from "sanity";

type SetDocumentLanguageParams = {
  documentId: string;
  languageId: string;
  schemaType?: string;
  sourceDocument: any;
  availableLanguages: Array<{ id: string; title: string }>;
};
const projectId = process.env.SANITY_APP_PROJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;

export const useSetDocumentLanguage = () => {
  const client = useClient({
    projectId,
    dataset,
    apiVersion: "vX",
  });

  const toast = useToast();
  const [isSettingLanguage, setIsSettingLanguage] = useState(false);

  const setDocumentLanguage = useCallback(
    async ({
      documentId: docId,
      languageId,
      schemaType = "post",
      sourceDocument,
      availableLanguages,
    }: SetDocumentLanguageParams): Promise<void> => {
      if (!docId || !languageId || !sourceDocument) {
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

      console.log("🌍 Setting document language:", {
        documentId: docId,
        languageId,
        language: language.title,
      });
      setIsSettingLanguage(true);

      try {
        // 1. Set the language field on the source document using client.patch
        // Note: We'll use client.patch for now since useEditDocument requires component-level usage
        await client.patch(docId).set({ language: languageId }).commit();

        // 2. Create the metadata document
        const metadataId = uuid();
        const sourceReference = {
          _key: languageId,
          value: {
            _ref: getPublishedId(docId),
            _type: "internationalizedArrayReferenceValue",
            _weak: docId === getPublishedId(docId) ? false : true,
          },
        };

        const metadataDocument = {
          _id: metadataId,
          _type: "translation.metadata",
          schemaTypes: [schemaType],
          translations: [sourceReference],
        };

        console.log("metadataDocument", metadataDocument);
        // 3. Create metadata document using client.create
        await client.create(metadataDocument);

        console.log("✅ Document language set successfully");

        if (docId !== getPublishedId(docId)) {
          await client.action({
            actionType: "sanity.action.document.publish",
            draftId: docId,
            publishedId: getPublishedId(docId),
          });
        }

        toast.push({
          title: `Set document language to ${language.title}`,
          status: "success",
          description: "Created translation metadata",
        });
      } catch (error) {
        console.error("❌ Failed to set document language:", error);

        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        toast.push({
          title: `Failed to set document language to ${language.title}`,
          status: "error",
          description: errorMessage,
        });

        throw error;
      } finally {
        setIsSettingLanguage(false);
      }
    },
    [client, toast]
  );

  return {
    setDocumentLanguage,
    isSettingLanguage,
  };
};
