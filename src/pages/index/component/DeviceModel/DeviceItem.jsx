import isIE from '@/utils/isIE';
import { useIntl } from 'umi';
import DeviceModel from './DeviceModel';
import styles from './index.less';

const DeviceItem = (props) => {
  const ie = isIE();
  const { formatMessage } = useIntl();
  const { id, name, info } = props;

  return (
    <>
      <div className={styles.title}>
        <h3>{name}</h3>
        <h4>{formatMessage({ id: `home.device.${id}` })}</h4>
      </div>
      <ul className={styles.info + ' wow animate__fadeInUpSmall'}>
        {info.map(({ key, value }) => (
          <li key={key} className={styles.item}>
            <p className={styles.name}>{formatMessage({ id: `home.device.${key}` })}</p>
            <p
              className={styles.value}
              dangerouslySetInnerHTML={{
                __html: formatMessage(
                  { id: `home.device.value.${id}.${key}` },
                  { tag: `<span class=${styles.pre}> up to </span>` },
                ),
              }}
            ></p>
          </li>
        ))}
      </ul>
      <div className={styles.model + ' wow animate__fadeInUpSmall anidelay-1'}>
        {ie ? (
          <img
            className={styles.img}
            src={require(`@/assets/imgs/device/${props.id == '3841' ? '3841' : '3841hex'}.png`)}
            alt="sequencer device"
          />
        ) : (
          <DeviceModel id={props.id} />
        )}
      </div>
    </>
  );
};

export default DeviceItem;
