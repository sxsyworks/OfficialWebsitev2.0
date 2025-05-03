import { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import TurnTable from './TurnTable';
const Areas = ['medical', 'non-medical'];

const Application = () => {
  const { formatMessage } = useIntl();
  const [area, setArea] = useState(Areas[0]); // area：'medical'| 'non-medical'
  const [kind, setKind] = useState(1); // 1-8 | 1-6

  // 切换当前领域
  const changeArea = (key) => {
    if (key === area) return;
    setArea(key);
    setKind(1);
  };

  // 切换当前种类
  const changekind = (key) => {
    setKind(key + 1);
  };

  const getBg = () => {
    const num = area === 'medical' ? 8 : 6;
    const arr = new Array(num).fill('a');
    return (
      <ul className={`${styles.bgWrapper}`}>
        {arr.map((element, idx) => {
          let styleName = area + '-' + (idx + 1);
          return (
            <li key={idx} className={`${styles.bg} ${styles[styleName]} ${kind === idx + 1 ? styles.active : ''}`}></li>
          );
        })}
        {area === 'medical' ? <li className={`${styles.bgHidden} ${styles['non-medical-1']}`}></li> : null}
      </ul>
    );
  };

  return (
    <div className={`${styles.application} ${styles[formatMessage({ id: 'page.css.page' })]}`}>
      {getBg()}
      <div className={styles.content}>
        <hgroup className={styles.title}>
          <h3>{formatMessage({ id: 'home.application.title' })}</h3>
          <h4>APPLICATION FIELDS</h4>
        </hgroup>
        <TurnTable area={area} changekind={changekind} />
        <ul className={styles.area}>
          {Areas.map((key) => (
            <li key={key} className={key === area ? styles.active : ''} onClick={() => changeArea(key)}>
              {formatMessage({ id: `home.application.filed.${key}` })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Application;
