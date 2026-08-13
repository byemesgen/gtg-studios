"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";

const singletonTypes = new Set([
  "siteSettings",
  "hero",
  "homePage",
  "workPage",
  "aboutPage",
  "footer",
  "privacyPage",
  "termsPage",
]);

export default defineConfig({
  name: "gtg-studios",
  title: "GTG Studios",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // Singletons shouldn't appear in the global "create new" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Prevent delete/duplicate on singletons
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) => action !== "delete" && action !== "duplicate"
          )
        : input,
  },
});
