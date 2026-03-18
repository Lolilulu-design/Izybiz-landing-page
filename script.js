// Global coordination for animations: wait until hero title animation is finished
window.__izybizTitleAnimationDone = false;
window.__izybizTitleAnimationCallbacks = [];

const markTitleAnimationDone = () => {
  if (window.__izybizTitleAnimationDone) return;
  window.__izybizTitleAnimationDone = true;
  const callbacks = window.__izybizTitleAnimationCallbacks || [];
  window.__izybizTitleAnimationCallbacks = [];
  callbacks.forEach((cb) => {
    try {
      cb();
    } catch {
      // ignore callback errors to avoid breaking others
    }
  });
};

const whenTitleAnimationDone = (callback) => {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    ?.matches;

  // If motion is reduced or title animation already done, run immediately
  if (prefersReducedMotion || window.__izybizTitleAnimationDone) {
    callback();
    return;
  }

  window.__izybizTitleAnimationCallbacks.push(callback);
};

(() => {
  // Start the hero title animation with a tiny delay so the full title
  // is first rendered statically, then the existing animation kicks in.
  const startTitleAnimation = () => {
    const titleEl = document.querySelector(".hero-izybiz__title");

    if (!titleEl) {
      markTitleAnimationDone();
      return;
    }

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
      ?.matches;

    const originalText = titleEl.textContent || "";
    const text = originalText.trim();

    if (!text) {
      markTitleAnimationDone();
      return;
    }
    if (titleEl.dataset.animated === "true") {
      markTitleAnimationDone();
      return;
    }
    titleEl.dataset.animated = "true";

    const letters = [];
    titleEl.textContent = "";

    for (const char of text) {
      const span = document.createElement("span");
      span.className = "hero-izybiz__title-letter";
      span.textContent = char;
      titleEl.appendChild(span);
      letters.push(span);
    }

    if (prefersReducedMotion) {
      letters.forEach((letter) => {
        letter.classList.add("hero-izybiz__title-letter--visible");
      });
      markTitleAnimationDone();
      return;
    }

    const delayPerLetter = 90;

    letters.forEach((letter, index) => {
      const delay = index * delayPerLetter;
      window.setTimeout(() => {
        letter.classList.add("hero-izybiz__title-letter--visible");
      }, delay);
    });

    const totalDuration = (letters.length - 1) * delayPerLetter + 520;
    window.setTimeout(() => {
      markTitleAnimationDone();
    }, totalDuration);
  };

  // 1s delay requested before starting the animation
  window.setTimeout(startTitleAnimation, 1000);
})();

// Reveal hero subtitle and primary CTA only after title animation is finished
(() => {
  whenTitleAnimationDone(() => {
    const subtitle = document.querySelector(".hero-izybiz__subtitle");
    const button = document.querySelector(".hero-izybiz__button");

    if (subtitle) {
      subtitle.classList.add("hero-izybiz__subtitle--visible");
    }

    if (button) {
      button.classList.add("hero-izybiz__button--visible");
    }
  });
})();

(() => {
  whenTitleAnimationDone(() => {
    const section = document.querySelector(".we-deliver");
    const row = document.querySelector(".we-deliver__cards-row");

    if (!section || !row) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
      ?.matches;

    if (prefersReducedMotion) {
      row.classList.add("is-revealed");
      return;
    }

    const isMobile = window.matchMedia?.("(max-width: 767px)")?.matches;
    if (isMobile) {
      // Desktop keeps its current reveal behavior. On mobile we rely on the
      // generic reveal animation (reveal-base/reveal-visible) for staggered cards,
      // so ensure the row is in its revealed state.
      row.classList.add("is-revealed");
      return;
    }

    let removeTimer = null;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (removeTimer) {
              window.clearTimeout(removeTimer);
              removeTimer = null;
            }
            row.classList.add("is-revealed");
          } else {
            if (removeTimer) window.clearTimeout(removeTimer);
            removeTimer = window.setTimeout(() => {
              row.classList.remove("is-revealed");
              removeTimer = null;
            }, 150);
          }
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    revealObserver.observe(section);
  });
})();

(() => {
  whenTitleAnimationDone(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
      ?.matches;

    if (prefersReducedMotion) {
      return;
    }

    const isMobile = window.matchMedia?.("(max-width: 767px)")?.matches;

    const revealSelectors = [
      ".hero-izybiz",
      ".we-deliver__intro",
      ".section-two__inner",
      ".section-two__intro",
      ".section-two__grid",
      ".section-two__case-copy",
      ".section-two__case-visual",
    ];

    if (isMobile) {
      revealSelectors.push(".we-deliver__card");
    }

    const targets = [];

    for (const selector of revealSelectors) {
      document.querySelectorAll(selector).forEach((el) => {
        if (!targets.includes(el)) {
          targets.push(el);
        }
      });
    }

    if (!targets.length) return;

    targets.forEach((el) => {
      el.classList.add("reveal-base");
    });

    let revealIndex = 0;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;

          if (el.classList.contains("reveal-visible")) {
            obs.unobserve(el);
            return;
          }

          const delay = revealIndex * 80;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("reveal-visible");
          revealIndex += 1;

          obs.unobserve(el);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    targets.forEach((el) => observer.observe(el));
  });
})();

// Navbar (mobile menu)
(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (!header || !toggle || !menu) return;

  const isOpen = () => header.classList.contains("is-open");

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (open) {
      menu.hidden = false;
      const firstLink = menu.querySelector("a[href]");
      if (firstLink && typeof firstLink.focus === "function") {
        firstLink.focus();
      }
    } else {
      menu.hidden = true;
    }
  };

  const onDocumentClick = (event) => {
    if (!isOpen()) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (header.contains(target)) return;
    setOpen(false);
  };

  const onKeyDown = (event) => {
    if (!isOpen()) return;
    if (event.key !== "Escape") return;
    event.stopPropagation();
    setOpen(false);
    toggle.focus();
  };

  toggle.addEventListener("click", () => {
    setOpen(!isOpen());
  });

  menu.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("a[href]")) {
      setOpen(false);
    }
  });

  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeyDown);

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setOpen(false);
    }
  });
})();

// Navbar scrollspy (optional)
(() => {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    ?.matches;

  const links = Array.from(document.querySelectorAll('.site-nav__link[href^="#"]'));
  if (!links.length) return;

  const linkById = new Map();
  links.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const id = href.startsWith("#") ? href.slice(1) : "";
    if (!id) return;
    linkById.set(id, link);
  });

  const ids = Array.from(linkById.keys());
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (activeId) => {
    linkById.forEach((link, id) => {
      if (id === activeId) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const getMostVisible = (entries) => {
    let best = null;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!best || entry.intersectionRatio > best.intersectionRatio) {
        best = entry;
      }
    }
    return best;
  };

  if (prefersReducedMotion) {
    const hash = window.location.hash?.slice(1);
    if (hash && linkById.has(hash)) setActive(hash);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const best = getMostVisible(entries);
      const el = best?.target;
      const id = el?.id;
      if (id && linkById.has(id)) {
        setActive(id);
      }
    },
    {
      threshold: [0.25, 0.35, 0.45, 0.55, 0.65],
      rootMargin: "-20% 0px -65% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
})();

// Book a demo modal behavior
(() => {
  const openTriggers = document.querySelectorAll(
    ".hero-izybiz__button, [data-demo-modal-open]",
  );
  const modal = document.querySelector(".demo-modal");
  const dialog = modal?.querySelector(".demo-modal__dialog");
  const closeElements = modal?.querySelectorAll("[data-demo-modal-close]");
  const form = modal?.querySelector(".demo-modal__form");
  const emailInput = modal?.querySelector("#demo-modal-email");
  const messageEl = modal?.querySelector(".demo-modal__message");
  const submitButton = modal?.querySelector(".demo-modal__submit-button");

  if (
    !openTriggers.length ||
    !modal ||
    !dialog ||
    !closeElements?.length ||
    !form ||
    !emailInput ||
    !messageEl ||
    !submitButton
  ) {
    return;
  }

  let lastFocusedElement = null;

  const getFocusableElements = () => {
    return dialog.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
  };

  const setMessage = (text, type) => {
    messageEl.textContent = text || "";
    messageEl.classList.remove("demo-modal__message--error", "demo-modal__message--success");
    if (type === "error") {
      messageEl.classList.add("demo-modal__message--error");
    } else if (type === "success") {
      messageEl.classList.add("demo-modal__message--success");
    }
  };

  const setLoading = (isLoading) => {
    submitButton.dataset.loading = isLoading ? "true" : "false";
    submitButton.disabled = isLoading;
  };

  const openModal = () => {
    if (!modal.hasAttribute("hidden")) return;
    lastFocusedElement = document.activeElement;
    modal.removeAttribute("hidden");
    setMessage("", null);
    emailInput.value = "";
    emailInput.focus();

    document.addEventListener("keydown", handleKeydown);
  };

  const closeModal = () => {
    if (modal.hasAttribute("hidden")) return;
    modal.setAttribute("hidden", "");
    setLoading(false);
    document.removeEventListener("keydown", handleKeydown);
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(getFocusableElements());
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = document.activeElement;

    if (event.shiftKey) {
      if (current === first || !dialog.contains(current)) {
        event.preventDefault();
        last.focus();
      }
    } else if (current === last || !dialog.contains(current)) {
      event.preventDefault();
      first.focus();
    }
  };

  const isValidEmail = (value) => {
    if (!value) return false;
    // Fallback au cas où la validation HTML5 ne suffit pas
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  openTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeElements.forEach((el) => {
    el.addEventListener("click", () => {
      closeModal();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = emailInput.value.trim();
    setMessage("", null);

    if (!isValidEmail(value)) {
      setMessage("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    setLoading(true);
    setMessage("", null);

    window.setTimeout(() => {
      setLoading(false);
      setMessage("Thanks! We’ll reach out soon.", "success");
      emailInput.focus();
    }, 900);
  });
})();
