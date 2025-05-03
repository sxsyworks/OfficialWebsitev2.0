import Title from '@/components/Title';
import { getManualByProducts } from '@/services/api';
import { download, useWow } from '@/utils/common';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

export default function Sequencer() {
  const { formatMessage, locale } = useIntl();
  const [current, setCurrent] = useState('3841');
  const [docs, setDocs] = useState([]);
  const devices = ['3841', '3841hex'];
  const prefix = 'sequencer.compare.';
  const FeatureImg = [
    require('@/assets/imgs/sequencer/fearture1.png'),
    require('@/assets/imgs/sequencer/fearture2.png'),
    require('@/assets/imgs/sequencer/fearture3.png'),
    require('@/assets/imgs/sequencer/fearture4.png'),
    require('@/assets/imgs/sequencer/fearture5.png'),
    require('@/assets/imgs/sequencer/fearture6.png'),
  ];

  const ComparisonData = {
    params: {
      principle: ['principleExp', 'principleExp'],
      aplicationType: ['applicationTypesExp', 'applicationTypesExp'],
      sampleType: ['sampleTypeExp', 'sampleTypeExp'],
      placeOfRegion: ['placeOfRegionExp', 'placeOfRegionExp'],
    },
    envRequire: {
      storageTemperature: ['storageTemperatureExp', 'storageTemperatureExp'],
      storageHumidity: ['storageHumidityExp', 'storageHumidityExp'],
      workTemperature: ['workTemperatureExp', 'workTemperatureExp'],
      workHumidity: ['workHumidityExp', 'workHumidityExp'],
      workPower: ['workPowerExp', 'workPowerExpHex'],
    },
    appearance: {
      flowcells: ['flowcellsExp', 'flowcellsExpHex'],
      volume: ['volumeExp', 'volumeExpHex'],
      weight: ['weightExp', 'weightExpHex'],
      structure: ['structureExp', 'structureExp'],
    },
    performance: {
      runNumber: ['runNumberExp', 'runNumberExpHex'],
      maximunNumberOfChannels: ['maximunNumberOfChannelsExp', 'maximunNumberOfChannelsExpHex'],
    },
  };

  // 获取产品说明书
  const getManual = async () => {
    getManualByProducts({ products: 'QNome-3841,QNome-3841hex' }).then((res) => {
      if (!res.code) {
        setDocs(res.data);
      }
    });
  };

  useEffect(() => {
    getManual();
  }, []);

  useWow();

  const getComponents = (data, index) => {
    let coms = [];
    Object.getOwnPropertyNames(data).forEach((item) => {
      if (data[item].length) {
        coms.push(
          <div
            className={styles.compareItems + ' wow animate__fadeInUp ani'}
            key={item}
            style={{ '-ms-grid-column': index }}
          >
            <div className={styles.name}>{formatMessage({ id: prefix + item })}</div>
            <div className={styles.text}>{formatMessage({ id: prefix + data[item][0] })}</div>
            <div className={styles.text}>{formatMessage({ id: prefix + data[item][1] })}</div>
          </div>,
        );
      } else {
        coms.push(
          <div key={item}>
            <div className={styles.subtitle}>{formatMessage({ id: prefix + item })}</div>
            <div>{getComponents(data[item])}</div>
          </div>,
        );
      }
    });
    return coms;
  };

  const compareCom = useMemo(() => {
    let com = [];
    Object.getOwnPropertyNames(ComparisonData).forEach((item, index) => {
      if (item === 'params') {
        com.push(
          <div key={item}>
            <div className={styles.compareTitle + ' wow animate__fadeIn ani-3'}>
              <div className={styles.title}></div>
              <div className={styles.title}>QNome-3841</div>
              <div className={styles.title}>QNome-3841hex</div>
            </div>
            <div className={styles.compareContent}>{getComponents(ComparisonData[item])}</div>
          </div>,
        );
      } else {
        com.push(
          <div key={item}>
            <div className={styles.title + ' wow animate__fadeInUp ani'}>{formatMessage({ id: prefix + item })}</div>
            <div className={styles.compareContent}>{getComponents(ComparisonData[item], index)}</div>
          </div>,
        );
      }
    });
    return com;
  }, [locale]);

  return (
    <div className={styles[formatMessage({ id: 'page.css.page' })]}>
      <div className={styles.devices} id="sequencer">
        {devices.map((item, index) => {
          return (
            <div
              className={styles.device + (current === item ? ' ' + styles.current : '') + ' wow animate__fadeIn ani-3'}
              key={item}
              onMouseOver={() => setCurrent(item)}
            >
              <h2 className={styles.title}>QNome-{item}</h2>
              <div className={styles.subtitle}>{formatMessage({ id: `sequencer.${item}.subtitle` })}</div>
              <div className={styles.img}>
                <img
                  src={require(`@/assets/imgs/sequencer/${item}-${item === current ? 'open.gif' : 'close.png'}`)}
                  alt="sequencer device"
                />
              </div>
              <div className={styles.adv}>{formatMessage({ id: `sequencer.${item}.adv1` })}</div>
              <div className={styles.adv}>{formatMessage({ id: `sequencer.${item}.adv2` })}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.feature}>
        <Title name="sequencer.feature" />
        <div className={styles.feaCon + ' wow animate__fadeInUpSmall'}>
          {FeatureImg.map((item, index) => {
            return (
              <div key={index} className={styles.feaItem}>
                <div className={styles.feaIcon} style={{ backgroundImage: 'url(' + item + ')' }}></div>
                <div className={styles.feaTitle}>{formatMessage({ id: 'sequencer.feature.' + (index + 1) })}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.compare}>
        <Title name="sequencer.compare" />
        <div className={styles.contents}>{compareCom}</div>
      </div>
      {locale === 'zh-CN' ? (
        <div className={styles.document}>
          <div className={styles.content}>
            <div>
              <div className={styles.devicesDoc + ' wow animate__fadeInLeftSmall ani anidelay-1'}>
                {docs.map((item) => (
                  <div className={styles.doc} key={item.name}>
                    <p>{item.product}</p>
                    <div className={styles.btn} onClick={() => download(item.url)}>
                      {formatMessage({ id: 'btn.downloadDocument' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
