import { getPublishedId } from "@sanity/id-utils";
import { useClient } from "@sanity/sdk-react";
import { useCallback } from "react";
import { useApp } from "../contexts/AppContext";
import { createReference } from "../ultils/createReference";

type AvailableLanguage = {
  id: string;
  title: string;
};

type _CreationStatus = {
  success?: boolean;
  message?: string;
} | null;

type _TranslationProgress = {
  current: number;
  total: number;
  status: "creating" | "created" | "skipped";
  subProgress?: number; // 0-1 representing progress within current translation
} | null;

const projectId = process.env.SANITY_APP_PROJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;

export const useCreateMissingTranslations = () => {
  const client = useClient({
    projectId,
    dataset,
    apiVersion: "vX",
  });

  const {
    isCreating,
    setIsCreating,
    creationStatus,
    setCreationStatus,
    translationDocumentId,
    setTranslationDocumentId,
  } = useApp();

  const createMissingTranslations = useCallback(
    async (
      baseDocumentId: string | undefined,
      baseLanguage: string | undefined | null,
      availableLanguages: AvailableLanguage[]
    ): Promise<void> => {
      // Set the document ID we're working with
      setTranslationDocumentId(baseDocumentId || null);
      setIsCreating(true);
      setCreationStatus({ message: "Starting to create translations..." });

      if (!baseDocumentId) {
        setIsCreating(false);
        setCreationStatus({ message: "Base document ID is required" });
        throw new Error("Base document ID is required");
      }

      if (!baseLanguage) {
        setIsCreating(false);
        setCreationStatus({ message: "Base language is required" });
        throw new Error("Base language is required");
      }

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
          setIsCreating(false);
          setCreationStatus({
            message:
              "Translation metadata document not found. Please set document language first.",
          });
          throw new Error(
            "Translation metadata document not found. Please set document language first."
          );
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
          setIsCreating(false);
          setCreationStatus({
            success: true,
            message: "No missing translations to create",
          });
          setTranslationDocumentId(null);
          return;
        }

        setCreationStatus({
          message: `Found ${missingLocales.length} missing translations to create`,
        });

        // Collect created document IDs
        const createdTranslations: Array<{
          _key: string;
          value: { _ref: string; _type: string };
        }> = [];

        for (let i = 0; i < missingLocales.length; i++) {
          const locale = missingLocales[i];

          setCreationStatus({
            message: `Creating translation ${i + 1} of ${missingLocales.length}: ${locale.title}`,
          });

          if (!locale.id || !locale.title) {
            continue;
          }

          try {
            const result = await client.agent.action.translate({
              // Replace with your schema ID
              schemaId: "_.schemas.global",
              // Tell the client the ID of the document to use as the source.
              documentId: baseDocumentId,
              languageFieldPath: "language",
              // Set the operation mode
              targetDocument: { operation: "create" },
              // Set the 'from' and 'to' language
              fromLanguage: { id: baseLanguage, title: baseLanguage },
              toLanguage: { id: locale.id, title: locale.title },
            });

            // Extract the created document ID from the result
            if (result) {
              const transaction = client.transaction();

              const sourceReference = createReference(
                baseLanguage,
                baseDocumentId,
                "post", // This will need to be changed to the schema type that is 'selected'
                true // autosetting weak reference to true for now
              );

              const newTranslationReference = createReference(
                locale.id,
                getPublishedId(result._id),
                "post", // This will need to be changed to the schema type that is 'selected'
                true // autosetting weak reference to true for now
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

              if (i === missingLocales.length - 1) {
                setIsCreating(false);
                setCreationStatus({
                  success: true,
                  message: "All translations created successfully!",
                });
                setTranslationDocumentId(null);
              }
            }
          } catch (error) {
            // Create user-friendly error messages for common scenarios
            let userMessage = `Failed to create translation for ${locale.title} (${locale.id})`;

            if (error instanceof Error) {
              if (
                error.message.includes("Too Many Requests") ||
                error.message.includes("rate limit")
              ) {
                userMessage = `Rate limit reached for ${locale.title} translation. The AI service is temporarily busy. Please wait a few minutes and try again.`;
              } else if (
                error.message.includes("network") ||
                error.message.includes("connection")
              ) {
                userMessage = `Network error while creating ${locale.title} translation. Please check your connection and try again.`;
              } else if (error.message.includes("timeout")) {
                userMessage = `Request timed out for ${locale.title} translation. Please try again.`;
              } else {
                userMessage = `${userMessage}: ${error.message}`;
              }
            }

            // Reset state on error
            setIsCreating(false);
            setTranslationDocumentId(null);
            setCreationStatus({ success: false, message: userMessage });
            throw new Error(userMessage);
          }
        }

        // Update the existing translation metadata document with all created translations
        if (createdTranslations.length > 0) {
          try {
            const patch = client
              .patch(existingMetadata._id)
              .append("translations", createdTranslations);
            await patch.commit();
          } catch {
            // Silently handle metadata update errors
          }
        }

        // Note: Progress is cleared in the loop when all translations are complete
      } catch (error) {
        setIsCreating(false);
        setTranslationDocumentId(null);
        setCreationStatus({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
        throw error;
      }
    },
    [client, setTranslationDocumentId, setIsCreating, setCreationStatus]
  );

  return {
    createMissingTranslations,
    isCreating,
    creationStatus,
    translationDocumentId,
    clearCreationStatus: () => setCreationStatus(null),
  };
};
