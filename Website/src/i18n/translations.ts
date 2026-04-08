export const languages = {
  fr: "Francais",
  en: "English",
  es: "Espanol",
} as const;

export const defaultLang = "fr";
export const fallbackLang = "en";

export const ui = {
  fr: {
    "nav.deliver": "Ce qu'on delivre",
    "nav.cases": "Cas d'usage",
    "nav.faq": "Questions",
    "nav.blog": "Blog",
    "nav.about": "A propos",
    "nav.contact": "Contact",
    "cta.book": "Prendre contact",
    "cta.linkedin": "Message LinkedIn",
    "blog.readmore": "Lire l'article",
    "blog.title": "Blog",
    "blog.subtitle": "Insights dirigeants sur la transformation et l'IA",
  },
  en: {
    "nav.deliver": "What we deliver",
    "nav.cases": "Use cases",
    "nav.faq": "FAQ",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cta.book": "Book a call",
    "cta.linkedin": "LinkedIn message",
    "blog.readmore": "Read article",
    "blog.title": "Blog",
    "blog.subtitle": "Executive insights on transformation and AI",
  },
  es: {
    "nav.deliver": "Que entregamos",
    "nav.cases": "Casos de uso",
    "nav.faq": "Preguntas",
    "nav.blog": "Blog",
    "nav.about": "Sobre mi",
    "nav.contact": "Contacto",
    "cta.book": "Reservar llamada",
    "cta.linkedin": "Mensaje LinkedIn",
    "blog.readmore": "Leer articulo",
    "blog.title": "Blog",
    "blog.subtitle": "Perspectivas directivas sobre transformacion e IA",
  },
} as const;

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[fallbackLang][key];
  };
}

const localizedRoutes = {
  home: { fr: "/", en: "/en/", es: "/es/" },
  transition: {
    fr: "/management-de-transition",
    en: "/en/management-transition",
    es: "/es/gestion-transicion",
  },
  ai: {
    fr: "/integration-ia",
    en: "/en/ai-integration",
    es: "/es/integracion-ia",
  },
  about: {
    fr: "/a-propos",
    en: "/en/about",
    es: "/es/sobre-mi",
  },
  contact: {
    fr: "/contact",
    en: "/en/contact",
    es: "/es/contacto",
  },
  blog: {
    fr: "/blog",
    en: "/en/blog",
    es: "/es/blog",
  },
} as const;

export function getLocalizedPath(routeKey: keyof typeof localizedRoutes, lang: Lang) {
  return localizedRoutes[routeKey][lang];
}

export function mapPathToLang(pathname: string, targetLang: Lang): string {
  const normalized = pathname.endsWith("/") ? pathname.slice(0, -1) || "/" : pathname;
  const entries = Object.values(localizedRoutes);
  for (const route of entries) {
    if (Object.values(route).includes(normalized as never)) {
      return route[targetLang];
    }
  }
  if (normalized.startsWith("/en/") || normalized === "/en") {
    return normalized.replace(/^\/en(?=\/|$)/, targetLang === "fr" ? "" : `/${targetLang}`) || "/";
  }
  if (normalized.startsWith("/es/") || normalized === "/es") {
    return normalized.replace(/^\/es(?=\/|$)/, targetLang === "fr" ? "" : `/${targetLang}`) || "/";
  }
  if (targetLang === "fr") return normalized;
  return `/${targetLang}${normalized === "/" ? "/" : normalized}`;
}
