#!/usr/bin/env python3
"""
test-nav.py

Tests that nav links are correct on all key pages of the Izybiz site.
Requires the dev server to be running (npm run dev / astro dev).

Usage:
    python3 scripts/test-nav.py [--base-url http://localhost:4321]
"""

import sys
import urllib.request
import urllib.error
from html.parser import HTMLParser

BASE_URL = "http://localhost:4321"
for arg in sys.argv[1:]:
    if arg.startswith("--base-url="):
        BASE_URL = arg.split("=", 1)[1]
    elif arg == "--base-url" and sys.argv.index(arg) + 1 < len(sys.argv):
        BASE_URL = sys.argv[sys.argv.index(arg) + 1]


# ─── Expected nav links per language ──────────────────────────────────────────

EXPECTED_NAV = {
    "fr": {
        "desktop": ["/a-propos", "/services", "/blog"],
        "mobile":  ["/a-propos", "/services", "/blog"],
    },
    "en": {
        "desktop": ["/en/about", "/en/services", "/en/blog"],
        "mobile":  ["/en/about", "/en/services", "/en/blog"],
    },
    "es": {
        "desktop": ["/es/sobre-mi", "/es/servicios", "/es/blog"],
        "mobile":  ["/es/sobre-mi", "/es/servicios", "/es/blog"],
    },
}

# Pages to test: (path, language)
PAGES = [
    # FR
    ("/", "fr"),
    ("/a-propos", "fr"),
    ("/services", "fr"),
    ("/blog", "fr"),
    ("/management-de-transition", "fr"),
    ("/integration-ia", "fr"),
    ("/blog/lancer-super-app-afrique-2022-03-15", "fr"),
    # EN
    ("/en/", "en"),
    ("/en/about", "en"),
    ("/en/services", "en"),
    ("/en/blog", "en"),
    ("/en/blog/launching-super-app-west-africa-2022-03-15", "en"),
    # ES
    ("/es/", "es"),
    ("/es/sobre-mi", "es"),
    ("/es/servicios", "es"),
    ("/es/blog", "es"),
]


# ─── HTML parser ──────────────────────────────────────────────────────────────

class NavParser(HTMLParser):
    """Extract href values from site-nav__link and site-nav__menu-link elements."""

    def __init__(self):
        super().__init__()
        self.desktop_links = []
        self.mobile_links = []
        self._in_nav = False
        self._in_menu = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = attrs.get("class", "")

        if tag == "nav" and "site-nav" in classes:
            self._in_nav = True
        if tag == "div" and "site-nav__menu" in classes:
            self._in_menu = True

        if tag == "a":
            href = attrs.get("href", "")
            if self._in_nav and "site-nav__link" in classes:
                self.desktop_links.append(href)
            elif self._in_menu and "site-nav__menu-link" in classes:
                self.mobile_links.append(href)

    def handle_endtag(self, tag):
        if tag == "nav":
            self._in_nav = False
        if tag == "div":
            self._in_menu = False


# ─── Helpers ──────────────────────────────────────────────────────────────────

def fetch(path):
    url = BASE_URL + path
    try:
        with urllib.request.urlopen(url, timeout=5) as r:
            return r.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return None, e.code
    except Exception as e:
        return None, str(e)


def check_links(actual, expected, label):
    missing = [l for l in expected if not any(l in a for a in actual)]
    extra_anchors = [a for a in actual if a.startswith("#")]
    return missing, extra_anchors


# ─── Main ──────────────────────────────────────────────────────────────────────

def main():
    print(f"\n{'='*56}")
    print(f"  Nav test — {BASE_URL}")
    print(f"{'='*56}\n")

    passed = 0
    failed = 0

    for path, lang in PAGES:
        html = fetch(path)
        if not isinstance(html, str):
            print(f"  ✗ {path}  →  HTTP error / unreachable")
            failed += 1
            continue

        parser = NavParser()
        parser.feed(html)

        expected = EXPECTED_NAV[lang]
        miss_desktop, anchors_desktop = check_links(
            parser.desktop_links, expected["desktop"], "desktop"
        )
        miss_mobile, anchors_mobile = check_links(
            parser.mobile_links, expected["mobile"], "mobile"
        )

        errors = []
        if miss_desktop:
            errors.append(f"desktop missing: {miss_desktop}")
        if miss_mobile:
            errors.append(f"mobile missing: {miss_mobile}")
        if anchors_desktop:
            errors.append(f"desktop has anchor links: {anchors_desktop}")
        if anchors_mobile:
            errors.append(f"mobile has anchor links: {anchors_mobile}")

        if errors:
            print(f"  ✗ {path}")
            for e in errors:
                print(f"      {e}")
            failed += 1
        else:
            print(f"  ✓ {path}  [{lang}]  desktop={parser.desktop_links}  mobile={[l for l in parser.mobile_links if not l.startswith('http')]}")
            passed += 1

    print(f"\n{'='*56}")
    print(f"  {passed} passed, {failed} failed")
    print(f"{'='*56}\n")

    sys.exit(0 if failed == 0 else 1)


if __name__ == "__main__":
    main()
