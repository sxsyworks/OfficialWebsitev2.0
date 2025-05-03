import styles from '../index.less';
import ImgTextLR from '@/components/ImgTextLR';
import Title from '@/components/Title';
import { useIntl } from 'umi';
import { useWow } from '@/utils/common';

export default function Microorganism() {
  useWow();
  const { formatMessage } = useIntl();
  const data = [
    {
      name: 'microorganism.assemble',
      src: require('@/assets/imgs/keyApplications/microorganism-assemble.png'),
      id: 'assembleCase',
      cases: [
        'https://mp.weixin.qq.com/s/T9O2JDxIYkaJ7jZ4BFeuwg',
        'https://mp.weixin.qq.com/s/S-SKAHQeFHMJOc2p4d2CbA',
        'https://mp.weixin.qq.com/s/214fE_d27tNpdbPPIa7Jkg',
      ],
    },
    {
      name: 'microorganism.sequence',
      src: require('@/assets/imgs/keyApplications/microorganism-sequence.png'),
    },
    {
      name: 'microorganism.variety',
      src: require('@/assets/imgs/keyApplications/microorganism-variety.png'),
    },
  ];
  const newBg = require('@/assets/imgs/keyApplications/microorganism-bg2.png');
  return (
    <>
      <div className={styles.box}>
        <p className={styles.paragraph + ' wow animate__fadeInUpSmall'}>
          {formatMessage({ id: 'microorganism.paragraph.content' })}
        </p>
        <p
          className={
            styles.paragraph + ' wow animate__fadeInUpSmall anidelay-1'
          }
        >
          {formatMessage({ id: 'microorganism.paragraph.qitan' })}
        </p>
      </div>
      <div>
        {data.map((item, index) => {
          return <ImgTextLR data={item} index={index} />;
        })}
      </div>
      <div
        className={styles.box}
        style={{ backgroundImage: 'url(' + newBg + ')' }}
      >
        <Title name="application.new" />
        <p className={styles.paragraph + ' wow animate__fadeInUpSmall ani-2'}>
          {formatMessage({ id: 'microorganism.new.content' })}
        </p>
      </div>
    </>
  );
}
