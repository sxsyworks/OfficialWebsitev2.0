import { Count } from '@/utils/common';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from './index.less';

const Intro = (props) => {
  const { formatMessage } = useIntl();
  const ie = true;
  const [first, setFirst] = useState(0);
  const [sec, setSec] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);
  const Items = [
    { key: 'first', num: 11, method: setFirst, interval: 3 },
    { key: 'sec', num: 50, method: setSec },
    { key: 'third', num: 300, method: setThird },
    { key: 'fourth', num: 300, method: setFourth },
  ];

  useEffect(() => {
    if (!props.isAnimate) return;
    Items.map((item) => {
      let { key, num, method, interval } = item;
      Count({
        end: num,
        interval: interval || 0,
        limitTime: num + 1000,
        delay: 200,
        callback: (count) => {
          if (key === 'first' && count === num) {
            method(1);
            return;
          }
          method(count);
        },
      });
    });
    return () => {
      Items.map((item) => {
        item.method(0);
      });
    };
  }, [props.isAnimate]);

  return (
    <div
      className={`${styles.banner1} ${props.isAnimate ? styles.animate : ''} ${
        styles[formatMessage({ id: 'page.css.page' })]
      }`}
    >
      <div className={styles.text}>
        <div className={styles.title}>
          <FormattedMessage id="home.intro.title" />
        </div>
        <div className={styles.des}>
          <FormattedMessage id="home.intro.des" />
        </div>
        <div className={styles.datas}>
          <div className={styles.dataItem} style={ie ? { opacity: 1 } : null}>
            <div className={styles.nums}>No.{first}</div>
            <p
              dangerouslySetInnerHTML={{
                __html: formatMessage({ id: `home.intro.firstDes` }),
              }}
            ></p>
          </div>
          <div className={styles.dataItem} style={ie ? { opacity: 1 } : null}>
            <div className={styles.nums}>{sec}+</div>
            <p
              dangerouslySetInnerHTML={{
                __html: formatMessage({ id: `home.intro.secDes` }),
              }}
            ></p>
          </div>
          <div className={styles.dataItem} style={ie ? { opacity: 1 } : null}>
            <div className={styles.nums}>{third}+</div>
            <p
              dangerouslySetInnerHTML={{
                __html: formatMessage({ id: `home.intro.thirdDes` }),
              }}
            ></p>
          </div>
          <div className={styles.dataItem} style={ie ? { opacity: 1 } : null}>
            <div className={styles.nums}>{fourth}+</div>
            <p
              dangerouslySetInnerHTML={{
                __html: formatMessage({ id: `home.intro.fourthDes` }),
              }}
            ></p>
          </div>
        </div>
        <a href="./about/aboutUs" className={styles.btn}>
          <FormattedMessage id="btn.knowMore" />
        </a>
      </div>
      <div className={styles.videoItem}>
        {/* <VideoPlayer src="./perforation.mp4" spare="./perforation.webm" loop /> */}
      </div>
    </div>
  );
};
export default Intro;
