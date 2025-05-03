import Footer from '@/components/Footer';
import { addEventListener, removeEventListener } from '@/utils/eventLinstener';
import _debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'umi';
import Application from './component/Application';
import Banner from './component/Banner';
import Board from './component/Board';
import Device from './component/Device';
import Intro from './component/Intro';
import News from './component/News';
import './index.less';

export default function IndexPage() {
  let index = 1;
  let curIndex = 1;
  let now = 0;
  let height = 1;
  let offset = 0;
  let footerH = 0;
  let home = null;
  let pageNum = 7; // 多少个滑动模块 TODO
  const [cur, setCur] = useState(0);
  const [fristPlant, setFristPlant] = useState(false);
  const [start, setStart] = useState(true); // TODO 每次调试时不想等第一屏视屏结束，可以先把值设置成true，可跳过
  const curRef = useRef(null);
  const { locale } = useIntl();

  // 需要渲染的banner
  const Banners = {
    'zh-CN': [
      { name: 'Device', com: Device },
      { name: 'Intro', com: Intro },
      { name: 'Application', com: Application },
      { name: 'News', com: News },
      { name: 'Board', com: Board },
    ],
    'en-US': [
      { name: 'Device', com: Device },
      { name: 'Intro', com: Intro },
      { name: 'Application', com: Application },
      { name: 'Board', com: Board },
    ],
  };
  const Items = useMemo(() => Banners[locale], [locale]);

  const addListener = _debounce(() => {
    home = document.getElementById('home');
    height = document.body.clientHeight;
    footerH = document.getElementById('footer')?.clientHeight || 0;
    offset = -(height * (pageNum - 2) + footerH);
    if (home) {
      toPage(curIndex);
      removeEventListener(home, 'wheel', scrollFun);
      addEventListener(home, 'wheel', scrollFun);
    }
  }, 150);

  useEffect(() => {
    if (!start) return;
    pageNum = Items.length + 2;
    addListener();
    addEventListener(window, 'resize', addListener);
    return () => {
      removeEventListener(window, 'resize', addListener);
      start && home ? removeEventListener(window, 'wheel', scrollFun) : null;
    };
  }, [start]);

  // 获取时间戳（毫秒级别）
  const getTime = useCallback(() => {
    return new Date().getTime();
  }, []);

  const { current } = useRef({
    isScroll: true, // 是否可以正常的滚动
    scrollTime: null, // 上次切换的时间戳（毫秒级别）
    timer: null, // setTimeout句柄
    interval: 800, // 两次滑动之间的最小事件间隔 500
    distance: 200, // 有效滑动的最小距离 100
    delay: 300, // 防抖时间
    tag: -1, // 标志event.y
    num: 1, // 触控板触发多次累积数量
  });

  // wheel事件处理函数
  const wheel = (e) => {
    var delta = 0;
    if (e.wheelDelta) {
      delta = -e.wheelDelta;
    } else if (e.deltaY) {
      delta = e.deltaY;
    }
    // 向下滚动
    if (delta > 0 && now > offset) {
      // console.log('向下滚动');
      index++;
      toPage(index);
    }
    //向上滚动
    if (delta < 0 && now < 0) {
      index--;
      toPage(index);
    }
  };

  // wheel事件回调
  const scrollFun = (e) => {
    const time = getTime();
    const y = e.deltaY; // 以垂直滚动为列
    const tag = e.y;

    if (current.scrollTime) {
      // 如果这次触发的时机跟上次切换的时机差大于一定时间，并且滑动距离大于一定距离，那么就认为是有效滑动
      // console.log('时间差', time - current.scrollTime);
      // console.log('距离', Math.abs(y));
      if (time - current.scrollTime > current.interval && Math.abs(y) >= current.distance) {
        // 触摸板滚动
        // console.log('触控板滑动');
        wheel(e);
        clearTimeout(current.timer);
        current.isScroll = false;
        current.scrollTime = time;
        current.num = 0;
      }
    }
    if (current.isScroll) {
      // 正常滚动
      // console.log('正常滚动------------');
      wheel(e);
      current.scrollTime = getTime();
      current.isScroll = false;
      current.num = 0;
    }
    if (current.timer) {
      clearTimeout(current.timer);
    }
    // 防止一直滑动触控板的时候不会滑动或者很久才滑动
    if (tag === current.tag) {
      current.num++;
    } else {
      current.num = 0;
    }
    if (current.num === 120) {
      home = document.getElementById('home');
      home.click();
      current.isScroll = true;
      current.num = 0;
    }
    current.tag = tag;
    current.timer = setTimeout(() => {
      current.isScroll = true;
    }, current.delay);
  };

  function toPage(index) {
    let dir = index - curIndex; // 表示方向
    let isLast = index * dir === pageNum || index * dir === -(pageNum - 1);
    let h = isLast ? footerH : height;
    if (index != curIndex) {
      now = now - dir * h;
      curIndex = index;
    } else {
      now = curIndex < pageNum ? -(curIndex - 1) * height : -((curIndex - 2) * height + footerH);
    }
    home.style.top = now + 'px';
    setTimeout(() => {
      if (!fristPlant && curIndex > Items.length) {
        setFristPlant(true);
      }
      setCur(curIndex);
      curRef.current = curIndex;
    }, 1000);
  }

  const onFinished = () => {
    setStart(true);
  };

  return (
    <div className="pageIndex" id="wrap">
      <div className="home" id="home">
        <div className="item">
          <Banner finished={onFinished} />
        </div>
        {Items.map((item, index) => {
          return (
            <div key={item.name} className="item">
              {cur >= index + 1 || fristPlant ? <item.com isAnimate={cur === index + 2} /> : null}
            </div>
          );
        })}
        <Footer />
      </div>
    </div>
  );
}
