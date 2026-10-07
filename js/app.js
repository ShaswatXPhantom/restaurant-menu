(async function(){
  const parts = ['js/part0.js','js/part1.js','js/part2.js'];
  let code = '';
  for (const p of parts) {
    const r = await fetch(p);
    code += await r.text();
  }
  const s = document.createElement('script');
  s.textContent = code;
  document.head.appendChild(s);
})();
