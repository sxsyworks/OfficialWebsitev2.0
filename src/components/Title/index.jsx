import { FormattedMessage, useIntl } from 'umi';
import styles from './index.less';
export default function Title(props) {
  const intl = useIntl();
  const { style = {} } = props;
  const cssTitle = intl.formatMessage({ id: 'page.css.title' });
  return (
    <div id={props.name} className={styles[cssTitle] + ' wow animate__fadeInUp ani'} style={style}>
      <FormattedMessage id={props.name + '.title'} />
      <div className={styles.subTitle}>
        {intl
          .formatMessage({ id: props.name + '.subtitle' })
          .split(',')
          .map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
      </div>
    </div>
  );
}
