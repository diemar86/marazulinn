(function (Drupal, once) {
  Drupal.behaviors.marazulStickyBooking = {
    attach(context) {
      once('marazulStickyBooking', '[data-mz-sticky-booking]', context).forEach((el) => {
        const offset = 140; // px: cuando quieres que se “pegue”

        const onScroll = () => {
          if (window.scrollY > offset) el.classList.add('is-sticky');
          else el.classList.remove('is-sticky');
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      });
    }
  };
})(Drupal, once);
