'use strict';
define(['./loadmassive', './getComment'], function(loadReviews, Review) {

  var selectorButtonMore = '.reviews-controls-more';
  var COMMENT_LOAD_URL = 'http://localhost:1507/api/reviews';
  var selectorListComment = '.reviews-list';
  var listComments = document.querySelector(selectorListComment);
  var buttonMore = document.querySelector(selectorButtonMore);
  var currentPageNumber = 0;
  var pageSize = 3;

  buttonMore.classList.remove('invisible');

  var renderComments = function(loadedData) {

    var selectorFilter = '.reviews-filter';
    var blockFilters = document.querySelector(selectorFilter);
    var clsInvisible = 'invisible';
    blockFilters.classList.add(clsInvisible);

    loadedData.forEach( function(item) {
      var comment = new Review(item);
      comment.addInfoOnTemplate();
      comment.addHandlerClick();
      listComments.appendChild(comment.element);
    });

    blockFilters.classList.remove(clsInvisible);
  };

  buttonMore.addEventListener('click', function(evt) {
     currentPageNumber++;
     loadReviews(COMMENT_LOAD_URL, { from: currentPageNumber * pageSize, to: currentPageNumber * pageSize + pageSize, filter: 3}, renderComments);
  });

  loadReviews(COMMENT_LOAD_URL, { from: currentPageNumber * pageSize, to: currentPageNumber * pageSize + pageSize, filter: 3}, renderComments);
});
