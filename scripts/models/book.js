const ENV = {};
ENV.isProduction = window.location.protocol === 'https';
console.log(window.location.protocol);
ENV.productionApiUrl = 'https://ec-mp-booklist.herokuapp.com';
ENV.developmentApiUrl = 'localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;