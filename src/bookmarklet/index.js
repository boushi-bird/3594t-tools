(function (window, document, jsUrl, scriptId, scriptElement) {
  // test
  if (window[scriptId]) {
    return window[scriptId]();
  }
  scriptElement = document.getElementById(scriptId);
  if (scriptElement) {
    return;
  }
  scriptElement = document.createElement('script');
  scriptElement.src = jsUrl;
  scriptElement.id = scriptId;
  document.body.appendChild(scriptElement);
})(window, document, '<JS_URL>', '<SCRIPT_ID>');
