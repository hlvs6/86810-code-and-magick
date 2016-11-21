'use strict';
define([], function() {

  var selectorWrapperComment = '#review-template';
  var selectorArticle = '.review';
  var selectorPhotoAuthor = '.review-author';
  var selectorRatingStars = '.review-rating';
  var selectorCommentDescription = '.review-text';
  var clsError = 'review-load-failure';
  var templateCommentContainer = document.querySelector(selectorWrapperComment);
  var templateComment = 'content' in templateCommentContainer ? templateCommentContainer.content : templateCommentContainer;
  var selectorBlockQuiz = '.review-quiz';
  var selectorRatingReview = '.review-quiz-answer';
  var clsRatingReviewActive = 'review-quiz-answer-active';

  var Review = function(data) {
    this.data = data;
    this.element = templateComment.querySelector(selectorArticle).cloneNode(true);
  };

  Review.prototype = {

    addHandlerClick: function() {
      var blockQuiz = this.element.querySelector(selectorBlockQuiz);
      var elementsRating = blockQuiz.querySelectorAll(selectorRatingReview);
      elementsRating = [].slice.call(elementsRating);
      blockQuiz.onclick = function(evt) {
        elementsRating.forEach(function(item) {
          if (item === evt.target) {
            item.classList.add(clsRatingReviewActive);
          }
          if (item !== evt.target) {
            item.classList.remove(clsRatingReviewActive);
          }
        });
      };
    },

    removeHandlerClick: function() {
      var blockQuiz = this.element.querySelector(selectorBlockQuiz);
      blockQuiz.onclick = null;
    },

    addInfoOnTemplate: function() {
      var self = this;
      var image = this.element.querySelector(selectorPhotoAuthor);
      image.title = this.data.author.name;
      this.element.querySelector(selectorRatingStars).textContent = this.data.rating;
      this.element.querySelector(selectorCommentDescription).textContent = this.data.description;

      var photoUser = new Image();

      photoUser.onload = function() {
        image.setAttribute('src', self.data.author.picture);
        image.width = 124;
        image.height = 124;
      };

      photoUser.onerror = function() {
        image.classList.add(clsError);
      };

      image.src = this.data.author.picture;
    }
  };
  return Review;
});
