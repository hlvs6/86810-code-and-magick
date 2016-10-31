'use strict';

var cookieName = 'review-name';
var cookieStars = 'review-mark';

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
  var cookieReviewName = window.Cookies.get(cookieName);
  if ( cookieReviewName ) {
    inputName.value = window.Cookies.get(cookieName);
  }

  inputName.setAttribute('required', 'required');

  var buttonSubmit = document.querySelector('.review-submit');
  var radioButtons = document.querySelectorAll('input[name="review-mark"]');
  radioButtons = [].slice.call(radioButtons);

  var index = window.Cookies.get(cookieStars);
  if ( index ) {
    radioButtons[index].setAttribute('checked', 'checked');
  }

  var dateNow = new Date();
  var birthdayGrace = new Date(dateNow.getFullYear(), 11, 9);
  if ((dateNow.getTime() - birthdayGrace.getTime()) < 0) {
    birthdayGrace.setFullYear(birthdayGrace.getFullYear() - 1);
  }

  var countingDays = function() {
    var timestamp = dateNow.getTime() - birthdayGrace.getTime();
    return timestamp / (24 * 60 * 60 * 1000);
  }();

  var textAreaComment = document.querySelector('#review-text');

  function controlsStars() {
    textAreaComment.removeAttribute('required', 'required');
    for ( var i = 0; i < radioButtons.length; i++) {
      if ((radioButtons[i].checked) && (radioButtons[i].value < 3)) {
        textAreaComment.setAttribute('required', 'required');
      }
      if (radioButtons[i].checked) {
        window.Cookies.set(cookieStars, i, { expires: countingDays });
      }
    }
  }

  var labelFieldsName = document.querySelector('.review-fields-name');
  var labelFieldsComment = document.querySelector('.review-fields-text');
  var labelFormControls = document.querySelector('.review-fields');
  var labelNameDefaultDisplay = labelFieldsName.style.display;
  var labelCommentsDefaultDisplay = labelFieldsComment.style.display;
  var labelFormControlsDisplay = labelFormControls.style.display;


  function checksFilling() {

    labelFieldsName.style.display = 'none';
    labelFieldsComment.style.display = 'none';
    labelFormControls.style.display = labelFormControlsDisplay;
    buttonSubmit.setAttribute('disabled', 'disabled');

    if (inputName.value === '') {
      labelFieldsName.style.display = labelNameDefaultDisplay;
    }

    if ((textAreaComment.value === '') && (textAreaComment.hasAttribute('required'))) {
      labelFieldsComment.style.display = labelCommentsDefaultDisplay;
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
    window.Cookies.set(cookieName, inputName.value, { expires: countingDays });
  };

  textAreaComment.oninput = checksFilling;

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
