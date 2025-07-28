// --- Global Config ---
const IMG_EXT = "png"; // change to 'jpg' if your images are .jpg

// Quick currency formatter (USD default)
function formatCurrency(num, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    num
  );
}

/* -------------------------------------------------------------
   PRODUCT CATALOG
   id: string '01'..'15'
   colors: [{label, css, imgIndex, priceAdj(optional)}]
   sizes: optional variant group (string label + priceAdj)
   category: for filtering on home page nav
   basePrice: number
------------------------------------------------------------- */
const PRODUCT_CATALOG = [
  {
    id: "01",
    skuPrefix: "product01",
    name: "Earpods",
    category: "Audio",
    basePrice: 20,
    colors: [
      { label: "White", css: "#ffffff" },
      { label: "Black", css: "#000000" },
      { label: "Pink", css: "#ffc0cb" },
      { label: "Blue", css: "#2196f3" },
    ],
    sizes: [],
  },
  {
    id: "02",
    skuPrefix: "product02",
    name: "Headphones",
    category: "Audio",
    basePrice: 50,
    colors: [
      { label: "White", css: "#ffffff" },
      { label: "Black", css: "#000000" },
      { label: "Pink", css: "#ffc0cb" },
      { label: "Blue", css: "#2196f3" },
    ],
    sizes: [],
  },
  {
    id: "03",
    skuPrefix: "product03",
    name: "Smartphones",
    category: "Mobiles",
    basePrice: 500,
    colors: [
      { label: "Pink", css: "#ffc0cb" },
      { label: "Blue", css: "#2196f3" },
      { label: "Offwhite", css: "#f5f5f5" },
    ],
    sizes: [
      { label: "64GB" },
      { label: "128GB", priceAdj: 50 },
      { label: "256GB", priceAdj: 100 },
    ],
  },
  {
    id: "04",
    skuPrefix: "product04",
    name: "Smartwatch",
    category: "Wearables",
    basePrice: 150,
    colors: [
      { label: "Pink", css: "#ffc0cb" },
      { label: "Black", css: "#000" },
      { label: "White", css: "#fff" },
    ],
    sizes: [],
  },
  {
    id: "05",
    skuPrefix: "product05",
    name: "Gaming Mouse",
    category: "Accessories",
    basePrice: 30,
    colors: [
      { label: "Blue", css: "#2196f3" },
      { label: "Green", css: "#4caf50" },
      { label: "Red", css: "#f44336" },
    ],
    sizes: [],
  },
  {
    id: "06",
    skuPrefix: "product06",
    name: "Mechanical Keyboard",
    category: "Accessories",
    basePrice: 70,
    colors: [
      { label: "Light Pink", css: "#ffb6c1" },
      { label: "Light Blue", css: "#add8e6" },
      { label: "Black", css: "#000" },
    ],
    sizes: [{ label: "TKL" }, { label: "Full Size", priceAdj: 10 }],
  },
  {
    id: "07",
    skuPrefix: "product07",
    name: "Laptop",
    category: "Computers",
    basePrice: 1000,
    colors: [
      { label: "White", css: "#fff" },
      { label: "Black", css: "#000" },
    ],
    sizes: [{ label: "8GB/256GB" }, { label: "16GB/512GB", priceAdj: 200 }],
  },
  {
    id: "08",
    skuPrefix: "product08",
    name: "Tablet",
    category: "Computers",
    basePrice: 300,
    colors: [
      { label: "Red", css: "#f44336" },
      { label: "Light Pink", css: "#ffb6c1" },
      { label: "White", css: "#fff" },
      { label: "Light Green", css: "#8bc34a" },
    ],
    sizes: [{ label: "64GB" }, { label: "128GB", priceAdj: 40 }],
  },
  {
    id: "09",
    skuPrefix: "product09",
    name: "Portable Speaker",
    category: "Audio",
    basePrice: 40,
    colors: [
      { label: "Black", css: "#000" },
      { label: "Blue", css: "#2196f3" },
      { label: "Green", css: "#4caf50" },
      { label: "Grey", css: "#9e9e9e" },
    ],
    sizes: [],
  },
  {
    id: "10",
    skuPrefix: "product10",
    name: "Drones",
    category: "Gadgets",
    basePrice: 600,
    colors: [
      { label: "White", css: "#fff" },
      { label: "Black", css: "#000" },
    ],
    sizes: [{ label: "Standard" }, { label: "Pro", priceAdj: 150 }],
  },
  {
    id: "11",
    skuPrefix: "product11",
    name: "Powerbank",
    category: "Accessories",
    basePrice: 25,
    colors: [
      { label: "White", css: "#fff" },
      { label: "Purple", css: "#9c27b0" },
      { label: "Light Green", css: "#8bc34a" },
    ],
    sizes: [{ label: "10,000 mAh" }, { label: "20,000 mAh", priceAdj: 10 }],
  },
  {
    id: "12",
    skuPrefix: "product12",
    name: "Wired Headphones",
    category: "Audio",
    basePrice: 35,
    colors: [
      { label: "Black", css: "#000" },
      { label: "Red", css: "#f44336" },
      { label: "Blue", css: "#2196f3" },
    ],
    sizes: [],
  },
  {
    id: "13",
    skuPrefix: "product13",
    name: "Samsung USB",
    category: "Storage",
    basePrice: 15,
    colors: [
      { label: "White", css: "#fff" },
      { label: "Black", css: "#000" },
    ],
    sizes: [
      { label: "32GB" },
      { label: "64GB", priceAdj: 5 },
      { label: "128GB", priceAdj: 12 },
    ],
  },
  {
    id: "14",
    skuPrefix: "product14",
    name: "Charger Adapter",
    category: "Accessories",
    basePrice: 12,
    colors: [
      { label: "White", css: "#fff" },
      { label: "Black", css: "#000" },
    ],
    sizes: [{ label: "1-Port" }, { label: "2-Port", priceAdj: 3 }],
  },
  {
    id: "15",
    skuPrefix: "product15",
    name: "Charger Cable",
    category: "Accessories",
    basePrice: 10,
    colors: [
      { label: "Black", css: "#000" },
      { label: "White", css: "#fff" },
      { label: "Light Blue", css: "#add8e6" },
    ],
    sizes: [{ label: "1m" }, { label: "2m", priceAdj: 2 }],
  },
];

/* -------------------------------------------------------------
   Catalog Helper Functions
------------------------------------------------------------- */
function getAllProducts() {
  return PRODUCT_CATALOG.slice();
}
function getProductById(id) {
  return PRODUCT_CATALOG.find((p) => p.id === id) || null;
}
function getAllCategories() {
  const set = new Set();
  PRODUCT_CATALOG.forEach((p) => set.add(p.category));
  return Array.from(set).sort();
}
function getVariantImagePath(id, colorIndex) {
  // Build from skuPrefix? Actually we rely on id digits only: product{ID}{index+1}
  // Example id='01', colorIndex=0 => product011.png
  return `assets/images/product${id}${colorIndex + 1}.${IMG_EXT}`;
}

/* -------------------------------------------------------------
   CART STORAGE
   Cart item shape:
   {
     id: '01',
     colorIndex: 0,          // index in colors[]
     sizeIndex: 0|null,      // index in sizes[]
     quantity: 2,
     unitPrice: 20           // resolved price incl variant adj at add time
   }
------------------------------------------------------------- */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (e) {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function getCartCount() {
  return getCart().reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

/* Price helpers ------------------------------------------------ */
function resolveUnitPrice(product, colorIndex = 0, sizeIndex = null) {
  // base + color priceAdj + size priceAdj
  let price = product.basePrice;
  const color = product.colors[colorIndex];
  if (color && color.priceAdj) price += color.priceAdj;
  if (sizeIndex != null) {
    const size = product.sizes[sizeIndex];
    if (size && size.priceAdj) price += size.priceAdj;
  }
  return price;
}

function lineTotal(unitPrice, qty) {
  return unitPrice * qty;
}
function cartGrandTotal(cart) {
  return cart.reduce((sum, i) => sum + lineTotal(i.unitPrice, i.quantity), 0);
}

/* URL param helper -------------------------------------------- */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
