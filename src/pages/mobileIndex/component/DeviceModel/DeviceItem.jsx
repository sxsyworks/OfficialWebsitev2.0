import Img3841 from '@/assets/imgs/device/3841.png';
import Img3841hex from '@/assets/imgs/device/3841hex.png';
import { useIntl } from 'umi';
import styles from './index.less';

const DeviceItem = (props) => {
  const { formatMessage } = useIntl();
  const { id, name, info } = props;

  return (
    <div className={styles.deviceItem}>
      <div className={styles.title}>
        <h3>{name}</h3>
        <h4>{formatMessage({ id: `home.device.${id}` })}</h4>
      </div>
      <ul className={styles.info + ' wow animate__fadeInUpSmall'}>
        {info.map(({ key, value }) => (
          <li key={key} className={styles.item}>
            <p className={styles.name}>{formatMessage({ id: `home.device.${key}` })}</p>
            <p className={styles.value}>{formatMessage({ id: `home.device.value.${id}.${key}`, default: value })}</p>
          </li>
        ))}
      </ul>
      <div className={styles.model + ' wow animate__fadeInUpSmall anidelay-1'}>
        <img src={id === '3841' ? Img3841 : Img3841hex} alt={id} />
      </div>
    </div>
  );
};

export default DeviceItem;
