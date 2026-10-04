(() => {
  const storageKey = "fast-food-kg-product-reviews:v1";
  const maxCommentLength = 280;
  const triggers = [...document.querySelectorAll("[data-rating-trigger]")];
  const overlay = document.querySelector("#rating-modal");
  const dialog = overlay?.querySelector(".rating-dialog");
  const closeButton = overlay?.querySelector(".rating-close");
  const form = overlay?.querySelector("[data-rating-form]");
  const picker = overlay?.querySelector("[data-rating-picker]");
  const commentInput = overlay?.querySelector("#rating-comment");
  const submitButton = overlay?.querySelector(".rating-submit");
  const loginButton = overlay?.querySelector("[data-rating-login]");
  const authNote = overlay?.querySelector("[data-rating-auth-note]");
  const selectionLabel = overlay?.querySelector("[data-rating-selection]");
  const characterCount = overlay?.querySelector("[data-rating-character-count]");
  const productName = overlay?.querySelector("[data-rating-product-name]");
  const productSummary = overlay?.querySelector("[data-rating-summary]");
  const reviewList = overlay?.querySelector("[data-rating-review-list]");
  const products = new Map();
  let selectedProductId = "";
  let selectedRating = 0;
  let previewRating = 0;
  let previousFocus = null;
  let closeTimer = 0;

  if (!overlay || !dialog || !form || !picker || !commentInput) return;

  const t = (key, variables) => window.t?.(key, variables) ?? key;

  function loadReviews() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      if (!Array.isArray(stored)) return [];
      return stored.filter((review) => (
        review
        && typeof review.productId === "string"
        && Number.isInteger(review.rating)
        && review.rating >= 1
        && review.rating <= 5
        && typeof review.userId === "string"
        && typeof review.comment === "string"
      ));
    } catch {
      return [];
    }
  }

  let reviews = loadReviews();

  triggers.forEach((trigger) => {
    const productId = trigger.dataset.productId;
    const card = trigger.closest(".product-card");
    const name = card?.querySelector("h3")?.textContent.trim() ?? productId;
    if (productId) {
      products.set(productId, {
        name,
        baseRating: Number(trigger.dataset.baseRating) || 0,
        baseCount: Number(trigger.dataset.baseCount) || 0,
        trigger,
      });
    }
  });

  function getPrincipal() {
    const principal = window.getAuthenticatedUser?.();
    return typeof principal === "string" && principal.trim() ? principal.trim() : "";
  }

  function getProductReviews(productId) {
    return reviews.filter((review) => review.productId === productId);
  }

  function getOwnReview(productId) {
    const userId = getPrincipal();
    return userId
      ? reviews.find((review) => review.productId === productId && review.userId === userId)
      : null;
  }

  function getSummary(productId) {
    const product = products.get(productId);
    const productReviews = getProductReviews(productId);
    const reviewCount = productReviews.length;
    const count = product.baseCount + reviewCount;
    const total = (product.baseRating * product.baseCount)
      + productReviews.reduce((sum, review) => sum + review.rating, 0);
    return {
      average: count ? total / count : 0,
      count,
    };
  }

  function renderProductSummary(productId) {
    const product = products.get(productId);
    if (!product) return;
    const { average, count } = getSummary(productId);
    const ratingStars = document.createElement("span");
    ratingStars.className = "rating-stars";
    ratingStars.setAttribute("aria-hidden", "true");
    ratingStars.textContent = "★★★★★";

    const ratingValue = document.createElement("span");
    ratingValue.className = "rating-value";
    ratingValue.textContent = average ? average.toFixed(1) : "—";

    const countLabel = document.createElement("span");
    countLabel.className = "rating-count";
    countLabel.textContent = `${count} ${t("rating.count")}`;

    product.trigger.replaceChildren(ratingStars, ratingValue, countLabel);
    product.trigger.setAttribute("aria-label", t("rating.ariaSummary", {
      average: average ? average.toFixed(1) : "—",
      count,
    }));
  }

  function renderAllSummaries() {
    products.forEach((product, productId) => {
      product.name = product.trigger.closest(".product-card")?.querySelector("h3")?.textContent.trim() ?? productId;
      renderProductSummary(productId);
    });
  }

  function renderPicker() {
    picker.replaceChildren();
    for (let rating = 1; rating <= 5; rating += 1) {
      const star = document.createElement("button");
      star.className = "rating-star";
      star.type = "button";
      star.dataset.ratingValue = String(rating);
      star.textContent = "★";
      star.setAttribute("aria-label", t("rating.star", { rating }));
      star.setAttribute("aria-pressed", String(selectedRating === rating));
      star.addEventListener("click", () => {
        if (picker.classList.contains("is-locked")) return;
        selectedRating = rating;
        previewRating = 0;
        updatePicker();
      });
      star.addEventListener("pointerenter", () => {
        if (picker.classList.contains("is-locked")) return;
        previewRating = rating;
        updatePicker();
      });
      star.addEventListener("focus", () => {
        if (picker.classList.contains("is-locked")) return;
        previewRating = rating;
        updatePicker();
      });
      star.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const nextRating = event.key === "Home"
          ? 1
          : event.key === "End"
            ? 5
            : Math.min(5, Math.max(1, rating + (event.key === "ArrowRight" ? 1 : -1)));
        picker.querySelector(`[data-rating-value="${nextRating}"]`)?.focus();
      });
      picker.append(star);
    }
  }

  function updatePicker() {
    const displayedRating = previewRating || selectedRating;
    picker.querySelectorAll(".rating-star").forEach((star) => {
      const value = Number(star.dataset.ratingValue);
      star.classList.toggle("is-active", value <= displayedRating);
      star.setAttribute("aria-pressed", String(selectedRating === value));
    });
    selectionLabel.textContent = selectedRating
      ? t("rating.selection", { rating: selectedRating })
      : "";
  }

  function renderReviewList(productId) {
    reviewList.replaceChildren();
    const productReviews = getProductReviews(productId).slice().reverse();
    if (!productReviews.length) {
      const emptyState = document.createElement("p");
      emptyState.className = "rating-no-reviews";
      emptyState.textContent = t("rating.noReviews");
      reviewList.append(emptyState);
      return;
    }

    productReviews.slice(0, 10).forEach((review) => {
      const item = document.createElement("article");
      item.className = "rating-review";
      item.classList.add("is-appearing");

      const stars = document.createElement("span");
      stars.className = "rating-review-stars";
      stars.setAttribute("aria-label", t("rating.star", { rating: review.rating }));
      stars.textContent = `${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}`;
      item.append(stars);

      const comment = document.createElement("span");
      comment.textContent = review.comment || t("rating.noComment");
      item.append(comment);

      if (review.createdAt) {
        const date = new Date(review.createdAt);
        if (Number.isFinite(date.getTime())) {
          const dateLabel = document.createElement("time");
          dateLabel.className = "rating-review-date";
          dateLabel.dateTime = date.toISOString();
          dateLabel.textContent = new Intl.DateTimeFormat(
            window.getLanguage?.() === "ru" ? "ru-RU" : "ky-KG",
            { dateStyle: "medium" },
          ).format(date);
          item.append(dateLabel);
        }
      }
      reviewList.append(item);
    });
  }

  function setAuthPrompt(visible) {
    authNote.hidden = !visible;
    authNote.textContent = visible ? t("rating.loginRequired") : "";
    loginButton.hidden = !visible;
  }

  function openRating(productId, trigger) {
    const product = products.get(productId);
    if (!product) return;
    window.clearTimeout(closeTimer);
    selectedProductId = productId;
    selectedRating = 0;
    previewRating = 0;
    previousFocus = trigger ?? document.activeElement;
    productName.textContent = product.name;
    renderProductSummary(productId);
    const { average, count } = getSummary(productId);
    productSummary.textContent = `${average ? average.toFixed(1) : "—"} · ${count} ${t("rating.count")}`;
    commentInput.value = "";
    characterCount.textContent = `0 / ${maxCommentLength}`;
    picker.classList.remove("is-locked");
    submitButton.disabled = false;
    submitButton.textContent = t("rating.submit");
    renderPicker();

    const ownReview = getOwnReview(productId);
    if (ownReview) {
      selectedRating = ownReview.rating;
      commentInput.value = ownReview.comment;
      commentInput.disabled = true;
      picker.classList.add("is-locked");
      submitButton.disabled = true;
      submitButton.textContent = t("rating.alreadyRated");
    } else {
      commentInput.disabled = false;
    }
    updatePicker();
    characterCount.textContent = `${commentInput.value.length} / ${maxCommentLength}`;
    renderReviewList(productId);

    const needsLogin = !getPrincipal() && !ownReview;
    setAuthPrompt(needsLogin);
    overlay.hidden = false;
    document.body.classList.add("rating-open");
    void overlay.offsetWidth;
    overlay.classList.add("is-open");
    queueMicrotask(() => (needsLogin ? loginButton : picker.querySelector(".rating-star"))?.focus());
    if (needsLogin) window.showNotification?.(t("rating.loginRequired"), "warning");
  }

  function closeRating(restoreFocus = true) {
    if (overlay.hidden) return;
    overlay.classList.remove("is-open");
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      overlay.hidden = true;
      document.body.classList.remove("rating-open");
    }, 240);
    if (restoreFocus && previousFocus instanceof HTMLElement) {
      previousFocus.focus({ preventScroll: true });
    }
  }

  function hasDuplicate(productId, userId) {
    return reviews.some((review) => review.productId === productId && review.userId === userId);
  }

  async function submitReview(event) {
    event.preventDefault();
    if (submitButton.disabled) return;

    const userId = getPrincipal();
    if (!userId) {
      setAuthPrompt(true);
      window.showNotification?.(t("rating.loginRequired"), "warning");
      loginButton.focus();
      return;
    }
    if (!Number.isInteger(selectedRating) || selectedRating < 1 || selectedRating > 5) {
      window.showNotification?.(t("rating.empty"), "warning");
      picker.querySelector(".rating-star")?.focus();
      return;
    }
    const comment = commentInput.value.trim();
    if (comment.length > maxCommentLength) {
      window.showNotification?.(t("rating.tooLong"), "warning");
      commentInput.focus();
      return;
    }
    if (hasDuplicate(selectedProductId, userId)) {
      submitButton.disabled = true;
      window.showNotification?.(t("rating.alreadyRated"), "info");
      openRating(selectedProductId, previousFocus);
      return;
    }

    const review = {
      productId: selectedProductId,
      rating: selectedRating,
      comment,
      userId,
      createdAt: new Date().toISOString(),
    };
    submitButton.disabled = true;

    try {
      if (window.FAST_FOOD_RATINGS_API_ENABLED === true) {
        const response = await fetch(`/api/products/${encodeURIComponent(selectedProductId)}/reviews`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": window.getLanguage?.() ?? "ky",
          },
          credentials: "include",
          body: JSON.stringify({ rating: review.rating, comment: review.comment }),
        });
        if (!response.ok) throw new Error("Rating API request failed");
        reviews.push(review);
      } else {
        reviews.push(review);
        try {
          localStorage.setItem(storageKey, JSON.stringify(reviews));
        } catch {
          reviews.pop();
          throw new Error("Rating storage is unavailable");
        }
      }

      renderAllSummaries();
      renderReviewList(selectedProductId);
      window.showNotification?.(t("rating.sent"), "success");
      window.setTimeout(() => closeRating(), 450);
    } catch {
      submitButton.disabled = false;
      const message = window.FAST_FOOD_RATINGS_API_ENABLED === true
        ? t("rating.apiError")
        : t("rating.storageError");
      window.showNotification?.(message, "error");
    }
  }

  picker.addEventListener("pointerleave", () => {
    previewRating = 0;
    updatePicker();
  });
  picker.addEventListener("focusout", (event) => {
    if (picker.contains(event.relatedTarget)) return;
    previewRating = 0;
    updatePicker();
  });

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openRating(trigger.dataset.productId, trigger));
  });
  closeButton?.addEventListener("click", () => closeRating());
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeRating();
  });
  form.addEventListener("submit", submitReview);
  commentInput.addEventListener("input", () => {
    characterCount.textContent = `${commentInput.value.length} / ${maxCommentLength}`;
  });
  loginButton?.addEventListener("click", () => document.querySelector("#auth-trigger")?.click());

  document.addEventListener("app:languagechange", () => {
    renderAllSummaries();
    if (overlay.hidden || !selectedProductId) return;
    productName.textContent = products.get(selectedProductId)?.name ?? "";
    const { average, count } = getSummary(selectedProductId);
    productSummary.textContent = `${average ? average.toFixed(1) : "—"} · ${count} ${t("rating.count")}`;
    submitButton.textContent = getOwnReview(selectedProductId) ? t("rating.alreadyRated") : t("rating.submit");
    setAuthPrompt(!getPrincipal() && !getOwnReview(selectedProductId));
    renderPicker();
    updatePicker();
    renderReviewList(selectedProductId);
  });

  document.addEventListener("app:authchange", () => {
    if (overlay.hidden) return;
    setAuthPrompt(!getPrincipal() && !getOwnReview(selectedProductId));
  });

  document.addEventListener("keydown", (event) => {
    if (overlay.hidden || !overlay.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeRating();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll("button:not(:disabled), textarea:not(:disabled)")]
      .filter((element) => !element.hidden && element.getClientRects().length);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  renderAllSummaries();
})();