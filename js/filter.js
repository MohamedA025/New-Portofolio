// filter.js — case-studies.html only

(function () {
  'use strict';

  function filterCases(cat, e) {
    var tab = e.target.closest('.filter-tab');
    if (!tab) return;

    document.querySelectorAll('.filter-tab').forEach(function (t) {
      t.classList.remove('active');
    });
    tab.classList.add('active');

    document.querySelectorAll('.case-card').forEach(function (card) {
      var show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
      if (show) {
        card.classList.remove('visible');
        window.requestAnimationFrame(function () {
          card.classList.add('visible');
        });
      }
    });
  }

  document.querySelectorAll('.filter-tab').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      filterCases(btn.dataset.filter, e);
    });
  });

}());
