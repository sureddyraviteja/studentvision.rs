/* ============================================================
   StudentvisionRs — script.js
   Handles: nav scroll, hamburger menu, scroll reveal,
            progress bar, form submission, footer year,
            smooth scroll offset
   ============================================================ */

(function () {
  'use strict';

  /* ── SMOOTH SCROLL WITH NAVBAR OFFSET ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var navHeight = document.getElementById('navbar').offsetHeight;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // close mobile overlay if open
      closeMobileMenu();
    });
  });

  /* ── NAVBAR SCROLL STATE ────────────────────────────────── */
  var navbar = document.getElementById('navbar');
  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ── PROGRESS BAR ───────────────────────────────────────── */
  var progressBar = document.getElementById('progress-bar');
  function updateProgress() {
    var scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    var total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = total > 0 ? (scrolled / total) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── MOBILE HAMBURGER ────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var mobileOverlay = document.getElementById('mobile-overlay');
  var overlayClose = document.getElementById('overlay-close');

  function openMobileMenu() {
    hamburger.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileOverlay.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (overlayClose) {
    overlayClose.addEventListener('click', closeMobileMenu);
  }

  // Close on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal-section');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── 3D CARD TILT (service & content cards) ─────────────── */
  function addTilt(selector) {
    document.querySelectorAll(selector).forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var rotX = ((y - cy) / cy) * 4;
        var rotY = ((x - cx) / cx) * -4;
        card.style.transform =
          'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateZ(4px)';
        card.style.transition = 'transform 0.08s linear';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.transition = 'transform 0.4s ease, background 0.3s ease';
      });
    });
  }
  addTilt('.service-card');
  addTilt('.content-card');

  /* ── CONTACT FORM ────────────────────────────────────────── */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'warning',
            title: 'Missing Fields',
            text: 'Please fill in your name, email, and message.',
            background: '#141210',
            color: '#F2EDE4',
            confirmButtonColor: '#C89540',
            iconColor: '#C89540',
            customClass: { popup: 'swal-custom' }
          });
        }
        return;
      }

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'warning',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
            background: '#141210',
            color: '#F2EDE4',
            confirmButtonColor: '#C89540',
            iconColor: '#C89540'
          });
        }
        return;
      }

      // Simulate sending
      var btn = form.querySelector('.btn-primary');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;

        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you, ' + name + '! I will get back to you within 24 hours.',
            background: '#141210',
            color: '#F2EDE4',
            confirmButtonColor: '#C89540',
            iconColor: '#C89540'
          });
        }
        form.reset();
      }, 1200);
    });
  }

  /* ── FOOTER COPYRIGHT YEAR ───────────────────────────────── */
  var footerCopy = document.getElementById('footer-copy');
  if (footerCopy) {
    var year = new Date().getFullYear();
    footerCopy.innerHTML =
      '&copy; ' + year + ' Ravi Teja &mdash; StudentvisionRs. All rights reserved.';
  }

  /* ── PARALLAX HERO DECO ──────────────────────────────────── */
  var decoRing = document.querySelector('.deco-ring');
  if (decoRing) {
    window.addEventListener('scroll', function () {
      var scrolled = window.pageYOffset;
      decoRing.style.transform = 'translateY(' + scrolled * 0.08 + 'px) rotate(' + scrolled * 0.02 + 'deg)';
    }, { passive: true });
  }

  /* ── BLOG ROW HOVER ACCENT ───────────────────────────────── */
  document.querySelectorAll('.blog-row').forEach(function (row) {
    row.addEventListener('mouseenter', function () {
      row.style.paddingLeft = '0.5rem';
      row.style.transition = 'padding-left 0.25s ease';
    });
    row.addEventListener('mouseleave', function () {
      row.style.paddingLeft = '0';
    });
  });

  /* ── INPUT FOCUS LABEL GLOW ──────────────────────────────── */
  document.querySelectorAll('input, textarea, select').forEach(function (el) {
    el.addEventListener('focus', function () {
      var label = el.closest('.form-group') && el.closest('.form-group').querySelector('label');
      if (label) label.style.color = '#C89540';
    });
    el.addEventListener('blur', function () {
      var label = el.closest('.form-group') && el.closest('.form-group').querySelector('label');
      if (label) label.style.color = '';
    });
  });

})();