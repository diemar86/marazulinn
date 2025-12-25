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
