'use strict';

var app = app || {};

const ENV = {};
ENV.isProduction = window.location.protocol === 'https:';
// console.log(window.location.protocol);
ENV.productionApiUrl = 'https://ec-mp-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;


(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }
  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }
  Book.all = [];

  Book.prototype.toHtml = function () {
    var template = Handlebars.compile($('#book-template').text());
    // this.author = marked(this.author);
    // this.title = marked(this.title);
    return template(this);
  };

  Book.prototype.detailToHtml = function () {
    let template = Handlebars.compile($('#book-detail-template').text());
    return template(this);
  };

  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
    console.log('inside fetchAll');
  };

  Book.fetchOne = (callback, ctx) => {
    $.get(`${ENV.apiUrl}/api/v1/books/${ctx.params.id}`)
      .then(results => console.log('fetchOne', results))
      .then(results => new Book(results))
      .then(callback(ctx))
      .catch(errorCallback);
    console.log('inside fetchOne');
  };

  Book.add = book => {
    $.post(`${ENV.apiUrl}/books/add`, book)
      .then(() => page('/')
        .catch(errorCallback));
  };

  module.Book = Book;
})(app);