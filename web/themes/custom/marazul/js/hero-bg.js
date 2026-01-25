(function (Drupal) {
  Drupal.behaviors.marazulHeroBg = {
    attach(context) {
      const hero = context.querySelector?.('.hero.hero--managed');
      if (!hero) return;

      const copy = hero.querySelector('.hero-copy[data-hero-bg]');
      if (!copy) return;

      const url = copy.getAttribute('data-hero-bg');
      if (!url) return;

      hero.style.setProperty('--hero-bg', `url("${url}")`);
    }
  };
})(Drupal);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hero-copy[data-hero-bg]").forEach(el => {
    const bg = el.dataset.heroBg;
    if (bg) {
      el.style.backgroundImage = `url('${bg}')`;
    }
  });
});

(function () {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-booking-submit]');
    if (!btn) return;

    const wrap = btn.closest('.booking-bar');
    if (!wrap) return;

    const form = wrap.querySelector('form.webform-submission-form');
    if (!form) return;

    // dispara el submit real
    const realSubmit = form.querySelector('input[type="submit"], button[type="submit"]');
    if (realSubmit) {
      realSubmit.click();
    } else {
      form.requestSubmit ? form.requestSubmit() : form.submit();
    }
  });
})();
