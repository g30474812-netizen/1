(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerEnabled = window.matchMedia("(min-width: 769px) and (pointer: fine)");
  const siteHeader = document.querySelector(".topbar");
  const scrollProgress = document.querySelector(".scroll-progress");
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const trackedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const heroSteps = document.querySelectorAll("[data-hero-step]");
  const revealItems = document.querySelectorAll("[data-reveal]");
  const counters = document.querySelectorAll("[data-count]");
  const burger = document.querySelector("[data-burger-tilt]");
  const heroVisual = burger?.closest(".hero-visual");
  const burgerLayers = [...document.querySelectorAll(".burger-fallback .burger-layer")];
  const layerTravel = new Map([
    ["bun-top", -58],
    ["lettuce", -36],
    ["tomato", -14],
    ["cheese", 12],
    ["patty", 34],
    ["bun-bottom", 58],
  ]);
  const glowDepths = [0.045, -0.07, 0.09];
  const glows = [...document.querySelectorAll(".ambient-glows .glow")];
  const floatingCards = [...document.querySelectorAll(".floating-card[data-float-depth]")];
  const pointerStates = [];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (from, to, amount) => from + (to - from) * amount;
  let frameId = 0;
  let scrollDirty = true;

  heroSteps.forEach((element) => {
    const order = Number(element.dataset.heroStep) || 0;
    element.style.setProperty("--hero-delay", `${order * 80}ms`);
  });

  revealItems.forEach((element) => {
    const siblings = [...(element.parentElement?.children ?? [])]
      .filter((sibling) => sibling.matches("[data-reveal='card']"));
    const columns = Math.max(
      1,
      getComputedStyle(element.parentElement ?? element).gridTemplateColumns.split(" ").length,
    );
    const index = siblings.indexOf(element);
    element.style.setProperty("--reveal-delay", `${Math.max(0, index % columns) * 80}ms`);
  });

  function countUp(element) {
    const target = Number(element.dataset.count);
    const decimals = Number(element.dataset.decimals ?? (String(target).split(".")[1]?.length ?? 0));
    if (reducedMotion.matches || !Number.isFinite(target)) {
      element.textContent = `${target}${element.dataset.suffix ?? ""}`;
      return;
    }

    const startedAt = performance.now();
    const duration = 1300;

    function step(now) {
      const progress = clamp((now - startedAt) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${(target * eased).toFixed(decimals)}${element.dataset.suffix ?? ""}`;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  document.addEventListener("app:languagechange", () => {
    counters.forEach((element) => {
      const value = Number(element.dataset.count);
      const decimals = Number(element.dataset.decimals ?? (String(value).split(".")[1]?.length ?? 0));
      if (Number.isFinite(value)) {
        element.textContent = `${value.toFixed(decimals)}${element.dataset.suffix ?? ""}`;
      }
    });
  });

  function reveal(element) {
    element.classList.add("is-visible");
    if (element.matches("[data-count]")) countUp(element);
  }

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach(reveal);
    counters.forEach(countUp);
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

    revealItems.forEach((element) => revealObserver.observe(element));
    counters.forEach((element) => revealObserver.observe(element));
  }

  function scheduleFrame() {
    if (!frameId) frameId = requestAnimationFrame(renderFrame);
  }

  function updateScrollMotion() {
    scrollDirty = false;
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollableHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = clamp(scrollY / scrollableHeight, 0, 1);

    if (scrollProgress) {
      scrollProgress.style.setProperty("--scroll-progress", `${(progress * 100).toFixed(2)}%`);
    }

    siteHeader?.classList.toggle("is-scrolled", scrollY > 18);

    let activeSection = trackedSections[0];
    trackedSections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 150) activeSection = section;
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeSection?.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    const burgerStage = burger?.querySelector(".burger-visual");

    if (burgerStage && !reducedMotion.matches) {
      const heroHeight = burgerStage.closest(".hero")?.offsetHeight ?? window.innerHeight;
      const progress = clamp((window.scrollY || window.pageYOffset) / heroHeight, 0, 1);
      const explode = Math.sin(progress * Math.PI);

      burgerStage.style.setProperty("--burger-explode", explode.toFixed(4));
      burgerLayers.forEach((layer) => {
        const distance = layerTravel.get([...layer.classList].find((name) => layerTravel.has(name))) ?? 0;
        layer.style.setProperty("--layer-scroll-y", `${(distance * explode).toFixed(2)}px`);
      });
    }

    glows.forEach((glow, index) => {
      const depth = glowDepths[index] ?? 0.05;
      const offset = reducedMotion.matches ? 0 : clamp(scrollY * depth, -110, 110);
      glow.style.setProperty("--glow-scroll", `${offset.toFixed(1)}px`);
    });
  }

  function renderFrame() {
    frameId = 0;
    if (scrollDirty) updateScrollMotion();

    let settling = false;
    pointerStates.forEach((state) => {
      state.x = lerp(state.x, state.targetX, 0.16);
      state.y = lerp(state.y, state.targetY, 0.16);
      state.apply(state.x, state.y);

      const distance = Math.abs(state.targetX - state.x) + Math.abs(state.targetY - state.y);
      if (distance > 0.04) settling = true;
      else if (!state.active) state.element.classList.remove("is-pointer-active");
    });

    if (settling) scheduleFrame();
  }

  function addPointerState(element, apply) {
    const state = { element, x: 0, y: 0, targetX: 0, targetY: 0, active: false, apply };
    pointerStates.push(state);
    return state;
  }

  function setPointerTarget(state, x, y) {
    state.targetX = x;
    state.targetY = y;
    state.active = true;
    state.element.classList.add("is-pointer-active");
    scheduleFrame();
  }

  function resetPointerTarget(state) {
    state.targetX = 0;
    state.targetY = 0;
    state.active = false;
    scheduleFrame();
  }

  if (!reducedMotion.matches && pointerEnabled.matches) {
    if (burger && heroVisual) {
      const burgerTilt = addPointerState(burger, (x, y) => {
        burger.style.transform = `perspective(1100px) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;
      });
      const floatStates = floatingCards.map((card) => {
        const depth = Number(card.dataset.floatDepth) || 0.5;
        return addPointerState(card, (x, y) => {
          card.style.transform = `translate3d(${(x * depth * 1.9).toFixed(2)}px, ${(y * depth * 1.9).toFixed(2)}px, 0)`;
        });
      });

      heroVisual.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        const bounds = heroVisual.getBoundingClientRect();
        const x = clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -1, 1);
        const y = clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2, -1, 1);
        const magnitude = Math.max(1, Math.hypot(x, y));
        const tiltScale = 8 / magnitude;
        setPointerTarget(burgerTilt, -y * tiltScale, x * tiltScale);
        floatStates.forEach((state) => setPointerTarget(state, x * 8, y * 8));
      }, { passive: true });

      heroVisual.addEventListener("pointerleave", () => {
        resetPointerTarget(burgerTilt);
        floatStates.forEach(resetPointerTarget);
      }, { passive: true });
    }

    document.querySelectorAll(".product-card, .feature-item, .promo-card, .menu-card").forEach((card) => {
      const state = addPointerState(card, (x, y) => {
        card.style.setProperty("--tilt-x", `${x.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${y.toFixed(2)}deg`);
      });

      card.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        const bounds = card.getBoundingClientRect();
        const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
        const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
        card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        setPointerTarget(state, (0.5 - y) * 11, (x - 0.5) * 11);
      }, { passive: true });

      card.addEventListener("pointerleave", () => resetPointerTarget(state), { passive: true });
    });

    document.querySelectorAll(".btn:not(.auth-trigger)").forEach((button) => {
      const state = addPointerState(button, (x, y) => {
        button.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
        button.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
      });

      button.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
        const y = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
        setPointerTarget(state, clamp(x * 12, -6, 6), clamp(y * 10, -5, 5));
      }, { passive: true });

      button.addEventListener("pointerleave", () => resetPointerTarget(state), { passive: true });
    });
  }

  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      if (!target) return;
      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  window.addEventListener("scroll", () => {
    scrollDirty = true;
    scheduleFrame();
  }, { passive: true });

  window.addEventListener("resize", () => {
    scrollDirty = true;
    scheduleFrame();
  }, { passive: true });

  root.classList.add("motion-ready");
  scheduleFrame();
})();

(() => {
  const form = document.querySelector("#menu-search-form");
  const input = document.querySelector("#menu-search-input");
  const clearButton = document.querySelector(".menu-search-clear");
  const emptyState = document.querySelector("[data-search-empty]");
  const cards = [...document.querySelectorAll(".product-grid > .product-card")];
  const categoryHeadings = [...document.querySelectorAll(".menu-category-heading")];
  const hiddenTimers = new WeakMap();

  if (!form || !input || !emptyState || cards.length === 0) return;

  const normalize = (value) => value
    .normalize("NFKC")
    .toLocaleLowerCase(document.documentElement.lang === "ky" ? "ky-KG" : "ru-RU")
    .replace(/ё/g, "е")
    .trim();

  const cardText = (card) => [
    card.querySelector("h3")?.textContent ?? "",
    card.querySelector(".product-body > p")?.textContent ?? "",
  ].join(" ");

  function setCardVisible(card) {
    const timer = hiddenTimers.get(card);
    if (timer) window.clearTimeout(timer);

    if (card.hidden) {
      card.hidden = false;
      requestAnimationFrame(() => card.classList.remove("is-search-hidden"));
      return;
    }

    requestAnimationFrame(() => card.classList.remove("is-search-hidden"));
  }

  function setCardHidden(card) {
    card.classList.add("is-search-hidden");
    const timer = window.setTimeout(() => {
      if (card.classList.contains("is-search-hidden")) card.hidden = true;
    }, 240);
    hiddenTimers.set(card, timer);
  }

  function updateSearch() {
    const query = normalize(input.value);
    const hasQuery = query.length > 0;
    let visibleCount = 0;

    cards.forEach((card) => {
      const matches = !hasQuery || normalize(cardText(card)).includes(query);
      if (matches) {
        visibleCount += 1;
        setCardVisible(card);
      } else {
        setCardHidden(card);
      }
    });

    categoryHeadings.forEach((heading) => {
      const isDrinkHeading = heading.classList.contains("menu-category-heading--drinks");
      const categoryCards = cards.filter((card) => card.classList.contains("product-card--drink") === isDrinkHeading);
      const categoryHasMatches = categoryCards.some((card) => !card.hidden && !card.classList.contains("is-search-hidden"));
      heading.hidden = hasQuery && !categoryHasMatches;
    });

    emptyState.hidden = !hasQuery || visibleCount > 0;
    clearButton.hidden = !hasQuery;
    form.classList.toggle("has-query", hasQuery);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateSearch();
  });

  input.addEventListener("input", updateSearch);
  input.addEventListener("search", updateSearch);

  clearButton.addEventListener("click", () => {
    input.value = "";
    updateSearch();
    input.focus({ preventScroll: true });
  });

  document.addEventListener("app:languagechange", updateSearch);
  updateSearch();
})();

(() => {
  const header = document.querySelector(".topbar");
  const toggle = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#site-navigation");
  const links = [...document.querySelectorAll("#site-navigation a")];

  if (!header || !toggle || !navigation) return;

  let isOpen = false;

  const getLabel = (key) => (typeof window.t === "function" ? window.t(key) : key);

  function setMenuState(nextState, { returnFocus = false } = {}) {
    isOpen = nextState;
    header.classList.toggle("menu-is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen
        ? getLabel("nav.menuClose")
        : getLabel("nav.menuOpen"),
    );

    if (isOpen) {
      navigation.removeAttribute("aria-hidden");
      navigation.removeAttribute("inert");
      document.body.classList.add("menu-open");
    } else {
      navigation.setAttribute("aria-hidden", "true");
      navigation.setAttribute("inert", "");
      document.body.classList.remove("menu-open");
      if (returnFocus) toggle.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener("click", () => {
    setMenuState(!isOpen, { returnFocus: isOpen });
  });

  links.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("pointerdown", (event) => {
    if (isOpen && !header.contains(event.target)) setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      setMenuState(false, { returnFocus: true });
    }
  });

  document.addEventListener("app:languagechange", () => {
    toggle.setAttribute(
      "aria-label",
      isOpen
        ? getLabel("nav.menuClose")
        : getLabel("nav.menuOpen"),
    );
  });

  setMenuState(false);
})();
