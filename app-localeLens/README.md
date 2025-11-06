# LocaleLens

A Sanity App for managing multi-language and multi-market content translations. LocaleLens provides a powerful UI for viewing, creating, and managing document translations in a Sanity project with internationalized content across different geographical markets.

## Features

- 📋 **Document Overview**: View all translatable documents with their translation status
- 🌍 **Multi-Market Support**: Manage translations across multiple markets (US, CA, UK, IN, JP) with market-specific languages
- 🎯 **Market & Language Selection**: Set default market and language for content filtering and creation
- 🔄 **Batch Translations**: Create translations for multiple documents at once with progress tracking
- 📊 **Translation Status Filtering**: Filter documents by status (all, untranslated, partially-translated, fully-translated)
- 🔍 **Smart Document Filtering**: Market and language-aware document filtering
- 💾 **Bulk Operations**: Bulk set document language and create missing translations
- 🎨 **Modern UI**: Built with Sanity UI and Tailwind CSS for a polished user experience
- ⚡ **Real-time Updates**: Live translation progress tracking with sub-progress indicators

## Prerequisites

- Node.js 18+ and Yarn
- A Sanity project with internationalized content
- Sanity CLI (`npm install -g @sanity/cli`)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SANITY_APP_ORG_ID=your-organization-id
SANITY_APP_PROJECT_ID=your-project-id
SANITY_APP_DATASET=your-dataset
SANITY_APP_API_TOKEN=your-api-token
```

## Installation

```bash
# Install dependencies
yarn install
```

## Development

```bash
# Start the development server (runs on port 3334)
yarn dev
```

The app will be available at `http://localhost:3334`

## Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the app for production
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with auto-fix
- `yarn format` - Format code with Prettier

## Configuration

### Supported Markets

The app supports the following markets out of the box (configured in `markets.ts`):

- 🇺🇸 **USA** - English
- 🇨🇦 **Canada** - English, French
- 🇬🇧 **United Kingdom** - English
- 🇮🇳 **India** - English, Hindi
- 🇯🇵 **Japan** - Japanese, English

### Schema Configuration

Configure which schema types should be translatable in `src/App.tsx`:

```typescript
const config = {
  supportedLanguages: uniqueLanguagesObject, // Can be an array, function, or GROQ query
  supportedMarkets: MARKETS,                 // Can be an array, function, or GROQ query
  defaultLanguage: "en",                     // Default language for filtering
  defaultMarket: "CA",                       // Default market for filtering
  schemaTypes: ["post"],                     // Add your translatable schema types here
};
```

### Dynamic Language/Market Loading

The app supports three ways to configure languages and markets:

1. **Static Array** (default): Define languages/markets in `markets.ts`
2. **Function-based**: Provide an async function that fetches from Sanity
3. **GROQ Query**: Pass a GROQ query string to fetch from Sanity

Example with function-based loading:

```typescript
supportedLanguages: async (client) => {
  const locales = await client.fetch(
    `*[_type == "locale"]{"id": tag, "title": name}`
  );
  return locales;
}
```

## Architecture

### Key Components

- **`App.tsx`** - Main application entry point with SanityApp configuration
- **`Documents.tsx`** - Main document list view with batch mode support
- **`DocumentDetail/`** - Detailed view for individual document translations
  - `AvailableLanguages.tsx` - Shows available languages for a document
  - `CreateTranslationsCard.tsx` - UI for creating translations
  - `TranslationsList.tsx` - Lists existing translations
  - `SetDocumentLanguage.tsx` - Set/update document language
- **`BatchTranslationPanel/`** - UI for batch translation operations
  - `DocumentsList.tsx` - List of selected documents for batch operations
  - `TranslationProgress.tsx` - Real-time progress indicator
  - `ActionButtons.tsx` - Batch operation controls
- **`DefaultLanguageSelector/`** - Global default language selector
- **`DefaultMarketSelector/`** - Global default market selector
- **`StatusSelector.tsx`** - Filter documents by translation status
- **`DocumentPrevewItem/`** - Preview card for documents with language comparison

### Hooks

- `useBatchTranslationsWithProgress` - Manages batch translation operations with real-time progress tracking
- `useCreateMissingTranslations` - Creates missing translations for documents
- `useDocumentFilter` - Builds GROQ filter queries based on status, market, and language
- `useLanguages` - Provides access to languages with helper functions (`useLanguagesLoaded`, `useLanguageById`)
- `useStudioNavigation` - Handles navigation within the Sanity Studio
- `useSetDocumentLanguage` - Sets or updates document language
- `useBulkSetDocumentLanguage` - Bulk set language for multiple documents
- `useBatchProcessState` - Manages state for batch processing operations

### Services

- **`translationService.ts`** - Translation service using Sanity Agent Actions API for automated translations

### Context

- **`AppContext`** - Global application state including:
  - Configuration (supported languages, markets, schema types)
  - Default language and market selection
  - Translation progress tracking
  - Batch mode state and document selection
  - Document filtering state

## Project Structure

```
app-localeLens/
├── src/
│   ├── components/                 # React components
│   │   ├── BatchTranslationPanel/  # Batch operations UI
│   │   ├── DefaultLanguageSelector/ # Language selector with error boundary
│   │   ├── DefaultMarketSelector/   # Market selector with error boundary
│   │   ├── DocumentDetail/          # Single document translation view
│   │   ├── DocumentPrevewItem/      # Document list item with language comparison
│   │   ├── Documents.tsx            # Main document list with filtering
│   │   ├── StatusSelector.tsx       # Translation status filter
│   │   ├── LanguageSelectionModal.tsx
│   │   └── ...
│   ├── contexts/
│   │   └── AppContext.tsx           # Global state management
│   ├── hooks/                       # Custom React hooks
│   │   ├── useBatchTranslationsWithProgress.ts
│   │   ├── useBatchProcessState.ts
│   │   ├── useDocumentFilter.ts
│   │   ├── useLanguages.ts
│   │   └── ...
│   ├── queries/
│   │   └── documentQueries.ts       # GROQ queries for documents
│   ├── services/
│   │   └── translationService.ts    # Translation API service
│   ├── ultils/
│   │   └── createReference.ts       # Helper utilities
│   ├── App.tsx                      # Main app entry point
│   ├── SanityUI.tsx                 # Sanity UI provider
│   └── types.ts                     # TypeScript type definitions
├── markets.ts                       # Market and language configuration
├── client.ts                        # Sanity client configuration
├── sanity.cli.ts                    # Sanity CLI configuration (port 3334)
├── package.json
├── tsconfig.json
├── tailwind.config.js               # Tailwind CSS configuration
└── postcss.config.js                # PostCSS configuration
```

## Key Features Explained

### Market-Aware Translation Management

LocaleLens is designed for managing content across multiple geographical markets, each with their own supported languages. This allows you to:

- Filter documents by market to see only content for specific regions
- View market-specific language options (e.g., Canada supports English and French)
- Ensure translations are created only for languages supported in each market

### Intelligent Document Filtering

The app uses sophisticated GROQ query construction to filter documents based on:

- **Market**: Only shows documents for the selected market
- **Language**: Filters by document language (or shows untranslated documents)
- **Translation Status**: Calculates translation completeness dynamically
  - Counts existing translations vs. total available languages
  - Provides real-time status indicators (none, partial, fully translated)

### Performance Optimizations

- **Scroll Preservation**: Maintains scroll position during document selection and pagination
- **Suspense Boundaries**: Uses React Suspense for smooth loading states
- **Concurrent Rendering**: Leverages React 19's `startTransition` for non-blocking updates
- **Pagination**: Loads documents in batches of 20 with "Load more" functionality

### Error Resilience

- Error boundaries protect critical UI sections (language/market selectors)
- Graceful fallback messages when configuration is missing
- Disabled states prevent actions during ongoing operations

## Usage

### Setting Default Market and Language

1. **Select Market**: Use the default market selector at the top to choose your target market (US, CA, UK, IN, JP)
2. **Select Language**: Use the default language selector to choose your preferred language
3. Documents will be filtered based on your market and language selection
4. The language selector automatically shows only languages available in the selected market

### Translation Status Filtering

Filter documents by translation status:

- **All**: Shows all documents in the selected market/language (including untranslated)
- **Untranslated**: Shows documents without a language field set
- **Partially Translated**: Shows documents with some translations but not all languages
- **Fully Translated**: Shows documents translated to all supported languages

### Managing Document Translations

#### Single Document Mode (Default)

1. **View Documents**: Browse all translatable documents in the left panel
2. **Select Document**: Click on a document to view its translation details in the right panel
3. **Set Language**: Assign or update the document's language
4. **Create Translations**: Click "Create Translations" to generate missing translations
5. **View Translations**: See all existing translations and their status

#### Batch Translation Mode

1. **Enable Batch Mode**: Toggle the "Batch Mode" switch at the top of the document list
2. **Select Documents**: Click on multiple documents to select them (highlighted in blue)
3. **Review Selection**: The right panel shows selected documents and available operations
4. **Choose Languages**: Select target languages for each document
5. **Start Batch Process**: Click "Start Translation" to begin
6. **Monitor Progress**: Real-time progress tracking shows translation creation status
7. **Review Results**: See success/failure status for each document

### Batch Translation Workflow

1. Toggle **Batch Mode** on in the document list
2. Select documents you want to translate (supports multi-select)
3. The batch translation panel appears on the right showing selected documents
4. For each document, choose target languages from available market languages
5. Click **"Start Translation"** to begin the batch process
6. Monitor real-time progress with per-document status indicators
7. View completion summary with success/failure counts
8. Toggle batch mode off to return to normal view

## Technology Stack

- **React 19** - UI framework with concurrent features
- **TypeScript 5.1+** - Type safety and enhanced developer experience
- **Sanity SDK v2** - Sanity integration and app framework
- **Sanity UI 3.x** - Component library for consistent Sanity experience
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **GROQ** - Query language for Sanity data
- **Styled Components 6.x** - Additional styling capabilities
- **PostCSS** - CSS processing

## Data Model Requirements

LocaleLens expects your Sanity schema to include:

### Document Schema

Documents must have the following fields:

- `language` (string) - The language code for the document (e.g., "en", "fr", "jp")
- `market` (string) - The market code for the document (e.g., "CA", "US", "UK")

### Translation Metadata

The app works with Sanity's translation system using:

- `translation.metadata` document type
- `translations` array field with references to translated documents
- Document references using `internationalizedArrayReferenceValue` type

### GROQ Queries

The app uses GROQ queries defined in `src/queries/documentQueries.ts`:

- `DOCUMENT_PREVIEW_QUERY` - Fetches document list with translation status
- `DOCUMENT_DETAIL_QUERY` - Fetches detailed document info including metadata ID
- `BATCH_DOCUMENT_PREVIEW_QUERY` - Optimized query for batch operations

These queries calculate translation status dynamically based on the number of translations vs. available languages.

## Development Notes

- The app runs on port **3334** to avoid conflicts with other services (configurable in `sanity.cli.ts`)
- Uses Sanity SDK v2 for app development with the new app framework
- Supports three configuration methods for languages/markets: static arrays, async functions, or GROQ queries
- Built with the latest Sanity App framework using `@sanity/sdk-react`
- Uses React 19's `startTransition` for optimized state updates
- Implements scroll preservation for smooth UX during pagination and selection
- Translation service is designed to work with Sanity Agent Actions API
- Error boundaries protect against crashes in language and market selectors
- Document filtering uses dynamic GROQ query construction based on market, language, and translation status

## Troubleshooting

### No documents appearing

- Ensure your schema types are listed in the `schemaTypes` configuration in `src/App.tsx`
- Check that your environment variables are set correctly (especially `SANITY_APP_PROJECT_ID` and `SANITY_APP_DATASET`)
- Verify your Sanity project has documents of the configured types
- Check that documents have the `market` field matching your selected market
- Try switching to "All" status filter to see all documents

### Languages not loading

- Check that `markets.ts` is configured correctly with language definitions
- If using function-based loading, ensure the Sanity query returns the correct format: `[{id: string, title: string}]`
- Verify the `supportedLanguages` configuration in `src/App.tsx`
- Check browser console for errors related to language fetching

### Batch mode disabled or documents not selectable

- Batch mode is automatically disabled for "fully-translated" status
- Documents cannot be selected during active batch translation operations
- Ensure you're not viewing the document detail view (close it first)
- Check that there are documents available in the current filter

### Translation creation fails

- Ensure your API token has write permissions (`SANITY_APP_API_TOKEN`)
- Check that the target language is supported in your markets configuration
- Verify the Sanity project schema supports internationalized content with `translation.metadata` documents
- Check browser console and network tab for specific error messages
- Ensure the document has a language field set before creating translations

### Market selector not showing correct languages

- Verify that the market definition in `markets.ts` includes the correct languages array
- Check that `defaultMarket` in `src/App.tsx` matches a valid market name
- Ensure the market name format is consistent (e.g., "CA" not "ca")

## License

UNLICENSED - Private use only

## Support

For issues or questions, please refer to the [Sanity documentation](https://www.sanity.io/docs) or contact your development team.

