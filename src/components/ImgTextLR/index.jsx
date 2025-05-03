import { useWow } from '@/utils/common';
import { FormattedMessage } from 'umi';
import styles from './index.less';

export default function ImgTextLR({ data = {}, index }) {
  useWow();

  const { name, src, cases } = data;
  return (
    <div className={styles.box + (index % 2 === 1 ? ' ' + styles.oddBox : '')}>
      <img src={src} className={styles.img + ' wow animate__fadeInUpSmall'} alt="case" />
      <div className={styles.content}>
        <div className={styles.title + ' wow animate__fadeInUpSmall'}>
          <FormattedMessage id={name + '.title'} />
          <div className={styles.subtitle}>
            <FormattedMessage id={name + '.subtitle'} />
          </div>
        </div>
        <div className={styles.text + ' wow animate__fadeInUpSmall'}>
          <FormattedMessage id={name + '.content'} />
        </div>
        <div className={styles.btnBox}>
          {cases
            ? cases.map((item, index) => {
                return (
                  <a key={item} target="_blank" rel="noopener" href={item}>
                    <div className={styles.btn + ' wow animate__fadeInUpSmall'}>
                      <FormattedMessage id={`btn.case${cases.length > 1 ? index + 1 : ''}`} />
                    </div>
                  </a>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
