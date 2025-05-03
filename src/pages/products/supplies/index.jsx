import Swiper from '@/assets/swiper';
import '@/assets/swiper/index.css';
import Title from '@/components/Title';
import { getManualByProducts } from '@/services/api';
import { download, useWow } from '@/utils/common';
import { useEffect, useMemo, useState } from 'react';
import { useIntl, useModel } from 'umi';
import styles from './index.less';

export default function Supplies() {
  const { formatMessage, locale } = useIntl();
  const { initialState } = useModel('@@initialState');
  const { isPhone } = initialState;
  const [current, setCurrent] = useState(0);
  const [myswiper, setMyswiper] = useState();
  const arrow = require('@/assets/icons/arrow-up.gif');
  const imgData = [
    require('../../../assets/imgs/supply/supply5.png'),
    require('../../../assets/imgs/supply/supply1.png'),
    require('../../../assets/imgs/supply/supply2.png'),
    require('../../../assets/imgs/supply/supply3.png'),
    require('../../../assets/imgs/supply/supply4.png'),
    require('../../../assets/imgs/supply/supply5.png'),
    require('../../../assets/imgs/supply/supply1.png'),
    require('../../../assets/imgs/supply/supply2.png'),
    require('../../../assets/imgs/supply/supply3.png'),
    require('../../../assets/imgs/supply/supply4.png'),
  ];

  const data = [
    {
      name: 'qspBox',
      table: ['title', 'version', 'requirement', 'time', 'cell'],
    },
    {
      name: 'sequenceBox',
      table: ['title', 'version', 'requirement', 'time', 'cell'],
      fileName: '测序试剂盒QDS使用说明书.pdf',
      src: '/file/docs/Sequencing_kit_QSK-V1.1.1_Instructions.pdf',
      product: 'QDS',
    },
    {
      name: 'dataBasBox',
      // table: ['title', 'version', 'requirement', 'time', 'hasPCR', 'cell'],
      table: ['title', 'version', 'requirement', 'time', 'cell'],
      fileName: '建库试剂盒QDL-E使用说明书.pdf',
      src: '/file/docs/Instruction_Manual_for_database_kit_QLK-V1.1.1.pdf',
      product: 'QDL-E',
    },
    {
      name: 'cell',
      table: ['type', 'flux', 'sequenceTime', 'runtime'],
    },
    {
      name: 'qdrBox',
      // table: ['title', 'version', 'requirement', 'time', 'hasPCR', 'cell'],
      table: ['title', 'version', 'requirement', 'time', 'cell'],
      product: 'QDR',
    },
  ];

  const getRightsTable = (data, name) => {
    return data.map((item) => {
      return (
        <div key={item} className={styles.tableCol + ' wow animate__fadeInUpSmall'}>
          <div className={styles.name}>{formatMessage({ id: 'supply.table.' + item })}</div>
          <div dangerouslySetInnerHTML={{ __html: formatMessage({ id: 'supply.' + name + '.' + item }) }}></div>
        </div>
      );
    });
  };

  const changeSlider = (swiper) => {
    setCurrent(swiper.realIndex);
  };
  const getDocument = (product) => {
    getManualByProducts({ products: product }).then((res) => {
      if (!res.code && res.data.length) {
        download(res.data?.[0]?.url);
      }
    });
  };

  const currentComs = useMemo(() => {
    let len = imgData.length / 2;
    let cur = current >= len ? current - len : current;
    let { name, product, table } = data[cur];
    return (
      <>
        <Title name={'supply.' + name} />
        <div className={styles.currentData}>
          <div className={styles.leftBox}>
            <p className="wow animate__fadeInUpSmall">{formatMessage({ id: `supply.${name}.content` })}</p>
            <div className={styles.principle + ' wow animate__fadeInUpSmall anidelay-1'}>
              <h2 className={styles.subtitle}>{formatMessage({ id: `supply.pubilc.principle` })}</h2>
              {formatMessage({ id: `supply.${name}.principle` })}
            </div>
            {product && locale === 'zh-CN' ? (
              <div className={styles.instruction + ' wow animate__fadeInUpSmall anidelay-2'}>
                <div className={styles.btn} onClick={() => getDocument(product)}>
                  {formatMessage({ id: 'btn.downloadDocument' })}
                </div>
              </div>
            ) : null}
          </div>
          <div className={styles.rightBox}>
            <h2 className={styles.subtitle + ' wow animate__fadeInUpSmall'}>
              {formatMessage({ id: `supply.pubilc.performance` })}
            </h2>
            {getRightsTable(table, name)}
          </div>
        </div>
      </>
    );
  }, [current]);

  useEffect(() => {
    var mySwiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      loop: true,
      slidesPerView: isPhone ? 1 : 3,
      initialSlide: 0,
      paginationClickable: true,
      onSlideChangeStart: changeSlider,
      centeredSlides: true,
      paginationElement: 'div',
      prevButton: '.swiper-button-prev',
      nextButton: '.swiper-button-next',
    });
    setMyswiper(mySwiper);
  }, []);
  useWow();
  return (
    <div className={styles.supplies}>
      <div className={styles.top}>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {imgData.map((item, index) => {
              return (
                <div className="swiper-slide" key={index}>
                  <div className="item " key={index}>
                    <img src={item} className="img" alt="product" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.preArr + ' swiper-button-prev'}>
          <img src={arrow} alt="pre arrow" />
        </div>
        <div className={styles.nextArr + ' swiper-button-next'}>
          <img src={arrow} alt="next arrow" />
        </div>
      </div>
      <div className={styles.currentComs}>{currentComs}</div>
    </div>
  );
}
