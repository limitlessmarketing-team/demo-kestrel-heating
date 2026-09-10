/* Limitless Marketing — demo site engine (vanilla JS, no dependencies). */
(function () {
  var bar = document.querySelector('.bar');
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.menu');
  var callbar = document.querySelector('.callbar');
  var hero = document.querySelector('.hero');

  function onScroll() { if (bar) bar.setAttribute('data-scrolled', String(window.scrollY > 8)); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  if (menuBtn && menu && bar) {
    menuBtn.addEventListener('click', function () {
      var open = bar.getAttribute('data-open') === 'true';
      bar.setAttribute('data-open', String(!open));
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { bar.setAttribute('data-open', 'false'); menuBtn.setAttribute('aria-expanded', 'false'); });
    });
  }

  if (callbar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      callbar.setAttribute('data-hidden', String(e[0].isIntersecting));
    }, { rootMargin: '-120px 0px 0px 0px' }).observe(hero);
  }

  // Before / after comparisons
  document.querySelectorAll('.compare').forEach(function (c) {
    var input = c.querySelector('input');
    function set(v) { c.style.setProperty('--pos', v + '%'); }
    if (input) { input.addEventListener('input', function () { set(input.value); }); set(input.value); }
  });

  // Reveal on scroll
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  // Demo quote form: no backend on a mockup, just show the confirmation state.
  document.querySelectorAll('.form form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (f.querySelector('.hp input') && f.querySelector('.hp input').value) return;
      f.closest('.form').setAttribute('data-sent', 'true');
    });
  });
})();
