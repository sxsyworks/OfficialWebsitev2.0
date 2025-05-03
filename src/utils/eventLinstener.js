export const addEventListener = (dom, event, handle) => {
  if (window.addEventListener) {
    dom.addEventListener(event, handle);
  } else {
    dom.attachEvent('on' + event, handle);
  }
};
export const removeEventListener = (dom, event, handle) => {
  if (window.addEventListener) {
    dom.removeEventListener(event, handle);
  } else {
    dom.removeEvent('on' + event, handle);
  }
};
