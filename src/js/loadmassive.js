'use strict';
define([], function() {

  var COMMENT_LOAD_URL = 'http://localhost:1507/api/reviews';
  var callBackName = 'jsonpCallback';
  var massiveName = 'reviews';

  window[callBackName] = function(data) {
    window[massiveName] = data;
  };

  var loadReviews = function(url, callback) {

    var script = document.createElement('script');
    script.src = url + '?callback=' + callBackName;
    document.body.appendChild(script);

    script.onload = function() {

      callback(window[massiveName]);
    };

    script.onerror = function() {

      console.warn('Ошибка!');
    };
  };

  return loadReviews; 
});
