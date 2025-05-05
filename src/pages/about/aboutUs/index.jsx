import TimeLine from '@/components/TimeLine';
import Title from '@/components/Title';
import { useWow } from '@/utils/common';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

export const AboutUsSlogan = [
  {
    key: 'vision',
    src: require('@/assets/imgs/about/Vision.png'),
  },
  {
    key: 'mission',
    src: require('@/assets/imgs/about/Mission.png'),
  },
  {
    key: 'values',
    src: require('@/assets/imgs/about/Values.png'),
  },
];

export const AboutUsTimeLine = [
  {
    key: 'timeline',
    locale: 'about.aboutUs',
  },
  {
    key: 'honors',
    locale: 'about.aboutUs.honors',
  },
];

export default function AboutUs() {
  const { formatMessage } = useIntl();
  const [current, setCurrent] = useState(2);
  const [isPlay, setIsPlay] = useState(true);
  const ref = useRef();
  const frame = 5;
  const timer = useRef(null);
  const timer2 = useRef(null);
  const [curTimeLine, setCurTimeLine] = useState('timeline');

  useWow();

  const changeCurrent = () => {
    setCurrent((current + 1) % frame);
  };

  useEffect(() => {
    ref.current = changeCurrent;
    return () => {};
  });

  const changeTitle = (e) => {
    let nextTimeline = curTimeLine === 'timeline' ? 'honors' : 'timeline';
    setCurTimeLine(nextTimeline);
  };

  useEffect(() => {
    const ele = document.getElementById('bg');
    if (!isPlay) {
      ele.style.transition = 'left .5s';
      ele.style.left = -33.3 + current * 33.3 + '%';
      return;
    }

    timer2.current = setTimeout(() => {
      ele.style.transition = 'left 2s';
      if (current === frame - 1) {
        ele.style.transition = '';
      }
      let left = current === frame - 1 ? 0 : current + 1;
      ele.style.left = -33.3 + left * 33.3 + '%';
    }, [1000]);

    timer.current = setTimeout(() => {
      ref.current();
    }, [2000]);

    return () => {
      clearTimeout(timer.current);
      clearTimeout(timer2.current);
    };
  }, [current, isPlay]);

  const onHover = (index) => {
    setIsPlay(false);
    setCurrent(index);
  };

  const onLeave = (e) => {
    setIsPlay(true);
  };

  return (
    <div className={styles.aboutUs + ' ' + styles[formatMessage({ id: 'page.css.page' })]}>
      <section className={styles.intro}>
        <div className={styles.logo}></div>
        <div className={styles.desc + ' wow animate__fadeInUpSmall'}>
          <h2 className={styles.title + ' wow animate__fadeInUpSmall'}>
            {formatMessage({ id: 'about.aboutUs.originTitle' })}
          </h2>
          {new Array(4).fill(1).map((item, index) => (
            <p className={styles.text + ' wow animate__fadeInUpSmall'}>
              {formatMessage({ id: `about.aboutUs.originText${index + 1}` })}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.slogans}>
        <div className={styles.sloganBox} onMouseLeave={(e) => onLeave(e)}>
          {AboutUsSlogan.map((item, index) => {
            let { key, name, desc, src } = item;
            index = index + 1;
            return (
              <div
                key={key}
                className={styles.slogan + ' ' + (current === index ? styles.current : '')}
                onMouseEnter={() => onHover(index)}
              >
                <img src={src} alt={name} className={styles.img} />
                <div className={styles.name}>
                  {formatMessage({ id: `about.aboutUs.${key}.title` })}
                  <h6>{formatMessage({ id: `about.aboutUs.${key}.subTitle` })}</h6>
                </div>
                <p
                  className={styles.desc}
                  dangerouslySetInnerHTML={{ __html: formatMessage({ id: `about.aboutUs.${key}.text` }) }}
                ></p>
              </div>
            );
          })}
          <div className={styles.bgCurrent} id="bg"></div>
        </div>
      </section>
      <section className={styles.develope}>
        <div className={styles.radioTitle} onClick={changeTitle}>
          {AboutUsTimeLine.map((item) => (
            <div>
              <Title
                name={item.locale}
                style={{ cursor: 'pointer', color: curTimeLine === item.key ? '#51A8DE' : '#505050' }}
              />
            </div>
          ))}
        </div>
        <TimeLine isDev={true} curTimeLine={curTimeLine} />
      </section>
    </div>
  );
}
