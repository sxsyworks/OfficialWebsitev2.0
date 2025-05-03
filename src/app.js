import { getLocale } from '@umijs/max';
import 'animate.css';
import { message, notification } from 'antd';
import _debounce from 'lodash/debounce';
import VConsole from 'vconsole';
import baseUrl from '../config/server';

// 计算fontSize适应不同分辨率
(function (designWidth = 1920, minHeight = 1080) {
  let docEle = document.querySelector('html');
  const isPhone = getDeviceType();
  if (isPhone) {
    designWidth = 360;
    minHeight = 640;
  }
  let screenRatioByDesign = designWidth / minHeight;
  setHtmlFontSize();
  window.addEventListener('resize', _debounce(setHtmlFontSize, 150));
  function setHtmlFontSize() {
    let screenRatio = docEle.clientWidth / docEle.clientHeight;
    let fontSize = 0;
    if (isPhone) {
      if (docEle.clientWidth < designWidth * 2) {
        if (docEle.clientWidth < docEle.clientHeight) {
          fontSize = (docEle.clientWidth / designWidth) * 12;
        } else {
          fontSize = (12 / screenRatioByDesign) * (docEle.clientHeight / minHeight);
        }
      } else {
        if (docEle.clientWidth < docEle.clientHeight) {
          fontSize = (docEle.clientWidth / designWidth) * (12 * screenRatioByDesign);
        } else {
          fontSize = 12 * (docEle.clientHeight / minHeight);
        }
      }
    } else {
      fontSize =
        ((screenRatio > screenRatioByDesign ? screenRatioByDesign / screenRatio : 1) * docEle.clientWidth) / 100;
    }
    let fs = fontSize.toFixed(3) + 'px';
    docEle.style.fontSize = fs;
  }
})();

// 配置全局变量
export async function getInitialState() {
  var isPhone = getDeviceType();
  if (process.env.NODE_ENV === 'development' && isPhone) {
    const vConsole = new VConsole();
  }
  return {
    baseUrl,
    isPhone,
  };
}

// 判断是否是手机端
function getDeviceType() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
  var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
  var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
  var bIsAndroid = sUserAgent.match(/android/i) == 'android';
  var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
  var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
  var isIpadPro =
    sUserAgent.indexOf('safari') != -1 &&
    sUserAgent.indexOf('version') != -1 &&
    !(sUserAgent.indexOf('iphone') != -1 && sUserAgent.indexOf('version') != -1) &&
    'ontouchend' in document;
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || isIpadPro) {
    return true;
  } else {
    return false;
  }
}

// 重置console.warn打印函数
console.warn = function () {
  return;
};

const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error) => {
  const { name } = error;
  if (name === 'AbortError') {
    return {
      code: 0, // 请求成功
      aborted: true, // callback页面是否中止请求成功
    };
  }
  if (error.response) {
    const { status, statusText, url } = error.response;
    const errortext = codeMessage[status] || statusText;
    notification.error({
      key: 'NetworkErr',
      message: `请求错误 ${status}: ${url}`,
      description: errortext,
      className: 'myNotification',
    });
  } else {
    notification.error({
      key: 'NetworkErr',
      message: `服务异常`,
      description: '未连接到服务,请重启软件',
      className: 'myNotification',
      duration: 0,
    });
  }
  throw error;
};

function requestInterceptor(url, options) {
  if (url.includes('http')) {
    return {
      url,
      options,
    };
  }
  // 设置代理前缀/api
  const lang = getLocale()?.split('-')?.[0];
  const prefix = process.env.NODE_ENV === 'development' ? baseUrl : '/apiUrl';
  const newUrl = `${prefix}${url}?lang=${lang}`;
  return {
    url: newUrl,
    options: {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'allow-origin-header': '*',
        'Cache-Control': 'no-cache',
      },
    },
  };
}

const responseInterceptor = async (response) => {
  const { code, msg } = await response?.data;
  if (code >= 2000) {
    message.error('error:' + msg);
  } else if (code >= 1000) {
    message.warning('warning:' + msg);
  }
  return response;
};

export const request = {
  timeout: 60000,
  errorHandler,
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
};
