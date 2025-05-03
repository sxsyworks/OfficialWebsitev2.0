import styles from '../index.less';
import ImgTextLR from '@/components/ImgTextLR';
import { useIntl } from 'umi';
export default function Animal() {
  const { formatMessage } = useIntl();
  const data = [
    {
      name: 'animal.assemble',
      src: require('@/assets/imgs/keyApplications/animal-assemble.png'),
    },
    {
      name: 'animal.sequence',
      src: require('@/assets/imgs/keyApplications/animal-sequence.png'),
    },
    {
      name: 'animal.transcriptome',
      src: require('@/assets/imgs/keyApplications/animal-transcriptome.png'),
    },
  ];
  return (
    <>
      <div className={styles.box}>
        <p className={styles.paragraph + ' wow animate__fadeInUpSmall'}>
          {formatMessage({ id: 'animal.paragraph.content' })}
        </p>
        <p
          className={
            styles.paragraph + ' wow animate__fadeInUpSmall anidelay-1'
          }
        >
          {formatMessage({ id: 'animal.paragraph.qitan' })}
        </p>
      </div>
      <div>
        {data.map((item, index) => {
          return <ImgTextLR data={item} index={index} key={item.name} />;
        })}
      </div>
    </>
  );
}
