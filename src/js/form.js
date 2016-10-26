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

  var inputName = document.querySelector('#review-name');

  inputName.setAttribute('required', 'required');

  var buttonSubmit = document.querySelector('.review-submit');

  var radioButtons = document.querySelectorAll('input[name="review-mark"]');
  var textAreaComment = document.querySelector('#review-text');

  function countStars () {
    textAreaComment.removeAttribute('required', 'required');
    for ( var i = 0; i < radioButtons.length; i++) {
      if ((radioButtons[i].checked) && (radioButtons[i].value < 3)) {
          textAreaComment.setAttribute('required', 'required');
      }
    }
  }

  countStars();

  radioButtons[0].onchange = function () {
    countStars();
  };
  radioButtons[1].onchange = function () {
    countStars();
  };
  radioButtons[2].onchange = function () {
    countStars();
  };
  radioButtons[3].onchange = function () {
    countStars();
  };
  radioButtons[4].onchange = function () {
    countStars();
  };

  var labelFieldsName = document.querySelector('.review-fields-name');

  labelFieldsName.style.display = 'none';

  function checksFilling () {

    if (inputName.value === '') {
      labelFieldsName.style.display = 'inline';
    }

    else {
      labelFieldsName.style.display = 'none';
    }
  }

  checksFilling();

  inputName.onchange = function () {
    checksFilling();
    console.log('Победа');
  };

  // var labelFieldsComment = document.querySelector('.review-fields-text');
  // var labelFormControls = document.querySelector('.review-form-controls');
  // labelFieldsComment.style.display = 'none';
  // labelFormControls.style.display = 'none';
  // if (textAreaComment.value === '' && textAreaComment.hasAttribute('required')) {
  //   labelFieldsComment.style.display = 'inline';
  // }
  //
  // if (inputName.value === '' || (textAreaComment.value === '' && textAreaComment.hasAttribute('required'))) {
  //   labelFormControls.style.display = 'block';
  //   buttonSubmit.classList.add('disabled');
  // }

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
