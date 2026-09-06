(() => {
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  const header = document.querySelector('[data-header]');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu?.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 1080) closeMenu(); });

  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-accordion] button').forEach((button) => {
    button.addEventListener('click', () => {
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;
      const willOpen = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(willOpen));
      panel.hidden = !willOpen;
    });
  });

  const video = document.querySelector('[data-video]');
  const play = document.querySelector('[data-video-play]');
  const shell = video?.closest('.video-shell');
  play?.addEventListener('click', async () => {
    try {
      await video.play();
      shell?.classList.add('is-playing');
    } catch (_) {
      video.controls = true;
    }
  });
  video?.addEventListener('play', () => shell?.classList.add('is-playing'));
  video?.addEventListener('pause', () => shell?.classList.remove('is-playing'));

  const loadMap = document.querySelector('[data-load-map]');
  const map = document.querySelector('[data-map]');
  loadMap?.addEventListener('click', () => {
    if (!map || map.querySelector('iframe')) return;
    const iframe = document.createElement('iframe');
    iframe.title = 'Mapa da RV Fisiologia em Atibaia';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.src = 'https://www.google.com/maps?q=Alameda+Prof.+Lucas+Nogueira+Garcez+1195+Atibaia+SP&output=embed';
    map.replaceChildren(iframe);
  });

  const form = document.querySelector('[data-lead-form]');
  const nameInput = document.getElementById('nome');
  const goalInput = document.getElementById('objetivo');
  const formatInput = document.getElementById('formato');
  const messageInput = document.getElementById('mensagem');
  const counter = document.querySelector('[data-char-count]');

  const setError = (input, message) => {
    if (!input) return;
    const error = document.querySelector(`[data-error-for="${input.name}"]`);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message || '';
  };

  messageInput?.addEventListener('input', () => {
    if (counter) counter.textContent = `${messageInput.value.length}/400`;
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput?.value.trim() || '';
    const goal = goalInput?.value.trim() || '';
    let valid = true;
    if (name.length < 2) { setError(nameInput, 'Digite seu nome.'); valid = false; } else setError(nameInput, '');
    if (!goal) { setError(goalInput, 'Selecione seu principal objetivo.'); valid = false; } else setError(goalInput, '');
    if (!valid) return;

    const format = formatInput?.value || 'Quero entender as opções';
    const notes = messageInput?.value.trim();
    const lines = [
      `Olá! Meu nome é ${name}.`,
      `Conheci a RV Fisiologia pelo site e gostaria de entender o acompanhamento.`,
      `Objetivo: ${goal}.`,
      `Formato: ${format}.`
    ];
    if (notes) lines.push(`Observação: ${notes}`);
    window.open(`https://wa.me/5511991234513?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  });

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
})();
