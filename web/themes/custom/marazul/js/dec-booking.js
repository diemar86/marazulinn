(function (Drupal, once) {
  Drupal.behaviors.marazulCarousel = {
    attach(context) {
      once('marazulCarousel', '[data-mz-carousel]', context).forEach((root) => {
        const track = root.querySelector('[data-mz-track]');
        if (!track) return;

        const btnPrev = root.querySelector('[data-mz-prev]');
        const btnNext = root.querySelector('[data-mz-next]');

        const items = Array.from(track.querySelectorAll('.marazul-carousel__item'));
        if (!items.length) return;

        let index = 0;

        const scrollToIndex = (i) => {
          index = Math.max(0, Math.min(i, items.length - 1));
          const el = items[index];
          if (!el) return;
          el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        };

        btnPrev?.addEventListener('click', () => scrollToIndex(index - 1));
        btnNext?.addEventListener('click', () => scrollToIndex(index + 1));
      });
    }
  };
})(Drupal, once);
