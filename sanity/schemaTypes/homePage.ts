import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "backgroundVideoId",
          title: "Background Video (YouTube ID)",
          description:
            "The ID from the YouTube URL — e.g. for youtube.com/watch?v=l4qXAeMAWUI the ID is l4qXAeMAWUI. Plays muted on loop behind the hero.",
          type: "string",
        }),
        defineField({
          name: "showreelVideoId",
          title: "Showreel Video (YouTube ID)",
          description:
            "Video opened (with sound) when someone clicks Play Showreel. Defaults to the background video if empty.",
          type: "string",
        }),
        defineField({
          name: "playButtonLabel",
          title: "Play Button Label",
          type: "string",
          initialValue: "Play Showreel",
        }),
      ],
    }),
    defineField({
      name: "introText",
      title: "Intro Statement",
      description: "The large animated statement under the hero (“We are a full-service film and video…”).",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "workVideoId",
      title: "Work Section Background Video (YouTube ID)",
      description: "Looping video behind the category links section.",
      type: "string",
    }),
    defineField({
      name: "brandsHeading",
      title: "Brands Heading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "brandLogos",
      title: "Brand Logos",
      description: "Client / brand logos shown in the grid.",
      type: "array",
      of: [
        {
          type: "image",
          fields: [defineField({ name: "alt", title: "Brand name", type: "string" })],
        },
      ],
    }),
    defineField({
      name: "accoladesHeading",
      title: "Accolades Heading",
      type: "string",
      initialValue: "Accolades",
    }),
    defineField({
      name: "accoladeLogos",
      title: "Accolade Badges",
      description: "Award badges shown under the Accolades heading.",
      type: "array",
      of: [
        {
          type: "image",
          fields: [defineField({ name: "alt", title: "Award name", type: "string" })],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
