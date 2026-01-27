(function () {
  function initCarousel(root) {
    const track = root.querySelector('[data-mz-track]');
    const prev = root.querySelector('[data-mz-prev]');
    const next = root.querySelector('[data-mz-next]');
    if (!track || !prev || !next) return;

    let index = 0;

    function items() {
      return Array.from(track.children).filter(el => el.classList.contains('marazul-carousel__item'));
    }

    function step() {
      const it = items();
      if (!it.length) return 0;
      const itemW = it[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
      return itemW + gap;
    }

    function render() {
      const it = items();
      if (!it.length) return;
      index = Math.max(0, Math.min(index, it.length - 1));
      track.style.transform = `translate3d(${-index * step()}px,0,0)`;
    }

    prev.addEventListener('click', () => { index -= 1; render(); });
    next.addEventListener('click', () => { index += 1; render(); });

    window.addEventListener('resize', render);
    render();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-mz-carousel]').forEach(initCarousel);
  });
})();
