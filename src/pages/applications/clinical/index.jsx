import ImgTextLR from '@/components/ImgTextLR';
import { useIntl } from 'umi';
import styles from '../index.less';
export default function Clinical() {
  const { formatMessage } = useIntl();
  const data = [
    {
      name: 'clinical.hereditary',
      src: require('@/assets/imgs/keyApplications/clinical-hereditary.png'),
    },
    {
      name: 'clinical.tumour',
      src: require('@/assets/imgs/keyApplications/clinical-tumour.png'),
      cases: ['https://mp.weixin.qq.com/s/qK67scFnXOiNRAUizLo6rg'],
    },
    {
      name: 'clinical.infect',
      src: require('@/assets/imgs/keyApplications/clinical-infect.png'),
      cases: ['https://mp.weixin.qq.com/s/Qer8cOkb4KoZJ5MVuoNfyA'],
    },
  ];
  return (
    <>
      <div className={styles.box}>
        <p className={styles.paragraph + ' wow animate__fadeInUpSmall'}>
          {formatMessage({ id: 'clinical.paragraph.content' })}
        </p>
        <p className={styles.paragraph + ' wow animate__fadeInUpSmall anidelay-1'}>
          {formatMessage({ id: 'clinical.paragraph.qitan' })}
        </p>
      </div>
      <div>
        {data.map((item, index) => {
          return (
            <>
              <ImgTextLR data={item} index={index} />
              {/* {item.cases && <CaseTemplate data={item.cases} id={item.id} />} */}
            </>
          );
        })}
      </div>
    </>
  );
}
