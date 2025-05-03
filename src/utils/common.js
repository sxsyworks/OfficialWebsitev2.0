import isIE from '@/utils/isIE';
import { useEffect } from 'react';
import { WOW } from 'wowjs';

/**
 * 数字累加滚动，支持两种方式：
 * 1. 指定速度，通过interval控制，即控制帧与帧的间隔
 * 2. 指定时间，即：无论数字多大，指定时间内必须完成累加
 * @param {Object}   option              配置
 * @param {Number}   option.start        起始数字
 * @param {Number}   option.end          结束数字
 * @param {Number}   option.interval     帧与帧之间的间隔(ms)
 * @param {Boolean}  option.limitTime    指定时间
 * @param {Function} option.callback     回调函数，参数为每次累加后的数字
 * 弊端：就是无法中途停止 TODO
 */

export function Count({ start = 0, end = 100, interval = 0, limitTime = 0, delay = 0, callback }) {
  // 每帧所需的时间(ms)
  // 按照MDN介绍，通常是每秒60帧
  const frameTime = 1000 / 60;

  // 帧数
  let frameAmount;

  // 步长
  // 即每次的累加值，默认: 1
  let frameStep = 1;

  // 计数器
  // 当指定interval时，计数器才起作用
  // 作用：用于与interval比较，等于interval时，执行回调，然后清零重新计数，达到控制速度的效果
  let counter = 0;

  // 如果指定了limitTime，则重新计算步长
  if (limitTime && !interval) {
    let length = end - start;

    // 指定时间内可以完成多少帧
    frameAmount = limitTime / frameTime;

    // 帧数与真实长度取两者之间最小值,取length相当于一帧走一步，这段代码可省略。
    if (frameAmount > length) {
      frameAmount = length;
    }

    frameStep = Math.round((end - start) / frameAmount);
  }

  // 帧的回调函数
  function step() {
    let req;

    // 方式1和2的公共逻辑部分
    function commonLogic() {
      start += frameStep;

      // 防止最后一次累加时出现数字越界的情况，为什么会出现越界的情况呢？因为按照步长累加，就可能出现最后的start>end的情况
      if (start >= end) {
        callback(end);
      } else {
        callback(start);
        window.cancelAnimationFrame(req);
        req = window.requestAnimationFrame(step);
      }
    }

    // 方式1：按时间间隔
    if (interval !== 0) {
      counter++;

      if (counter === interval) {
        commonLogic();
        counter = 0;
      } else {
        window.cancelAnimationFrame(req);
        req = window.requestAnimationFrame(step);
      }

      // 方式2：按指定时间
    } else {
      if (start < end) {
        commonLogic();
      }
    }
  }

  // 起始调用
  setTimeout(() => {
    let timer = window.requestAnimationFrame(step);
    clearTimeout(timer);
    timer = null;
  }, delay);
}

/**
 * 从路径中截取文件名
 * @param {*} src
 * @param {*} hasSuffix 是否有后缀，默认没有后缀
 * @returns
 */
export const getFileName = (src, hasSuffix) => {
  let name = src.slice(src.lastIndexOf('/') + 1);
  if (!hasSuffix) {
    name = name.slice(0, name.lastIndexOf('.'));
  }
  return name;
};

/**
 * 直接下载文件
 * @param {*} src
 * @param {*} filename
 */
export const downloadFile = (src, filename) => {
  // console.log('name', filename);
  const a = document.createElement('a');
  a.style.display = 'none';
  // a.target = '_blank';
  a.setAttribute('download', filename);
  a.setAttribute('href', src);
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
};

/**
 * 下载那些能被浏览器正常打开的文件(比如视频，txt，pdf，html等文件)，通过xhr对象发送get请求，以及响应格式转换为blob对象的方式
 * @param {*} src
 * @param {*} filename
 */
export const downloadSpecailFile = (src, filename) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', src, true);
  xhr.responseType = 'blob';
  xhr.send();
  xhr.onload = function (e) {
    if (this.status === 200) {
      const blob = this.response;
      // 创建隐藏的可下载链接
      const eleLink = document.createElement('a');
      eleLink.download = filename;
      eleLink.style.display = 'none';
      eleLink.href = window.URL.createObjectURL(blob);
      document.body.appendChild(eleLink);
      // 触发点击
      eleLink.click();
      // 下载完成后释放资源
      URL.revokeObjectURL(blob);
      document.body.removeChild(eleLink);
    }
  };
};

/**
 * 下载文件
 * @param {*} src
 * @param {*} fileName
 */
export const download = (src, fileName) => {
  if (!fileName) {
    fileName = getFileName(src, true);
  }
  let fType = src.slice(src.lastIndexOf('.') + 1);
  if (isIE()) {
    downloadFile(src, fileName);
    return;
  }
  const isSpecailFile =
    fType === 'pdf' || fType === 'htm' || fType === 'html' || fType === 'txt' || fType === 'docx' || fType === 'doc';
  if (isSpecailFile) {
    downloadSpecailFile(src, fileName);
  } else {
    downloadFile(src, fileName);
  }
};

/**
 * 引入wow.js的hooks
 */
export const useWow = (deps, id) => {
  useEffect(() => {
    new WOW({ scrollContainer: id || '#app' }).init();
  }, deps || []);
};

/**
 * 把日期字符串拆解成年月日
 * @param {*} date  日期字符串
 * @param {*} monthRule 月份映射关系
 * @returns
 */
export const disassembleDate = (date, monthRule) => {
  // debugger
  let dateObj = new Date(date);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth();
  let day = dateObj.getDate();
  month = monthRule ? monthRule?.[month] : month + 1;
  return {
    year,
    month,
    day,
  };
};

/**
 * 判断是否是视频
 * @param {*} url
 * @returns
 */
export const isVideoUrl = (url) => {
  return /\.(mp4|webm|ogg|avi|wmv|flv|mov)$/i.test(url);
};
