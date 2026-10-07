// Admin-editable restaurant settings
(function(){
  window.DEFAULT_SETTINGS = {
    restaurantName: 'Radhe Radhe Restaurant',
    tagline: 'Pure vegetarian Indian cuisine served with devotion',
    about: 'Welcome to Radhe Radhe. Pure vegetarian Indian food made with devotion.',
    address: 'Near Temple Road, Delhi', city: 'Delhi', pincode: '110001',
    phone: '+91 98765 43210', email: 'hello@radheradhe.com', whatsapp: '919876543210',
    hours: 'Open daily 11 AM – 10 PM', hoursDetail: 'Monday – Sunday: 11:00 AM – 10:00 PM',
    mapUrl: 'https://maps.google.com/?q=Delhi',
    mapEmbed: 'https://maps.google.com/maps?q=Delhi&output=embed',
    promoText: '🙏 Radhe Radhe · Pure Vegetarian · Order Online & Reserve Tables',
    heroSubtitle: 'Pure vegetarian Indian cuisine served with devotion.'
  };
  window.getSettings = function() {
    try {
      var s = JSON.parse(localStorage.getItem('rr_settings')||'null');
      if (!s || typeof s !== 'object') return Object.assign({}, DEFAULT_SETTINGS);
      return Object.assign({}, DEFAULT_SETTINGS, s);
    } catch(e) { return Object.assign({}, DEFAULT_SETTINGS); }
  };
  window.saveSettings = function(partial) {
    var next = Object.assign({}, getSettings(), partial);
    localStorage.setItem('rr_settings', JSON.stringify(next));
    return next;
  };
  window.renderLocationBlock = function() {
    var s = getSettings();
    var phone = String(s.phone).replace(/\s/g,'');
    return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem">' +
      '<div style="background:white;padding:1.75rem;border-radius:16px;box-shadow:var(--shadow);border-top:4px solid var(--gold)">' +
        '<h3 style="margin-bottom:1rem">📍 Our Location</h3>' +
        '<p style="margin-bottom:0.6rem"><strong>Address</strong><br>' + s.address + '<br>' + (s.city||'') + (s.pincode?' '+s.pincode:'') + '</p>' +
        '<p style="margin-bottom:0.6rem"><strong>Phone</strong><br><a href="tel:' + phone + '">' + s.phone + '</a></p>' +
        (s.email ? '<p style="margin-bottom:0.6rem"><strong>Email</strong><br><a href="mailto:' + s.email + '">' + s.email + '</a></p>' : '') +
        '<p style="margin-bottom:1rem"><strong>Hours</strong><br>' + (s.hoursDetail||s.hours) + '</p>' +
        (s.whatsapp ? '<a href="https://wa.me/' + s.whatsapp + '" target="_blank" class="btn btn-primary" style="margin-right:0.5rem">WhatsApp</a>' : '') +
        (s.mapUrl ? '<a href="' + s.mapUrl + '" target="_blank" class="btn btn-outline">Open Map</a>' : '') +
      '</div>' +
      (s.mapEmbed ? '<div style="border-radius:16px;overflow:hidden;box-shadow:var(--shadow);min-height:280px"><iframe src="' + s.mapEmbed + '" width="100%" height="100%" style="min-height:280px;border:0" allowfullscreen loading="lazy"></iframe></div>' : '') +
    '</div>';
  };
  var _origFooter = window.renderFooter;
  window.renderFooter = function() {
    var s = getSettings();
    return '<footer class="footer"><div class="footer-grid">' +
      '<div><h4>' + s.restaurantName + '</h4><p>' + s.tagline + ' 🙏</p></div>' +
      '<div><h4>Visit Us</h4><p>' + s.address + (s.city?', '+s.city:'') + '</p><p>' + s.hours + '</p><p><a href="tel:' + String(s.phone).replace(/\s/g,'') + '">' + s.phone + '</a></p></div>' +
      '<div><h4>Quick Links</h4><a href="products.html">Menu</a><a href="reviews.html">Reviews</a><a href="contact.html">Location</a><a href="login.html">Login</a></div>' +
      '</div><div class="footer-bottom">© ' + new Date().getFullYear() + ' ' + s.restaurantName + '. All rights reserved.</div></footer>';
  };
  if (!localStorage.getItem('rr_settings')) localStorage.setItem('rr_settings', JSON.stringify(DEFAULT_SETTINGS));
})();
