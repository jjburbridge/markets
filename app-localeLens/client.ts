import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_APP_PROJECT_ID;
const dataset = process.env.SANITY_APP_DATASET;
const token = process.env.SANITY_APP_API_TOKEN;
// Shared Sanity configuration
export const sanityConfig = {
  projectId: projectId,
  dataset: dataset,
  useCdn: false,
  apiVersion: "vX",
  token: token,
};

// Client instance for non-React contexts (utility functions, etc.)
export const client = createClient(sanityConfig);
