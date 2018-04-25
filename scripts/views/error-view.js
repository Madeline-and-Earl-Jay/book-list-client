'use strict';
(function (module) {
  var errorView ={};
  errorView.initErrorPage = err=>{
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    var template = Handlebars.compile($('#error-template').text());
    $('#error-message').append(template);
  };
  module.errorView = errorView;
})(app);