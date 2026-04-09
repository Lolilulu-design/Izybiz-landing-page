#!/usr/bin/env python3
"""
test-site.py

Comprehensive site test: HTTP status, content quality, internal links.
Requires the dev server running at BASE_URL.

Usage:
    python3 scripts/test-site.py [--base-url http://localhost:4321]
"""

import sys
import re
import urllib.request
import urllib.error
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

BASE_URL = "http://localhost:4321"
for i, arg in enumerate(sys.argv[1:], 1):
    if arg.startswith("--base-url="):
        BASE_URL = arg.split("=", 1)[1]
    elif arg == "--base-url" and i < len(sys.argv) - 1:
        BASE_URL = sys.argv[i + 1]

PLACEHOLDER_PATTERNS = [
    "content coming soon", "contenu à enrichir", "contenido próximamente",
    "page en cours", "page coming soon", "página en preparación",
    "content to enrich",
]

# All pages that should exist and have real content
ALL_PAGES = [
    # FR
    ("/", "fr", False),                                  # homepage, placeholder ok
    ("/a-propos", "fr", True),
    ("/services", "fr", True),
    ("/blog", "fr", True),
    ("/contact", "fr", False),
    ("/management-de-transition", "fr", True),
    ("/integration-ia", "fr", True),
    ("/pilotage-performance", "fr", False),              # placeholder accepted
    ("/redressement-restructuration", "fr", False),
    ("/scale-up-industrialisation", "fr", False),
    ("/blog/lancer-super-app-afrique-2022-03-15", "fr", True),
    ("/blog/echec-projet-ia-entreprise-2026-04-08", "fr", True),
    # EN
    ("/en/", "en", False),
    ("/en/about", "en", True),
    ("/en/services", "en", True),
    ("/en/blog", "en", True),
    ("/en/contact", "en", False),
    ("/en/management-transition", "en", True),
    ("/en/ai-integration", "en", True),
    ("/en/performance-management", "en", False),
    ("/en/operational-turnaround", "en", False),
    ("/en/scale-up-operations", "en", False),
    ("/en/blog/launching-super-app-west-africa-2022-03-15", "en", True),
    ("/en/blog/why-ai-projects-fail-enterprise-2026-04-08", "en", True),
    # ES
    ("/es/", "es", False),
    ("/es/sobre-mi", "es", True),
    ("/es/servicios", "es", True),
    ("/es/blog", "es", True),
    ("/es/contacto", "es", False),
    ("/es/gestion-transicion", "es", True),
    ("/es/integracion-ia", "es", True),
    ("/es/gestion-rendimiento", "es", False),
    ("/es/reestructuracion-operacional", "es", False),
    ("/es/industrializacion-scale-up", "es", False),
    ("/es/blog/lanzar-super-app-africa-occidental-2022-03-15", "es", True),
    ("/es/blog/proyectos-ia-fracasan-empresa-2026-04-08", "es", True),
]


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.text_content = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            attrs = dict(attrs)
            href = attrs.get("href", "")
            if href and not href.startswith(("#", "mailto:", "tel:", "javascript:")):
                self.links.append(href)

    def handle_data(self, data):
        stripped = data.strip()
        if stripped:
            self.text_content.append(stripped)


def fetch(path):
    url = BASE_URL + path
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "site-tester/1.0"})
        with urllib.request.urlopen(req, timeout=8) as r:
            return r.status, r.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)


def is_internal(href):
    parsed = urlparse(href)
    return not parsed.netloc or "localhost" in parsed.netloc or "izybiz.fr" in parsed.netloc


def get_internal_path(href):
    parsed = urlparse(href)
    return parsed.path


def has_placeholder(text_content):
    combined = " ".join(text_content).lower()
    return any(p in combined for p in PLACEHOLDER_PATTERNS)


def word_count(text_content):
    combined = " ".join(text_content)
    return len(combined.split())


# ─── Main ──────────────────────────────────────────────────────────────────────

def main():
    print(f"\n{'='*60}")
    print(f"  Site test — {BASE_URL}")
    print(f"{'='*60}\n")

    results = {"pass": 0, "fail": 0, "warn": 0}
    broken_links_global = set()
    checked_paths = set()

    for path, lang, require_content in ALL_PAGES:
        status, html = fetch(path)
        page_errors = []
        page_warnings = []

        # 1. HTTP status
        if status != 200:
            print(f"  ✗ [{status}] {path}")
            results["fail"] += 1
            continue

        parser = LinkParser()
        parser.feed(html)
        checked_paths.add(path)

        # 2. Content check
        if require_content:
            if has_placeholder(parser.text_content):
                page_errors.append("placeholder content detected")
            wc = word_count(parser.text_content)
            if wc < 150:
                page_errors.append(f"suspiciously short ({wc} words)")

        # 3. Internal links check
        broken_on_page = []
        for href in parser.links:
            if not is_internal(href):
                continue
            link_path = get_internal_path(href)
            if not link_path or link_path in checked_paths or link_path in broken_links_global:
                continue
            if link_path.startswith("/assets") or link_path.startswith("/_"):
                continue
            link_status, _ = fetch(link_path)
            checked_paths.add(link_path)
            if link_status not in (200, 301, 302):
                broken_on_page.append(f"{link_path} [{link_status}]")
                broken_links_global.add(link_path)

        if broken_on_page:
            page_errors.append(f"broken links: {', '.join(broken_on_page)}")

        # Output
        if page_errors:
            print(f"  ✗ {path}")
            for e in page_errors:
                print(f"      ERROR: {e}")
            results["fail"] += 1
        elif page_warnings:
            print(f"  ⚠ {path}")
            for w in page_warnings:
                print(f"      WARN: {w}")
            results["warn"] += 1
        else:
            wc = word_count(parser.text_content)
            print(f"  ✓ {path}  [{lang}]  {wc} words")
            results["pass"] += 1

    print(f"\n{'='*60}")
    print(f"  {results['pass']} passed  |  {results['warn']} warnings  |  {results['fail']} failed")
    print(f"{'='*60}\n")
    sys.exit(0 if results["fail"] == 0 else 1)


if __name__ == "__main__":
    main()
