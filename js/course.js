/* ============================================================
   GET SHIT DONE HQ — Sales Page JavaScript (course.js)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. STICKY NAV — Add raised shadow on scroll
  ---------------------------------------------------------- */
  const nav = document.getElementById('sp-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-raised', window.scrollY > 20);
  }, { passive: true });


  /* ----------------------------------------------------------
     2. SCROLL REVEAL — IntersectionObserver
  ---------------------------------------------------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* ----------------------------------------------------------
     3. STAGGER — Problem cards
  ---------------------------------------------------------- */
  document.querySelectorAll('.sp-problem__card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });


  /* ----------------------------------------------------------
     4. STAGGER — Module cards
  ---------------------------------------------------------- */
  document.querySelectorAll('.sp-module').forEach((mod, i) => {
    mod.style.transitionDelay = `${(i % 2) * 0.12}s`;
  });


  /* ----------------------------------------------------------
     5. STAGGER — Bonus cards
  ---------------------------------------------------------- */
  document.querySelectorAll('.sp-bonus').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });


  /* ----------------------------------------------------------
     6. STAGGER — Guarantee cards
  ---------------------------------------------------------- */
  document.querySelectorAll('.sp-guarantee__card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.14}s`;
  });


  /* ----------------------------------------------------------
     7. STAGGER — Testimonial cards
  ---------------------------------------------------------- */
  document.querySelectorAll('.sp-testi__card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });


  /* ----------------------------------------------------------
     8. FAQ ACCORDION
  ---------------------------------------------------------- */
  document.querySelectorAll('.sp-faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.parentElement;
      const isOpen  = item.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.sp-faq__item.is-open').forEach(open => {
        open.classList.remove('is-open');
      });

      // Open clicked if it was closed
      if (!isOpen) item.classList.add('is-open');
    });
  });


  /* ----------------------------------------------------------
     9. SMOOTH SCROLL — All anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        // Account for sticky nav + announce bar height (~100px)
        const top = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ----------------------------------------------------------
     10. STACK ITEM STAGGER — Value stack reveal
  ---------------------------------------------------------- */
  document.querySelectorAll('.sp-stack__item').forEach((item, i) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(item);
  });

  /* ----------------------------------------------------------
   NUMBER COUNTER ANIMATION — Pricing stack value items
---------------------------------------------------------- */
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const isDecimal = el.getAttribute('data-decimal') === 'true';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic — starts fast, slows at the end
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = prefix + (isDecimal
      ? current.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      : Math.floor(current).toLocaleString('en-PH'));
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.sp-counter').forEach(el => counterObserver.observe(el));

});
