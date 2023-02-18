import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: "2023-01-30",
  useCdn: true,
};

export const sanityClient = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const urlFor = (source: any) => createImageUrlBuilder(config).image(source);
export const getClient = (preview) => (preview ? previewClient : sanityClient);
const defaultExport = {
  config,
  sanityClient,
  previewClient,
  urlFor,
};

export default defaultExport;