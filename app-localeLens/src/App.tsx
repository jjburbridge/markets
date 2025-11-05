import { type SanityConfig } from "@sanity/sdk";
import { SanityApp } from "@sanity/sdk-react";
import "./App.css";
import SanityUI from "./SanityUI";
import DefaultLanguageSelector from "./components/DefaultLanguageSelector";
import Documents from "./components/Documents";
import { AppContextProvider } from "./contexts/AppContext";
import { uniqueLanguagesObject } from "../markets";

const projectId = process.env.SANITY_APP_PROJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;

function App() {
  // apps can access many different projects or other sources of data
  const sanityConfigs: SanityConfig[] = [
    {
      projectId,
      dataset,
    },
  ];

  const config = {
    // Use function-based supportedLanguages to fetch from Sanity
    // supportedLanguages: async (client: any) => {
    //   try {
    //     const locales = await client.fetch(
    //       `*[_type == "locale"]{"id": tag, "title": name}`
    //     );

    //     // Check if we got any results
    //     if (!locales || locales.length === 0) {
    //       console.warn(
    //         'No locale documents found in Sanity. Please ensure you have locale documents with "tag" and "name" fields.'
    //       );
    //       console.warn(
    //         "You may need to refresh the page or check your Sanity configuration."
    //       );
    //       // Return a default language to prevent the app from breaking
    //       return [{ id: "en-GB", title: "English(GB)" }];
    //     }

    //     return locales;
    //   } catch (error) {
    //     console.error("Failed to fetch locales:", error);
    //     console.warn(
    //       "Please refresh the page or check your Sanity configuration."
    //     );
    //     // Return a default language as fallback
    //     return [{ id: "en-GB", title: "English(GB)" }];
    //   }
    // },
    supportedLanguages: uniqueLanguagesObject,
    // this is the default language
    defaultLanguage: "en",

    // Required
    // Translations UI will only appear on these schema types
    schemaTypes: ["post"],
  };

  return (
    <div className="app-container">
      <SanityUI>
        <AppContextProvider config={config}>
          <SanityApp config={sanityConfigs} fallback={<div>Loading...</div>}>
            <DefaultLanguageSelector />
            <Documents />
          </SanityApp>
        </AppContextProvider>
      </SanityUI>
    </div>
  );
}

export default App;
