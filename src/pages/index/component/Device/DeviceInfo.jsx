import { useIntl } from 'umi';
import styles from './index.less';

const DeviceInfo = ({ curData }) => {
  const { formatMessage } = useIntl();
  const { key, name, info } = curData;

  return (
    <div className={styles.intro}>
      <div className={styles.title}>
        <h3>{name}</h3>
        <h4>{formatMessage({ id: `home.device.${key}` })}</h4>
      </div>
      <ul className={styles.info + ' wow animate__fadeInUpSmall'}>
        {info.map(({ name, value, unit }) => (
          <li key={name} className={styles.item}>
            <p className={styles.name}>{formatMessage({ id: `home.device.${name}` })}</p>
            <p className={styles.value}>
              <b className={styles.number}>{value}</b>
              <span>{formatMessage({ id: `home.device.${unit}` })}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceInfo;
