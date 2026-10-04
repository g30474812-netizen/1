(() => {
  const trigger = document.querySelector("#auth-trigger");
  const overlay = document.querySelector("#auth-modal");
  const dialog = overlay?.querySelector(".auth-dialog");
  const closeButton = overlay?.querySelector(".auth-close");
  const form = overlay?.querySelector("#auth-form");
  const emailInput = overlay?.querySelector("#auth-email");
  const passwordInput = overlay?.querySelector("#auth-password");
  const passwordToggle = overlay?.querySelector(".auth-password-toggle");
  const submitButton = overlay?.querySelector(".auth-submit");
  const submitLabel = overlay?.querySelector(".auth-submit-label");
  const message = overlay?.querySelector("#auth-message");
  const successView = overlay?.querySelector("#auth-success");
  const successName = overlay?.querySelector(".auth-user-name");
  const continueButton = overlay?.querySelector(".auth-continue");
  const logoutButton = overlay?.querySelector(".auth-logout");
  const forgotButton = overlay?.querySelector(".auth-forgot");
  const title = overlay?.querySelector("#auth-title");
  const description = overlay?.querySelector("#auth-description");
  const focusableSelector = [
    "a[href]",
    "button:not(:disabled)",
    "input:not(:disabled)",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");
  let authenticatedUser = null;
  let authenticatedPrincipal = null;
  let previousFocus = null;
  let requestController = null;
  let closeTimer = 0;

  if (!trigger || !overlay || !dialog || !form) return;

  window.getAuthenticatedUser = () => authenticatedPrincipal;

  const t = (key, variables) => window.t?.(key, variables) ?? key;

  function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.classList.toggle("is-loading", isLoading);
    submitLabel.textContent = isLoading ? t("auth.loading") : t("auth.login");
  }

  function clearMessage() {
    message.hidden = true;
    message.textContent = "";
    message.classList.remove("is-error", "is-info", "is-shaking");
  }

  function showMessage(text, type = "error") {
    message.textContent = text;
    message.hidden = false;
    message.classList.remove("is-error", "is-info", "is-shaking");
    message.classList.add(type === "info" ? "is-info" : "is-error");
    if (type === "error") {
      void message.offsetWidth;
      message.classList.add("is-shaking");
    }
  }

  function clearFieldError(input) {
    input.removeAttribute("aria-invalid");
    const error = overlay.querySelector(`#${input.id}-error`);
    if (error) error.textContent = "";
  }

  function setFieldError(input, text) {
    input.setAttribute("aria-invalid", "true");
    const error = overlay.querySelector(`#${input.id}-error`);
    if (error) error.textContent = text;
  }

  function resetLoginForm() {
    form.hidden = false;
    successView.hidden = true;
    title.textContent = t("auth.welcome");
    description.textContent = t("auth.description");
    setLoading(false);
    clearMessage();
    [emailInput, passwordInput].forEach(clearFieldError);
  }

  function showAuthenticatedView(user) {
    form.hidden = true;
    successView.hidden = false;
    title.textContent = t("auth.successTitle");
    description.textContent = t("auth.successDescription");
    successName.textContent = user;
    continueButton.focus({ preventScroll: true });
  }

  function openModal() {
    window.clearTimeout(closeTimer);
    previousFocus = document.activeElement;
    resetLoginForm();

    if (authenticatedUser) showAuthenticatedView(authenticatedUser);

    overlay.hidden = false;
    document.body.classList.add("auth-open");
    const initialFocus = authenticatedUser ? continueButton : emailInput;
    void overlay.offsetWidth;
    overlay.classList.add("is-open");
    queueMicrotask(() => initialFocus.focus({ preventScroll: true }));
  }

  function closeModal(restoreFocus = true) {
    if (overlay.hidden) return;
    overlay.classList.remove("is-open");
    requestController?.abort();
    requestController = null;
    setLoading(false);
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      overlay.hidden = true;
      document.body.classList.remove("auth-open");
    }, 340);

    if (restoreFocus && previousFocus instanceof HTMLElement) {
      previousFocus.focus({ preventScroll: true });
    }
  }

  function validateForm() {
    clearMessage();
    [emailInput, passwordInput].forEach(clearFieldError);

    const email = emailInput.value.trim();
    emailInput.value = email;
    let firstInvalid = null;

    if (!email) {
      setFieldError(emailInput, t("auth.emailRequired"));
      firstInvalid = emailInput;
    } else if (!emailInput.validity.valid) {
      setFieldError(emailInput, t("auth.emailInvalid"));
      firstInvalid = emailInput;
    }

    if (!passwordInput.value) {
      setFieldError(passwordInput, t("auth.passwordRequired"));
      firstInvalid ??= passwordInput;
    }

    if (firstInvalid) {
      showMessage(t("auth.validation"));
      window.showNotification?.(t("auth.validation"), "warning");
      firstInvalid.focus();
      return null;
    }

    return { email, password: passwordInput.value };
  }

  async function submitLogin(event) {
    event.preventDefault();
    if (submitButton.disabled) return;

    const credentials = validateForm();
    if (!credentials) return;

    const controller = new AbortController();
    requestController = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": window.getLanguage?.() ?? "ky",
        },
        credentials: "include",
        signal: controller.signal,
        body: JSON.stringify(credentials),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const responseMessage = typeof payload.message === "string" ? payload.message : "";
        if (response.status === 401 || response.status === 403) {
          throw new Error(responseMessage || t("auth.invalidCredentials"));
        }
        throw new Error(responseMessage || t("auth.requestFailed"));
      }

      const user = payload.user ?? payload.data?.user ?? payload;
      const displayName = [user.name, user.fullName, user.email, credentials.email]
        .find((value) => typeof value === "string" && value.trim())
        .trim();

      authenticatedUser = displayName;
      authenticatedPrincipal = String(user.id ?? user.userId ?? user.email ?? credentials.email).trim();
      document.dispatchEvent(new CustomEvent("app:authchange"));
      trigger.removeAttribute("data-i18n");
      trigger.textContent = displayName;
      trigger.setAttribute("aria-label", t("auth.signedIn", { name: displayName }));
      trigger.setAttribute("aria-haspopup", "dialog");
      passwordInput.value = "";
      showAuthenticatedView(displayName);
      window.showNotification?.(t("auth.successToast"), "success");
      closeTimer = window.setTimeout(() => closeModal(), 900);
    } catch (error) {
      if (controller.signal.aborted) {
        if (requestController === controller && !overlay.hidden && overlay.classList.contains("is-open")) {
          const timeoutMessage = t("auth.timeout");
          showMessage(timeoutMessage);
          window.showNotification?.(timeoutMessage, "error");
        }
      } else if (error instanceof TypeError) {
        const connectionMessage = t("auth.connectionError");
        showMessage(connectionMessage);
        window.showNotification?.(connectionMessage, "error");
      } else {
        const errorMessage = error.message || t("auth.unknownError");
        showMessage(errorMessage);
        window.showNotification?.(errorMessage, "error");
      }
    } finally {
      window.clearTimeout(timeoutId);
      if (requestController === controller) {
        requestController = null;
        setLoading(false);
      }
    }
  }

  async function logout() {
    if (logoutButton.disabled) return;

    logoutButton.disabled = true;
    let serverLogoutSucceeded = true;

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Language": window.getLanguage?.() ?? "ky",
        },
        credentials: "include",
      });

      if (!response.ok) serverLogoutSucceeded = false;
    } catch {
      serverLogoutSucceeded = false;
    } finally {
      authenticatedUser = null;
      authenticatedPrincipal = null;
      trigger.setAttribute("data-i18n", "auth.login");
      trigger.textContent = t("auth.login");
      trigger.removeAttribute("aria-label");
      document.dispatchEvent(new CustomEvent("app:authchange"));
      window.showNotification?.(
        t(serverLogoutSucceeded ? "auth.logoutToast" : "auth.logoutError"),
        serverLogoutSucceeded ? "success" : "warning",
      );
      logoutButton.disabled = false;
      closeModal();
    }
  }

  trigger.addEventListener("click", openModal);
  closeButton.addEventListener("click", () => closeModal());
  continueButton.addEventListener("click", () => closeModal());
  logoutButton.addEventListener("click", logout);
  form.addEventListener("submit", submitLogin);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal();
  });

  passwordToggle.addEventListener("click", () => {
    const isVisible = passwordInput.type === "text";
    passwordInput.type = isVisible ? "password" : "text";
    passwordToggle.setAttribute("aria-pressed", String(!isVisible));
    passwordToggle.setAttribute("aria-label", t(isVisible ? "auth.showPassword" : "auth.hidePassword"));
    passwordInput.focus({ preventScroll: true });
  });

  forgotButton.addEventListener("click", () => {
    const infoMessage = t("auth.forgotInfo");
    showMessage(infoMessage, "info");
    window.showNotification?.(infoMessage, "info");
  });

  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
      clearFieldError(input);
      clearMessage();
    });
  });

  document.addEventListener("app:languagechange", () => {
    if (authenticatedUser) {
      trigger.setAttribute("aria-label", t("auth.signedIn", { name: authenticatedUser }));
    }
    if (!form.hidden) {
      title.textContent = t("auth.welcome");
      description.textContent = t("auth.description");
      if (submitButton.disabled) setLoading(true);
    } else {
      title.textContent = t("auth.successTitle");
      description.textContent = t("auth.successDescription");
    }
    if (!message.hidden) clearMessage();
    [emailInput, passwordInput].forEach(clearFieldError);
  });

  document.addEventListener("keydown", (event) => {
    if (overlay.hidden || !overlay.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = [...dialog.querySelectorAll(focusableSelector)]
      .filter((element) => !element.closest("[hidden]") && element.getClientRects().length);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }, true);
})();
