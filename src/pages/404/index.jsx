import ContactWays from '@/components/ContactWays';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import { useIntl } from 'umi';
import styles from './index.less';
export default function NotFoundPage() {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.notFound}>
      <Menu />
      <Header name="404" bg="/404.png" />
      <div className={styles.top}>
        <img src={require('./404.png')} className={styles.img} alt="error page" />
        {formatMessage({ id: 'page.404.error' })}
        <br />
        {formatMessage({ id: 'page.404.error1' })}
      </div>
      <ContactWays />
    </div>
  );
}
