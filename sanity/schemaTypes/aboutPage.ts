import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      initialValue: "ABOUT",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "teamHeading",
      title: "Team Section Heading",
      type: "string",
      initialValue: "Our Team",
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          name: "teamMember",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "role",
              title: "Role / Title",
              description: "Line breaks are kept — put each line of the title on its own line.",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "photo",
              title: "Photo",
              description: "Portrait (3:4). The red duotone treatment is applied automatically.",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "photo" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
