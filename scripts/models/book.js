const ENV = {};
ENV.prop1 = (window.location.protocol === 'https');
console.log(window.location.protocol);
ENV.prop2 = 'https://ec-mp-booklist.herokuapp.com';
ENV.prop3 = '172.16.1.18:3000';
ENV.prop4 = ENV.prop1 ? ENV.prop2 : ENV.prop3;