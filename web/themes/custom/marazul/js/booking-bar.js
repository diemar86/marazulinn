(function (Drupal, once) {
  Drupal.behaviors.marazulBookingBar = {
    attach(context) {
      if (typeof flatpickr === "undefined") return;

      const inEls = once('marazul-booking-checkin', '#checkin', context);
      const outEls = once('marazul-booking-checkout', '#checkout', context);

      if (!inEls.length || !outEls.length) return;

      const inEl = inEls[0];
      const outEl = outEls[0];

      const inPicker = flatpickr(inEl, {
        minDate: "today",
        dateFormat: "Y-m-d",
        disableMobile: true,
        allowInput: false
      });

      const outPicker = flatpickr(outEl, {
        minDate: "today",
        dateFormat: "Y-m-d",
        disableMobile: true,
        allowInput: false
      });

      // checkout no puede ser antes del checkin
      inEl.addEventListener("change", () => {
        const v = inEl.value;
        if (v) outPicker.set("minDate", v);
      });
    }
  };
})(Drupal, once);
