/* Radhe Radhe — fast loader: preconnect + parallel-friendly core then settings */
(function () {
  // Hint browser early (if not already in HTML)
  if (!document.querySelector('link[href*="jsdelivr"]')) {
    var l = document.createElement('link');
    l.rel = 'preconnect';
    l.href = 'https://cdn.jsdelivr.net';
    l.crossOrigin = '';
    document.head.appendChild(l);
  }
  if (!document.querySelector('link[href*="images.unsplash"]')) {
    var u = document.createElement('link');
    u.rel = 'preconnect';
    u.href = 'https://images.unsplash.com';
    u.crossOrigin = '';
    document.head.appendChild(u);
  }

  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src;
    s.async = false; // preserve order for core → settings
    s.onload = cb || function () {};
    s.onerror = function () {
      console.error('Failed to load', src);
      if (cb) cb();
    };
    document.head.appendChild(s);
  }

  // Cached core from known-good commit (jsDelivr CDN is fast & cached globally)
  loadScript(
    'https://cdn.jsdelivr.net/gh/ShaswatXPhantom/restaurant-menu@7d74e21b3a02a10ad035ae9323456cb9cdae101c/js/app.js',
    function () {
      loadScript('js/settings.js');
    }
  );
})();
