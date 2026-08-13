import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Carousel",
      description:
        "Background carousel slides for the hero. Each slide has a company, a project name, a looping background video, and an optional link opened when the text is clicked.",
      type: "array",
      of: [
        {
          type: "object",
          name: "heroSlide",
          fields: [
            defineField({
              name: "company",
              title: "Company Name",
              description: "Small line above the project name (e.g. “Amazon Prime Video”).",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "projectName",
              title: "Project Name",
              description: "Large title (e.g. “Meal Ticket”).",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "videoId",
              title: "Background Video (YouTube ID)",
              description:
                "The ID from the YouTube URL — e.g. for youtube.com/watch?v=l4qXAeMAWUI the ID is l4qXAeMAWUI. Plays muted on loop.",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              title: "Link",
              description:
                "Optional — custom URL opened when someone clicks the company/project text. Leave empty to make the text non-clickable.",
              type: "string",
            }),
          ],
          preview: { select: { title: "projectName", subtitle: "company" } },
        },
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
