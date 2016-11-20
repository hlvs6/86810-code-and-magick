'use strict';
module.exports = function(list, filter) {
  var days = 3;
  var timeRecent = 1000 * 60 * 60 * 24 * days;
  var positiveRating = 3;
  var arr = {};
  var arrFiltered = {};
  switch (filter) {
    case 'reviews-all':
        var arr = list;
      break;
    case 'reviews-recent':
        var dateNow = new Date();
        var arrFiltered = list.filter( function(item) { return  (dateNow.getTime() - item.created < timeRecent); });
        arr = arrFiltered.sort( function(a,b) { return b.created - a.created; });
      break;
    case 'reviews-good':
        var arrFiltered = list.filter( function(item) { return  ( item.rating >= positiveRating); });
        arr = arrFiltered.sort( function(a,b) { return b.rating - a.rating; });
      break;
    case 'reviews-bad':
        var arrFiltered = list.filter( function(item) { return  ( item.rating < positiveRating); });
        arr = arrFiltered.sort( function(a,b) { return a.rating - b.rating; });
      break;
    case 'reviews-popular':
        arr = list.sort( function(a,b) { return b.review_usefulness - a.review_usefulness; });
      break;
  }
  return arr;
};
