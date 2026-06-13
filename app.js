(function () {
  // -----------------------------------------------------------------------
  // App-konfigurasjon
  // -----------------------------------------------------------------------
  // Endre APP_URL her — alle CTA-er som peker inn i Echoo-appen bygges fra
  // denne konstanten. Elementene i HTML har attributtet [data-app-path] med
  // path-delen (f.eks. "/signup?plan=base"), og en statisk fallback-href.
  // JS overskriver href = APP_URL + data-app-path ved sideinnlasting.
  var APP_URL = "https://app.echoo.no";

  document.querySelectorAll('[data-app-path]').forEach(function (el) {
    var path = el.getAttribute('data-app-path') || '/';
    el.setAttribute('href', APP_URL + path);
  });

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

  // Demo-form: client-side validering + AJAX-submit til Netlify Forms.
  // Submissions havner under Site → Forms i Netlify dashboard.
  const form = document.getElementById('demoForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      let ok = true;
      ['navn', 'bedrift', 'telefon'].forEach(n => {
        const inp = form.querySelector('[name="' + n + '"]');
        const field = inp.closest('.field');
        if (!inp.value.trim()) { field.classList.add('err'); ok = false; }
        else field.classList.remove('err');
      });
      if (!ok) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sender…'; }

      try {
        const body = new URLSearchParams();
        new FormData(form).forEach((v, k) => body.append(k, v));
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        });
        if (!res.ok) throw new Error('Netlify submit returned ' + res.status);
        form.style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
      } catch (err) {
        console.error('Form submission failed:', err);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        alert('Innsending feilet. Prøv igjen, eller send oss en e-post på hei@echoo.no.');
      }
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
