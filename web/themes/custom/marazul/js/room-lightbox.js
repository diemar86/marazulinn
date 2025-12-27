(function (Drupal, once) {
  Drupal.behaviors.roomLightbox = {
    attach(context) {
      once('roomLightbox', '[data-room-gallery]', context).forEach((gallery) => {
        gallery.addEventListener('click', (e) => {
          const img = e.target.closest('img');
          const link = e.target.closest('a');

          // Solo si el click fue en imagen o enlace dentro de la galería
          if (!img && !link) return;

          // Modal + img (se buscan SIEMPRE en document para evitar líos con BigPipe)
          const modalEl = document.getElementById('roomLightbox');
          const modalImg = document.getElementById('roomLightboxImg');
          if (!modalEl || !modalImg) return;

          // Necesitas bootstrap JS cargado (bundle)
          if (!window.bootstrap || !window.bootstrap.Modal) {
            console.warn('Bootstrap Modal no está disponible. Revisa que cargues bootstrap.bundle.min.js');
            return;
          }

          // URL: primero href, si no, src del img
          const url = (link && link.getAttribute('href')) || img.getAttribute('data-src') || img.currentSrc || img.src;
          if (!url) return;

          e.preventDefault();

          modalImg.src = url;
          modalImg.alt = img.getAttribute('alt') || 'Foto de la habitación';

          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.show();
        });
      });

      // Limpieza (una sola vez)
      once('roomLightboxClean', '#roomLightbox', context).forEach((modalEl) => {
        modalEl.addEventListener('hidden.bs.modal', () => {
          const modalImg = document.getElementById('roomLightboxImg');
          if (modalImg) {
            modalImg.src = '';
            modalImg.alt = '';
          }
        });
      });
    }
  };
})(Drupal, once);
