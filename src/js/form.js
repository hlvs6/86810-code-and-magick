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

  var inputName = document.querySelector('input[name="review-name"]');
  var textAreaComment = document.querySelector('#review-text');
  var radioButtons = document.querySelectorAll('input[name="review-mark"]');
  var reviewFieldsName = document.querySelector('review-fields-name');
  var reviewFieldsComment = document.querySelector('review-form-field-text');
  var reviewFormControls = document.querySelector('review-form-controls');
  var buttonSubmit = document.querySelector('review-submit');

  inputName.setAttribute('required', 'required');
  reviewFieldsName.style.display = 'none';
  reviewFieldsComment.style.display = 'none';
  reviewFormControls.style.display = 'none';

  for ( var i = 0; i < radioButtons.length; i++) {

    if (radioButtons[i].hasAttribute('checked') && radioButtons[i].value < 3 ) {
      textAreaComment.setAttribute('required', 'required');
    }
  }

  if (inputName.value === '') {
    reviewFieldsName.style.display = 'block';
  }

  if (textAreaComment.value === '' && textAreaComment.hasAttribute('required')) {
    reviewFieldsComment.style.display = 'block';
  }

  if (inputName.value === '' || (textAreaComment.value === '' && textAreaComment.hasAttribute('required'))) {
    reviewFormControls.style.display = 'block';
    buttonSubmit.classList.add('disabled');
  }

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
