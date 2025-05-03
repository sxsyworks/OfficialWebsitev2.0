import { FormattedMessage } from 'umi';
import styles from './index.less';

export default function ContactWays() {
  const Contact = ['hotLine', 'email'];
  const ContactInfo = ['title', 'subtitle', 'description'];

  return (
    <>
      <div className={styles.contact}>
        {Contact.map((item) => {
          return (
            <div className={styles.type} style={{ backgroundImage: 'url(/' + item + '.png)' }}>
              {ContactInfo.map((info) => (
                <p className={styles[info]}>
                  <FormattedMessage id={`customer.${item}.${info}`} defaultMessage={' '} />
                </p>
              ))}
              <p className={styles.method}>{item === 'hotLine' ? '+86-400-800-2038' : 'support@qitantech.com'}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
