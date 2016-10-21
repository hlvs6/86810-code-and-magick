'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  // var form = document.form[1];
  // var radiobuttons = form.elements['review-mark'];
  // form.elements['review-name'].setAttribute('required');
  //
  // for ( var i = 0; i < radiobuttons.length; i++) {
  //
  //   if ( radiobuttons[i].value < 3) {
  //
  //     form.elements['review-text'].setAttribute('required');
  //   }
  // }


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
