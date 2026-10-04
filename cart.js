(() => {
  const storageKey = "fast-food-kg-cart";
  const cartToggle = document.querySelector("#cart-toggle");
  const cartItems = document.querySelector(".cart-items");
  const cartCount = document.querySelector(".cart-count");
  const cartTitleCount = document.querySelector(".cart-title-count");
  const cartSubtotal = document.querySelector(".cart-subtotal");
  const cartTotal = document.querySelector(".cart-total");
  const cartClearButton = document.querySelector(".cart-clear-button");
  const cartOrderButton = document.querySelector(".cart-order-button");
  const goToCartButton = document.querySelector(".go-to-cart");
  const cartMenuButton = document.querySelector(".cart-menu-button");
  const checkoutForm = document.querySelector(".checkout-form");
  const checkoutStatus = document.querySelector(".checkout-status");
  const checkoutSubmit = checkoutForm.querySelector(".cart-confirm-button");
  const products = new Map();
  const t = (key, variables) => window.t?.(key, variables) ?? key;

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    const card = button.closest(".product-card");
    const image = card?.querySelector(".product-image");
    const name = card?.querySelector("h3")?.textContent.trim();
    const description = card?.querySelector(".product-body > p")?.textContent.trim();
    const priceText = card?.querySelector(".product-meta strong")?.textContent ?? "";
    const price = Number(priceText.replace(/\D/g, ""));

    if (button.dataset.productId && name && Number.isSafeInteger(price) && price > 0) {
      products.set(button.dataset.productId, {
        id: button.dataset.productId,
        name,
        description: description ?? "",
        price,
        imageClass: [...(image?.classList ?? [])].find((className) => className.startsWith("image-")) ?? "",
      });
    }
  });

  function loadCart() {
    try {
      const storedCart = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
      if (!storedCart || typeof storedCart !== "object" || Array.isArray(storedCart)) return {};

      return Object.fromEntries(
        Object.entries(storedCart).filter(([id, quantity]) =>
          products.has(id) && Number.isSafeInteger(quantity) && quantity > 0,
        ),
      );
    } catch {
      return {};
    }
  }

  let cart = loadCart();

  function formatPrice(price) {
    const isEnglish = window.getLanguage?.() === "en";
    const locale = isEnglish ? "en-US" : "ru-RU";
    return `${new Intl.NumberFormat(locale).format(price)} ${isEnglish ? "som" : "сом"}`;
  }

  function itemWord(count) {
    const lastTwo = count % 100;
    const last = count % 10;
    const language = window.getLanguage?.();
    if (language === "ky") return t("cart.itemOne");
    if (language === "en") return t(count === 1 ? "cart.itemOne" : "cart.itemMany");
    if (lastTwo >= 11 && lastTwo <= 14) return t("cart.itemMany");
    if (last === 1) return t("cart.itemOne");
    if (last >= 2 && last <= 4) return t("cart.itemFew");
    return t("cart.itemMany");
  }

  function createButton(className, label, action, productId, text) {
    const button = document.createElement("button");
    button.className = className;
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.dataset.action = action;
    button.dataset.productId = productId;
    button.textContent = text;
    return button;
  }

  function createCartItem(product, quantity) {
    const item = document.createElement("article");
    item.className = "cart-item";

    const image = document.createElement("div");
    image.className = `cart-item-image ${product.imageClass}`;
    image.setAttribute("role", "img");
    image.setAttribute("aria-label", product.name);

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const heading = document.createElement("div");
    heading.className = "cart-item-heading";
    const productCopy = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = product.name;
    const description = document.createElement("p");
    description.textContent = product.description;
    productCopy.append(name, description);

    const removeButton = createButton(
      "cart-remove",
      t("cart.removeItem", { name: product.name }),
      "remove",
      product.id,
      "",
    );
    removeButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3" /></svg>';
    heading.append(productCopy, removeButton);

    const bottom = document.createElement("div");
    bottom.className = "cart-item-bottom";
    const quantityControl = document.createElement("div");
    quantityControl.className = "quantity-control";
    quantityControl.setAttribute("aria-label", t("cart.quantity", { count: quantity }));
    quantityControl.append(
      createButton("", t("cart.decreaseItem", { name: product.name }), "decrease", product.id, "−"),
    );
    const quantityLabel = document.createElement("span");
    quantityLabel.textContent = quantity;
    quantityControl.append(quantityLabel);
    quantityControl.append(
      createButton("", t("cart.increaseItem", { name: product.name }), "increase", product.id, "+"),
    );

    const price = document.createElement("div");
    price.className = "cart-item-price";
    const unitPrice = document.createElement("span");
    unitPrice.textContent = `${formatPrice(product.price)} ${t("cart.perItem")}`;
    const lineTotal = document.createElement("strong");
    lineTotal.textContent = formatPrice(product.price * quantity);
    price.append(unitPrice, lineTotal);
    bottom.append(quantityControl, price);
    info.append(heading, bottom);
    item.append(image, info);
    return item;
  }

  function renderCart() {
    const fragment = document.createDocumentFragment();
    let itemCount = 0;
    let subtotal = 0;

    Object.entries(cart).forEach(([id, quantity]) => {
      const product = products.get(id);
      if (!product) return;
      itemCount += quantity;
      subtotal += product.price * quantity;
      fragment.append(createCartItem(product, quantity));
    });

    cartItems.replaceChildren(fragment);
    cartCount.textContent = itemCount;
    cartCount.setAttribute("aria-label", t("cart.countLabel", { count: itemCount, items: itemWord(itemCount) }));
    cartTitleCount.textContent = `(${itemCount} ${itemWord(itemCount)})`;
    cartSubtotal.textContent = formatPrice(subtotal);
    cartTotal.textContent = formatPrice(subtotal);
  }

  function saveCart() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch {
      // The cart remains usable for this page view if storage is unavailable.
    }
  }

  function updateCart() {
    saveCart();
    renderCart();
  }

  function refreshProductTranslations() {
    document.querySelectorAll(".add-to-cart[data-product-id]").forEach((button) => {
      const product = products.get(button.dataset.productId);
      const card = button.closest(".product-card");
      if (!product || !card) return;
      product.name = card.querySelector("h3")?.textContent.trim() ?? product.name;
      product.description = card.querySelector(".product-body > p")?.textContent.trim() ?? product.description;
    });
    renderCart();
  }

  document.addEventListener("app:languagechange", () => {
    refreshProductTranslations();
    if (!checkoutStatus.hidden) {
      checkoutStatus.hidden = true;
      checkoutStatus.textContent = "";
    }
  });

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-to-cart");
    if (addButton) {
      const id = addButton.dataset.productId;
      if (products.has(id)) {
        cart[id] = (cart[id] ?? 0) + 1;
        updateCart();
        cartToggle.checked = true;
        window.showNotification?.(t("toast.cartAdded", { name: products.get(id).name }), "success");
      }
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (actionButton) {
      const { action, productId } = actionButton.dataset;
      const product = products.get(productId);
      if (action === "increase") cart[productId] = (cart[productId] ?? 0) + 1;
      if (action === "decrease") {
        if (cart[productId] <= 1) {
          delete cart[productId];
          window.showNotification?.(t("toast.cartRemoved", { name: product?.name ?? t("cart.title") }), "info");
        } else {
          cart[productId] -= 1;
        }
      }
      if (action === "remove") {
        delete cart[productId];
        window.showNotification?.(t("toast.cartRemoved", { name: product?.name ?? t("cart.title") }), "info");
      }
      updateCart();
    }
  });

  cartClearButton.addEventListener("click", () => {
    const hadItems = Object.keys(cart).length > 0;
    cart = {};
    updateCart();
    if (hadItems) window.showNotification?.(t("toast.cartCleared"), "info");
  });

  goToCartButton.addEventListener("click", () => {
    cartToggle.checked = true;
  });

  cartMenuButton.addEventListener("click", () => {
    cartToggle.checked = false;
  });

  cartOrderButton.addEventListener("click", () => {
    checkoutForm.scrollIntoView({ behavior: "smooth", block: "start" });
    checkoutForm.elements.name.focus({ preventScroll: true });
  });

  checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (checkoutSubmit.disabled) return;

    const invalidFields = [...checkoutForm.querySelectorAll("[required]")]
      .filter((field) => !field.checkValidity());
    if (invalidFields.length > 0) {
      invalidFields.forEach((field) => field.setAttribute("aria-invalid", "true"));
      checkoutStatus.textContent = t("checkout.invalid");
      checkoutStatus.hidden = false;
      window.showNotification?.(t("toast.checkoutInvalid"), "warning");
      if (!cartToggle.checked) cartToggle.checked = true;
      requestAnimationFrame(() => invalidFields[0].focus({ preventScroll: true }));
      return;
    }

    const items = Object.entries(cart).flatMap(([id, quantity]) => {
      const product = products.get(id);
      return product ? [{
        productId: id,
        name: product.name,
        quantity,
        unitPrice: product.price,
        total: product.price * quantity,
      }] : [];
    });

    if (items.length === 0) {
      window.showNotification?.(t("toast.checkoutNoItems"), "warning");
      return;
    }

    const formData = new FormData(checkoutForm);
    const order = {
      customer: {
        name: String(formData.get("name") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        address: String(formData.get("address") ?? "").trim(),
        comment: String(formData.get("comment") ?? "").trim(),
      },
      items,
      total: items.reduce((sum, item) => sum + item.total, 0),
    };

    checkoutSubmit.disabled = true;
    checkoutSubmit.setAttribute("aria-busy", "true");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Language": window.getLanguage?.() ?? "ky",
        },
        credentials: "include",
        body: JSON.stringify(order),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof result.message === "string" ? result.message : t("checkout.failed"));
      }

      checkoutStatus.textContent = t("checkout.accepted");
      checkoutStatus.hidden = false;
      window.showNotification?.(t("toast.orderAccepted"), "success");
      cart = {};
      updateCart();
      checkoutForm.reset();
    } catch (error) {
      const errorMessage = error instanceof TypeError
        ? t("checkout.connectionError")
        : error.message || t("checkout.failed");
      checkoutStatus.textContent = errorMessage;
      checkoutStatus.hidden = false;
      window.showNotification?.(errorMessage, "error");
    } finally {
      checkoutSubmit.disabled = false;
      checkoutSubmit.removeAttribute("aria-busy");
    }
  });

  checkoutForm.addEventListener("input", (event) => {
    if (event.target.matches("[required]") && event.target.checkValidity()) {
      event.target.removeAttribute("aria-invalid");
    }
    checkoutStatus.hidden = true;
    checkoutStatus.textContent = "";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") cartToggle.checked = false;
  });

  renderCart();
})();
