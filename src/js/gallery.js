'use strict';
define([], function() {

  var clsInvisible = 'invisible';

  var Gallery = function(massive) {
    this.pictures = massive;
    this.numberImages = massive.length;
    this.activePicture = null;
    this.overlayGallery = document.querySelector('.overlay-gallery');
    this.controlLeft = document.querySelector('.overlay-gallery-control-left');
    this.controlRight = document.querySelector('.overlay-gallery-control-right');
    this.spanNumberCurrentImage = document.querySelector('.preview-number-current');
    this.spanNumberImages = document.querySelector('.preview-number-total');
    this.closeElement = document.querySelector('.overlay-gallery-close');
    this.galleryOverlay = document.querySelector('.overlay-gallery-preview');
  };

  Gallery.prototype = {
    show: function(number) {
      var self = this;
      this.overlayGallery.classList.remove(clsInvisible);
      this.setActivePicture(number);
      this.closeElement.onclick = function() {
        self.hide();
      };

      this.controlLeft.onclick = function() {
        var numberImagePreviews = self.activePicture - 1;
        if ( numberImagePreviews >= 0) {
          self.activePicture = numberImagePreviews;
          self.setActivePicture(numberImagePreviews);
        }
      };

      this.controlRight.onclick = function() {
        var numberImageNext = self.activePicture + 1;
        if ( numberImageNext < self.numberImages) {
          self.activePicture = numberImageNext;
          self.setActivePicture(numberImageNext);
        }
      };
    },
    hide: function() {
      this.overlayGallery.classList.add(clsInvisible);
      this.closeElement.onclick = null;
      this.controlLeft.onclick = null;
      this.controlRight.onclick = null;
    },

    setActivePicture: function(number) {
      this.activePicture = number;
      var activePicture = new Image();
      activePicture.setAttribute('src', this.pictures[this.activePicture]);
      var galleryImage = this.galleryOverlay.querySelector('img');
      if (this.galleryOverlay.contains(galleryImage)) {
        this.galleryOverlay.removeChild(galleryImage);
      }
      this.galleryOverlay.appendChild(activePicture);
      this.spanNumberCurrentImage.innerHTML = this.activePicture + 1;
      this.spanNumberImages.innerHTML = this.numberImages;
    }
  };
  return Gallery;
});
