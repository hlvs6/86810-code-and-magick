'use strict';
define(['./loadmassive'], function(loadmassive) {

  loadReviews(COMMENT_LOAD_URL, function(data) {

    var selectorFilter = '.reviews-filter';
    var selectorListComment = '.reviews-list';
    var selectorWrapperComment = '#review-template';
    var selectorArticle = '.review';
    var selectorPhotoAuthor = '.review-author';
    var selectorRatingStars = '.review-rating';
    var selectorCommentDescription = '.review-text';
    var clsInvisible = 'invisible';
    var clsError = 'review-load-failure';

    var blockFilters = document.querySelector(selectorFilter);
    blockFilters.classList.add(clsInvisible);

    var templateCommentContainer = document.querySelector(selectorWrapperComment);
    var templateComment = 'content' in templateCommentContainer ? templateCommentContainer.content : templateCommentContainer;
    var listComments = document.querySelector(selectorListComment);

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

    var renderComments = function(reviews) {
      reviews.forEach(function(review) {
        listComments.appendChild(getCommentElement(review));
      });
    };

    renderComments(data);

    blockFilters.classList.remove(clsInvisible);
  });
});
