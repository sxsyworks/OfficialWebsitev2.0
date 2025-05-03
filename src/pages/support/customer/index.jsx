import Title from '@/components/Title';
import { useIntl } from 'umi';
import ContactWays from '@/components/ContactWays';
import { useWow } from '@/utils/common';
import styles from './index.less';

export default function Customer() {
  const { formatMessage } = useIntl();
  const content = ['install', 'buy', 'train', 'repair', 'spare'];
  useWow();
  return (
    <>
      <div className={styles.top}>
        <Title name="customer" />
        <div
          className={styles.content + ' wow animate__fadeInUpSmall anidelay-1'}
        >
          {formatMessage({ id: 'customer.content' })}
        </div>
        <div className={styles.service}>
          {content.map((item, index) => {
            return (
              <div
                className={styles.item + ' wow animate__fadeInUpSmall'}
                key={index}
              >
                <div className={styles.img}>
                  <img src={require(`./${item}.png`)} alt="icon" />
                </div>
                {formatMessage({ id: 'customer.' + item })}
              </div>
            );
          })}
        </div>
      </div>
      <ContactWays />
    </>
  );
}
