const yearEls = document.querySelectorAll("#year");
yearEls.forEach((e) => (e.textContent = new Date().getFullYear()));

const cartItemsEl = document.getElementById("cart-items");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const clearCartBtn = document.getElementById("clear-cart-btn");

renderCart();

clearCartBtn.addEventListener("click", () => {
  if (!confirm("Clear entire cart?")) return;
  saveCart([]);
  renderCart();
});

function renderCart() {
  const cart = getCart();
  cartItemsEl.innerHTML = "";
  if (!cart.length) {
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    cartSubtotalEl.textContent = formatCurrency(0);
    return;
  }

  cart.forEach((line, idx) => {
    const prod = getProductById(line.id);
    if (!prod) return; // skip unknown
    const imgPath = getVariantImagePath(prod.id, line.colorIndex || 0);
    const colorObj = prod.colors[line.colorIndex];
    const sizeObj = line.sizeIndex != null ? prod.sizes[line.sizeIndex] : null;
    const unit = line.unitPrice; // stored when added
    const lineTotal = unit * line.quantity;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-imgwrap"><img src="${imgPath}" alt="${
      prod.name
    }" /></div>
      <div class="cart-item-info">
        <p class="cart-item-name">${prod.name}</p>
        <p class="cart-item-meta">${colorObj ? colorObj.label : ""}${
      sizeObj ? " | " + sizeObj.label : ""
    }</p>
        <p class="cart-item-meta">Unit: ${formatCurrency(unit)}</p>
        <div class="cart-item-qtywrap">
          <button type="button" data-idx="${idx}" data-delta="-1">-</button>
          <span>${line.quantity}</span>
          <button type="button" data-idx="${idx}" data-delta="1">+</button>
          <button type="button" data-remove="${idx}" class="cart-item-remove">Remove</button>
        </div>
      </div>
      <div class="cart-item-total">${formatCurrency(lineTotal)}</div>`;
    cartItemsEl.appendChild(itemEl);
  });

  cartSubtotalEl.textContent = formatCurrency(cartGrandTotal(cart));
}

// Qty + remove actions (event delegation)
cartItemsEl.addEventListener("click", (e) => {
  const minusBtn = e.target.closest("[data-delta]");
  if (minusBtn) {
    const idx = Number(minusBtn.dataset.idx);
    const delta = Number(minusBtn.dataset.delta);
    changeCartQty(idx, delta);
    return;
  }
  const remBtn = e.target.closest("[data-remove]");
  if (remBtn) {
    const idx = Number(remBtn.dataset.remove);
    removeCartLine(idx);
    return;
  }
});

function changeCartQty(idx, delta) {
  const cart = getCart();
  const line = cart[idx];
  if (!line) return;
  line.quantity = Math.max(1, line.quantity + delta);
  saveCart(cart);
  renderCart();
}
function removeCartLine(idx) {
  const cart = getCart();
  cart.splice(idx, 1);
  saveCart(cart);
  renderCart();
}
