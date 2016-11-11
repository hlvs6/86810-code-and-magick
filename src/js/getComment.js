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


  var getCommentElement = function(review) {
    var comment = templateComment.querySelector(selectorArticle).cloneNode(true);
    var image = comment.querySelector(selectorPhotoAuthor);
    image.title = review.author.name;
    comment.querySelector(selectorRatingStars).textContent = review.rating;
    comment.querySelector(selectorCommentDescription).textContent = review.description;

    var photoUser = new Image();

    photoUser.onload = function() {
      image.setAttribute('src', review.author.picture);
      image.width = 124;
      image.height = 124;
    };

    photoUser.onerror = function() {
      comment.classList.add(clsError);
    };

    photoUser.src = review.author.picture;
    return comment;
  };

  return getCommentElement;
});
