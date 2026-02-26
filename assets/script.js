
(function(){
  const y = new Date().getFullYear();
  const el = document.querySelector('[data-year]');
  if(el) el.textContent = y;

  // Reveal on scroll
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('is-in');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(n=>obs.observe(n));

  // Parallax (lightweight)
  const parNodes = Array.from(document.querySelectorAll('[data-parallax]'));
  function onScroll(){
    const sy = window.scrollY || 0;
    parNodes.forEach(n=>{
      const speed = parseFloat(n.dataset.parallax || "0.15");
      n.style.setProperty('--par', (sy * speed * -0.05).toFixed(2) + 'px');
    });
    // timeline progress
    const tl = document.querySelector('[data-timeline]');
    const prog = document.querySelector('.progressLine');
    if(tl && prog){
      const rect = tl.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const total = rect.height;
      const visible = Math.min(total, Math.max(0, viewH - rect.top));
      const pct = Math.min(100, Math.max(0, (visible / total) * 100));
      prog.style.height = pct + '%';
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mouse parallax in hero cards
  document.querySelectorAll('.heroCard').forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.setProperty('--px', (x*18).toFixed(1)+'px');
      card.style.setProperty('--py', (y*18).toFixed(1)+'px');
    });
  });

  // Gallery filters
  const chips = document.querySelectorAll('[data-filter]');
  if(chips.length){
    let active = 'all';
    function apply(){
      document.querySelectorAll('.gItem').forEach(item=>{
        const tags = (item.dataset.tags || '').split(',').map(s=>s.trim());
        const ok = active === 'all' || tags.includes(active);
        item.style.display = ok ? '' : 'none';
      });
    }
    chips.forEach(c=>{
      c.addEventListener('click', ()=>{
        chips.forEach(x=>x.setAttribute('aria-pressed','false'));
        c.setAttribute('aria-pressed','true');
        active = c.dataset.filter;
        apply();
      });
    });
    apply();
  }

  // Configurator (simple)
  const cfg = document.querySelector('[data-configurator]');
  if(cfg){
    const modelSel = cfg.querySelector('#cfgModel');
    const colorSel = cfg.querySelector('#cfgColor');
    const wheelSel = cfg.querySelector('#cfgWheels');
    const preview = cfg.querySelector('#cfgPreviewImg');
    const summary = cfg.querySelector('#cfgSummary');
    const price = cfg.querySelector('#cfgPrice');

    const data = {
      "Chiron": { base: 3000000, img: "assets/model-chiron.svg" },
      "Divo": { base: 5500000, img: "assets/model-divo.svg" },
      "Centodieci": { base: 9000000, img: "assets/model-centodieci.svg" },
      "Bolide": { base: 4000000, img: "assets/model-bolide.svg" }
    };
    const colorCost = { "Deep Blue": 0, "Noir": 15000, "Pearl White": 12000, "French Racing Blue": 18000 };
    const wheelCost = { "Standard": 0, "Carbon": 25000, "Forged": 18000 };

    function fmt(n){
      try { return new Intl.NumberFormat('en-US', {style:'currency', currency:'EUR', maximumFractionDigits:0}).format(n); }
      catch(e){ return "€" + Math.round(n).toString(); }
    }

    function update(){
      const m = modelSel.value;
      const c = colorSel.value;
      const w = wheelSel.value;
      const p = data[m].base + (colorCost[c]||0) + (wheelCost[w]||0);
      preview.src = data[m].img;
      summary.textContent = `${m} • Color: ${c} • Wheels: ${w}`;
      price.textContent = fmt(p) + " (illustrative)";
    }
    [modelSel,colorSel,wheelSel].forEach(s=>s.addEventListener('change', update));
    update();
  }
})();
