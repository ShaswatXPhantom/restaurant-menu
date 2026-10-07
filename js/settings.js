// Admin-editable restaurant settings (Radhe Radhe)
(function () {
  window.DEFAULT_SETTINGS = {
    restaurantName: 'Radhe Radhe Restaurant',
    tagline: 'Pure vegetarian Indian cuisine served with devotion',
    about: 'Welcome to Radhe Radhe. Pure vegetarian Indian food made with devotion and care.',
    address: 'Near Temple Road, Delhi',
    city: 'Delhi',
    pincode: '110001',
    phone: '+91 98765 43210',
    email: 'hello@radheradhe.com',
    whatsapp: '919876543210',
    hours: 'Open daily 11 AM – 10 PM',
    hoursDetail: 'Monday – Sunday: 11:00 AM – 10:00 PM',
    mapUrl: 'https://maps.google.com/?q=Delhi',
    mapEmbed: 'https://maps.google.com/maps?q=Delhi&output=embed',
    promoText: '🙏 Radhe Radhe · Pure Vegetarian · Order Online & Reserve Tables',
    heroSubtitle: 'Pure vegetarian Indian cuisine served with devotion. Fresh, flavourful, and made with love.'
  };

  window.getSettings = function () {
    try {
      var s = JSON.parse(localStorage.getItem('rr_settings') || 'null');
      if (!s || typeof s !== 'object') return Object.assign({}, DEFAULT_SETTINGS);
      return Object.assign({}, DEFAULT_SETTINGS, s);
    } catch (e) {
      return Object.assign({}, DEFAULT_SETTINGS);
    }
  };

  window.saveSettings = function (partial) {
    var next = Object.assign({}, getSettings(), partial);
    localStorage.setItem('rr_settings', JSON.stringify(next));
    return next;
  };

  window.renderLocationBlock = function () {
    var s = getSettings();
    var phone = String(s.phone || '').replace(/\s/g, '');
    var html =
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem">' +
      '<div style="background:white;padding:1.75rem;border-radius:16px;box-shadow:var(--shadow);border-top:4px solid var(--gold)">' +
      '<h3 style="margin-bottom:1rem">📍 Our Location</h3>' +
      '<p style="margin-bottom:0.6rem"><strong>Address</strong><br>' +
      (s.address || '') +
      '<br>' +
      (s.city || '') +
      (s.pincode ? ' ' + s.pincode : '') +
      '</p>' +
      '<p style="margin-bottom:0.6rem"><strong>Phone</strong><br><a href="tel:' +
      phone +
      '">' +
      (s.phone || '') +
      '</a></p>' +
      (s.email
        ? '<p style="margin-bottom:0.6rem"><strong>Email</strong><br><a href="mailto:' +
          s.email +
          '">' +
          s.email +
          '</a></p>'
        : '') +
      '<p style="margin-bottom:1rem"><strong>Hours</strong><br>' +
      (s.hoursDetail || s.hours || '') +
      '</p>' +
      (s.whatsapp
        ? '<a href="https://wa.me/' +
          s.whatsapp +
          '" target="_blank" rel="noopener" class="btn btn-primary" style="margin-right:0.5rem">WhatsApp</a>'
        : '') +
      (s.mapUrl
        ? '<a href="' +
          s.mapUrl +
          '" target="_blank" rel="noopener" class="btn btn-outline">Open Map</a>'
        : '') +
      '</div>' +
      (s.mapEmbed
        ? '<div style="border-radius:16px;overflow:hidden;box-shadow:var(--shadow);min-height:280px"><iframe src="' +
          s.mapEmbed +
          '" width="100%" height="100%" style="min-height:280px;border:0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>'
        : '') +
      '</div>';
    return html;
  };

  // Override footer to use live settings
  var _origFooter = window.renderFooter;
  window.renderFooter = function () {
    var s = getSettings();
    var phone = String(s.phone || '').replace(/\s/g, '');
    return (
      '<footer class="footer"><div class="footer-grid">' +
      '<div><h4>' +
      (s.restaurantName || 'Radhe Radhe Restaurant') +
      '</h4><p>' +
      (s.tagline || '') +
      ' 🙏</p></div>' +
      '<div><h4>Visit Us</h4><p>' +
      (s.address || '') +
      (s.city ? ', ' + s.city : '') +
      '</p><p>' +
      (s.hours || '') +
      '</p><p><a href="tel:' +
      phone +
      '">' +
      (s.phone || '') +
      '</a></p></div>' +
      '<div><h4>Quick Links</h4><a href="products.html">Menu</a><a href="reviews.html">Reviews</a><a href="contact.html">Location</a><a href="login.html">Login</a></div>' +
      '</div><div class="footer-bottom">© ' +
      new Date().getFullYear() +
      ' ' +
      (s.restaurantName || 'Radhe Radhe Restaurant') +
      '. All rights reserved.</div></footer>'
    );
  };

  // Override header logo name from settings
  var _origHeader = window.renderHeader;
  if (typeof _origHeader === 'function') {
    window.renderHeader = function (activePage) {
      var html = _origHeader(activePage);
      var s = getSettings();
      var name = s.restaurantName || 'Radhe Radhe Restaurant';
      var short = name.replace(/\s*Restaurant\s*$/i, '').trim() || 'Radhe Radhe';
      html = html.replace(
        /class="logo">[^<]*(?:<span>[^<]*<\/span>)?/,
        'class="logo">' + short + '<span>RESTAURANT</span>'
      );
      return html;
    };
  }

  if (!localStorage.getItem('rr_settings')) {
    localStorage.setItem('rr_settings', JSON.stringify(DEFAULT_SETTINGS));
  }
})();
