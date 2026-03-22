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

  // ── Heading slide-in animation ───────────────────────────────
  let timers = [];
  let splitDone = false;

  function clearTimers() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
  }

  function splitHeading() {
    if (splitDone) return;
    const heading = document.querySelector('#section1p .animate-on-scroll');
    if (!heading) return;
    const text = heading.textContent.trim();
    heading.innerHTML = text
      .split('')
      .map(char =>
        char === ' '
          ? `<span class="letter">&nbsp;</span>`
          : `<span class="letter">${char}</span>`
      )
      .join('');
    heading.classList.remove('animate-on-scroll');
    splitDone = true;
  }

  function resetAll() {
    clearTimers();
    document.querySelectorAll('.letter').forEach(l => l.classList.remove('visible'));
    document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.remove('visible'));
  }

  function playAnimation() {
    clearTimers();
    requestAnimationFrame(() => {
      document.querySelectorAll('.letter').forEach(l => l.classList.add('visible'));
    });
    const p2Span = document.querySelector('.p2 .animate-on-scroll');
    if (p2Span) timers.push(setTimeout(() => p2Span.classList.add('visible'), 950));
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

  splitHeading();
  const parallax = document.querySelector('.parallax');
  if (parallax) parallaxObserver.observe(parallax);
});



