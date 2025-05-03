import { useIntl } from 'umi';
import styles from './index.less';
const Intro = () => {
  const { formatMessage } = useIntl();
  return (
    <div className={`${styles.intro} ${styles[formatMessage({ id: 'page.css.page' })]}`}>
      <div className={styles.video}>
        <img width="100%" src="https://webjpg.qitantech.com/static/page/animations/perforation.gif" alt="" />
      </div>
      <div className={styles.text}>
        <div className={styles.title}>{formatMessage({ id: 'home.intro.title' })}</div>
        <div className={styles.des}>{formatMessage({ id: 'home.intro.des' })}</div>
      </div>
    </div>
  );
};
export default Intro;
