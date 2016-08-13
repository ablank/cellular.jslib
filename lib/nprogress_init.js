NProgress.configure({
  showSpinner: false,
  parent: 'body'
}).start();

window.addEventListener("load", function (event) {
  NProgress.done();
});

setTimeout(function () {
  NProgress.done();
}, 10000);