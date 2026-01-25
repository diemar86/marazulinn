(function (Drupal, once) {
  Drupal.behaviors.marazulStickyBooking = {
    attach(context) {
      const els = once('marazul-sticky-booking', '.hero-decameron__booking', context);
      if (!els.length) return;

      const booking = els[0];
      const hero = booking.closest('.hero-decameron');

      function getTopOffset() {
        const toolbar = document.querySelector('#toolbar-bar');
        const toolbarH = toolbar ? toolbar.getBoundingClientRect().height : 0;

        const header = document.querySelector('header, .site-header, #header, .navbar');
        let headerH = 0;
        if (header) {
          const pos = getComputedStyle(header).position;
          if (pos === 'fixed' || pos === 'sticky') {
            headerH = header.getBoundingClientRect().height;
          }
        }
        return Math.round(toolbarH + headerH + 10);
      }

      function updateVar() {
        document.documentElement.style.setProperty('10px', getTopOffset() + 'px');
      }

      function onScroll() {
        if (!hero) return;
        const top = getTopOffset();
        const rect = hero.getBoundingClientRect();

        // Cuando el hero ya se fue, activamos el fijo
        const shouldStick = rect.bottom <= (top + 40);
        booking.classList.toggle('is-sticky', shouldStick);
      }

      updateVar();
      onScroll();

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', () => {
        updateVar();
        onScroll();
      });
    }
  };
})(Drupal, once);
