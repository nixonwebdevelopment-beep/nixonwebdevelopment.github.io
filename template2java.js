document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".animate-on-scroll, .fade-in-image");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active", "visible");
      } else {
        entry.target.classList.remove("active", "visible");
      }
    });
  }, {
    threshold: 0.3
  });

  elements.forEach(el => observer.observe(el));
});
// Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
  });
  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
  
let timers = [];
let splitDone = false;

function clearTimers() {
  timers.forEach(t => clearTimeout(t));
  timers = [];
}

function splitHeading() {
  if (splitDone) return;
  const heading = document.querySelector('#section1p .animate-on-scroll');
  if (heading) {
    const text = heading.textContent.trim();
    heading.innerHTML = text
      .split('')
      .map((char, i) =>
        char === ' '
          ? `<span class="letter" style="transition-delay:${i * 48}ms">&nbsp;</span>`
          : `<span class="letter" style="transition-delay:${i * 48}ms">${char}</span>`
      )
      .join('');
    heading.classList.remove('animate-on-scroll');
    splitDone = true;
  }
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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timers.push(setTimeout(playAnimation, 150));
      } else {
        resetAll();
      }
    });
  },
  { threshold: 0.2 }
);

window.addEventListener('load', () => {
  splitHeading();
  observer.observe(document.querySelector('.parallax'));
});


