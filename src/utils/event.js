import { subscribe } from 'subscribe-ui-event';

let subscription = null;
export function on(el, eventName, callback, opts) {
  opts = opts || false;
  if (!subscription) {
    subscription = subscribe(eventName, callback, opts);
    // el.addEventListener(eventName, callback, opts);
  } else if (el.attachEvent) {
    el.attachEvent(`on${eventName}`, (e) => {
      callback.call(el, e || window.event);
    });
  }
}

export function off(el, eventName, callback, opts) {
  opts = opts || false;
  if (subscription) {
    subscription.unsubscribe();
    // el.removeEventListener(eventName, callback, opts)
  } else if (el.detachEvent) {
    el.detachEvent(`on${eventName}`, callback);
  }
}
