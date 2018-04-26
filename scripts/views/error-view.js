'use strict';
let app = app || {};

(function (module) {
  var errorView = {};
  // let err = {
  //   status: 404,
  //   message: 'page not found'
  // }
  errorView.initErrorPage = err => {
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    var template = Handlebars.compile($('#error-template').text());
    $('#error-message').append(template(err));
  };
  errorView.errorCallback = err => {
    console.error(err);
  };
  module.errorView = errorView;
})(app);