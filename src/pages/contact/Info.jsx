import ContactForm from '@/components/ContactForm';
import { ContactEmails } from '@/utils/constant';
import { useIntl } from 'umi';
import styles from './index.less';

export default function ContactInfo(props) {
  const { formatMessage } = useIntl();

  const TelsList = [
    {
      key: 'north',
      persons: [
        { name: 'FujieGeng', tel: '+86-156 5235 2962' },
        { name: 'Fengzhang', tel: '+86-133 2117 5158' },
      ],
    },
    {
      key: 'east',
      persons: [
        { name: 'XiuyingZhang', tel: '+86-186 6014 3320' },
        { name: 'eastPerson2', tel: '+86-185 5161 1640' },
        { name: 'YuhuanLi', tel: '+86-187 7326 2378' },
      ],
    },
    {
      key: 'west',
      persons: [
        { name: 'JianLuo', tel: '+86-180 3046 1977' },
        { name: 'WenzhaoLiu', tel: '+86-186 9171 6511' },
      ],
    },
    {
      key: 'south',
      persons: [{ name: 'southPerson', tel: '+86-186 2009 4899' }],
    },
  ];

  return (
    <section className={`${styles.form} ${styles[formatMessage({ id: 'page.css.page' })]}`}>
      <div className={styles.emailsWrap}>
        <section>
          <h6 className={styles.title}>{formatMessage({ id: 'contact.title.email' })}</h6>
          <ul className={styles.emails}>
            {ContactEmails.map((item, idx) => (
              <li key={item.key} className={styles.email}>
                <i className={`${styles.icon} ${styles[`icon${idx + 1}`]}`}></i>
                <div className={styles.info}>
                  <h4 className={styles.name}>{formatMessage({ id: `contact.${item.key}` })}</h4>
                  <p className={styles.text}>{item.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* <section className={styles.persons}>
          <h6 className={styles.title}>{formatMessage({ id: 'contact.title.sales' })}</h6>
          <table>
            <tbody>
              {TelsList.map((item) => (
                <tr key={item.key} className={styles.text}>
                  <td>
                    <b>{formatMessage({ id: `contact.tel.area.${item.key}` })}</b>
                  </td>
                  <td>
                    <ul>
                      {item.persons.map((person) => (
                        <li key={person.name} className={styles.person}>
                          <span className={styles.name}>
                            {formatMessage({ id: `contact.tel.person.${person.name}` })}
                          </span>
                          &nbsp;&nbsp;
                          {person.tel}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section> */}
      </div>
      <div className={styles.formWrapper}>
        <ContactForm />
      </div>
    </section>
  );
}
