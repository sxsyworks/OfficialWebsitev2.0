import Success from '@/assets/icons/success.png';
import Warning from '@/assets/icons/warning.png';
import { contactUs, subscribeNewsletter } from '@/services/api';
import { SubMessage } from '@/utils/constant';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import { getLocale, useIntl } from 'umi';
import styles from './index.less';

const ContactForm = (props) => {
  const { isLine } = props;
  const { formatMessage } = useIntl();
  const locale = getLocale();
  const [curSubMessage, setCurSubMessage] = useState(SubMessage);
  const [remindMsg, setRemindMsg] = useState('');
  const [remindNewsMsg, setRemindNewsMsg] = useState('');
  const [timer, setTimer] = useState(null);
  const [newsletter, setNewsletter] = useState({ name: '', email: '' });
  const [contact, setContact] = useState({
    name: '',
    company: '',
    telephone: '',
    post: '',
    email: '',
    province: '',
    content: '',
  });

  // 联系我们要根据中英文渲染不同的列表
  const contactList = useMemo(() => {
    const list = curSubMessage?.contact;
    const isEn = locale === 'en-US';
    return list.filter((item) => item.isEn === undefined || item.isEn === isEn);
  }, [locale, curSubMessage]);

  const Map = {
    newsletter: {
      value: newsletter,
      setFn: setNewsletter,
      requestFn: subscribeNewsletter,
      setMsgFn: setRemindNewsMsg,
      fileds: _.cloneDeep(curSubMessage.newsletter),
    },
    contact: {
      value: contact,
      setFn: setContact,
      requestFn: contactUs,
      setMsgFn: setRemindMsg,
      fileds: contactList,
    },
  };

  const handleChange = (e, key, form) => {
    const val = e.target.value;
    const { setFn, value } = Map[form];
    setFn({ ...value, [key]: val });
  };

  // 格式验证
  const validate = (form) => {
    const { value, fileds } = Map[form];
    // let fileds = SubMessage[form];
    // fileds = _.cloneDeep(fileds);
    let errorMsg = '';
    fileds.map((item) => {
      let { key, reg = null } = item;
      let val = value[key] || '';
      if (reg && !reg.test(val)) {
        errorMsg = '未校验通过';
        return (item.validate = true);
      } else {
        return (item.validate = false);
      }
    });
    setCurSubMessage(
      Object.assign({}, curSubMessage, {
        [form]: [...fileds],
      }),
    );
    return { success: !errorMsg, errorMsg };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target.name;
    const { success, errorMsg } = validate(form);
    const { requestFn, value, setMsgFn, setFn } = Map[form];
    if (success) {
      if (timer) {
        const tip = formatMessage({ id: 'contact.form.notRepeatTip' });
        form === 'newsletter' ? setRemindNewsMsg(tip) : setRemindMsg(tip);
        setTimeout(() => {
          setMsgFn('');
        }, 5000);
        return;
      }
      requestFn(value).then((res) => {
        let tempValue = { ...value };
        for (let key in tempValue) {
          tempValue[key] = '';
        }
        setTimer(
          setTimeout(() => {
            if (!res.code) setFn(tempValue);
            setTimer(null);
            setMsgFn('');
          }, 5000),
        );
        if (!res.code) {
          form === 'newsletter'
            ? setRemindNewsMsg(formatMessage({ id: 'contact.form.successNewsletterTip' }))
            : setRemindMsg(formatMessage({ id: 'contact.form.successContactTip' }));
        } else {
          setMsgFn(res.msg);
        }
      });
    } else {
      setMsgFn('');
    }
  };

  return (
    <div className={isLine ? styles.formLine : styles.form}>
      <form name="contact" className={styles.section} onSubmit={handleSubmit}>
        <h6 className={styles.title}>{formatMessage({ id: 'contact.title.contactUs' })}</h6>
        <div className={styles.items}>
          {contactList?.map((item) => {
            let { key, newline, require } = item;
            return (
              <div className={`${styles.singleItem} ${newline ? styles.itemSpecial : ''}`} key={key}>
                <label className={`${styles.item} ${newline ? styles.itemSpecial : ''}`}>
                  <span>
                    {formatMessage({ id: `contact.form.${key}` })}
                    {require ? '*' : ''}
                  </span>
                  {newline ? (
                    <textarea value={contact[key]} onChange={(e) => handleChange(e, key, 'contact')}></textarea>
                  ) : (
                    <input type="text" value={contact[key]} onChange={(e) => handleChange(e, key, 'contact')} />
                  )}
                </label>
                <span className={`${item.validate ? styles.valiMsg : styles.hiddenMsg}`}>
                  {formatMessage({ id: `contact.form.${key}Tip` })}
                </span>
              </div>
            );
          })}
        </div>
        <div className={styles.btnWrapper}>
          <div className={styles.btnAreaMsg}>
            {remindMsg ? (
              <img
                src={remindMsg.includes(formatMessage({ id: 'contact.form.successTip' })) ? Success : Warning}
                alt="提示"
              />
            ) : null}
            {remindMsg}
          </div>
          <input type="submit" value={formatMessage({ id: 'contact.form.send' })} className={styles.btn} />
        </div>
      </form>
      {!isLine ? (
        <form name="newsletter" onSubmit={handleSubmit} className={styles.section}>
          <h6 className={styles.title}>{formatMessage({ id: 'contact.title.newsletter' })}</h6>
          <div className={styles.items}>
            {curSubMessage?.newsletter?.map((item) => {
              let { key, reg } = item;
              return (
                <div className={`${styles.singleItem} ${styles.newsItem}`} key={key}>
                  <label className={styles.item}>
                    <span>
                      {formatMessage({ id: `contact.form.${key}` })}
                      {reg ? '*' : ''}
                    </span>
                    <input type="text" value={newsletter[key]} onChange={(e) => handleChange(e, key, 'newsletter')} />
                  </label>
                  <span className={`${item.validate ? styles.valiMsg : styles.hiddenMsg}`}>
                    {formatMessage({ id: `contact.form.${key}Tip` })}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={styles.btnWrapper}>
            <div className={styles.btnAreaMsg}>
              {remindNewsMsg ? <img src={remindNewsMsg.includes('成功') ? Success : Warning} alt="提示" /> : null}
              {remindNewsMsg}
            </div>
            <input type="submit" value={formatMessage({ id: 'contact.form.confirm' })} className={styles.btn} />
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default ContactForm;
