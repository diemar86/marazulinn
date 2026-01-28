(function () {
  function initCarousel(root) {
    const track = root.querySelector('[data-mz-track]');
    const prev = root.querySelector('[data-mz-prev]');
    const next = root.querySelector('[data-mz-next]');
    if (!track) return;

    const pageScroll = (dir) => {
      const firstItem = track.querySelector('.marazul-carousel__item');
      if (!firstItem) return;

      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
      const itemW = firstItem.getBoundingClientRect().width;
      const visible = Math.max(1, Math.round(track.getBoundingClientRect().width / (itemW + gap)));
      const delta = (itemW + gap) * visible;

      track.scrollBy({ left: dir * delta, behavior: 'smooth' });
    };

    prev && prev.addEventListener('click', () => pageScroll(-1));
    next && next.addEventListener('click', () => pageScroll(1));
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-mz-carousel]').forEach(initCarousel);
  });
})();
