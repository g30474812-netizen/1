(() => {
  const region = document.querySelector("#toast-region");
  const duration = 3000;
  const closeDuration = 320;
  const icons = {
    success: '<path d="m5 12 4.5 4.5L19 7" />',
    error: '<path d="M12 8v5m0 3h.01" /><circle cx="12" cy="12" r="9" />',
    warning: '<path d="M12 8v5m0 3h.01" /><path d="m10.3 4.9-7 12.2A2 2 0 0 0 5 20h14a2 2 0 0 0 1.7-2.9l-7-12.2a2 2 0 0 0-3.4 0Z" />',
    info: '<circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8h.01" />',
  };

  if (!region) return;

  function showNotification(message, type = "info") {
    const safeType = Object.hasOwn(icons, type) ? type : "info";
    const toast = document.createElement("article");
    toast.className = `toast toast--${safeType}`;
    toast.setAttribute("role", safeType === "error" || safeType === "warning" ? "alert" : "status");
    toast.setAttribute("aria-live", safeType === "error" || safeType === "warning" ? "assertive" : "polite");
    toast.setAttribute("aria-atomic", "true");

    const icon = document.createElement("span");
    icon.className = "toast-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = `<svg viewBox="0 0 24 24" focusable="false">${icons[safeType]}</svg>`;

    const text = document.createElement("p");
    text.className = "toast-message";
    text.textContent = String(message ?? "");

    const closeButton = document.createElement("button");
    closeButton.className = "toast-close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", window.t?.("toast.close") ?? "toast.close");
    closeButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" /></svg>';

    const progress = document.createElement("span");
    progress.className = "toast-progress";
    progress.setAttribute("aria-hidden", "true");

    toast.append(icon, text, closeButton, progress);
    region.prepend(toast);

    let remaining = duration;
    let timerId = 0;
    let startedAt = 0;
    let removed = false;

    function scheduleDismissal() {
      if (removed || timerId) return;
      startedAt = performance.now();
      timerId = window.setTimeout(dismiss, remaining);
    }

    function pauseDismissal() {
      if (!timerId) return;
      window.clearTimeout(timerId);
      timerId = 0;
      remaining = Math.max(0, remaining - (performance.now() - startedAt));
      toast.classList.add("is-paused");
    }

    function resumeDismissal() {
      if (removed) return;
      toast.classList.remove("is-paused");
      scheduleDismissal();
    }

    function dismiss() {
      if (removed) return;
      removed = true;
      window.clearTimeout(timerId);
      timerId = 0;
      toast.classList.remove("is-visible");
      toast.classList.add("is-leaving");
      window.setTimeout(() => toast.remove(), closeDuration);
    }

    closeButton.addEventListener("click", dismiss, { once: true });
    toast.addEventListener("pointerenter", pauseDismissal);
    toast.addEventListener("pointerleave", resumeDismissal);
    toast.addEventListener("focusin", pauseDismissal);
    toast.addEventListener("focusout", (event) => {
      if (!toast.contains(event.relatedTarget)) resumeDismissal();
    });

    requestAnimationFrame(() => toast.classList.add("is-visible"));
    scheduleDismissal();
    return toast;
  }

  window.showNotification = showNotification;
})();
