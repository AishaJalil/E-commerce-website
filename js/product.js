// Elements ----------------------------------------------------
const cartCountEl = document.getElementById("cart-count");
const prodNameEl = document.getElementById("prod-name");
const prodPriceEl = document.getElementById("prod-price");
const totalPriceEl = document.getElementById("total-price");
const qtyDisplayEl = document.getElementById("qty-display");
const colorWrapperEl = document.getElementById("color-wrapper");
const colorOptionsEl = document.getElementById("color-options");
const sizeWrapperEl = document.getElementById("size-wrapper");
const sizeOptionsEl = document.getElementById("size-options");
const mainImageEl = document.getElementById("main-image");
const thumbStripEl = document.getElementById("thumb-strip");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const lensEl = document.getElementById("zoom-lens");
const zoomResultEl = document.getElementById("zoom-result");

// Year in footer
const yearEls = document.querySelectorAll("#year");
yearEls.forEach((e) => (e.textContent = new Date().getFullYear()));

// Load product -------------------------------------------------
const prodId = getQueryParam("id");
const product = getProductById(prodId);
if (!product) {
  prodNameEl.textContent = "Product Not Found";
  addToCartBtn.disabled = true;
  throw new Error("Invalid product id");
}

// State --------------------------------------------------------
let selectedColor = 0; // index
let selectedSize = product.sizes.length ? 0 : null; // null if no sizes
let quantity = 1;

// Init header cart count
cartCountEl.textContent = getCartCount();

// Populate static fields
prodNameEl.textContent = product.name;
prodPriceEl.textContent = product.basePrice.toFixed(2);
updateTotals();

// Render variants ---------------------------------------------
renderColorOptions();
renderSizeOptions();
renderThumbs();
updateMainImage();

function renderColorOptions() {
  if (!product.colors.length) {
    colorWrapperEl.classList.add("hidden");
    return;
  }
  colorWrapperEl.classList.remove("hidden");
  colorOptionsEl.innerHTML = product.colors
    .map(
      (c, i) =>
        `<button type="button" class="variant-color-swatch${
          i === selectedColor ? " active" : ""
        }" data-index="${i}" title="${c.label}" style="background:${
          c.css
        }"></button>`
    )
    .join("");
}

function renderSizeOptions() {
  if (!product.sizes.length) {
    sizeWrapperEl.classList.add("hidden");
    return;
  }
  sizeWrapperEl.classList.remove("hidden");
  sizeOptionsEl.innerHTML = product.sizes
    .map((s, i) => {
      const adj = s.priceAdj ? ` (+${formatCurrency(s.priceAdj)})` : "";
      return `<button type="button" class="variant-pill${
        i === selectedSize ? " active" : ""
      }" data-index="${i}">${s.label}${adj}</button>`;
    })
    .join("");
}

function renderThumbs() {
  thumbStripEl.innerHTML = product.colors
    .map((c, i) => {
      const imgPath = getVariantImagePath(product.id, i);
      return `<button class="thumb-btn${
        i === selectedColor ? " active" : ""
      }" data-index="${i}"><img src="${imgPath}" alt="${product.name} ${
        c.label
      }"></button>`;
    })
    .join("");
}

function updateMainImage() {
  const src = getVariantImagePath(product.id, selectedColor);
  mainImageEl.src = src;
  // Also set zoom background
  zoomResultEl.style.backgroundImage = `url('${src}')`;
}

function updateTotals() {
  const unit = resolveUnitPrice(product, selectedColor, selectedSize);
  prodPriceEl.textContent = unit.toFixed(2);
  totalPriceEl.textContent = (unit * quantity).toFixed(2);
}

// Event bindings ----------------------------------------------
colorOptionsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-index]");
  if (!btn) return;
  selectedColor = Number(btn.dataset.index);
  document
    .querySelectorAll(".variant-color-swatch")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  // Update thumbs active state
  document
    .querySelectorAll(".thumb-btn")
    .forEach((b) => b.classList.remove("active"));
  const thumbBtn = thumbStripEl.querySelector(
    `[data-index="${selectedColor}"]`
  );
  if (thumbBtn) thumbBtn.classList.add("active");
  updateMainImage();
  updateTotals();
});

sizeOptionsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-index]");
  if (!btn) return;
  selectedSize = Number(btn.dataset.index);
  document
    .querySelectorAll(".variant-pill")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  updateTotals();
});

thumbStripEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-index]");
  if (!btn) return;
  selectedColor = Number(btn.dataset.index);
  // sync color buttons
  const colorBtn = colorOptionsEl.querySelector(
    `[data-index="${selectedColor}"]`
  );
  if (colorBtn) {
    document
      .querySelectorAll(".variant-color-swatch")
      .forEach((b) => b.classList.remove("active"));
    colorBtn.classList.add("active");
  }
  document
    .querySelectorAll(".thumb-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  updateMainImage();
  updateTotals();
});

// Qty buttons
Array.from(document.querySelectorAll(".qty-btn")).forEach((btn) => {
  btn.addEventListener("click", () => {
    const delta = Number(btn.dataset.delta);
    quantity = Math.max(1, quantity + delta);
    qtyDisplayEl.textContent = quantity;
    updateTotals();
  });
});

// Add to cart
addToCartBtn.addEventListener("click", () => {
  const cart = getCart();
  // Check if line already exists (same product + color + size)
  const existing = cart.find(
    (i) =>
      i.id === product.id &&
      i.colorIndex === selectedColor &&
      i.sizeIndex === selectedSize
  );
  const unit = resolveUnitPrice(product, selectedColor, selectedSize);
  if (existing) {
    existing.quantity += quantity;
    existing.unitPrice = unit; // refresh in case price changed
  } else {
    cart.push({
      id: product.id,
      colorIndex: selectedColor,
      sizeIndex: selectedSize,
      quantity,
      unitPrice: unit,
    });
  }
  saveCart(cart);
  cartCountEl.textContent = getCartCount();
  alert("Added to cart!");
});

/* =============================================================
   Simple Hover Zoom (Desktop)
   - Shows lens overlay and a zoomResult panel with 2x background.
   - On small screens, click image to toggle full-screen zoom (native pinch).
============================================================= */
let zoomActive = false;
const ZOOM_SCALE = 2; // magnification

function enableZoom() {
  if (window.matchMedia("(pointer:fine)").matches) {
    zoomResultEl.classList.remove("hidden");
  }
  mainImageEl.addEventListener("mouseenter", startZoom);
  mainImageEl.addEventListener("mouseleave", endZoom);
  mainImageEl.addEventListener("mousemove", moveLens);
  mainImageEl.addEventListener("click", mobileToggleZoom);
}
function startZoom() {
  lensEl.classList.remove("hidden");
  zoomActive = true;
}
function endZoom() {
  lensEl.classList.add("hidden");
  zoomActive = false;
}
function moveLens(e) {
  if (!zoomActive) return;
  const rect = mainImageEl.getBoundingClientRect();
  const lensW = lensEl.offsetWidth;
  const lensH = lensEl.offsetHeight;
  let x = e.clientX - rect.left - lensW / 2;
  let y = e.clientY - rect.top - lensH / 2;
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > rect.width - lensW) x = rect.width - lensW;
  if (y > rect.height - lensH) y = rect.height - lensH;
  lensEl.style.left = x + "px";
  lensEl.style.top = y + "px";
  // background position for zoom result
  const bgX = -(x * ZOOM_SCALE);
  const bgY = -(y * ZOOM_SCALE);
  zoomResultEl.style.backgroundSize =
    rect.width * ZOOM_SCALE + "px " + rect.height * ZOOM_SCALE + "px";
  zoomResultEl.style.backgroundPosition = bgX + "px " + bgY + "px";
}
function mobileToggleZoom() {
  if (window.matchMedia("(pointer:coarse)").matches) {
    // open image in new tab for pinch zoom fallback
    window.open(mainImageEl.src, "_blank");
  }
}

enableZoom();
