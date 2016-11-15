'use strict';

require(['./reviews', './form', './game', './gallery'], function(a, b, c, Gallery) {
  var galleryImages = document.querySelectorAll('.photogallery-image img');
  var srcImages = [];
  galleryImages.forEach( function(item) {
    srcImages.push(item.src);
  });
  var gallery = new Gallery(srcImages);
  gallery.show(1);
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
