// Maharaja's Darbar - Royal Indian Restaurant App
const STORAGE_KEYS = {
  products: 'md_products',
  users: 'md_users',
  session: 'md_session',
  wishlist: 'md_wishlist',
  bookings: 'md_bookings'
};

const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Paneer Tikka Royal', category: 'Starters', price: 420, originalPrice: 480, stock: 40, sizes: ['Half','Full'], image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', description: 'Cottage cheese marinated in royal spices, charcoal-grilled to perfection.', badge: 'Bestseller' },
  { id: 'p2', name: 'Lamb Seekh Kebab', category: 'Starters', price: 520, originalPrice: null, stock: 25, sizes: ['Half','Full'], image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop', description: 'Minced lamb with aromatic herbs, skewered and grilled over open flame.', badge: null },
  { id: 'p3', name: 'Dal Makhani', category: 'Main Course', price: 380, originalPrice: 420, stock: 50, sizes: ['Regular','Large'], image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop', description: 'Slow-cooked black lentils in butter and cream. A court favourite.', badge: 'Signature' },
  { id: 'p4', name: 'Butter Chicken', category: 'Main Course', price: 480, originalPrice: 550, stock: 45, sizes: ['Regular','Large'], image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae173?w=400&h=300&fit=crop', description: 'Tender chicken in a rich tomato-butter gravy. The jewel of the Darbar.', badge: 'Bestseller' },
  { id: 'p5', name: 'Rogan Josh', category: 'Main Course', price: 560, originalPrice: null, stock: 20, sizes: ['Regular','Large'], image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', description: 'Kashmiri-style lamb curry with aromatic spices and a deep red hue.', badge: 'Royal' },
  { id: 'p6', name: 'Hyderabadi Biryani', category: 'Breads & Rice', price: 450, originalPrice: 520, stock: 35, sizes: ['Single','Family'], image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', description: 'Fragrant basmati rice layered with spiced meat, sealed and slow-cooked.', badge: 'Popular' },
  { id: 'p7', name: 'Garlic Naan', category: 'Breads & Rice', price: 90, originalPrice: null, stock: 100, sizes: ['Plain','Butter'], image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', description: 'Soft tandoor-baked flatbread brushed with garlic butter.', badge: null },
  { id: 'p8', name: 'Laccha Paratha', category: 'Breads & Rice', price: 80, originalPrice: null, stock: 80, sizes: ['Single','Butter'], image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop', description: 'Flaky multi-layered whole-wheat bread, perfect with rich curries.', badge: null },
  { id: 'p9', name: 'Gulab Jamun', category: 'Desserts', price: 180, originalPrice: 220, stock: 60, sizes: ['2 pcs','4 pcs'], image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop', description: 'Soft milk dumplings soaked in rose-scented sugar syrup.', badge: null },
  { id: 'p10', name: 'Shahi Tukda', category: 'Desserts', price: 220, originalPrice: null, stock: 30, sizes: ['Single','Double'], image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop', description: 'Royal bread pudding with saffron, nuts and condensed milk.', badge: 'Royal' },
  { id: 'p11', name: 'Mango Lassi', category: 'Beverages', price: 150, originalPrice: null, stock: 70, sizes: ['Regular','Large'], image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop', description: 'Creamy yogurt blended with Alphonso mango pulp.', badge: null },
  { id: 'p12', name: 'Masala Chai', category: 'Beverages', price: 80, originalPrice: null, stock: 100, sizes: ['Cup','Pot'], image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop', description: 'Spiced Indian tea with cardamom, ginger and cloves.', badge: null }
];

const ADMIN = { email: 'admin@maharajasdarbar.com', password: 'admin123', name: 'Admin', role: 'admin' };

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

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
  const toast = document.createElement('div'); toast.className = 'toast ' + type; toast.innerHTML = '<span>' + message + '</span>';
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}
function formatPrice(price) { return '₹' + Number(price).toLocaleString('en-IN'); }
function getStockClass(stock) { if (stock <= 0) return 'stock-out'; if (stock <= 10) return 'stock-low'; return 'stock-in'; }
function getStockText(stock) { if (stock <= 0) return 'Unavailable'; if (stock <= 10) return 'Limited'; return 'Available'; }

function renderProductCard(product) {
  const inWish = isInWishlist(product.id);
  return '<div class="product-card" data-id="' + product.id + '">' +
    '<div class="product-image">' +
      '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/400x300/8B1A1A/C9A227?text=Darbar\'">' +
      (product.badge ? '<span class="product-badge">' + product.badge + '</span>' : '') +
      '<button class="wishlist-btn ' + (inWish ? 'active' : '') + '" onclick="handleWishlist(\'' + product.id + '\', this)" title="Favourite">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="' + (inWish ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
      '</button></div>' +
    '<div class="product-info">' +
      '<div class="product-category">' + product.category + '</div>' +
      '<div class="product-name">' + product.name + '</div>' +
      '<div class="product-price">' + formatPrice(product.price) + (product.originalPrice ? '<span class="original">' + formatPrice(product.originalPrice) + '</span>' : '') + '</div>' +
      '<div class="product-stock ' + getStockClass(product.stock) + '">' + getStockText(product.stock) + '</div>' +
      '<div class="product-actions">' +
        '<button class="btn btn-primary btn-sm" style="flex:1" onclick="openPrebookModal(\'' + product.id + '\')">Order / Reserve</button>' +
        '<button class="btn btn-outline btn-sm" onclick="openProductDetail(\'' + product.id + '\')">View</button>' +
      '</div></div></div>';
}

function handleWishlist(productId, btn) {
  const added = toggleWishlist(productId);
  if (btn) { btn.classList.toggle('active', added); const svg = btn.querySelector('svg'); if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none'); }
}

function openPrebookModal(productId) {
  const product = getProductById(productId); if (!product) return;
  if (!isLoggedIn()) { showToast('Please login to place an order', 'error'); setTimeout(() => window.location.href = 'login.html', 1200); return; }
  let overlay = document.getElementById('prebook-modal');
  if (!overlay) { overlay = document.createElement('div'); overlay.id = 'prebook-modal'; overlay.className = 'modal-overlay'; document.body.appendChild(overlay); }
  const sizesHtml = product.sizes.map(s => '<button type="button" class="size-btn" data-size="' + s + '" onclick="selectSize(this)">' + s + '</button>').join('');
  overlay.innerHTML = '<div class="modal"><div class="modal-header"><h3>Order: ' + product.name + '</h3><button class="modal-close" onclick="closeModal(\'prebook-modal\')">&times;</button></div><div class="modal-body"><div class="flex gap-2 mb-2" style="gap:1rem"><img src="' + product.image + '" alt="" style="width:80px;height:60px;object-fit:cover;border-radius:8px" onerror="this.src=\'https://via.placeholder.com/80x60\'"><div><strong>' + product.name + '</strong><div class="product-price mt-1">' + formatPrice(product.price) + '</div><div class="product-stock ' + getStockClass(product.stock) + '">' + getStockText(product.stock) + '</div></div></div><form id="prebook-form"><input type="hidden" name="productId" value="' + product.id + '"><div class="form-group"><label>Select Portion *</label><div class="size-options" id="size-options">' + sizesHtml + '</div><input type="hidden" name="size" id="selected-size" required></div><div class="form-row"><div class="form-group"><label>Quantity *</label><input type="number" name="quantity" class="form-control" min="1" max="10" value="1" required></div><div class="form-group"><label>Preferred Date</label><input type="date" name="preferredDate" class="form-control" min="' + new Date().toISOString().split('T')[0] + '"></div></div><div class="form-group"><label>Your Phone *</label><input type="tel" name="phone" class="form-control" placeholder="9876543210" required pattern="[0-9]{10}"></div><div class="form-group"><label>Notes (optional)</label><textarea name="notes" class="form-control" rows="2" placeholder="Spice level, allergies, special request..."></textarea></div></form></div><div class="modal-footer"><button class="btn btn-secondary" onclick="closeModal(\'prebook-modal\')">Cancel</button><button class="btn btn-primary" onclick="submitPrebook()">Confirm Order</button></div></div>';
  overlay.classList.add('active');
}
function selectSize(btn) {
  document.querySelectorAll('#size-options .size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected'); document.getElementById('selected-size').value = btn.dataset.size;
}
function submitPrebook() {
  const form = document.getElementById('prebook-form');
  const size = document.getElementById('selected-size').value;
  if (!size) { showToast('Please select a portion', 'error'); return; }
  const session = getSession(); const product = getProductById(form.productId.value);
  createBooking({ productId: product.id, productName: product.name, productImage: product.image, price: product.price, size, quantity: Number(form.quantity.value), preferredDate: form.preferredDate.value || null, phone: form.phone.value, notes: form.notes.value, userId: session.id, userName: session.name, userEmail: session.email });
  closeModal('prebook-modal'); showToast('Order received! We will confirm shortly.', 'success');
}
function closeModal(id) { const el = document.getElementById(id); if (el) el.classList.remove('active'); }

function openProductDetail(productId) {
  const product = getProductById(productId); if (!product) return;
  let overlay = document.getElementById('detail-modal');
  if (!overlay) { overlay = document.createElement('div'); overlay.id = 'detail-modal'; overlay.className = 'modal-overlay'; document.body.appendChild(overlay); }
  overlay.innerHTML = '<div class="modal" style="max-width:640px"><div class="modal-header"><h3>' + product.name + '</h3><button class="modal-close" onclick="closeModal(\'detail-modal\')">&times;</button></div><div class="modal-body"><div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem"><img src="' + product.image + '" alt="' + product.name + '" style="width:100%;border-radius:12px;aspect-ratio:4/3;object-fit:cover" onerror="this.src=\'https://via.placeholder.com/300x225\'"><div><div class="product-category">' + product.category + '</div><div class="product-price" style="font-size:1.4rem;margin:0.5rem 0">' + formatPrice(product.price) + (product.originalPrice ? '<span class="original">' + formatPrice(product.originalPrice) + '</span>' : '') + '</div><div class="product-stock ' + getStockClass(product.stock) + ' mb-2">' + getStockText(product.stock) + '</div><p style="color:var(--maroon-700);margin-bottom:1rem;font-size:0.95rem">' + product.description + '</p><p style="font-size:0.85rem;color:var(--maroon-600)"><strong>Portions:</strong> ' + product.sizes.join(', ') + '</p><div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap"><button class="btn btn-primary" onclick="closeModal(\'detail-modal\');openPrebookModal(\'' + product.id + '\')">Order Now</button><button class="btn btn-outline" onclick="handleWishlist(\'' + product.id + '\');closeModal(\'detail-modal\')">' + (isInWishlist(product.id) ? 'Remove Favourite' : 'Add Favourite') + '</button></div></div></div></div></div>';
  overlay.classList.add('active');
}

function renderHeader(activePage = '') {
  const session = getSession();
  const wishCount = getWishlist().length;
  return '<header class="header"><div class="nav-container">' +
    '<a href="index.html" class="logo">Maharaja\'s<span>DARBAR</span></a>' +
    '<button class="mobile-toggle" onclick="document.querySelector(\'.nav-links\').classList.toggle(\'open\')" aria-label="Menu">☰</button>' +
    '<ul class="nav-links">' +
      '<li><a href="index.html" class="' + (activePage === 'home' ? 'active' : '') + '">Home</a></li>' +
      '<li><a href="products.html" class="' + (activePage === 'products' ? 'active' : '') + '">Menu</a></li>' +
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
    '<div><h4>Maharaja\'s Darbar</h4><p>Authentic royal Indian cuisine served with elegance and tradition.</p></div>' +
    '<div><h4>Visit Us</h4><p>Connaught Place, New Delhi</p><p>Open daily 12 PM – 11 PM</p><p>+91 11 4567 8901</p></div>' +
    '<div><h4>Quick Links</h4><a href="products.html">Menu</a><a href="contact.html">Reservations</a><a href="login.html">Login</a></div>' +
    '</div><div class="footer-bottom">© ' + new Date().getFullYear() + ' Maharaja\'s Darbar. All rights reserved.</div></footer>';
}

initData();
