(function () {
  'use strict';

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
