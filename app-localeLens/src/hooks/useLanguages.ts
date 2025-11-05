import { useApp } from '../contexts/AppContext';

/**
 * Hook to access languages from the AppContext
 * This provides a consistent way to access languages throughout the app
 */
export const useLanguages = () => {
  const { languages } = useApp();
  return languages;
};

/**
 * Hook to check if languages are loaded
 * Useful for conditional rendering
 */
export const useLanguagesLoaded = () => {
  const { languages } = useApp();
  return languages.length > 0;
};

/**
 * Hook to get a specific language by ID
 * @param languageId - The ID of the language to find
 * @returns The language object or undefined if not found
 */
export const useLanguageById = (languageId: string) => {
  const { languages } = useApp();
  return languages.find(lang => lang.id === languageId);
};
