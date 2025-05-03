import styles from '../index.less';
import ImgTextLR from '@/components/ImgTextLR';
import Title from '@/components/Title';
import { useIntl } from 'umi';
import CaseTemplate from '@/components/CaseTemp';
export default function Human() {
  const { formatMessage } = useIntl();
  const data = [
    {
      name: 'human.snp',
      src: require('@/assets/imgs/keyApplications/human-snp.png'),
      btn: 'case',
      id: 'snpCase',
      cases: ['https://mp.weixin.qq.com/s/0RqAvHzSmFewuhQ9x1QcuA'],
    },
    {
      name: 'human.structure',
      src: require('@/assets/imgs/keyApplications/human-structure.png'),
    },
    {
      name: 'human.type',
      src: require('@/assets/imgs/keyApplications/human-type.png'),
    },
    {
      name: 'human.transcriptome',
      src: require('@/assets/imgs/keyApplications/human-transcriptome.png'),
    },
  ];
  const newBg = require('@/assets/imgs/keyApplications/human-bg2.png');
  return (
    <>
      <div className={styles.box}>
        <p className={styles.paragraph + ' wow animate__fadeInUpSmall'}>
          {formatMessage({ id: 'human.paragraph.content' })}
        </p>
        <p
          className={
            styles.paragraph + ' wow animate__fadeInUpSmall anidelay-1'
          }
        >
          {formatMessage({ id: 'human.paragraph.qitan' })}
        </p>
      </div>
      <div>
        {data.map((item, index) => {
          return (
            <>
              <ImgTextLR data={item} index={index} />
              {item.btn ? (
                <CaseTemplate data={item.cases} id={item.id} />
              ) : null}
            </>
          );
        })}
      </div>
      <div
        className={styles.box}
        style={{ backgroundImage: 'url(' + newBg + ')' }}
      >
        <Title name="application.new" />
        <p
          className={
            styles.paragraph + ' wow animate__fadeInUpSmall anidelay-2'
          }
        >
          {formatMessage({ id: 'human.new.content' })}
        </p>
      </div>
    </>
  );
}
