import { Devices } from '@/utils/constant';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'umi';
import DeviceInfo from './DeviceInfo';
import styles from './index.less';

const Device = (props) => {
  const { formatMessage } = useIntl();
  const [cur, setCur] = useState(0);
  const changeDevice = (isLast) => {
    let current = isLast ? cur + 1 : cur - 1;
    setCur(current);
  };
  const [showAnimate, setShowAnimate] = useState(false);

  // 当前数据
  const curData = useMemo(() => {
    return Devices.find((item, idx) => idx == cur);
  }, [cur]);

  useEffect(() => {
    if (!showAnimate && props.isAnimate) {
      setShowAnimate(true);
    }
  }, [props.isAnimate]);

  return (
    <div className={`${styles.deviceWrapper} ${showAnimate ? styles.animate : ''}`}>
      <DeviceInfo curData={curData} />
      {/* 设备切换 */}
      <div className={styles.device}>
        <div className={styles.deviceItems} style={{ transform: `translate(${-100 * cur + '%'})` }}>
          {Devices.map((item) => (
            <img
              className={styles.deviceItem + ' wow animate__fadeInUpSmall anidelay-1'}
              src={require(`@/assets/imgs/device/${item.key}.png`)}
              alt="sequencer device"
            />
          ))}
        </div>
        <ul className={styles.dots}>
          {[...Array(Devices.length)].map((_, i) => (
            <li key={i} className={`${styles.dot} ${i == cur ? styles.active : ''}`}></li>
          ))}
        </ul>
      </div>
      <>
        <i
          className={styles.arrowLeft}
          style={{ visibility: cur ? 'visible' : 'hidden' }}
          onClick={() => changeDevice(false)}
        ></i>
        <i
          className={styles.arrowRight}
          style={{
            visibility: cur !== Devices.length - 1 ? 'visible' : 'hidden',
          }}
          onClick={() => changeDevice(true)}
        ></i>
        <a href="/products/sequencer" className={styles.btn}>
          {formatMessage({ id: 'btn.knowMore' })}
        </a>
      </>
    </div>
  );
};

export default Device;
