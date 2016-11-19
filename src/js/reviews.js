'use strict';
define(['./loadmassive', './getComment'], function(loadReviews, Review) {

  var COMMENT_LOAD_URL = 'http://localhost:1507/api/reviews';
  var selectorListComment = '.reviews-list';
  var listComments = document.querySelector(selectorListComment);
  loadReviews(COMMENT_LOAD_URL, function(data) {

    var selectorFilter = '.reviews-filter';
    var blockFilters = document.querySelector(selectorFilter);
    var clsInvisible = 'invisible';
    blockFilters.classList.add(clsInvisible);

    data.forEach( function(item) {
      var comment = new Review(item);
      comment.addInfoOnTemplate();
      comment.addHandlerClick();
      listComments.appendChild(comment.element);
    });

    blockFilters.classList.remove(clsInvisible);
  });
});
