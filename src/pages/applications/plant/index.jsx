import styles from '../index.less';
import ImgTextLR from '@/components/ImgTextLR';
import { useIntl } from 'umi';
import CaseTemplate from '@/components/CaseTemp';
export default function plant() {
  const { formatMessage } = useIntl();
  const data = [
    {
      name: 'plant.assemble',
      src: require('@/assets/imgs/keyApplications/plant-assemble.png'),
      btn: 'case',
      id: 'plantAssemble',
      // cases: [''],
    },
    {
      name: 'plant.sequence',
      src: require('@/assets/imgs/keyApplications/plant-sequence.png'),
    },
    {
      name: 'plant.transcriptome',
      src: require('@/assets/imgs/keyApplications/plant-transcriptome.png'),
    },
  ];
  return (
    <>
      <div className={styles.box}>
        <p className={styles.paragraph + ' wow animate__fadeInUpSmall'}>
          {formatMessage({ id: 'plant.paragraph.content' })}
        </p>
        <p
          className={
            styles.paragraph + ' wow animate__fadeInUpSmall anidelay-1'
          }
        >
          {formatMessage({ id: 'plant.paragraph.qitan' })}
        </p>
      </div>
      <div>
        {data.map((item, index) => {
          return (
            <>
              <ImgTextLR data={item} index={index} />
              {item.cases && <CaseTemplate data={item.cases} id={item.id} />}
            </>
          );
        })}
      </div>
    </>
  );
}
