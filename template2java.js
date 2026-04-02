document.addEventListener("DOMContentLoaded", function () {

  // ── Mobile nav toggle ────────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Scroll progress bar ──────────────────────────────────────
 window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.height = progress + '%';
});

  // ── General fade-in observer ─────────────────────────────────
  const fadeElements = document.querySelectorAll(".fade-in-image");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active", "visible");
      } else {
        entry.target.classList.remove("active", "visible");
      }
    });
  }, { threshold: 0.3 });
  fadeElements.forEach(el => fadeObserver.observe(el));

  // ── Image overlay on click ───────────────────────────────────
  document.querySelectorAll('.websitebox').forEach(box => {
    box.addEventListener('click', () => {
      const img = box.querySelector('img');
      if (!img) return;
      document.getElementById('overlay-img').src = img.src;
      document.getElementById('overlay').classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  window.closeOverlay = function() {
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = '';
  };

  document.getElementById('overlay').addEventListener('click', function(e) {
    if (e.target === this) closeOverlay();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeOverlay();
  });

  // ── Heading slide-in animation ───────────────────────────────
  let timers = [];

  function clearTimers() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
  }

  function resetAll() {
    clearTimers();
    document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.remove('visible'));
  }

  function playAnimation() {
    clearTimers();
    document.querySelectorAll('.p2 .animate-on-scroll, .p4 .animate-on-scroll').forEach((el, i) => {
      timers.push(setTimeout(() => el.classList.add('visible'), i * 300));
    });
  }

  const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timers.push(setTimeout(playAnimation, 150));
      } else {
        resetAll();
      }
    });
  }, { threshold: 0.2 });

  const parallax = document.querySelector('.parallax');
  if (parallax) parallaxObserver.observe(parallax);

});
