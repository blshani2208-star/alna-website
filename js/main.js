(function () {
  'use strict';

  var header = document.querySelector('header');
  var headerRow = header && header.querySelector('.header-row');
  var desktopNav = headerRow && headerRow.querySelector('nav');
  var headerActions = headerRow && headerRow.querySelector('.header-actions');

  if (header && headerRow && desktopNav && headerActions) {
    var menuButton = document.createElement('button');
    var menuPanel = document.createElement('div');
    var menuLinks = document.createElement('div');
    var isHebrew = document.documentElement.lang === 'he';

    menuButton.type = 'button';
    menuButton.className = 'mobile-menu-toggle';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'mobile-navigation');
    menuButton.setAttribute('aria-label', isHebrew ? 'פתיחת תפריט ניווט' : 'Open navigation menu');
    menuButton.innerHTML = '<span class="mobile-menu-icon" aria-hidden="true"></span>';

    menuPanel.id = 'mobile-navigation';
    menuPanel.className = 'mobile-nav-panel';
    menuLinks.className = 'mobile-nav-links';

    desktopNav.querySelectorAll('a').forEach(function (link) {
      var mobileLink = link.cloneNode(true);
      mobileLink.removeAttribute('style');
      menuLinks.appendChild(mobileLink);
    });
    menuPanel.appendChild(menuLinks);

    var headerCta = headerActions.querySelector('.header-cta');
    if (headerCta) {
      var mobileCta = headerCta.cloneNode(true);
      mobileCta.className = 'mobile-nav-cta';
      mobileCta.removeAttribute('style');
      menuPanel.appendChild(mobileCta);
    }

    headerActions.insertBefore(menuButton, headerActions.firstChild);
    header.appendChild(menuPanel);

    function setMobileMenuOpen(open) {
      menuPanel.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open
        ? (isHebrew ? 'סגירת תפריט ניווט' : 'Close navigation menu')
        : (isHebrew ? 'פתיחת תפריט ניווט' : 'Open navigation menu'));
    }

    menuButton.addEventListener('click', function () {
      setMobileMenuOpen(!menuPanel.classList.contains('is-open'));
    });
    menuPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMobileMenuOpen(false); });
    });
    document.addEventListener('click', function (event) {
      if (!header.contains(event.target)) setMobileMenuOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setMobileMenuOpen(false);
    });
  }

  var faqBar = document.querySelector('.faq-bar');
  var faqRoot = document.querySelector('.faq-root');
  var faqBackdrop = document.querySelector('.faq-backdrop');
  var faqBarIcon = document.querySelector('.faq-bar-icon');

  function setFaqOpen(open) {
    faqRoot.classList.toggle('faq-open', open);
    faqBar.setAttribute('aria-expanded', String(open));
    if (faqBarIcon) faqBarIcon.textContent = open ? '▾' : '▴';
    if (open) {
      var firstQuestion = faqRoot.querySelector('.faq-question');
      if (firstQuestion) firstQuestion.focus();
    } else {
      faqBar.focus();
    }
  }

  if (faqBar) {
    faqBar.addEventListener('click', function () {
      setFaqOpen(!faqRoot.classList.contains('faq-open'));
    });
  }
  if (faqBackdrop) {
    faqBackdrop.addEventListener('click', function () {
      setFaqOpen(false);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && faqRoot.classList.contains('faq-open')) {
      setFaqOpen(false);
    }
  });

  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          var q = openItem.querySelector('.faq-question');
          var i = openItem.querySelector('.faq-icon');
          q.setAttribute('aria-expanded', 'false');
          if (i) i.textContent = '+';
        }
      });
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      var icon = btn.querySelector('.faq-icon');
      if (icon) icon.textContent = !isOpen ? '−' : '+';
    });
  });
})();
