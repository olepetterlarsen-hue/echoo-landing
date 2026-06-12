(function () {
  // Sticky nav shadow
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile burger menu
  const burger = document.getElementById('navBurger');
  const closeMenu = () => {
    nav.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('#navMobile a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 940) closeMenu(); });

  // Showcase tabs
  const tabs = document.querySelectorAll('.sc-tab');
  const panels = document.querySelectorAll('.sc-panel');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
    panels.forEach(p => p.classList.remove('active'));
    t.classList.add('active');
    t.setAttribute('aria-selected', 'true');
    document.querySelector('.sc-panel[data-panel="' + t.dataset.tab + '"]').classList.add('active');
  }));

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const a = item.querySelector('.faq-a');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Demo slot select
  let chosen = null;
  document.querySelectorAll('.slot').forEach(s => s.addEventListener('click', () => {
    document.querySelectorAll('.slot').forEach(x => x.classList.remove('sel'));
    s.classList.add('sel');
    chosen = s.dataset.slot;
    document.getElementById('tidspunkt').value = chosen;
  }));

  // Form validation (client-side only — wire up real submit/CRM at integration)
  const form = document.getElementById('demoForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      ['navn', 'bedrift', 'telefon'].forEach(n => {
        const inp = form.querySelector('[name="' + n + '"]');
        const field = inp.closest('.field');
        if (!inp.value.trim()) { field.classList.add('err'); ok = false; }
        else field.classList.remove('err');
      });
      if (!ok) return;
      form.style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
    });
    form.querySelectorAll('input').forEach(inp => inp.addEventListener('input', () => inp.closest('.field').classList.remove('err')));
  }

  // Scroll reveal — fall back to visible if IO unsupported or motion-reduced
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || prefersReduced) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
})();
