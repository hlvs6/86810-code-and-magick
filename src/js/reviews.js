'use strict';
define(['./loadmassive', './getComment'], function(loadReviews, Review) {


  var COMMENT_LOAD_URL = 'http://localhost:1507/api/reviews';
  var selectorListComment = '.reviews-list';
  var listComments = document.querySelector(selectorListComment);
  var selectorButtonMore = '.reviews-controls-more';
  var buttonMore = document.querySelector(selectorButtonMore);
  var selectorBlockFilter = '.reviews-filter';
  var blockFilters = document.querySelector(selectorBlockFilter);
  var currentPageNumber = 0;
  var pageSize = 3;
  var activeFilter = 'reviews-all';

  var renderComments = function(loadedData) {

    var clsInvisible = 'invisible';
    blockFilters.classList.add(clsInvisible);

    loadedData.forEach( function(item) {
      var comment = new Review(item);
      comment.addInfoOnTemplate();
      comment.addHandlerClick();
      listComments.appendChild(comment.element);
      console.log(comment);
    });

    blockFilters.classList.remove(clsInvisible);
  };

  var changeFilter = function(filterID) {
    listComments.innerHTML = '';
    activeFilter = filterID;
    currentPageNumber = 0;
    loadReviews(COMMENT_LOAD_URL, { from: currentPageNumber * pageSize, to: currentPageNumber * pageSize + pageSize, filter: activeFilter}, renderComments);
  };

  blockFilters.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('reviews-filter-item')) {
      var filterID = evt.target.getAttribute('for');
      changeFilter(filterID);
    }
  }, true);

  buttonMore.classList.remove('invisible');

  buttonMore.addEventListener('click', function() {
    currentPageNumber++;
    loadReviews(COMMENT_LOAD_URL, { from: currentPageNumber * pageSize, to: currentPageNumber * pageSize + pageSize, filter: activeFilter}, renderComments);
  });

  loadReviews(COMMENT_LOAD_URL, { from: currentPageNumber * pageSize, to: currentPageNumber * pageSize + pageSize, filter: activeFilter}, renderComments);
});
