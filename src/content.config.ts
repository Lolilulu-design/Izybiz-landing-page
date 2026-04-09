import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  lang: z.enum(["fr", "en", "es"]),
  translationKey: z.string().optional(),
});

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  lang: z.enum(["fr", "en", "es"]),
  slug: z.string().optional(),
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
  "pages-fr": defineCollection({
    loader: glob({ base: "./src/content/pages-fr", pattern: "**/*.md" }),
    schema: pageSchema,
  }),
  "pages-en": defineCollection({
    loader: glob({ base: "./src/content/pages-en", pattern: "**/*.md" }),
    schema: pageSchema,
  }),
  "pages-es": defineCollection({
    loader: glob({ base: "./src/content/pages-es", pattern: "**/*.md" }),
    schema: pageSchema,
  }),
};
