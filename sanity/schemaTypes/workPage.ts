import { defineField, defineType } from "sanity";

export const workPage = defineType({
  name: "workPage",
  title: "Work Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      initialValue: "WORK",
      validation: (r) => r.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Work Page" }) },
});
