'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.off = off;

var _subscribeUiEvent = require('subscribe-ui-event');

var subscription = null;
function on(el, eventName, callback, opts) {
  opts = opts || false;
  if (!subscription) {
    subscription = (0, _subscribeUiEvent.subscribe)(eventName, callback, opts);
    // el.addEventListener(eventName, callback, opts);
  } else if (el.attachEvent) {
    el.attachEvent('on' + eventName, function (e) {
      callback.call(el, e || window.event);
    });
  }
}

function off(el, eventName, callback, opts) {
  opts = opts || false;
  if (subscription) {
    subscription.unsubscribe();
    // el.removeEventListener(eventName, callback, opts)
  } else if (el.detachEvent) {
    el.detachEvent('on' + eventName, callback);
  }
}