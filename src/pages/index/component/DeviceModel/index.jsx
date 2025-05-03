import { Devices } from '@/utils/constant';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import DeviceItem from './DeviceItem';
import styles from './index.less';

const Device = (props) => {
  const { formatMessage } = useIntl();
  const [cur, setCur] = useState(0);
  const changeDevice = (isLast) => {
    let current = isLast ? cur + 1 : cur - 1;
    setCur(current);
  };
  const [showAnimate, setshowAnimate] = useState(false);

  useEffect(() => {
    if (!showAnimate && props.isAnimate) {
      setshowAnimate(true);
    }
  }, [props.isAnimate]);

  return (
    <div className={`item ${styles.deviceWrapper} ${showAnimate ? styles.animate : ''}`}>
      <div className={`${styles.device}`}>
        <div className={styles.deviceItems} style={{ transform: `translate(${-100 * cur + '%'})` }}>
          {Devices.map((item) => (
            <div key={item.key} className={styles.deviceItem}>
              <DeviceItem {...item} id={item.key} />
            </div>
          ))}
        </div>
      </div>
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
    </div>
  );
};

export default Device;
