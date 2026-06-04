/* ============================================================
   GET SHIT DONE HQ — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. NAV — Transparent on dark hero, white on scroll
  ---------------------------------------------------------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });


  /* ----------------------------------------------------------
     2. MOBILE MENU
  ---------------------------------------------------------- */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      hamburger.classList.remove('is-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      mobileMenu.classList.remove('is-open');
      hamburger.classList.remove('is-open');
    }
  });


  /* ----------------------------------------------------------
     3. SCROLL REVEAL — IntersectionObserver
  ---------------------------------------------------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* ----------------------------------------------------------
     4. STAGGER — Bento items
  ---------------------------------------------------------- */
  document.querySelectorAll('.bento__item').forEach((item, i) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(item);
  });


  /* ----------------------------------------------------------
     5. STAGGER — Pillars
  ---------------------------------------------------------- */
  document.querySelectorAll('.pillar').forEach((item, i) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(item);
  });


  /* ----------------------------------------------------------
     6. STAGGER — Testimonial cards
  ---------------------------------------------------------- */
  document.querySelectorAll('.testi__card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.12}s`;
    observer.observe(card);
  });


  /* ----------------------------------------------------------
     7. STAGGER — Discord messages
  ---------------------------------------------------------- */
  document.querySelectorAll('.dc__msg').forEach((msg, i) => {
    msg.classList.add('reveal');
    msg.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(msg);
  });


  /* ----------------------------------------------------------
     8. SMOOTH SCROLL — Anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ----------------------------------------------------------
     10. FAQ ACCORDION
  ---------------------------------------------------------- */
  document.querySelectorAll('.faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('is-open');

      // Close all open items
      document.querySelectorAll('.faq__item.is-open').forEach(open => {
        open.classList.remove('is-open');
      });

      // Open clicked item if it was closed
      if (!isOpen) item.classList.add('is-open');
    });
  });


  /* ----------------------------------------------------------
     11. ACTIVE NAV — Highlight current section
  ---------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav__links a');

  document.querySelectorAll('section[id]').forEach(section => {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, { threshold: 0.4 }).observe(section);
  });

});
