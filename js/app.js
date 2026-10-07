/* Radhe Radhe - load last good core, then settings overlay */
(function(){
  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = cb || function(){};
    s.onerror = function(){ console.error('Failed to load', src); if(cb) cb(); };
    document.head.appendChild(s);
  }
  // Core app from last known good commit on this repo
  loadScript('https://cdn.jsdelivr.net/gh/ShaswatXPhantom/restaurant-menu@7d74e21b3a02a10ad035ae9323456cb9cdae101c/js/app.js', function(){
    loadScript('js/settings.js');
  });
})();
