import Title from '@/components/Title';
import { useWow } from '@/utils/common';
import { useIntl } from 'umi';
import styles from './index.less';

export default function Software() {
  const { formatMessage } = useIntl();
  useWow();
  // TODO
  const works = [
    require('@/assets/imgs/software/step4.png'),
    require('@/assets/imgs/software/step2.png'),
    require('@/assets/imgs/software/step3.png'),
    require('@/assets/imgs/software/icon1.png'),
  ];
  const imgs = [
    require('@/assets/imgs/software/software1.png'),
    require('@/assets/imgs/software/software2.png'),
    require('@/assets/imgs/software/software3.png'),
  ];
  const bg = {
    sequenceMode: require('@/assets/imgs/software/sequenceBg.png'),
    offline: require('@/assets/imgs/software/offlineBg.png'),
  };
  const workflowImg = require('@/assets/imgs/software/workFlow.png');
  const arrow = require('@/assets/icons/arrow-up.gif');
  const steps = ['extract', 'basecall', 'analyze'];

  // WORKFLOW STEPS
  const WorkflowSteps = (
    <div className={styles.workflow}>
      <Title name="software.workflow" />
      <img src={workflowImg} className={styles.img + ' wow animate__fadeInUpSmall '} alt="workflow"></img>
      <div className={styles.steps}>
        {steps.map((item, index) => {
          return (
            <>
              <div key={index} className={styles.stepItem + ' wow animate__fadeInUpSmall'}>
                <div className={styles.title}>{formatMessage({ id: 'software.workflow.' + item })}</div>
                <div className={styles.content}>
                  {formatMessage({
                    id: 'software.workflow.' + item + 'Value',
                  })}
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div className={styles.arrImg}>
                  <img src={arrow} className={styles.img} alt="arrow" />
                </div>
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );

  // MODES
  const Modes = ['sequenceMode', 'offline'].map((item) => (
    <div
      className={styles.mode + ' ' + styles[item] + ' wow animate__fadeInUpSmall'}
      style={{ backgroundImage: 'url(' + bg[item] + ')' }}
    >
      <Title name={`software.${item}`} />
      <div className={styles.content}>
        <p>{formatMessage({ id: `software.${item}.content` })}</p>
        <div className={styles.imgsBox}>
          {['left', 'right'].map((it) => (
            <div className={styles.modeItem}>
              <div className={styles.iconBox}>
                <i className={styles[it]}></i>
              </div>
              <h6 className={styles.title}>{formatMessage({ id: `software.${item}.${it}.title` })}</h6>
              <div className={styles.modeContent}>{formatMessage({ id: `software.${item}.${it}.text` })}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles[formatMessage({ id: 'page.css.page' })]}>
      <div className={styles.top}>
        <div className={styles.paragraph}>
          <Title name="software" />
          <p className="wow animate__fadeInUpSmall anidelay-1">{formatMessage({ id: 'software.desc1' })} </p>
          <p className="wow animate__fadeInUpSmall anidelay-1">{formatMessage({ id: 'software.desc2' })}</p>
        </div>
        <img
          src={require('../../../assets/imgs/software/channel.png')}
          className={styles.img + ' wow animate__fadeInUpSmall'}
          alt="channel"
        ></img>
      </div>
      <div className={styles.works}>
        <div className={styles.content}>
          <div className={styles.imgs}>
            {imgs.map((item, index) => {
              return (
                <img src={item} key={index} className={styles.img + ' wow animate__fadeInUpSmall '} alt="chart"></img>
              );
            })}
          </div>
        </div>
      </div>
      {WorkflowSteps}
      {Modes}
    </div>
  );
}
