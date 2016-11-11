'use strict';
define(['./loadmassive', './getComment'], function(loadReviews, getComment) {

  var COMMENT_LOAD_URL = 'http://localhost:1507/api/reviews';
  var selectorListComment = '.reviews-list';
  var listComments = document.querySelector(selectorListComment);
  loadReviews(COMMENT_LOAD_URL, function(data) {

    var selectorFilter = '.reviews-filter';
    var blockFilters = document.querySelector(selectorFilter);
    var clsInvisible = 'invisible';
    blockFilters.classList.add(clsInvisible);

    var renderComments = function(reviews) {
      reviews.forEach(function(review) {
        listComments.appendChild(getComment(review));
      });
    };

    renderComments(data);

    blockFilters.classList.remove(clsInvisible);
  });
});
