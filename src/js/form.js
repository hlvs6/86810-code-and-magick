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
  inputName.value = Cookies.get('review-name');

  inputName.setAttribute('required', 'required');

  var buttonSubmit = document.querySelector('.review-submit');
  var radioButtons = document.querySelectorAll('input[name="review-mark"]');
  radioButtons = [].slice.call(radioButtons);
  var i = Cookies.get('review-mark');
  radioButtons[i].setAttribute('checked','checked');

  var dateNow = new Date();
  var lastBirthdayGrace = new Date(2015,11,9);
  var countingDays = function(datenow,birthdayGrace){
    var timestamp = dateNow.getTime() + (dateNow.getTime() - lastBirthdayGrace.getTime()) % (365 * 24 * 60 * 60 * 1000);
    var dateExpires = new Date(timestamp);
    return dateExpires;
  }();

  var textAreaComment = document.querySelector('#review-text');

  function controlsStars() {
    textAreaComment.removeAttribute('required', 'required');
    for ( var i = 0; i < radioButtons.length; i++) {
      if ((radioButtons[i].checked) && (radioButtons[i].value < 3)) {
        textAreaComment.setAttribute('required', 'required');
      }
      if (radioButtons[i].checked) {
        Cookies.set('review-mark', i, { expires: countingDays });
      }
    }
  }

  var labelFieldsName = document.querySelector('.review-fields-name');
  var labelFieldsComment = document.querySelector('.review-fields-text');
  var labelFormControls = document.querySelector('.review-fields');

  function checksFilling() {

    labelFieldsName.style.display = 'none';
    labelFieldsComment.style.display = 'none';
    labelFormControls.style.display = 'inline-block';
    buttonSubmit.setAttribute('disabled', 'disabled');

    if (inputName.value === '') {
      labelFieldsName.style.display = 'inline';
    }

    if ((textAreaComment.value === '') && (textAreaComment.hasAttribute('required'))) {
      labelFieldsComment.style.display = 'inline';
    }

    if ((inputName.value !== '') && ((textAreaComment.value !== '') || (textAreaComment.getAttribute('required') === null))) {
      buttonSubmit.removeAttribute('disabled', 'disabled');
      labelFormControls.style.display = 'none';
    }
  }

  controlsStars();
  checksFilling();

  radioButtons.forEach(function(item) {

    item.onchange = function() {
      controlsStars();
      checksFilling();
    };
  });

  inputName.oninput = function() {
    checksFilling();
    Cookies.set('review-name', inputName.value, { expires: countingDays });
  };

  textAreaComment.oninput = function() {
    checksFilling();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
