import { useClient } from "@sanity/sdk-react";
import { use, useMemo, useState } from "react";
import { useApp } from "../../contexts/AppContext";
import LocaleFallbackMessage from "../LocaleFallbackMessage";
import { Market } from "../../../markets";

// Cache for promises to prevent multiple requests
const marketsCache = new Map<string, Promise<any>>();

const projectId = process.env.SANITY_APP_PROJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;

// Custom hook that throws a promise for Suspense and updates context
const useMarkets = () => {
  const { getMarkets, setMarkets, defaultMarket, setLanguages } = useApp();
  const client = useClient({
    projectId,
    dataset,
    apiVersion: "vX",
  });

  // Create a cache key based on client config
  const cacheKey = `${client.config().projectId}-${client.config().dataset}`;

  // Create a promise that will be thrown and caught by Suspense
  const marketsPromise = useMemo(() => {
    // Check if we already have a promise for this client
    if (!marketsCache.has(cacheKey)) {
      const promise = getMarkets(client).then((markets) => {
        // Update the context with the fetched markets
        setMarkets(markets);
        const languages =
          markets.find((market: Market) => market.name === defaultMarket)
            ?.languages || [];
        setLanguages(languages);
        return markets;
      });
      marketsCache.set(cacheKey, promise);

      // Clean up the cache entry if the promise rejects
      promise.catch(() => {
        marketsCache.delete(cacheKey);
      });
    }

    return marketsCache.get(cacheKey)!;
  }, [client, getMarkets, setMarkets, setLanguages, defaultMarket, cacheKey]);

  // This will throw the promise if it's not resolved yet
  return use(marketsPromise);
};

// Component that uses the Suspense hook
const MarketSelectorContent = () => {
  const markets = useMarkets();
  const { defaultMarket, setDefaultMarket } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  // Show fallback message if no languages are found
  if (!markets || markets.length === 0) {
    return (
      <LocaleFallbackMessage
        title="No markets Found"
        message="The app could not load any supported markets."
        suggestion="Try refreshing the page, or check your Sanity configuration to ensure markets documents exist."
        buttonText="Refresh Page"
        variant="warning"
      />
    );
  }

  // Find the current language object
  const currentMarket = markets?.find(
    (market: Market) => market.name === defaultMarket
  );

  return (
    <div className="relative mb-2">
      {/* Current language display with change button */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Current Market: &quot;{currentMarket?.title || "Select Market"}&quot;
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

export default MarketSelectorContent;
