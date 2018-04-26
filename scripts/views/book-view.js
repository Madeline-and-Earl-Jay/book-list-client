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

  function show(section) {
    $('section').not(`#${section}`).hide();
    $(`#${section}`).show();
  }

  /* come back to this later */
  bookView.viewDetails = (ctx) => {
    //hide everything else
    console.log(ctx)

    $('#individual-book').empty();
    show(ctx);
    //show only this books data
    console.log('inside view details');
  };
  $('.view-details').on('click', bookView.viewDetails);

  // bookView.setTeasers = () => {
  //   $('.book-description').hide();
  //   $('.view-details').on('click', function (e) {
  //     e.preventDefault();
  //     // $('body').hide();
  //     // console.log($(this).parent());
  //     // $(this).show();
  //     console.log('inside');
  //     if ($(this).text() === 'view details') {
  //       $(this).parent().find('*').fadeIn();
  //       // $(this).html('hide details');
  //     } else {
  //       $('body').animate({
  //         scrollTop: ($(this).parent().offset().top)
  //       }, 200);
  //       $(this).html('view details');
  //       $(this).parent().find('.book-description *:nth-of-type(n+2)').hide();
  //     }
  //   });
  // };

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
    // $('form').hide();
    $('.container').empty();
    $('.book-description').hide();
    app.Book.all.forEach(a => $('#books').append(a.toHtml()));
    bookView.handleMainNav();
    // bookView.setTeasers();
    $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  bookView.initBookPage = function (ctx) {
    $('#book').empty();
    show('book');

    $('#book').append(ctx.book.detailtoHtml());
  };
  module.bookView = bookView;
})(app);

// $(document).ready(function () {
//   app.Book.fetchAll(app.bookView.initIndexPage);
// });