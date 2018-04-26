'use strict';
var app = app || {};
(function (module) {
  var bookView = {};
  bookView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function (e) {
      e.preventDefault();
      $('.container').hide();
      $(`#${$(this).data('content')}`).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };

  bookView.setTeasers = () => {
    $('.book-body *:nth-of-type(n+2)').hide();
    $('book').on('click', 'a.view-details', function (e) {
      e.preventDefault();
      if ($(this).text() === 'view details') {
        $(this).parent().find('*').fadeIn();
        $(this).html('hide details');
      } else {
        $('body').animate({
          scrollTop: ($(this).parent().offset().top)
        }, 200);
        $(this).html('view details');
        $(this).parent().find('.book-body *:nth-of-type(n+2)').hide();
      }
    });
  };

  bookView.initNewbookPage = () => {
    $('.container').show();
    $('#export-field').hide();
    $('#book-json').on('focus', function () {
      this.select();
    });

    $('#new-form').on('change', 'input, textarea', bookView.create);
    $('#new-form').on('submit', bookView.submit);
  };

  bookView.create = () => {
    var book;
    $('#books').empty();

    book = new app.Book({
      author: $('#book-author').val(),
      title: $('#book-title').val(),
      isbn: $('#isbn').val(),
      authorUrl: $('#book-author-url').val(),
    });

    $('#books').append(book.toHtml());
    $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  bookView.submit = event => {
    event.preventDefault();
    let book = new app.Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      authorUrl: $('#book-author-url').val(),
      category: $('#book-category').val(),
      body: $('#book-body').val(),
      publishedOn: new Date().toISOString()
    });
  };

  // book.insertNewBook();

  bookView.initIndexPage = () => {
    // hide class container
    $('.container').empty();
    // show class book-view
    $('.container').empty();

    app.Book.all.forEach(a => $('#books').append(a.toHtml()));
    bookView.handleMainNav();
    bookView.setTeasers();
    $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  module.bookView = bookView;
})(app);

$(document).ready(function () {
  app.Book.fetchAll(app.bookView.initIndexPage);
});