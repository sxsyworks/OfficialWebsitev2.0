import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import ContactTable from '@/components/ContactTable';
import Title from '@/components/Title';
import { useWow } from '@/utils/common';
import { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

const ContactTableList = [
  { area: '省份', people: '联系人', tel: '电话', address: '地址' },
  {
    area: '北京',
    people: '黄聪聪',
    tel: '18333261609',
    address: '北京市海淀区西小口路66号中关村东升科技园-北领地A-5楼3层301',
  },
  {
    area: '江苏',
    people: '王炎',
    tel: '18201326283',
    address: '江苏省南京市江北新区研创园雨合路33号光电科技园C栋803室',
  },
  {
    area: '四川',
    people: '汪明庆',
    tel: '15928839553',
    address: '四川省成都市武侯区人民南路四段3号成都来福士广场办公楼T2-2004',
  },
  {
    area: '广州',
    people: '申东航',
    tel: '18520765792',
    address: '广州市黄埔区广州国际生物岛寰宇二路10号标准产业单元四期配套项目B栋第8层',
  },
  {
    area: '海南',
    people: '林中根',
    tel: '13421377060',
    address: '海南省海口市美兰区海甸四东路一号寰岛大厦霞飞阁第四层4F层',
  },
];

export default function Sequencer() {
  const { formatMessage } = useIntl();
  const [current, setCurrent] = useState('3841');
  const devices = ['3841', '3841hex'];
  const FeatureImg = [
    require('@/assets/imgs/sequencer/fearture1.png'),
    require('@/assets/imgs/sequencer/fearture2.png'),
    require('@/assets/imgs/sequencer/fearture3.png'),
    require('@/assets/imgs/sequencer/fearture4.png'),
    require('@/assets/imgs/sequencer/fearture5.png'),
    require('@/assets/imgs/sequencer/fearture6.png'),
  ];
  const data = {
    设备产地: ['中国，具有中国国内自主知识产权', '中国，具有中国国内自主知识产权'],
    主要功能: [
      '利用纳米孔测序技术，根据电流信号变化实现对人类基因组、动植物基因组、微生物基因组等样本的DNA或cDNA分子的高通量单分子实时测序',
      '利用纳米孔测序技术，根据电流信号变化实现对人类基因组、动植物基因组、微生物基因组等样本的DNA或cDNA分子的高通量单分子实时测序',
    ],
    原理: [
      '采用纳米孔链测序法，无复杂的激光或光路系统，插电即可进行测序',
      '采用纳米孔链测序法，无复杂的激光或光路系统，插电即可进行测序',
    ],
    重量: ['0.8kg', '10kg'],
    起始核酸样本量: ['0.5ng-5μg', '10pg-5μg'],
    文库制备时间: ['建库时间为1.5-2小时<br />快速建库时间为0.5小时', '建库时间为1.5-2小时<br />快速建库时间为10min'],
    获取序列时间: ['测序运行3min左右即可生成核酸序列数据', '测序运行2min左右即可生成核酸序列数据'],
    是否需要PCR: [
      '单分子测序，直接测序，测序过程中无需PCR扩增，DNA平均测序速度≥300bp/s',
      '支持DNA和RNA直接测序、碱基修饰测序等，无需PCR扩增，免除PCR扩增带来的错误和GC偏差',
    ],
    读长长度: ['最长读长＞100kb（读长为核酸片段长度）', '读长：最低200bp，最高≥2Mb'],
    碱基测序质量: [
      '单序列≥97% <br/> 一致性准确率可达99.999%',
      '碱基测序质量(正确率) ≥99% <br/> 一致性准确率可达99.999%',
    ],
    测序芯片: ['独立测序芯片，实验模块1个', '模块化设计，独立测序芯片，实验模块6个'],
    单张芯片理论数据: ['5G', '单张芯片理论数据产出5G测序数据量，6模块单次运行理论最大产出30G测序数据量'],
    是否联网: [
      '无需联网即可完成全整个测序及分析流程，保障数据安全',
      '无需联网即可完成全整个测序及分析流程，保障数据安全',
    ],
  };

  useWow([], '#bidding');

  const getComponents = () => {
    let coms = [];
    Object.getOwnPropertyNames(data).forEach((item) => {
      if (data[item].length) {
        coms.push(
          <div className={styles.compareItems + ' wow animate__fadeInUp ani'} key={item}>
            <div className={styles.name}>{item}</div>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: data[item][0] }}></div>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: data[item][1] }}></div>
          </div>,
        );
      } else {
        coms.push(
          <div key={item}>
            <div className={styles.subtitle}>{item}</div>
            <div>{getComponents(data[item])}</div>
          </div>,
        );
      }
    });
    return coms;
  };

  return (
    <div id="bidding" className={styles.bidding}>
      <div>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </header>
        <div className={styles.devices} id="sequencer">
          {devices.map((item, index) => {
            return (
              <div
                className={
                  styles.device + (current === item ? ' ' + styles.current : '') + ' wow animate__fadeIn ani-3'
                }
                key={item}
                onMouseOver={() => setCurrent(item)}
              >
                <h2 className={styles.title}>QNome-{item}</h2>
                <div className={styles.subtitle}>{formatMessage({ id: 'sequencer.' + item + '.subtitle' })}</div>
                <div className={styles.img}>
                  <img
                    src={require(`@/assets/imgs/sequencer/${item}-${item === current ? 'open.gif' : 'close.png'}`)}
                    alt="sequencer device"
                  />
                </div>
                <div className={styles.adv}>{formatMessage({ id: 'sequencer.' + item + '.adv1' })}</div>
                <div className={styles.adv}>{formatMessage({ id: 'sequencer.' + item + '.adv2' })}</div>
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
          <div className={styles.contents}>
            <div className={styles.compareTitle + ' wow animate__fadeIn ani-3'}>
              <div className={styles.title}></div>
              <div className={styles.title}>QNome-3841</div>
              <div className={styles.title}>QNome-3841hex</div>
            </div>
            <div className={styles.compareContent}>{getComponents()}</div>
          </div>
        </div>
        <div className={styles.contacts}>
          <ContactTable tableList={ContactTableList} />
        </div>
      </div>
    </div>
  );
}
