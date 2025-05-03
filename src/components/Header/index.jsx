import { OssBaseUrl } from '@/utils/constant';
import { useMemo } from 'react';
import { FormattedMessage, useIntl, useLocation, useModel } from 'umi';
import styles from './index.less';
export default function Header(props) {
  const location = useLocation();
  const { initialState } = useModel('@@initialState');
  const { formatMessage } = useIntl();
  const { isPhone } = initialState;
  const bgName = isPhone ? props.bg?.replace('/', '/m-') : props.bg;
  const bgUrl = `url(${OssBaseUrl}/static/page/bgs${bgName})`;

  const PathDom = useMemo(() => {
    let name = location.pathname.split('/');
    return name.map((item, index) => {
      return (
        <div key={item} className={styles.breadItem}>
          <FormattedMessage id={'menu.' + (item || 'index')} />
        </div>
      );
    });
  }, [location]);

  return (
    <div
      className={`${styles.header} ${isPhone ? styles.mobileHeader : ''} + ' wow ani'`}
      style={{ backgroundImage: bgUrl }}
    >
      <div className={styles[formatMessage({ id: 'page.css.bgTitle' })] + ' wow animate__fadeInUp ani'}>
        <div className={styles.title}>
          <FormattedMessage id={'page.' + props.name + '.title'} />
        </div>
        <div className={styles.subTitle}>
          <FormattedMessage id={'page.' + props.name + '.subtitle'} />
        </div>
        <div className={styles.border}></div>
        <div className={styles.bread}>{PathDom}</div>
      </div>
    </div>
  );
}
