'use strict';

require(['./gallery', './reviews', './form', './game'], function() {
  var Gallery = arguments[0];
  var galleryImages = document.querySelectorAll('.photogallery-image img');
  var srcImages = [];
  galleryImages.forEach( function(item) {
    srcImages.push(item.src);
  });
  var gallery = new Gallery(srcImages);
  var wrapperGallery = document.querySelector('.photogallery');
  var clicker = function(evt) {
    var elementClicked = evt.target;
    var elementSrc = elementClicked.src;
    for (var i = 0; i < srcImages.length; i++) {
      if ( elementSrc === srcImages[i]) {
        gallery.activePicture = i;
      }
    }
    gallery.show(gallery.activePicture);
  };

  wrapperGallery.addEventListener('click', clicker);

  var game = new window.Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(window.Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    window.form.open(function() {
      game.setGameStatus(window.Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  window.form.onClose = function() {
    game.setDeactivated(false);
  };
});
