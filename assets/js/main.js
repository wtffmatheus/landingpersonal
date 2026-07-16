'use strict';

(() => {
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  const WHATSAPP_NUMBER = '5511991234513';
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const form = document.querySelector('#lead-form');
  const difficulty = document.querySelector('#dificuldade');
  const counter = document.querySelector('[data-counter]');

  const trackEvent = (eventName, parameters = {}) => {
    const cleanName = String(eventName).replace(/[^a-zA-Z0-9_]/g, '').slice(0, 60);

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: cleanName, ...parameters });
    }

    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', cleanName, parameters);
    }
  };

  const setMenuState = (isOpen) => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuState(false);
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-accordion] button[aria-controls]').forEach((button) => {
    button.addEventListener('click', () => {
      const panelId = button.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      if (!panel) return;

      button.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });
  });

  const setError = (field, message) => {
    const error = document.getElementById(`${field.id}-error`);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
  };

  const cleanValue = (value, maxLength) => value
    .replace(/[<>\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

  if (difficulty && counter) {
    difficulty.addEventListener('input', () => {
      counter.textContent = `${difficulty.value.length}/240`;
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameField = form.elements.namedItem('nome');
      const goalField = form.elements.namedItem('objetivo');
      const difficultyField = form.elements.namedItem('dificuldade');
      const consentField = document.querySelector('#consentimento');

      if (!(nameField instanceof HTMLInputElement) ||
          !(goalField instanceof HTMLSelectElement) ||
          !(difficultyField instanceof HTMLTextAreaElement) ||
          !(consentField instanceof HTMLInputElement)) return;

      const name = cleanValue(nameField.value, 60);
      const goal = cleanValue(goalField.value, 100);
      const challenge = cleanValue(difficultyField.value, 240);

      setError(nameField, name.length >= 2 ? '' : 'Informe seu nome com pelo menos 2 caracteres.');
      setError(goalField, goal ? '' : 'Selecione seu objetivo principal.');
      setError(consentField, consentField.checked ? '' : 'Confirme que entendeu como a mensagem será enviada.');

      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid instanceof HTMLElement) {
        firstInvalid.focus();
        return;
      }

      const challengeText = challenge
        ? ` Minha maior dificuldade hoje é: ${challenge}.`
        : '';
      const message = `Olá! Meu nome é ${name}. Conheci o Programa de 45 Dias pelo site. Meu principal objetivo é ${goal}.${challengeText} Gostaria de entender como funciona a avaliação inicial.`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      trackEvent('lead_form_whatsapp', { goal });
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  document.querySelectorAll('.js-whatsapp[data-event]').forEach((link) => {
    link.addEventListener('click', () => {
      trackEvent(link.getAttribute('data-event') || 'whatsapp_click');
    });
  });

  const mapButton = document.querySelector('[data-load-map]');
  const mapContainer = document.querySelector('[data-map-container]');
  if (mapButton && mapContainer) {
    mapButton.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=Alameda+Professor+Lucas+Nogueira+Garcez+1195+Atibaia+SP&output=embed';
      iframe.title = 'Mapa da RV Fisiologia em Atibaia';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      mapContainer.replaceChildren(iframe);
      trackEvent('map_loaded');
    }, { once: true });
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Integrações opcionais:
  // 1. Google Analytics 4: carregue o script apenas após consentimento.
  // 2. Meta Pixel: carregue apenas após consentimento.
  // Os eventos já preparados usam dataLayer e fbq quando essas funções existem.
})();
