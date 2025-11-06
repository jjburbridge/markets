import { useState } from "react";
import { useApp } from "../../contexts/AppContext";
import LocaleFallbackMessage from "../LocaleFallbackMessage";

// Component that uses the Suspense hook
const LanguageSelectorContent = () => {
  // const languages = useLanguages();
  const { defaultLanguage, setDefaultLanguage, languages } = useApp();
  const [isOpen, setIsOpen] = useState(false);
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
          Current Locale: &quot;{currentLanguage?.title || "Select Language"}
          &quot;
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
