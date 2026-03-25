// Global coordination for animations: wait until hero title animation is finished
window.__izybizTitleAnimationDone = false;
window.__izybizTitleAnimationCallbacks = [];

// Supabase Edge Function (edit if you redeploy to another project/function URL)
const EDGE_FUNCTION_SEND_DEMO_CONFIRMATION_URL =
  "https://ceczxjsyksmqostlkvdh.supabase.co/functions/v1/send-demo-confirmation";

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
  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  )?.matches;

  // If motion is reduced or title animation already done, run immediately
  if (prefersReducedMotion || window.__izybizTitleAnimationDone) {
    callback();
    return;
  }

  window.__izybizTitleAnimationCallbacks.push(callback);
};

window.__izybizHeroIntroReady = false;
window.__izybizHeroIntroReadyCallbacks = [];

const markHeroIntroReady = () => {
  if (window.__izybizHeroIntroReady) return;
  window.__izybizHeroIntroReady = true;
  const callbacks = window.__izybizHeroIntroReadyCallbacks || [];
  window.__izybizHeroIntroReadyCallbacks = [];
  callbacks.forEach((cb) => {
    try {
      cb();
    } catch {
      // ignore callback errors to avoid breaking others
    }
  });
};

const whenHeroIntroReady = (callback) => {
  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  )?.matches;

  if (prefersReducedMotion || window.__izybizHeroIntroReady) {
    callback();
    return;
  }

  window.__izybizHeroIntroReadyCallbacks.push(callback);
};

const isElementInViewport = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;
  return rect.top < viewportHeight && rect.bottom > 0;
};

(() => {
  const titleLines = Array.from(
    document.querySelectorAll(".hero-izybiz__title-line"),
  );
  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  )?.matches;

  if (!titleLines.length || prefersReducedMotion) {
    titleLines.forEach((line) =>
      line.classList.add("hero-izybiz__title-line--visible"),
    );
    markTitleAnimationDone();
    return;
  }

  const revealLine = (line, delay) => {
    window.setTimeout(() => {
      line.classList.add("hero-izybiz__title-line--visible");
    }, delay);
  };

  revealLine(titleLines[0], 180);
  if (titleLines[1]) {
    revealLine(titleLines[1], 980);
  }

  // Allow second line animation to complete before unlocking next elements.
  const totalDelay = titleLines[1] ? 2300 : 1450;
  window.setTimeout(markTitleAnimationDone, totalDelay);
})();

// Reveal hero subtitle and primary CTA only after title animation is finished
(() => {
  whenTitleAnimationDone(() => {
    const subtitle = document.querySelector(".hero-izybiz__subtitle");
    const button = document.querySelector(".hero-izybiz__button");
    const body = document.body;
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (subtitle) {
      subtitle.classList.add("hero-izybiz__subtitle--visible");
    }

    if (button) {
      button.classList.add("hero-izybiz__button--visible");
    }

    if (prefersReducedMotion) {
      body?.classList.remove("intro-stage-1");
      markHeroIntroReady();
      return;
    }

    // Keep other sections hidden until subtitle/button animation is fully complete.
    window.setTimeout(() => {
      body?.classList.remove("intro-stage-1");
      markHeroIntroReady();
    }, 980);
  });
})();

(() => {
  whenHeroIntroReady(() => {
    const title = document.querySelector("#we-deliver-title.we-deliver__title");
    const cards = Array.from(document.querySelectorAll(".we-deliver__card"));
    const weDeliverSection =
      document.querySelector("#we-deliver") || document.querySelector(".we-deliver");

    if (!title || !cards.length) return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (prefersReducedMotion) {
      title.classList.add("reveal-visible");
      cards.forEach((card) => card.classList.add("reveal-visible"));
      return;
    }

    const targets = [title, ...cards];
    targets.forEach((el) => {
      el.classList.remove("reveal-visible");
      el.classList.add("reveal-base");
    });
    const order = new Map(targets.map((el, i) => [el, i]));
    const revealed = new Set();

    // If the section is already visible on refresh/deep-link,
    // reveal immediately instead of waiting for later observer flow.
    if (isElementInViewport(weDeliverSection)) {
      targets.forEach((el) => {
        const idx = order.get(el) ?? 0;
        el.style.transitionDelay = `${idx * 80}ms`;
        el.classList.add("reveal-visible");
      });
      window.__weDeliverIntroRevealed = true;
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;

          if (el.classList.contains("reveal-visible")) {
            revealed.add(el);
            obs.unobserve(el);
            return;
          }

          const idx = order.get(el) ?? 0;
          const staggerDelay = idx * 80;

          // Apply stagger in JS timing (same pattern as section-two sequencing),
          // then reveal on a painted frame to ensure opacity animation runs.
          window.setTimeout(() => {
            window.requestAnimationFrame(() => {
              el.classList.add("reveal-visible");
            });
          }, staggerDelay);
          revealed.add(el);
          obs.unobserve(el);

          if (revealed.size === targets.length) {
            window.__weDeliverIntroRevealed = true;
            obs.disconnect();
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      },
    );

    targets.forEach((el) => revealObserver.observe(el));
  });
})();

(() => {
  whenTitleAnimationDone(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (prefersReducedMotion) {
      return;
    }

    const isMobile = window.matchMedia?.("(max-width: 767px)")?.matches;

    const revealSelectors = [
      ".section-two__intro",
      ".section-two__grid",
      ".section-two__case-copy",
      ".section-two__case-visual",
    ];

    const targets = [];
    const sectionTwoRoot =
      document.querySelector("#we-do") || document.querySelector(".section-two");

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

    // Used to enforce the global order of reveal animations.
    const order = new Map(targets.map((el, i) => [el, i]));

    window.__sectionTwoDivsRevealed = false;
    window.__onSectionTwoDivsRevealedCallbacks =
      window.__onSectionTwoDivsRevealedCallbacks || [];

    const sectionTwoDivElsSet = new Set();
    [
      ".section-two__grid",
      ".section-two__case-copy",
      ".section-two__case-visual",
    ].forEach((sel) => {
      document
        .querySelectorAll(sel)
        .forEach((el) => sectionTwoDivElsSet.add(el));
    });

    const revealedSectionTwoDivs = new Set();
    const revealedTargets = new Set();

    // Same refresh behavior: if section-two is already in viewport,
    // reveal now and unlock dependent sections.
    if (isElementInViewport(sectionTwoRoot)) {
      targets.forEach((el) => {
        const idx = order.get(el) ?? 0;
        el.style.transitionDelay = `${idx * 80}ms`;
        el.classList.add("reveal-visible");
        revealedTargets.add(el);
        if (sectionTwoDivElsSet.has(el)) {
          revealedSectionTwoDivs.add(el);
        }
      });

      if (
        !window.__sectionTwoDivsRevealed &&
        revealedSectionTwoDivs.size === sectionTwoDivElsSet.size
      ) {
        window.__sectionTwoDivsRevealed = true;
        window.__onSectionTwoDivsRevealedCallbacks.forEach((cb) => {
          try {
            cb();
          } catch {
            // ignore
          }
        });
      }

      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;

          if (el.classList.contains("reveal-visible")) {
            revealedTargets.add(el);
            obs.unobserve(el);
            return;
          }

          const idx = order.get(el) ?? 0;
          el.style.transitionDelay = `${idx * 80}ms`;
          el.classList.add("reveal-visible");
          revealedTargets.add(el);

          if (sectionTwoDivElsSet.has(el)) {
            revealedSectionTwoDivs.add(el);
            if (
              !window.__sectionTwoDivsRevealed &&
              revealedSectionTwoDivs.size === sectionTwoDivElsSet.size
            ) {
              window.__sectionTwoDivsRevealed = true;
              window.__onSectionTwoDivsRevealedCallbacks.forEach((cb) => {
                try {
                  cb();
                } catch {
                  // ignore
                }
              });
            }
          }

          if (revealedTargets.size === targets.length) {
            obs.disconnect();
            return;
          }

          obs.unobserve(el);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      },
    );

    targets.forEach((el) => observer.observe(el));
  });
})();

(() => {
  const sectionTwo = document.querySelector("#we-do");
  if (!sectionTwo) return;

  const grid = sectionTwo.querySelector(".section-two__grid");
  const cases = Array.from(sectionTwo.querySelectorAll(".section-two__case"));
  const prevButton = sectionTwo.querySelector("[data-case-prev]");
  const nextButton = sectionTwo.querySelector("[data-case-next]");
  const counter = sectionTwo.querySelector("[data-case-counter]");
  const tabs = Array.from(sectionTwo.querySelectorAll("[data-case-tab]"));

  if (!grid || cases.length < 2) return;

  grid.classList.add("section-two__grid--carousel");

  let currentIndex = 0;
  let isTransitioning = false;
  const TRANSITION_DURATION_MS = 320;
  const DRAG_SWIPE_THRESHOLD_PX = 56;
  let pointerDragState = null;

  const syncCarouselHeight = () => {
    const previousHeight = grid.style.height;
    grid.style.height = "auto";

    let maxHeight = 0;
    cases.forEach((caseEl) => {
      const caseHeight = caseEl.offsetHeight;
      if (caseHeight > maxHeight) {
        maxHeight = caseHeight;
      }
    });

    grid.style.height = maxHeight > 0 ? `${maxHeight}px` : previousHeight;
  };

  const updateUI = () => {
    const total = cases.length;
    const activeCase = cases[currentIndex];

    if (activeCase) {
      const accent = window
        .getComputedStyle(activeCase)
        .getPropertyValue("--case-accent")
        .trim();
      const activeCaseColor =
        accent ||
        window.getComputedStyle(activeCase).backgroundColor;
      sectionTwo.style.setProperty("--section-two-active-line", activeCaseColor);
    }

    if (counter) {
      counter.textContent = `${currentIndex + 1}/${total}`;
    }

    if (prevButton) {
      prevButton.disabled = currentIndex === 0;
    }

    if (nextButton) {
      nextButton.disabled = currentIndex === total - 1;
    }

    cases.forEach((caseEl, index) => {
      const isActive = index === currentIndex;
      caseEl.classList.toggle("is-active", isActive);
      caseEl.setAttribute("aria-hidden", String(!isActive));
      caseEl.setAttribute("aria-label", `Case study ${index + 1}`);
      caseEl.tabIndex = isActive ? 0 : -1;
    });

    if (tabs.length) {
      tabs.forEach((tab, index) => {
        const isActive = index === currentIndex;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });
    }
  };

  const goTo = (nextIndex) => {
    const clampedIndex = Math.max(0, Math.min(nextIndex, cases.length - 1));
    if (clampedIndex === currentIndex || isTransitioning) return;

    const outgoingCase = cases[currentIndex];
    isTransitioning = true;
    outgoingCase?.classList.add("is-outgoing");

    currentIndex = clampedIndex;
    updateUI();
    const incomingCase = cases[currentIndex];

    if (incomingCase) {
      incomingCase.classList.add("is-entering");
    }

    window.requestAnimationFrame(() => {
      if (outgoingCase) {
        outgoingCase.classList.add("is-exiting");
      }

      if (incomingCase) {
        incomingCase.classList.add("is-entering-active");
      }
    });

    window.setTimeout(() => {
      outgoingCase?.classList.remove("is-outgoing", "is-exiting");
      incomingCase?.classList.remove("is-entering", "is-entering-active");
      isTransitioning = false;
      updateUI();
    }, TRANSITION_DURATION_MS);
  };

  const cleanupPointerDrag = () => {
    pointerDragState = null;
    grid.classList.remove("is-dragging");
  };

  const onPointerDown = (event) => {
    if (isTransitioning) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerDragState = {
      id: event.pointerId,
      startX: event.clientX,
      deltaX: 0,
    };
    grid.classList.add("is-dragging");

    if (typeof grid.setPointerCapture === "function") {
      try {
        grid.setPointerCapture(event.pointerId);
      } catch {
        // no-op
      }
    }
  };

  const onPointerMove = (event) => {
    if (!pointerDragState) return;
    if (event.pointerId !== pointerDragState.id) return;
    pointerDragState.deltaX = event.clientX - pointerDragState.startX;
  };

  const onPointerUp = (event) => {
    if (!pointerDragState) return;
    if (event.pointerId !== pointerDragState.id) return;

    const traveledX = pointerDragState.deltaX;
    cleanupPointerDrag();

    if (typeof grid.releasePointerCapture === "function") {
      try {
        grid.releasePointerCapture(event.pointerId);
      } catch {
        // no-op
      }
    }

    if (Math.abs(traveledX) < DRAG_SWIPE_THRESHOLD_PX) return;

    if (traveledX < 0) {
      goTo(currentIndex + 1);
      return;
    }

    goTo(currentIndex - 1);
  };

  const onPointerCancel = (event) => {
    if (!pointerDragState) return;
    if (event.pointerId !== pointerDragState.id) return;
    cleanupPointerDrag();

    if (typeof grid.releasePointerCapture === "function") {
      try {
        grid.releasePointerCapture(event.pointerId);
      } catch {
        // no-op
      }
    }
  };

  prevButton?.addEventListener("click", () => {
    goTo(currentIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    goTo(currentIndex + 1);
  });

  if (tabs.length) {
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        goTo(index);
      });
    });
  }

  grid.addEventListener("pointerdown", onPointerDown);
  grid.addEventListener("pointermove", onPointerMove);
  grid.addEventListener("pointerup", onPointerUp);
  grid.addEventListener("pointercancel", onPointerCancel);

  sectionTwo.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(currentIndex + 1);
    }
  });

  syncCarouselHeight();
  window.addEventListener("resize", syncCarouselHeight);
  updateUI();
})();

// FAQ reveal (title first, then questions one by one)
(() => {
  whenTitleAnimationDone(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (prefersReducedMotion) return;

    const faqSection =
      document.querySelector("#faq") || document.querySelector(".section-faq");
    const titleEl = document.querySelector(".section-faq__title");
    const questionEls = Array.from(
      document.querySelectorAll(".section-faq__chat .faq-item__question"),
    );

    if (!faqSection || !titleEl || !questionEls.length) return;

    const sequence = [titleEl, ...questionEls];

    sequence.forEach((el) => el.classList.add("reveal-base"));

    let faqInView = false;
    let started = false;
    const allowDirectRevealOnLoad = isElementInViewport(faqSection);

    const start = () => {
      if (started) return;
      if (!faqInView) return;
      if (!window.__sectionTwoDivsRevealed && !allowDirectRevealOnLoad) return;

      started = true;

      sequence.forEach((el, idx) => {
        el.style.transitionDelay = `${idx * 80}ms`;
        el.classList.add("reveal-visible");
      });
    };

    const faqObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          faqInView = true;
          start();
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      },
    );

    faqObserver.observe(faqSection);

    window.__onSectionTwoDivsRevealedCallbacks =
      window.__onSectionTwoDivsRevealedCallbacks || [];
    window.__onSectionTwoDivsRevealedCallbacks.push(start);

    if (allowDirectRevealOnLoad) {
      faqInView = true;
      start();
    }

    if (window.__sectionTwoDivsRevealed) start();
  });
})();

// Contact reveal (title like FAQ reveal pattern)
(() => {
  whenTitleAnimationDone(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (prefersReducedMotion) return;

    const contactSection =
      document.querySelector("#contact") || document.querySelector(".section-contact");
    const titleEl = document.querySelector(".section-contact__title");

    if (!contactSection || !titleEl) return;

    const sequence = [titleEl];
    sequence.forEach((el) => el.classList.add("reveal-base"));

    let sectionInView = false;
    let started = false;
    const allowDirectRevealOnLoad = isElementInViewport(contactSection);

    const start = () => {
      if (started) return;
      if (!sectionInView) return;

      started = true;
      sequence.forEach((el, idx) => {
        el.style.transitionDelay = `${idx * 80}ms`;
        el.classList.add("reveal-visible");
      });
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          sectionInView = true;
          start();
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      },
    );

    observer.observe(contactSection);
    if (allowDirectRevealOnLoad) {
      sectionInView = true;
      start();
    }
    start();
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

  // Start from a deterministic closed state.
  setOpen(false);

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      setOpen(false);
    }
  });
})();

// Navbar links stay neutral while scrolling:
// navigation only happens on click via native anchor behavior.

// FAQ accordion (chat bubbles)
(() => {
  const items = Array.from(document.querySelectorAll("[data-faq-item]"));
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  )?.matches;

  const getParts = (item) => {
    const trigger = item.querySelector("[data-faq-trigger]");
    const panel = item.querySelector("[data-faq-panel]");
    return { trigger, panel };
  };

  const closeItem = (item) => {
    const { trigger, panel } = getParts(item);
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", "false");
    item.dataset.open = "false";

    if (prefersReducedMotion) {
      panel.style.maxHeight = "0px";
      panel.setAttribute("hidden", "");
      return;
    }

    const from = panel.scrollHeight;
    panel.style.maxHeight = `${from}px`;
    panel.getBoundingClientRect(); // force reflow
    panel.style.maxHeight = "0px";

    const onEnd = (event) => {
      if (event.propertyName !== "max-height") return;
      if (trigger.getAttribute("aria-expanded") !== "false") return;
      panel.setAttribute("hidden", "");
    };
    panel.addEventListener("transitionend", onEnd, { once: true });
  };

  const openItem = (item) => {
    const { trigger, panel } = getParts(item);
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", "true");
    item.dataset.open = "true";
    panel.removeAttribute("hidden");

    if (prefersReducedMotion) {
      panel.style.maxHeight = "none";
      return;
    }

    panel.style.maxHeight = "0px";
    const to = panel.scrollHeight;
    panel.getBoundingClientRect(); // force reflow
    panel.style.maxHeight = `${to}px`;
  };

  const closeAllExcept = (keepItem) => {
    items.forEach((item) => {
      if (item === keepItem) return;
      const { trigger } = getParts(item);
      if (!trigger) return;
      if (trigger.getAttribute("aria-expanded") === "true") {
        closeItem(item);
      }
    });
  };

  items.forEach((item) => {
    const { trigger } = getParts(item);
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeItem(item);
        return;
      }
      closeAllExcept(item);
      openItem(item);
    });
  });

  // Initialize: no question open by default
  items.forEach((item) => {
    const { trigger, panel } = getParts(item);
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", "false");
    item.dataset.open = "false";
    panel.style.maxHeight = "0px";
    panel.setAttribute("hidden", "");
  });

  // Keep max-height correct on resize for the open item
  window.addEventListener("resize", () => {
    if (prefersReducedMotion) return;
    const open = items.find((item) => item.dataset.open === "true");
    if (!open) return;
    const { panel } = getParts(open);
    if (!panel) return;
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  });
})();

// Book a demo modal behavior
(() => {
  const openTriggers = document.querySelectorAll("[data-demo-modal-open]");
  const modal = document.querySelector(".demo-modal");
  const dialog = modal?.querySelector(".demo-modal__dialog");
  const closeElements = modal?.querySelectorAll("[data-demo-modal-close]");
  const form = modal?.querySelector(".demo-modal__form");
  const phoneInput = modal?.querySelector("#demo-modal-phone");
  const emailInput = modal?.querySelector("#demo-modal-email");
  const messageEl = modal?.querySelector(".demo-modal__message");
  const submitButton = modal?.querySelector(".demo-modal__submit-button");
  const successScreen = modal?.querySelector(".demo-modal__success");
  const header = modal?.querySelector(".demo-modal__header");

  if (
    !openTriggers.length ||
    !modal ||
    !dialog ||
    !closeElements?.length ||
    !form ||
    !phoneInput ||
    !emailInput ||
    !messageEl ||
    !submitButton ||
    !successScreen ||
    !header
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
    messageEl.classList.remove(
      "demo-modal__message--error",
      "demo-modal__message--success",
    );
    if (type === "error") {
      messageEl.classList.add("demo-modal__message--error");
    } else if (type === "success") {
      messageEl.classList.add("demo-modal__message--success");
    }
  };

  const setFieldError = (field, isError, text) => {
    if (isError) {
      field.classList.add("demo-modal__input--error");
      field.setAttribute("aria-invalid", "true");
      messageEl.id ||= "demo-modal-message";
      field.setAttribute("aria-describedby", messageEl.id);
      setMessage(text, "error");
    } else {
      field.classList.remove("demo-modal__input--error");
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
      if (
        !phoneInput.classList.contains("demo-modal__input--error") &&
        !emailInput.classList.contains("demo-modal__input--error")
      ) {
        setMessage("", null);
      }
    }
  };

  const setLoading = (isLoading) => {
    submitButton.dataset.loading = isLoading ? "true" : "false";
    submitButton.disabled = isLoading;
  };

  const showSuccessScreen = () => {
    header.hidden = true;
    form.hidden = true;
    successScreen.removeAttribute("hidden");

    const focusTarget =
      successScreen.querySelector("[data-demo-modal-close]") ||
      successScreen.querySelector(
        "button, [href], input, [tabindex]:not([tabindex='-1'])",
      );
    if (focusTarget && typeof focusTarget.focus === "function") {
      focusTarget.focus();
    }
  };

  const showFormScreen = () => {
    successScreen.setAttribute("hidden", "");
    header.hidden = false;
    form.hidden = false;
  };

  const openModal = () => {
    if (!modal.hasAttribute("hidden")) return;
    lastFocusedElement = document.activeElement;
    modal.removeAttribute("hidden");
    showFormScreen();
    setFieldError(phoneInput, false);
    setFieldError(emailInput, false);
    phoneInput.value = "";
    emailInput.value = "";
    phoneInput.focus();

    document.addEventListener("keydown", handleKeydown);
  };

  const closeModal = () => {
    if (modal.hasAttribute("hidden")) return;
    modal.setAttribute("hidden", "");
    setLoading(false);
    showFormScreen();
    setFieldError(phoneInput, false);
    setFieldError(emailInput, false);
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

  const isValidPhone = (value) => {
    if (!value) return false;
    const pattern = /^\+?[0-9\s\-().]{7,20}$/;
    return pattern.test(value);
  };

  const isValidEmail = (value) => {
    if (!value) return false;
    // Fallback au cas où la validation HTML5 ne suffit pas
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  phoneInput.addEventListener("input", () => {
    if (phoneInput.classList.contains("demo-modal__input--error")) {
      const value = phoneInput.value.trim();
      if (isValidPhone(value)) {
        setFieldError(phoneInput, false);
      }
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("demo-modal__input--error")) {
      const value = emailInput.value.trim();
      if (isValidEmail(value)) {
        setFieldError(emailInput, false);
      }
    }
  });

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

    const phoneValue = phoneInput.value.trim();
    const emailValue = emailInput.value.trim();
    setFieldError(phoneInput, false);
    setFieldError(emailInput, false);

    if (!isValidPhone(phoneValue)) {
      setFieldError(
        phoneInput,
        true,
        "Invalid phone number. Please re-enter your phone number.",
      );
      phoneInput.focus();
      return;
    }

    if (!isValidEmail(emailValue)) {
      setFieldError(emailInput, true, "Invalid email. Please re-enter your email.");
      emailInput.focus();
      return;
    }

    setLoading(true);
    setFieldError(phoneInput, false);
    setFieldError(emailInput, false);

    window
      .fetch(EDGE_FUNCTION_SEND_DEMO_CONFIRMATION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY3p4anN5a3NtcW9zdGxrdmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NDkxMTYsImV4cCI6MjA4OTQyNTExNn0.NTWloTO7OkoAMOiz8TSi9LrJc1ZGRwDnxo-ImRRbhLw",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY3p4anN5a3NtcW9zdGxrdmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NDkxMTYsImV4cCI6MjA4OTQyNTExNn0.NTWloTO7OkoAMOiz8TSi9LrJc1ZGRwDnxo-ImRRbhLw",
        },
        body: JSON.stringify({ email: emailValue, phone: phoneValue }),
      })
      .then(async (res) => {
        let data = null;
        try {
          data = await res.json();
        } catch {
          // If the server didn't return JSON, we'll fall back to generic error.
        }

        if (res.ok && data?.ok === true) {
          setLoading(false);
          showSuccessScreen();
          return;
        }

        const message =
          (data && typeof data.message === "string" && data.message.trim()) ||
          "Something went wrong while sending your confirmation email. Please try again.";

        setLoading(false);
        setFieldError(emailInput, true, message);
        emailInput.focus();
      })
      .catch(() => {
        setLoading(false);
        setFieldError(
          emailInput,
          true,
          "Could not reach the email service. Please try again in a moment.",
        );
        emailInput.focus();
      });
  });
})();
