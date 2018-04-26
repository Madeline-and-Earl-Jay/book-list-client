'use strict';
page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/book/:id', ctx => app.Book.fetchOne(app.bookView.initBookPage, ctx));
// page(‘/add’, ctx => app.booksView.initAddPage(ctx));
page();
