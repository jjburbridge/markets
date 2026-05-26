# Resources PDF App

A custom Sanity application built on the [Sanity App SDK](https://www.sanity.io/docs/app-sdk) that lets you:

1. Filter the Studio's `resource` documents by **Subjects**, **Key Stages**, **Year Groups**, **Resource Types**, **Regions**, **Markets**, and **Languages**.
2. Preview the matching resources in a live table.
3. Generate a paginated, printable PDF report (title, resource code, description, published date, and preview image) using [`@react-pdf/renderer`](https://react-pdf.org).

## Getting started

```bash
cd app
yarn install
cp .env.local.example .env.local
# fill in SANITY_APP_PROJECT_ID, SANITY_APP_DATASET, SANITY_APP_ORGANIZATION_ID
yarn dev
```

The dev server runs on port 3333 — the Sanity CLI will print a Dashboard URL you can open in the browser.

## Environment variables

All variables must be prefixed `SANITY_APP_` so the App SDK bundler includes them.

| Variable | Required | Notes |
| --- | --- | --- |
| `SANITY_APP_PROJECT_ID` | yes | The Sanity project containing your `resource` documents. |
| `SANITY_APP_DATASET` | no | Defaults to `production`. |
| `SANITY_APP_ORGANIZATION_ID` | yes (for `yarn deploy`) | The Sanity organization the app deploys into. |

## Architecture

```
src/
  App.tsx                          # <SanityApp> + <ThemeProvider>
  components/
    ResourcesView.tsx              # filters + table + PDF button
    FiltersPanel.tsx               # multi-select dropdowns
    MultiSelect.tsx                # generic multi-select primitive
    ResourcesTable.tsx             # live preview table (uses useQuery)
    ResourcesPdfDocument.tsx       # @react-pdf/renderer Document
    GeneratePdfButton.tsx          # PDFDownloadLink wrapper
  lib/
    useResourcesQuery.ts           # GROQ query + hook
    resourceTaxonomy.ts            # re-exports from ../../lib/resourceTaxonomy.ts
    marketOptions.ts               # market / language enum values
    format.ts                      # image URL + date helpers
    types.ts                       # ResourceFilters, ResourceRow
```

### Data flow

```
[user changes filter] → setFilters() → useResourcesQuery(filters)
                                   ↓ GROQ params
                            Sanity Content Lake
                                   ↓
                          ResourcesTable (rendered rows)
                                   ↓ lifted via onRowsChange
                          GeneratePdfButton + ResourcesPdfDocument
                                   ↓ PDFDownloadLink
                            User downloads PDF
```

The GROQ query applies each filter only when at least one option is selected, so an empty filter set returns the full collection.

## Notes

- The taxonomy lists (subjects, key stages, etc.) are imported from `../lib/resourceTaxonomy.ts` at the repo root — the same file the Studio schema uses, so the dropdowns always match the schema's allowed values.
- Image thumbnails use Sanity's CDN transforms (`?w=128&h=128&fit=crop&auto=format`) — both in the HTML table and inside the PDF — to keep the document lightweight.
- `useQuery` suspends on initial load, so `<ResourcesTable>` is wrapped in a `<Suspense>` in `ResourcesView`.

## Deploy

```bash
yarn deploy
```

This uses the `sanity deploy` CLI command, which bundles the app and pushes it to your organization. After deploy it appears alongside other apps in the Sanity Dashboard sidebar.
