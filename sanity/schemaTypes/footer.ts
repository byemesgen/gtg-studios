import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "getInTouchHeading", title: "“Get in touch” heading", type: "string", initialValue: "Get in touch:" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "dropInHeading", title: "“Drop in” heading", type: "string", initialValue: "Drop in:" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
    defineField({
      name: "legalText",
      title: "Legal / Copyright Text",
      description: "The © year is added automatically before this text.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      description: "Small links in the bottom strip (socials, privacy, terms…).",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "link", title: "Link", description: "Internal path (e.g. /privacy) or full URL.", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "link" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Footer" }) },
});
