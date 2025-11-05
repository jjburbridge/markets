import {defineCliConfig} from 'sanity/cli'
const organizationId = process.env.SANITY_APP_ORG_ID!

export default defineCliConfig({
  app: {
    organizationId: organizationId,
    entry: './src/App.tsx',
  },
  server: {
    port: 3334,
  },
})
