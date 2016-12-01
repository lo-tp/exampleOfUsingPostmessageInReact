(function () {
  var scrollTop;
  var domain;
  var url;
  var body;
  var target;
  function sendHeight() {
    target.postMessage({ url: url, value: body.scrollHeight, type: 'height' }, domain);
  }

  function sendScrollTop() {
    scrollTop = body.scrollTop;
    target.postMessage({ url: url, value: scrollTop, type: 'scrollTop' }, domain);
  }

  body = document.getElementsByTagName('body')[0];
  function receiveMessage(event) {
    switch (event.data.type) {
      case 'setScroll':
        body.scrollTop = event.data.value;
        scrollTop = event.data.value;
        url = event.data.url;
        target = event.source;
        domain = event.origin;
        sendHeight();
        sendScrollTop();
        break;
    }
  }

  window.addEventListener('message', receiveMessage);
  window.addEventListener('scroll', function (e) {
    if (e.target.activeElement === body && scrollTop !== body.scrollTop) {
      sendScrollTop();
    }
  });
})();
