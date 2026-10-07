// Radhe Radhe Restaurant - Full end-to-end app
const STORAGE_KEYS = {
  products: 'rr_products',
  users: 'rr_users',
  session: 'rr_session',
  wishlist: 'rr_wishlist',
  bookings: 'rr_bookings',
  reviews: 'rr_reviews'
};

const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Paneer Tikka', category: 'Starters', price: 320, originalPrice: 380, stock: 40, sizes: ['Half','Full'], image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', description: 'Cottage cheese marinated in spices, tandoor-grilled to perfection.', badge: 'Bestseller' },
  { id: 'p2', name: 'Veg Spring Rolls', category: 'Starters', price: 220, originalPrice: null, stock: 35, sizes: ['Half','Full'], image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop', description: 'Crispy rolls stuffed with fresh vegetables and spices.', badge: null },
  { id: 'p3', name: 'Dal Makhani', category: 'Main Course', price: 280, originalPrice: 320, stock: 50, sizes: ['Regular','Large'], image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop', description: 'Slow-cooked black lentils in butter and cream. Our signature.', badge: 'Signature' },
  { id: 'p4', name: 'Butter Chicken', category: 'Main Course', price: 380, originalPrice: 450, stock: 45, sizes: ['Regular','Large'], image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae173?w=400&h=300&fit=crop', description: 'Tender chicken in rich tomato-butter gravy.', badge: 'Bestseller' },
  { id: 'p5', name: 'Shahi Paneer', category: 'Main Course', price: 340, originalPrice: null, stock: 40, sizes: ['Regular','Large'], image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', description: 'Paneer in creamy cashew-tomato gravy with royal spices.', badge: null },
  { id: 'p6', name: 'Veg Biryani', category: 'Breads & Rice', price: 280, originalPrice: 320, stock: 35, sizes: ['Single','Family'], image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', description: 'Fragrant basmati rice layered with vegetables and spices.', badge: 'Popular' },
  { id: 'p7', name: 'Garlic Naan', category: 'Breads & Rice', price: 60, originalPrice: null, stock: 100, sizes: ['Plain','Butter'], image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', description: 'Soft tandoor-baked flatbread with garlic butter.', badge: null },
  { id: 'p8', name: 'Butter Roti', category: 'Breads & Rice', price: 25, originalPrice: null, stock: 120, sizes: ['Single','Butter'], image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop', description: 'Whole wheat roti brushed with butter.', badge: null },
  { id: 'p9', name: 'Gulab Jamun', category: 'Desserts', price: 120, originalPrice: 150, stock: 60, sizes: ['2 pcs','4 pcs'], image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop', description: 'Soft milk dumplings in rose-scented sugar syrup.', badge: null },
  { id: 'p10', name: 'Rasmalai', category: 'Desserts', price: 150, originalPrice: null, stock: 40, sizes: ['2 pcs','4 pcs'], image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop', description: 'Soft cottage cheese discs in sweetened milk with saffron.', badge: null },
  { id: 'p11', name: 'Mango Lassi', category: 'Beverages', price: 100, originalPrice: null, stock: 70, sizes: ['Regular','Large'], image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop', description: 'Creamy yogurt blended with ripe mango.', badge: null },
  { id: 'p12', name: 'Masala Chai', category: 'Beverages', price: 40, originalPrice: null, stock: 100, sizes: ['Cup','Pot'], image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop', description: 'Spiced Indian tea with cardamom, ginger and cloves.', badge: null }
];

const DEFAULT_REVIEWS = [
  { id: 'r1', productId: 'p4', productName: 'Butter Chicken', userName: 'Rahul S.', rating: 5, comment: 'Best butter chicken in the area! Creamy and perfectly spiced.', createdAt: '2026-09-15T10:00:00Z' },
  { id: 'r2', productId: 'p3', productName: 'Dal Makhani', userName: 'Priya M.', rating: 5, comment: 'Absolutely divine. Tastes like home.', createdAt: '2026-09-20T14:30:00Z' },
  { id: 'r3', productId: 'p6', productName: 'Veg Biryani', userName: 'Amit K.', rating: 4, comment: 'Great flavour and generous portion. Will order again.', createdAt: '2026-09-28T18:00:00Z' }
];

const ADMIN = { email: 'admin@radheradhe.com', password: 'radhe123', name: 'Admin', role: 'admin' };

function getFromStorage(key, fallback = []) {
  try { const data = localStorage.getItem(key); return data ? JSON.parse(data) : fallback; } catch { return fallback; }
}
function saveToStorage(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

function initData() {
  if (!localStorage.getItem(STORAGE_KEYS.products)) saveToStorage(STORAGE_KEYS.products, DEFAULT_PRODUCTS);
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    saveToStorage(STORAGE_KEYS.users, [{ id: 'u_admin', email: ADMIN.email, password: ADMIN.password, name: ADMIN.name, role: 'admin', createdAt: new Date().toISOString() }]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.bookings)) saveToStorage(STORAGE_KEYS.bookings, []);
  if (!localStorage.getItem(STORAGE_KEYS.wishlist)) saveToStorage(STORAGE_KEYS.wishlist, {});
  if (!localStorage.getItem(STORAGE_KEYS.reviews)) saveToStorage(STORAGE_KEYS.reviews, DEFAULT_REVIEWS);
}

function getSession() { return getFromStorage(STORAGE_KEYS.session, null); }
function setSession(user) {
  if (user) { const { password, ...safe } = user; saveToStorage(STORAGE_KEYS.session, safe); }
  else localStorage.removeItem(STORAGE_KEYS.session);
}
function isLoggedIn() { return !!getSession(); }
function isAdmin() { const s = getSession(); return s && s.role === 'admin'; }
function login(email, password) {
  const users = getFromStorage(STORAGE_KEYS.users);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) { setSession(user); return { success: true, user }; }
  return { success: false, message: 'Invalid email or password' };
}
function register(name, email, password) {
  const users = getFromStorage(STORAGE_KEYS.users);
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) return { success: false, message: 'Email already registered' };
  const newUser = { id: 'u_' + Date.now(), name, email, password, role: 'customer', createdAt: new Date().toISOString() };
  users.push(newUser); saveToStorage(STORAGE_KEYS.users, users); setSession(newUser);
  return { success: true, user: newUser };
}
function logout() { setSession(null); window.location.href = 'index.html'; }

function getProducts() { return getFromStorage(STORAGE_KEYS.products, DEFAULT_PRODUCTS); }
function getProductById(id) { return getProducts().find(p => p.id === id); }
function saveProducts(products) { saveToStorage(STORAGE_KEYS.products, products); }
function updateProduct(id, updates) {
  const products = getProducts(); const idx = products.findIndex(p => p.id === id);
  if (idx !== -1) { products[idx] = { ...products[idx], ...updates }; saveProducts(products); return products[idx]; }
  return null;
}
function addProduct(product) {
  const products = getProducts();
  const newP = { ...product, id: 'p' + Date.now(), stock: Number(product.stock) || 0, price: Number(product.price) || 0 };
  products.push(newP); saveProducts(products); return newP;
}
function deleteProduct(id) { let products = getProducts(); products = products.filter(p => p.id !== id); saveProducts(products); }

function getWishlist() {
  const session = getSession(); if (!session) return [];
  const all = getFromStorage(STORAGE_KEYS.wishlist, {}); return all[session.id] || [];
}
function toggleWishlist(productId) {
  const session = getSession();
  if (!session) { showToast('Please login to save favourites', 'error'); return false; }
  const all = getFromStorage(STORAGE_KEYS.wishlist, {});
  let list = all[session.id] || [];
  const exists = list.includes(productId);
  if (exists) { list = list.filter(id => id !== productId); showToast('Removed from favourites'); }
  else { list.push(productId); showToast('Added to favourites', 'success'); }
  all[session.id] = list; saveToStorage(STORAGE_KEYS.wishlist, all); updateWishlistBadge(); return !exists;
}
function isInWishlist(productId) { return getWishlist().includes(productId); }
function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-badge');
  if (badge) { const count = getWishlist().length; badge.textContent = count; badge.style.display = count > 0 ? 'flex' : 'none'; }
}

function getBookings() { return getFromStorage(STORAGE_KEYS.bookings, []); }
function createBooking(booking) {
  const bookings = getBookings();
  const newB = { ...booking, id: 'b' + Date.now(), status: 'pending', createdAt: new Date().toISOString() };
  bookings.unshift(newB); saveToStorage(STORAGE_KEYS.bookings, bookings); return newB;
}
function updateBookingStatus(id, status) {
  const bookings = getBookings(); const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) { bookings[idx].status = status; saveToStorage(STORAGE_KEYS.bookings, bookings); return bookings[idx]; }
  return null;
}

/* ===== REVIEWS ===== */
function getReviews() { return getFromStorage(STORAGE_KEYS.reviews, DEFAULT_REVIEWS); }
function getReviewsByProduct(productId) {
  return getReviews().filter(r => r.productId === productId).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
}
function getAvgRating(productId) {
  const list = getReviewsByProduct(productId);
  if (!list.length) return 0;
  return (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1);
}
function addReview(review) {
  const reviews = getReviews();
  const newR = {
    ...review,
    id: 'r' + Date.now(),
    createdAt: new Date().toISOString()
  };
  reviews.unshift(newR);
  saveToStorage(STORAGE_KEYS.reviews, reviews);
  return newR;
}
function deleteReview(id) {
  let reviews = getReviews().filter(r => r.id !== id);
  saveToStorage(STORAGE_KEYS.reviews, reviews);
}
function starsHtml(rating, size) {
  size = size || 14;
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += '<span style="color:' + (i <= rating ? 'var(--gold)' : '#ddd') + ';font-size:' + size + 'px">★</span>';
  }
  return s;
}

function showToast(message, type) {
  type = type || 'success';
  let container = document.querySelector('.toast-container');
  if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
  const toast = document.createElement('div'); toast.className = 'toast ' + type; toast.innerHTML = '<span>' + message + '</span>';
  container.appendChild(toast);
  setTimeout(function() { toast.style.opacity = '0'; setTimeout(function() { toast.remove(); }, 300); }, 3000);
}
function formatPrice(price) { return '₹' + Number(price).toLocaleString('en-IN'); }
function getStockClass(stock) { if (stock <= 0) return 'stock-out'; if (stock <= 10) return 'stock-low'; return 'stock-in'; }
function getStockText(stock) { if (stock <= 0) return 'Unavailable'; if (stock <= 10) return 'Limited'; return 'Available'; }

function renderProductCard(product) {
  const inWish = isInWishlist(product.id);
  const avg = getAvgRating(product.id);
  const revCount = getReviewsByProduct(product.id).length;
  return '<div class="product-card" data-id="' + product.id + '">' +
    '<div class="product-image">' +
      '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/400x300/8B1A1A/C9A227?text=Radhe+Radhe\'">' +
      (product.badge ? '<span class="product-badge">' + product.badge + '</span>' : '') +
      '<button class="wishlist-btn ' + (inWish ? 'active' : '') + '" onclick="handleWishlist(\'' + product.id + '\', this)" title="Favourite">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="' + (inWish ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
      '</button></div>' +
    '<div class="product-info">' +
      '<div class="product-category">' + product.category + '</div>' +
      '<div class="product-name">' + product.name + '</div>' +
      (revCount ? '<div style="margin-bottom:0.4rem;font-size:0.85rem">' + starsHtml(Math.round(avg), 13) + ' <span style="color:var(--maroon-600)">' + avg + ' (' + revCount + ')</span></div>' : '') +
      '<div class="product-price">' + formatPrice(product.price) + (product.originalPrice ? '<span class="original">' + formatPrice(product.originalPrice) + '</span>' : '') + '</div>' +
      '<div class="product-stock ' + getStockClass(product.stock) + '">' + getStockText(product.stock) + '</div>' +
      '<div class="product-actions">' +
        '<button class="btn btn-primary btn-sm" style="flex:1" onclick="openPrebookModal(\'' + product.id + '\')">Order</button>' +
        '<button class="btn btn-outline btn-sm" onclick="openProductDetail(\'' + product.id + '\')">View</button>' +
      '</div></div></div>';
}

function handleWishlist(productId, btn) {
  const added = toggleWishlist(productId);
  if (btn) { btn.classList.toggle('active', added); const svg = btn.querySelector('svg'); if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none'); }
}

function openPrebookModal(productId) {
  const product = getProductById(productId); if (!product) return;
  if (!isLoggedIn()) { showToast('Please login to place an order', 'error'); setTimeout(function() { window.location.href = 'login.html'; }, 1200); return; }
  let overlay = document.getElementById('prebook-modal');
  if (!overlay) { overlay = document.createElement('div'); overlay.id = 'prebook-modal'; overlay.className = 'modal-overlay'; document.body.appendChild(overlay); }
  const sizesHtml = product.sizes.map(function(s) { return '<button type="button" class="size-btn" data-size="' + s + '" onclick="selectSize(this)">' + s + '</button>'; }).join('');
  overlay.innerHTML = '<div class="modal"><div class="modal-header"><h3>Order: ' + product.name + '</h3><button class="modal-close" onclick="closeModal(\'prebook-modal\')">&times;</button></div><div class="modal-body"><div class="flex gap-2 mb-2" style="gap:1rem"><img src="' + product.image + '" alt="" style="width:80px;height:60px;object-fit:cover;border-radius:8px" onerror="this.src=\'https://via.placeholder.com/80x60\'"><div><strong>' + product.name + '</strong><div class="product-price mt-1">' + formatPrice(product.price) + '</div></div></div><form id="prebook-form"><input type="hidden" name="productId" value="' + product.id + '"><div class="form-group"><label>Select Portion *</label><div class="size-options" id="size-options">' + sizesHtml + '</div><input type="hidden" name="size" id="selected-size" required></div><div class="form-row"><div class="form-group"><label>Quantity *</label><input type="number" name="quantity" class="form-control" min="1" max="10" value="1" required></div><div class="form-group"><label>Preferred Date</label><input type="date" name="preferredDate" class="form-control" min="' + new Date().toISOString().split('T')[0] + '"></div></div><div class="form-group"><label>Your Phone *</label><input type="tel" name="phone" class="form-control" placeholder="9876543210" required pattern="[0-9]{10}"></div><div class="form-group"><label>Notes (optional)</label><textarea name="notes" class="form-control" rows="2" placeholder="Spice level, allergies..."></textarea></div></form></div><div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal(\'prebook-modal\')">Cancel</button><button class="btn btn-primary" onclick="submitPrebook()">Confirm Order</button></div></div>';
  overlay.classList.add('active');
}
function selectSize(btn) {
  document.querySelectorAll('#size-options .size-btn').forEach(function(b) { b.classList.remove('selected'); });
  btn.classList.add('selected'); document.getElementById('selected-size').value = btn.dataset.size;
}
function submitPrebook() {
  const form = document.getElementById('prebook-form');
  const size = document.getElementById('selected-size').value;
  if (!size) { showToast('Please select a portion', 'error'); return; }
  const session = getSession(); const product = getProductById(form.productId.value);
  createBooking({ productId: product.id, productName: product.name, productImage: product.image, price: product.price, size: size, quantity: Number(form.quantity.value), preferredDate: form.preferredDate.value || null, phone: form.phone.value, notes: form.notes.value, userId: session.id, userName: session.name, userEmail: session.email });
  closeModal('prebook-modal'); showToast('Order received! Radhe Radhe — we will confirm shortly.', 'success');
}
function closeModal(id) { const el = document.getElementById(id); if (el) el.classList.remove('active'); }

function openProductDetail(productId) {
  const product = getProductById(productId); if (!product) return;
  const reviews = getReviewsByProduct(productId);
  const avg = getAvgRating(productId);
  let overlay = document.getElementById('detail-modal');
  if (!overlay) { overlay = document.createElement('div'); overlay.id = 'detail-modal'; overlay.className = 'modal-overlay'; document.body.appendChild(overlay); }

  let reviewsHtml = '';
  if (reviews.length) {
    reviewsHtml = reviews.slice(0, 5).map(function(r) {
      return '<div style="padding:0.75rem 0;border-bottom:1px solid var(--royal-100)"><div style="display:flex;justify-content:space-between;align-items:center"><strong>' + r.userName + '</strong><span style="font-size:0.8rem;color:var(--maroon-500)">' + new Date(r.createdAt).toLocaleDateString() + '</span></div><div style="margin:0.25rem 0">' + starsHtml(r.rating, 14) + '</div><p style="font-size:0.9rem;color:var(--maroon-700)">' + r.comment + '</p></div>';
    }).join('');
  } else {
    reviewsHtml = '<p style="color:var(--maroon-500);font-size:0.9rem">No reviews yet. Be the first!</p>';
  }

  overlay.innerHTML = '<div class="modal" style="max-width:680px"><div class="modal-header"><h3>' + product.name + '</h3><button class="modal-close" onclick="closeModal(\'detail-modal\')">&times;</button></div><div class="modal-body">' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem">' +
      '<img src="' + product.image + '" alt="' + product.name + '" style="width:100%;border-radius:12px;aspect-ratio:4/3;object-fit:cover" onerror="this.src=\'https://via.placeholder.com/300x225\'">' +
      '<div><div class="product-category">' + product.category + '</div>' +
      '<div class="product-price" style="font-size:1.4rem;margin:0.5rem 0">' + formatPrice(product.price) + (product.originalPrice ? '<span class="original">' + formatPrice(product.originalPrice) + '</span>' : '') + '</div>' +
      (reviews.length ? '<div style="margin-bottom:0.5rem">' + starsHtml(Math.round(avg), 16) + ' <strong>' + avg + '</strong> (' + reviews.length + ' reviews)</div>' : '') +
      '<div class="product-stock ' + getStockClass(product.stock) + ' mb-2">' + getStockText(product.stock) + '</div>' +
      '<p style="color:var(--maroon-700);margin-bottom:1rem;font-size:0.95rem">' + product.description + '</p>' +
      '<p style="font-size:0.85rem;color:var(--maroon-600)"><strong>Portions:</strong> ' + product.sizes.join(', ') + '</p>' +
      '<div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">' +
        '<button class="btn btn-primary" onclick="closeModal(\'detail-modal\');openPrebookModal(\'' + product.id + '\')">Order Now</button>' +
        '<button class="btn btn-outline" onclick="handleWishlist(\'' + product.id + '\');closeModal(\'detail-modal\')">' + (isInWishlist(product.id) ? 'Remove Favourite' : 'Add Favourite') + '</button>' +
      '</div></div></div>' +
    '<div style="border-top:2px solid var(--royal-100);padding-top:1.25rem">' +
      '<h4 style="margin-bottom:0.75rem">Reviews</h4>' +
      '<div id="detail-reviews">' + reviewsHtml + '</div>' +
      '<button class="btn btn-secondary btn-sm mt-2" onclick="closeModal(\'detail-modal\');openReviewModal(\'' + product.id + '\')">Write a Review</button>' +
    '</div></div></div>';
  overlay.classList.add('active');
}

function openReviewModal(productId) {
  const product = getProductById(productId); if (!product) return;
  let overlay = document.getElementById('review-modal');
  if (!overlay) { overlay = document.createElement('div'); overlay.id = 'review-modal'; overlay.className = 'modal-overlay'; document.body.appendChild(overlay); }
  const session = getSession();
  const defaultName = session ? session.name : '';
  overlay.innerHTML = '<div class="modal" style="max-width:480px"><div class="modal-header"><h3>Review: ' + product.name + '</h3><button class="modal-close" onclick="closeModal(\'review-modal\')">&times;</button></div><div class="modal-body">' +
    '<form id="review-form">' +
      '<input type="hidden" id="review-product-id" value="' + product.id + '">' +
      '<input type="hidden" id="review-product-name" value="' + product.name + '">' +
      '<div class="form-group"><label>Your Name *</label><input type="text" id="review-name" class="form-control" value="' + defaultName + '" required></div>' +
      '<div class="form-group"><label>Rating *</label><div class="size-options" id="rating-stars">' +
        [1,2,3,4,5].map(function(n) { return '<button type="button" class="size-btn rating-star" data-rating="' + n + '" onclick="selectRating(this)" style="font-size:1.3rem;min-width:48px">★</button>'; }).join('') +
      '</div><input type="hidden" id="review-rating" required></div>' +
      '<div class="form-group"><label>Your Review *</label><textarea id="review-comment" class="form-control" rows="3" placeholder="Share your experience..." required minlength="10"></textarea></div>' +
    '</form></div>' +
    '<div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal(\'review-modal\')">Cancel</button><button class="btn btn-primary" onclick="submitReview()">Submit Review</button></div></div>';
  overlay.classList.add('active');
}
function selectRating(btn) {
  const rating = Number(btn.dataset.rating);
  document.getElementById('review-rating').value = rating;
  document.querySelectorAll('#rating-stars .rating-star').forEach(function(b) {
    const n = Number(b.dataset.rating);
    b.style.color = n <= rating ? 'var(--gold)' : '#ccc';
    b.classList.toggle('selected', n === rating);
  });
}
function submitReview() {
  const productId = document.getElementById('review-product-id').value;
  const productName = document.getElementById('review-product-name').value;
  const userName = document.getElementById('review-name').value.trim();
  const rating = Number(document.getElementById('review-rating').value);
  const comment = document.getElementById('review-comment').value.trim();
  if (!userName || !rating || !comment) { showToast('Please fill all fields and select a rating', 'error'); return; }
  if (comment.length < 10) { showToast('Review must be at least 10 characters', 'error'); return; }
  addReview({ productId: productId, productName: productName, userName: userName, rating: rating, comment: comment, userId: getSession() ? getSession().id : null });
  closeModal('review-modal');
  showToast('Thank you for your review! Radhe Radhe 🙏', 'success');
}

function renderHeader(activePage) {
  activePage = activePage || '';
  const session = getSession();
  const wishCount = getWishlist().length;
  return '<header class="header"><div class="nav-container">' +
    '<a href="index.html" class="logo">Radhe Radhe<span>RESTAURANT</span></a>' +
    '<button class="mobile-toggle" onclick="document.querySelector(\'.nav-links\').classList.toggle(\'open\')" aria-label="Menu">☰</button>' +
    '<ul class="nav-links">' +
      '<li><a href="index.html" class="' + (activePage === 'home' ? 'active' : '') + '">Home</a></li>' +
      '<li><a href="products.html" class="' + (activePage === 'products' ? 'active' : '') + '">Menu</a></li>' +
      '<li><a href="reviews.html" class="' + (activePage === 'reviews' ? 'active' : '') + '">Reviews</a></li>' +
      '<li><a href="wishlist.html" class="' + (activePage === 'wishlist' ? 'active' : '') + '">Favourites</a></li>' +
      '<li><a href="contact.html" class="' + (activePage === 'contact' ? 'active' : '') + '">Contact</a></li>' +
      (isAdmin() ? '<li><a href="admin.html" class="' + (activePage === 'admin' ? 'active' : '') + '">Admin</a></li>' : '') +
    '</ul>' +
    '<div class="nav-actions">' +
      '<a href="wishlist.html" class="icon-btn" title="Favourites">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
        '<span class="badge" id="wishlist-badge" style="display:' + (wishCount > 0 ? 'flex' : 'none') + '">' + wishCount + '</span></a>' +
      (session ? '<span class="user-greeting">Hi, ' + session.name.split(' ')[0] + '</span><button class="btn btn-secondary btn-sm" onclick="logout()">Logout</button>' : '<a href="login.html" class="btn btn-primary btn-sm">Login</a>') +
    '</div></div></header>';
}

function renderFooter() {
  return '<footer class="footer"><div class="footer-grid">' +
    '<div><h4>Radhe Radhe Restaurant</h4><p>Pure vegetarian Indian cuisine served with devotion and care. Radhe Radhe 🙏</p></div>' +
    '<div><h4>Visit Us</h4><p>Near Temple Road, Delhi</p><p>Open daily 11 AM – 10 PM</p><p>+91 98765 43210</p></div>' +
    '<div><h4>Quick Links</h4><a href="products.html">Menu</a><a href="reviews.html">Reviews</a><a href="contact.html">Contact</a><a href="login.html">Login</a></div>' +
    '</div><div class="footer-bottom">© ' + new Date().getFullYear() + ' Radhe Radhe Restaurant. All rights reserved.</div></footer>';
}

initData();
