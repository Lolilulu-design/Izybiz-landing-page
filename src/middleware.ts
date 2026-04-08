import { defineMiddleware } from "astro:middleware";

const supportedLocales = new Set(["fr", "en", "es"]);

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && /^[a-z]{2}$/i.test(first) && !supportedLocales.has(first.toLowerCase())) {
    const rest = segments.slice(1).join("/");
    const target = rest ? `/en/${rest}` : "/en/";
    return context.redirect(`${target}${search}`, 302);
  }

  return next();
});
