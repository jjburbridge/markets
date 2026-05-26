import {defineCliConfig} from 'sanity/cli'

/**
 * Sanity App SDK CLI configuration.
 *
 *   organizationId — the org this custom app deploys into. Set via the
 *     SANITY_APP_ORGANIZATION_ID env var, or hard-code it before deploy.
 *   entry — the React entry component the Sanity CLI bundles.
 *
 * `projectId` / `dataset` (which Sanity content this app reads) are configured
 * inside `src/App.tsx` and sourced from `SANITY_APP_PROJECT_ID` /
 * `SANITY_APP_DATASET` env vars (the `SANITY_APP_` prefix is bundled
 * automatically by the App SDK build).
 */
export default defineCliConfig({
  app: {
    organizationId: process.env.SANITY_APP_ORGANIZATION_ID as string,
    entry: './src/App.tsx',
  },
})
