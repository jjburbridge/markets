import { useClient } from "@sanity/sdk-react";
import { use, useMemo, useState } from "react";
import { useApp } from "../../contexts/AppContext";
import LocaleFallbackMessage from "../LocaleFallbackMessage";

// Cache for promises to prevent multiple requests
const languagesCache = new Map<string, Promise<any>>();

const projectId = process.env.SANITY_APP_PROJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;

// Custom hook that throws a promise for Suspense and updates context
const useLanguages = () => {
  const { getLanguages, setLanguages } = useApp();
  const client = useClient({
    projectId,
    dataset,
    apiVersion: "vX",
  });

  // Create a cache key based on client config
  const cacheKey = `${client.config().projectId}-${client.config().dataset}`;

  // Create a promise that will be thrown and caught by Suspense
  const languagesPromise = useMemo(() => {
    // Check if we already have a promise for this client
    if (!languagesCache.has(cacheKey)) {
      const promise = getLanguages(client).then((languages) => {
        // Update the context with the fetched languages
        setLanguages(languages);
        return languages;
      });
      languagesCache.set(cacheKey, promise);

      // Clean up the cache entry if the promise rejects
      promise.catch(() => {
        languagesCache.delete(cacheKey);
      });
    }

    return languagesCache.get(cacheKey)!;
  }, [client, getLanguages, setLanguages, cacheKey]);

  // This will throw the promise if it's not resolved yet
  return use(languagesPromise);
};

// Component that uses the Suspense hook
const LanguageSelectorContent = () => {
  const languages = useLanguages();
  const { defaultLanguage, setDefaultLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  console.log("languages", languages);
  // Show fallback message if no languages are found
  if (!languages || languages.length === 0) {
    return (
      <LocaleFallbackMessage
        title="No Languages Found"
        message="The app could not load any supported languages."
        suggestion="Try refreshing the page, or check your Sanity configuration to ensure locale documents exist."
        buttonText="Refresh Page"
        variant="warning"
      />
    );
  }

  // Find the current language object
  const currentLanguage = languages?.find(
    (lang: { id: string; title: string }) => lang.id === defaultLanguage
  );

  return (
    <div className="relative mb-2">
      {/* Current language display with change button */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Current Locale: &quot;{currentLanguage?.id || "Select Language"}&quot;
        </span>
        {/* <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          {isOpen ? "Cancel" : "Change"}
        </button> */}
      </div>

      {/* Dropdown for language selection */}
      {/* {isOpen && (
        <div className="top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
          <ul className="py-1">
            {languages?.map((locale: { id: string; title: string }) => (
              <li key={locale.id}>
                <button
                  onClick={() => {
                    setDefaultLanguage(locale.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    defaultLanguage === locale.id
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                >
                  {locale.id}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default LanguageSelectorContent;
