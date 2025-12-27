(function (Drupal, once) {
  'use strict';

  function uniqBy(arr, keyFn) {
    const seen = new Set();
    return arr.filter((x) => {
      const k = keyFn(x);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  function getAnchoredImages(container) {
    if (!container) return [];
    const anchors = container.querySelectorAll('a[href]');
    const items = [];

    anchors.forEach((a) => {
      const href = a.getAttribute('href');
      const img = a.querySelector('img');
      if (!href || !img) return;

      items.push({
        full: href,
        thumb: img.getAttribute('src') || href,
        alt: img.getAttribute('alt') || ''
      });
    });

    return items;
  }

  function getDirectImages(container) {
    if (!container) return [];
    const imgs = container.querySelectorAll('img');
    const items = [];

    imgs.forEach((img) => {
      const src = img.getAttribute('src');
      if (!src) return;
      items.push({
        full: src,
        thumb: src,
        alt: img.getAttribute('alt') || ''
      });
    });

    return items;
  }

  Drupal.behaviors.marazulRoomLightbox = {
    attach(context) {
      const roots = once('marazulRoomLightbox', '[data-room-thumbs], [data-room-main]', context);
      if (!roots.length) return;

      const main = context.querySelector('[data-room-main]');
      const thumbs = context.querySelector('[data-room-thumbs]');
      const modalEl = context.querySelector('#roomLightbox');
      const carouselEl = context.querySelector('#roomLightboxCarousel');
      const inner = context.querySelector('[data-room-lightbox-inner]');

      if (!modalEl || !carouselEl || !inner) return;

      // 1) Construimos la lista de imágenes:
      // - principal: puede venir sin <a>, entonces leemos <img src>
      // - galería: idealmente viene con <a href> a imagen grande
      let items = [];
      items = items.concat(getDirectImages(main));
      items = items.concat(getAnchoredImages(thumbs));

      // Eliminamos repetidos por URL full
      items = uniqBy(items, (x) => x.full);

      if (!items.length) return;

      // 2) Render de carousel items (una sola vez)
      inner.innerHTML = '';
      items.forEach((it, idx) => {
        const item = document.createElement('div');
        item.className = 'carousel-item' + (idx === 0 ? ' active' : '');
        item.innerHTML = `
          <div class="room-lightbox__frame">
            <img class="room-lightbox__img" src="${it.full}" alt="${it.alt}">
          </div>
        `;
        inner.appendChild(item);
      });

      // 3) Instancias Bootstrap
      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl, { focus: true });
      const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, { interval: false, ride: false, touch: true });

      // 4) Click en miniaturas => abrir modal en índice correcto
      // Delegación sobre el contenedor de thumbs.
      once('marazulThumbClicks', '[data-room-thumbs]', context).forEach((wrap) => {
        wrap.addEventListener('click', (e) => {
          const a = e.target.closest('a[href]');
          if (!a) return;

          const href = a.getAttribute('href');
          if (!href) return;

          // Evita irse a la imagen en otra pestaña o a la URL.
          e.preventDefault();

          const index = items.findIndex((x) => x.full === href);
          if (index < 0) return;

          bsModal.show();
          bsCarousel.to(index);
        });
      });

      // 5) Click en imagen principal => también abre modal (índice 0)
      once('marazulMainClick', '[data-room-main]', context).forEach((wrap) => {
        wrap.addEventListener('click', (e) => {
          const img = e.target.closest('img');
          if (!img) return;

          e.preventDefault();
          bsModal.show();
          bsCarousel.to(0);
        });
      });
    }
  };

})(Drupal, once);
