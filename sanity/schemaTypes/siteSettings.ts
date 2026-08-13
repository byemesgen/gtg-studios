import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Logos" },
    { name: "meta", title: "Meta & SEO" },
    { name: "nav", title: "Menu Navigation" },
    { name: "social", title: "Social Links" },
  ],
  fields: [
    defineField({
      name: "sidebarLogo",
      title: "Sidebar Icon Logo",
      description:
        "The small icon in the red sidebar (opens the menu). Shown white — upload a white or transparent SVG/PNG.",
      type: "image",
      group: "brand",
    }),
    defineField({
      name: "wordmarkLogo",
      title: "Wordmark Logo",
      description:
        "The large GTG wordmark used at the bottom of the hero, in the menu, and in the footer. Upload a dark version — it's automatically shown white over video/dark backgrounds.",
      type: "image",
      group: "brand",
    }),
    defineField({
      name: "siteTitle",
      title: "Site Title",
      description: "Browser tab / search result title for the site.",
      type: "string",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      description: "Used for SEO meta description and social sharing.",
      type: "text",
      rows: 3,
      group: "meta",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      description: "Small icon shown in the browser tab (SVG or PNG).",
      type: "image",
      group: "meta",
    }),
    defineField({
      name: "ogImage",
      title: "OG / Social Share Image",
      description: "Image shown when the site is shared on social media (1200×630 recommended).",
      type: "image",
      group: "meta",
    }),
    defineField({
      name: "navigation",
      title: "Menu Nav Links",
      description:
        "Links shown in the slide-out menu, in order. Toggle “Large bold item” for top-level items (HOME, WORK, ABOUT); leave off for indented sub-items.",
      type: "array",
      group: "nav",
      of: [
        {
          type: "object",
          name: "navItem",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "link",
              title: "Link",
              description: "Internal path (e.g. /work?category=studio) or full URL.",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "emphasis",
              title: "Large bold item",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "link" },
          },
        },
      ],
    }),
    defineField({
      name: "menuContact",
      title: "Menu Contact Section",
      description: "Contact info shown at the bottom of the slide-out menu.",
      type: "object",
      group: "nav",
      fields: [
        defineField({ name: "dropInHeading", title: "“Drop in” heading", type: "string", initialValue: "Drop in:" }),
        defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
        defineField({ name: "getInTouchHeading", title: "“Get in touch” heading", type: "string", initialValue: "Get in touch:" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      description: "Icons shown at the bottom of the sidebar.",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Vimeo", value: "vimeo" },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
