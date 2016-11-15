'use strict';
define([], function() {

  var Gallery = function(massive) {

    this.color = 'red';
    this.red = 'blue';
    Gallery.pictures = massive;
    Gallery.activePicture = null;
    Gallery.overlayGallery = document.querySelector('.overlay-gallery');
    Gallery.controlLeft = document.querySelector('.overlay-gallery-control-left');
    Gallery.controlRight = document.querySelector('.overlay-gallery-control-right');
    Gallery.currentImage = document.querySelector('.preview-number-current');
    Gallery.numberImage = document.querySelector('.preview-number-total');
    Gallery.closeElement = document.querySelector('.overlay-gallery-close');
  };

  Gallery.prototype = {
    show: function(number) {
      var self = this;
      Gallery.overlayGallery.classList.remove('invisible');
      Gallery.prototype.setActivePicture(number);
      console.log(this.color);
      Gallery.closeElement.onclick = function() {
        Gallery.prototype.hide();
      };

      Gallery.controlLeft.onclick = function() {
        console.log(self.red);
        var numberImagePreviews = Gallery.activePicture - 1;
        if ( numberImagePreviews >= 0) {
          Gallery.activePicture = numberImagePreviews;
          self.setActivePicture(numberImagePreviews);
        }
      };

      Gallery.controlRight.onclick = function() {
        console.log(self.red);
        var numberImageNext = Gallery.activePicture + 1;
        if ( numberImageNext < Gallery.pictures.length) {
          Gallery.activePicture = numberImageNext;
          self.setActivePicture(numberImageNext);
        }
      };
    },
    hide: function() {
      Gallery.overlayGallery.classList.add('invisible');
      Gallery.closeElement.onclick = null;
      Gallery.controlLeft.onclick = null;
      Gallery.controlRight.onclick = null;
    },

    setActivePicture: function(number) {
      var self = this;
      console.log(self.red);
      Gallery.activePicture = number;
      for (var i = 0; i < Gallery.pictures.length; i++) {
        if (i === number) {
          var activePicture = new Image();
          activePicture.setAttribute('src', Gallery.pictures[i]);
          var galleryPreview = document.querySelector('.overlay-gallery-preview');
          var galleryImage = galleryPreview.querySelector('img');
          if (galleryPreview.contains(galleryImage)) {
            galleryPreview.removeChild(galleryImage);
          }
          galleryPreview.appendChild(activePicture);
        }
      };
      Gallery.currentImage.innerHTML = Gallery.activePicture + 1;
    }
  };
  return Gallery;
});
