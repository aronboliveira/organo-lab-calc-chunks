/*!
 * WPMU DEV Forminator UI
 * Copyright 2019 Incsub (https://incsub.com)
 * Licensed under GPL v3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
export default function loadForminatorForm() {
  function _typeof(t) {
    return (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }

  !(function (t) {
    "use strict";
    "object" !== _typeof(window.FUI) && (window.FUI = {}),
      (FUI.inputStates = function (o) {
        var e = t(o),
          i = e.closest("form");
        if (
          e.is("input") ||
          (i.is(".forminator-poll") &&
            (i.is(".forminator-ui") || i.is(".forminator-custom-form")))
        )
          return (
            e.each(function () {
              var o, e;
              (o = t(this)),
                (e = o.closest(".forminator-field")),
                o
                  .mouseover(function (t) {
                    e.addClass("forminator-is_hover"), t.stopPropagation();
                  })
                  .mouseout(function (t) {
                    e.removeClass("forminator-is_hover"), t.stopPropagation();
                  }),
                (function (o) {
                  var e = t(o),
                    i = e.closest(".forminator-field");
                  e.focus(function (t) {
                    i.addClass("forminator-is_active"), t.stopPropagation();
                  }).blur(function (t) {
                    i.removeClass("forminator-is_active"), t.stopPropagation();
                  });
                })(this),
                (function (o) {
                  var e = t(o),
                    i = e.closest(".forminator-field");
                  "" !== e.val().trim() && i.addClass("forminator-is_filled"),
                    e.on("change", function () {
                      "" !== e.val().trim()
                        ? i.addClass("forminator-is_filled")
                        : i.removeClass("forminator-is_filled");
                    });
                })(this);
            }),
            this
          );
      });
  })(jQuery);
}
