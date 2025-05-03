import './index.less';
class MessageObj {
  constructor() {
    this.id = 'messageBox';
  }
  create() {
    const dom = document.getElementById('root');
    let el = document.createElement('div');
    el.className = 'message';
    el.id = 'messageBox';
    dom.appendChild(el);
  }
  appendMsg = function (msg, className) {
    if (!document.getElementById('messageBox')) {
      this.create();
    }
    let dom = document.getElementById('messageBox');
    let el = document.createElement('div');
    el.className = className;
    el.innerText = msg;
    dom.appendChild(el);
    setTimeout(() => {
      dom.removeChild(el);
    }, [4500]);
  };
  onsuccess = function (msg) {
    this.appendMsg(msg, 'success');
  };
  onerror = function (msg) {
    this.appendMsg(msg, 'error');
  };
  onwarning = function (msg) {
    this.appendMsg(msg, 'warning');
  };
}
var ms = new MessageObj();
const success = (msg) => {
  ms.onsuccess(msg);
};
const error = (msg) => {
  ms.onerror(msg);
};
const warning = (msg) => {
  ms.onwarning(msg);
};
const message = {
  success,
  error,
  warning,
};
export default message;
