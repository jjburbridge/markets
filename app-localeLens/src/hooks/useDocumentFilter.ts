import { useApp } from "../contexts/AppContext";

/**
 * Hook that builds the complete filter query for posts based on status and default language
 * @returns The complete filter query string for useDocuments
 */

export const useDocumentFilter = () => {
  const { status, defaultLanguage, defaultMarket, languages } = useApp();
  const languageCount = languages.length;

  const buildFilter = (): string => {
    switch (status) {
      case "partially-translated":
        // Only show documents in the selected language that have some translations but are not fully translated
        return defaultLanguage
          ? `language == "${defaultLanguage}" && market == "${defaultMarket}" && count(*[_type == "translation.metadata" && references(^._id)].translations[]) > 0 && count(*[_type == "translation.metadata" && references(^._id)].translations[]) < ${languageCount}`
          : `count(*[_type == "translation.metadata" && references(^._id)].translations[]) > 0 && count(*[_type == "translation.metadata" && references(^._id)].translations[]) < ${languageCount})`;

      case "fully-translated":
        // Only show documents in the selected language that are fully translated
        return defaultLanguage
          ? `language == "${defaultLanguage}" && market == "${defaultMarket}" && count(*[_type == "translation.metadata" && references(^._id)].translations[]) == ${languageCount}`
          : `count(*[_type == "translation.metadata" && references(^._id)].translations[]) == ${languageCount})`;

      case "untranslated":
        // Documents without a language field
        return `!defined(language) && market == "${defaultMarket}"`;

      case "all":
      default:
        // For "all", you might also want to filter by language
        return defaultLanguage
          ? `(!defined(language) || language == "${defaultLanguage}") && market == "${defaultMarket}"`
          : `market == "${defaultMarket}`;
    }
  };

  return buildFilter();
};
