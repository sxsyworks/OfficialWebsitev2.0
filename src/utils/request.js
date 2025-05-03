import baseUrl from '../../config/server';
export const request = (url, params) => {
  return new Promise(function (resolve, reject) {
    var xhr = null; // IE8/9需用window.XDomainRequest兼容
    if (window.XDomainRequest) {
      console.log('XDomainRequest');
      xhr = new XDomainRequest();
      xhr.onload = function () {
        console.log('res', xhr.responseText);
        reject();
      };
      xhr.onerror = function () {
        console.log('onerror', xhr);
        reject();
      };
      xhr.open(params.method, baseUrl + url);
      xhr.send();
    } else {
      xhr = new XMLHttpRequest();
      console.log('XMLHttpRequest');
      // 前端设置是否带cookie
      xhr.withCredentials = false;
      xhr.timeout = 30000;
      xhr.open(params.method, baseUrl + url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('allow-origin-header', '*');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.send(JSON.stringify(params.data));
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log('res', JSON.parse(xhr.responseText).name);
        } else {
          return { code: 2000 };
        }
      };
      xhr.onload = function () {
        console.log('load', xhr);
        reject();
      };
      xhr.onerror = function () {
        console.log('error', xhr);
        reject();
      };
    }
  });
};
