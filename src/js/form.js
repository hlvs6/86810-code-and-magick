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
  var cookieName = '';
  var cookieReviewName = window.Cookies.get('review-name');
  if ( cookieReviewName ) {
    inputName.value = window.Cookies.get('review-name');
  }

  inputName.setAttribute('required', 'required');

  var buttonSubmit = document.querySelector('.review-submit');
  var radioButtons = document.querySelectorAll('input[name="review-mark"]');
  radioButtons = [].slice.call(radioButtons);

  var index = window.Cookies.get('review-mark');
  if ( index ) {
    radioButtons[index].setAttribute('checked', 'checked');
  }

  var dateNow = new Date();
  var birthdayGrace = new Date(1970, 11, 9);
  var difference = dateNow.getTime() - birthdayGrace.getTime();
  var differenceDate = new Date(difference);
  var yearLastBirthdayGrace = differenceDate.getFullYear();
  var timestampLastBYears = new Date(yearLastBirthdayGrace, 0);
  var countingDays = function() {
    var timestamp = dateNow.getTime() + (dateNow.getTime() - birthdayGrace.getTime() - timestampLastBYears.getTime());
    return new Date(timestamp);
  }();

  var textAreaComment = document.querySelector('#review-text');

  function controlsStars() {
    cookieName = 'review-mark';
    textAreaComment.removeAttribute('required', 'required');
    for ( var i = 0; i < radioButtons.length; i++) {
      if ((radioButtons[i].checked) && (radioButtons[i].value < 3)) {
        textAreaComment.setAttribute('required', 'required');
      }
      if (radioButtons[i].checked) {
        window.Cookies.set(cookieName, i, { expires: countingDays });
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
    cookieName = 'review-name';
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
