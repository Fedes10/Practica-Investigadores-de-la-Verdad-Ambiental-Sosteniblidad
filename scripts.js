/* ═══════════════════════════════════════════════
   INVESTIGADORES DE LA VERDAD AMBIENTAL
   Scripts — Juan Raigón & Federico Lora, 1º DAM
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Elementos ── */
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('.section');
  const ctaBtns    = document.querySelectorAll('[data-section]');
  const navToggle  = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  /* ── Navegación principal ── */
  function showSection(id) {
    // Ocultar todas
    sections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    // Activar la seleccionada
    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    // Marcar enlace activo
    navLinks.forEach(link => {
      if (link.dataset.section === id) link.classList.add('active');
    });

    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Cerrar menú móvil si está abierto
    navLinksEl.classList.remove('open');
  }

  /* ── Listeners: nav links ── */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.dataset.section;
      if (id) showSection(id);
    });
  });

  /* ── Listeners: botones CTA (hero, etc.) ── */
  ctaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.section;
      if (id) showSection(id);
    });
  });

  /* ── Menú hamburguesa (móvil) ── */
  navToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });

  /* ── Cerrar menú móvil al hacer clic fuera ── */
  document.addEventListener('click', e => {
    if (
      !navLinksEl.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinksEl.classList.remove('open');
    }
  });

  /* ── Animación de barras de fiabilidad al entrar en conclusiones ── */
  function animateReliabilityBars() {
    const fills = document.querySelectorAll('.rel-fill');
    fills.forEach(bar => {
      // Re-trigger CSS transition reseteando y volviendo a poner el width
      const targetWidth = bar.style.width || getComputedStyle(bar).width;
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = targetWidth;
        });
      });
    });
  }

  /* ── Interceptar showSection para animaciones específicas ── */
  const _showSection = showSection;
  window._showSection = function(id) {
    _showSection(id);
    if (id === 'conclusiones') {
      setTimeout(animateReliabilityBars, 100);
    }
  };

  // Reemplazar referencias internas
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      if (link.dataset.section === 'conclusiones') {
        setTimeout(animateReliabilityBars, 120);
      }
    });
  });
  ctaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.section === 'conclusiones') {
        setTimeout(animateReliabilityBars, 120);
      }
    });
  });

  /* ── Estado inicial ── */
  showSection('inicio');

})();
