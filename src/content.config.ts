import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  lang: z.enum(["fr", "en", "es"]),
  translationKey: z.string().optional(),
});

export const collections = {
  "blog-fr": defineCollection({
    loader: glob({ base: "./src/content/blog-fr", pattern: "**/*.md" }),
    schema: blogSchema,
  }),
  "blog-en": defineCollection({
    loader: glob({ base: "./src/content/blog-en", pattern: "**/*.md" }),
    schema: blogSchema,
  }),
  "blog-es": defineCollection({
    loader: glob({ base: "./src/content/blog-es", pattern: "**/*.md" }),
    schema: blogSchema,
  }),
};
