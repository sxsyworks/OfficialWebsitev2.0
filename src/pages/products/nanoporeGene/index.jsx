import Title from '@/components/Title';
import VideoPlyer from '@/components/VideoPlayerBanner';
import { useWow } from '@/utils/common';
import { OssBaseUrl } from '@/utils/constant';
import isIE from '@/utils/isIE';
import { useMemo } from 'react';
import { useIntl, useModel } from 'umi';
import styles from './index.less';

export default function NanoporeGene() {
  const { formatMessage, locale } = useIntl();
  const { initialState } = useModel('@@initialState');
  const { isPhone } = initialState;
  const ie = isIE(); // TODO
  const keyImg = [
    require('../../../assets/imgs/software/step1.png'),
    require('../../../assets/imgs/software/step2.png'),
    require('../../../assets/imgs/software/step3.png'),
    require('../../../assets/imgs/software/step4.png'),
  ];

  useWow();

  // 获取技术优势列表
  const advantage = useMemo(() => {
    let advan = [];
    for (let i = 0; i < 4; i++) {
      advan.push(
        <div className={styles.advItem + ' wow animate__fadeInUp ani'} key={i} data-wow-delay={(i + 1) * 400 + 'ms'}>
          <div className={styles.icon} style={{ backgroundImage: 'url(' + keyImg[i] + ')' }}></div>
          <span
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: formatMessage({ id: 'nanoporeGene.key.adv' + (i + 1) }) }}
          ></span>
          <div className={styles.advCon}>{formatMessage({ id: 'nanoporeGene.key.adv' + (i + 1) + 'Value' })}</div>
        </div>,
      );
    }
    return advan;
  }, [locale]);

  // 渲染表格数据
  const renderTableData = () => {
    return new Array(6).fill(1).map((item, idx) => {
      return (
        <div className={styles.row} key={idx}>
          <div className={styles.title}>
            <p>{formatMessage({ id: 'nanoporeGene.compare.nano' + idx })}</p>
            <p>{formatMessage({ id: 'nanoporeGene.compare.t' + idx })}</p>
          </div>
          {idx !== 0 ? (
            <div className={styles.text}>
              <p>{formatMessage({ id: 'nanoporeGene.compare.value.nano' + idx })}</p>
              <p>{formatMessage({ id: 'nanoporeGene.compare.value.t' + idx })}</p>
            </div>
          ) : null}
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles.nanoporeGene}>
        <Title name="nanoporeGene.method" />
        <div className={styles.content + ' wow animate__fadeInUp ani'}>
          {formatMessage({ id: 'nanoporeGene.method.content' })}
        </div>
      </div>
      <div className={styles.videoBox}>
        {!isPhone ? (
          <VideoPlyer urls={[`${OssBaseUrl}${formatMessage({ id: 'nanoporeGene.url.video' })}.mp4`]} />
        ) : (
          // TODO 手机端适配不同大小的图片
          <img src={`${OssBaseUrl}${formatMessage({ id: 'nanoporeGene.url.img' })}`} alt="gene animate" />
        )}
      </div>

      <div className={styles.key}>
        <Title name="nanoporeGene.key" />
        <div className={styles.content}>{advantage}</div>
      </div>

      <div className={styles.compare}>
        <Title name="nanoporeGene.compare" />
        <div className={styles.table}>{renderTableData()}</div>
      </div>
    </>
  );
}
