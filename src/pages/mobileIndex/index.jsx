import Footer from '@/components/Footer';
import Menu from '@/components/MenuMobile';
import _debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'umi';
import Application from './component/Application';
import Banner from './component/Banner';
import BoardMap from './component/BoardMap';
import Device from './component/Device';
import Intro from './component/Introduction';
import News from './component/News';
import Ranking from './component/Ranking';
import './index.less';
import styles from './index.less';

const MobileIndex = () => {
  const { locale } = useIntl();
  const [cur, setCur] = useState(0);
  const [fristPlanted, setFristPlanted] = useState(0);
  const [vh, setVh] = useState(0);
  const ref = useRef();
  let startY = 0;
  let startX = 0;

  // 需要渲染的banner
  const Banners = {
    'zh-CN': [
      { com: Banner },
      { com: Device },
      { com: Intro },
      { com: Ranking },
      { com: Application },
      { com: News },
      { com: BoardMap },
      { com: Footer },
    ],
    'en-US': [
      { com: Banner },
      { com: Device },
      { com: Intro },
      { com: Ranking },
      { com: Application },
      { com: BoardMap },
      { com: Footer },
    ],
  };
  const Items = useMemo(() => Banners[locale], [locale]);
  const total = Items.length;

  const changeCurrent = (c) => {
    if (cur + c < total && cur + c >= 0) {
      setCur(cur + c);
      let el = document.getElementById('mobile');
      el.style.transform = `translateY(-${(cur + c) * vh}px)`;
    }
  };

  const addEvent = _debounce(() => {
    let el = document.getElementById('mobile');
    el.addEventListener('touchstart', getStart);
    el.addEventListener('touchend', moveTo);
    el.addEventListener('touchmove', moving);

    function getStart(event) {
      startY = event.touches[0].pageY;
    }
    function moveTo(event) {
      let y1 = event.changedTouches[0].pageY;
      if (y1 === startY) {
        return;
      }
      let direction = y1 - startY > 0 ? -1 : 1;
      ref.current(direction);
    }
    function moving(event) {
      event.preventDefault();
    }
    return () => {
      el.removeEventListener('touchstart', getStart);
      el.removeEventListener('touchend', moveTo);
      el.removeEventListener('touchmove', moving);
    };
  }, 500);

  useEffect(() => {
    ref.current = changeCurrent;
    return () => {};
  });

  useEffect(() => {
    if (!vh) return;
    ref.current(0);
    let el = document.getElementById('mobile');
    el.addEventListener('touchstart', getStart);
    el.addEventListener('touchend', moveTo);
    el.addEventListener('touchmove', moving);

    function getStart(event) {
      startY = event.touches[0].pageY;
      startX = event.touches[0].pageX;
    }
    function moveTo(event) {
      let y1 = event.changedTouches[0].pageY;
      let x1 = event.changedTouches[0].pageX;
      if (Math.abs(x1 - startX) > 80 || Math.abs(y1 - startY) < 40) {
        return;
      }
      let direction = y1 - startY > 0 ? -1 : 1;
      ref.current(direction);
    }
    function moving(event) {
      event.preventDefault();
    }
    return () => {
      el.removeEventListener('touchstart', getStart);
      el.removeEventListener('touchend', moveTo);
      el.removeEventListener('touchmove', moving);
    };
  }, [vh]);

  useEffect(() => {
    if (fristPlanted < cur && cur < total) {
      setFristPlanted(cur);
    } else if (cur === total) {
      setFristPlanted(100);
    }
  }, [cur]);

  // 动态设置高度
  const setHeight = _debounce(() => {
    let h = window?.innerHeight || document?.documentElement?.clientHeight || document?.body?.clientHeight;
    let windowsVH = h / 100;
    let vh = windowsVH * 100;
    setVh(vh);
    document.querySelector('html').style.setProperty('--vh', windowsVH + 'px');
  }, 500);

  useEffect(() => {
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }, []);

  return (
    <div className={styles.mobile + ' mobileIndex'}>
      <Menu />
      <div id="mobile" className={styles.page}>
        {Items.map((item, index) => {
          return (
            <div key={index} className={styles.item} style={{ height: vh }}>
              {fristPlanted + 1 > index ? <item.com isAnimate={cur === index} height={vh} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MobileIndex;
