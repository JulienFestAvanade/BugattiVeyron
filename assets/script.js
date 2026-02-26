
(function(){
  const y = new Date().getFullYear();
  const el = document.querySelector('[data-year]');
  if(el) el.textContent = y;

  // Smooth scroll for anchor links (if any)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
    history.replaceState(null, '', id);
  });

  // Print shortcut on technical page
  document.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p'){
      // Let browser handle, but add a small hint for first time
      const hint = document.querySelector('[data-print-hint]');
      if(hint && !hint.dataset.seen){
        hint.dataset.seen = '1';
        hint.style.opacity = '1';
        setTimeout(()=>hint.style.opacity='0', 2200);
      }
    }
  });
})();
