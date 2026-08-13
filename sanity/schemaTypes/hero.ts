import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "backgroundVideoId",
      title: "Background Video (YouTube ID)",
      description:
        "The ID from the YouTube URL — e.g. for youtube.com/watch?v=l4qXAeMAWUI the ID is l4qXAeMAWUI. Plays muted on loop behind the hero.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "showreelVideoId",
      title: "Showreel Video (YouTube ID)",
      description: "Video opened (with sound) when someone clicks Play Showreel. Defaults to the background video if empty.",
      type: "string",
    }),
    defineField({
      name: "playButtonLabel",
      title: "Play Button Label",
      type: "string",
      initialValue: "Play Showreel",
    }),
  ],
  preview: { prepare: () => ({ title: "Hero" }) },
});
