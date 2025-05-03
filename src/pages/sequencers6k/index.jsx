import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import Title from '@/components/Title';
import { useWow } from '@/utils/common';
import { useMemo, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

export default function Sequencer() {
  const { formatMessage } = useIntl();
  const [current, setCurrent] = useState('3841');
  const devices = ['3841'];
  const FeatureImg = [
    require('@/assets/imgs/sequencer/fearture1.png'),
    require('@/assets/imgs/sequencer/fearture2.png'),
    require('@/assets/imgs/sequencer/fearture3.png'),
    require('@/assets/imgs/sequencer/fearture4.png'),
    require('@/assets/imgs/sequencer/fearture5.png'),
    require('@/assets/imgs/sequencer/fearture6.png'),
  ];
  //  3841 & 3841hex
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
    起始核酸样本量: ['0.5ng-5μg', '0.5ng-5μg'],
    文库制备时间: ['建库时间为1.5-2小时<br />快速建库时间为0.5小时', '建库时间为1.5-2小时<br />快速建库时间为0.5小时'],
    获取序列时间: ['测序运行3min左右即可生成核酸序列数据', '测序运行3min左右即可生成核酸序列数据'],
    是否需要PCR: [
      '单分子测序，直接测序，测序过程中无需PCR扩增，DNA平均测序速度≥300bp/s',
      '单分子测序，直接测序，测序过程中无需PCR扩增，DNA平均测序速度≥300bp/s',
    ],
    读长长度: ['最长读长＞100kb（读长为核酸片段长度）', '最长读长＞100kb（读长为核酸片段长度）'],
    碱基测序质量: ['单序列≥97% <br/> 一致性准确率可达99.999%', '单序列≥97% <br/> 一致性准确率可达99.999%'],
    测序芯片: ['独立测序芯片，实验模块1个', '模块化设计，独立测序芯片，实验模块6个'],
    单张芯片理论数据: ['5G', '单张芯片理论数据产出5G测序数据量，6模块单次运行理论最大产出30G测序数据量'],
    是否联网: [
      '无需联网即可完成全整个测序及分析流程，保障数据安全',
      '无需联网即可完成全整个测序及分析流程，保障数据安全',
    ],
  };

  const conpareData = {
    产品参数: {
      原理: ['单分子纳米孔测序技术'],
      应用类型: ['转录组测序、表达谱分析、扩增子测序、拷贝数分析、甲基化、双端配对测序、全基因组测序等应用和研究'],
      样本类型: ['基因组DNA、 cDNA、RNA、扩增子/PCR产物等'],
      // 质保: ['3年免费'],
      产地: ['中国'],
    },
    环境要求: {
      存储温度: ['10°C ~ 30°C'],
      存储湿度: ['10% ~ 80%'],
      工作温度: ['10°C ~ 25°C'],
      工作湿度: ['35% ~ 85%，无凝结'],
      工作电源: ['DC12V，36W'],
    },
    仪器外观参数: {
      测序芯片: ['1个'],
      体积: ['150mm * 150mm * 66 mm'],
      重量: ['1.6kg'],
      // 芯片结构: ['集成电路和生物芯片一体'],
    },
    系统硬件参数: {
      系统: ['Ubuntu 22.04LTS'],
      内存: ['128GB RAM'],
      硬盘: ['2TB SSD+4TB SSD+16TB SATA'],
      GPU: ['NVIDIA GeForce RTX 4080'],
      CPU: ['Intel Core i7 或 AMD Ryzen 7'],
    },
    仪器性能: {
      测序通道数量: ['6144'],
      起始样品量: ['1ng-5μg'],
      测序样品上样量: ['200μL、20～60fmol'],
      测序速度: ['400-450bp/s'],
      运行时间: ['1min-72h(可控)'],
      芯片使用寿命: ['72h'],
      运行数: ['1个独立测序芯片实验'],
    },
    性能指标: {
      文库制备时间: ['10min-2h'],
      获取序列时间: ['实时，运行1min 即可获取核酸序列数据'],
      读长长度: ['200bp-2Mb'],
      理论数据产量: ['60Gb'],
      准确率: ['单序列97%以上，一致性序列99.99%以上'],
      可兼容开源分析工具: [
        '≥50种 <br/> 可完成原始电信号碱基读取(H5一FastQ)、数据质量控制(QC)、Barcode 拆分(Demultiplexing)、序列比对(Alignment)、基因组组装(Assembly)、宏基因组分析(Metagenomics)、扩增子分析(Amplicon)、测序错误校正(Error correc-tion)、变异分析(Variant calling)',
      ],
      性能介绍: [
        `1) 实时单分子纳米孔测序技术：借助单个分子通过纳米孔时引起孔两侧电位差来实现信号检测，纳米孔的直径仅允许单个核苷酸聚合物通过，而ATCG四种碱基的带电性质不同，因此通过电信号差异特征即可检测出通过纳米孔的碱基类型，从而实现测序。<br/>
         2) 单分子测序：DNA直接测序，无需PCR扩增，免除PCR扩增带来的错误和GC偏差，DNA测序速度为400-450bp/s，快速、实时。<br/>
         3) 读长长：读长为核酸片段长度，读长范围为200bp-2Mb。<br/>
         4) 数据量：理论产生60Gb数据。<br/>
         5) 配套设备：仪器配套为高性能计算机，可用于数据获取，原始数据存储以及碱基识别(basecalling)。<br/>
         6) 安装简便：没有复杂的激光或光路系统，插电即可使用，无需日常维护。<br/>
         7) 产生数据快速：提供最先进的单分子实时测序，上机测序后实时产生碱基序列数据。并可以根据实验需求设置测序时间，可选范围在几分钟到72小时之间。<br/>
         8）测序及分析过程可独立运行，无需联网启动，保证数据安全。`,
      ],
    },
  };

  useWow([], '#bidding');

  // TODO 配合data
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

  const getComponentsByGroup = (data, index) => {
    let coms = [];
    Object.getOwnPropertyNames(data).forEach((item) => {
      if (data[item].length) {
        coms.push(
          <div className={styles.compareItems + ' wow animate__fadeInUp ani'} key={item}>
            <div className={styles.name}>{item}</div>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: data[item][0] }}></div>
          </div>,
        );
      } else {
        coms.push(
          <div key={item}>
            <div className={styles.subtitle}>{item}</div>
            <div>{getComponentsByGroup(data[item])}</div>
          </div>,
        );
      }
    });
    return coms;
  };

  const compareCom = useMemo(() => {
    let com = [];
    Object.getOwnPropertyNames(conpareData).forEach((item, index) => {
      com.push(
        <div key={item}>
          <div className={styles.title + ' wow animate__fadeInUp ani'}>{item}</div>
          <div className={styles.compareContent}>{getComponentsByGroup(conpareData[item], index)}</div>
        </div>,
      );
    });
    return com;
  }, []);

  return (
    <div id="bidding" className={styles.bidding}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
      </header>
      <div className={styles.devices} id="sequencer">
        {devices.map((item, index) => {
          return (
            <div
              className={styles.device + (current === item ? ' ' + styles.current : '') + ' wow animate__fadeIn ani-3'}
              key={item}
              onMouseOver={() => setCurrent(item)}
            >
              <h2 className={styles.title}>QPursue-6k</h2>
              <div className={styles.subtitle}>中通量、便携式纳米孔基因测序仪</div>
              <div className={styles.img}>
                <img src={require(`@/assets/imgs/sequencer/6k.png`)} alt="sequencer device" />
              </div>
              <div className={styles.adv}>实时、便携的长读长测序设备</div>
              <div className={styles.adv}>让基因测序走进更多应用场景</div>
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
        {/* <Title name="sequencer.compare" /> */}
        <div className={styles.contents}>
          <div className={styles.compareTitle + ' wow animate__fadeIn ani-3'}>
            <div className={styles.title}></div>
          </div>
          <div className={styles.compareContent}>{compareCom}</div>
        </div>
      </div>
      {/* <div className={styles.sale}>
        <h2 className={styles.title}>售后服务网点</h2>
        <table className={styles.table}>
          <tr>
            <th>省份</th>
            <th>联系人</th>
            <th>电话</th>
            <th>地址</th>
          </tr>
          <tr>
            <td>北京</td>
            <td>黄聪聪</td>
            <td>18333261609</td>
            <td>北京市海淀区西小口路66号中关村东升科技园-北领地A-5楼3层301</td>
          </tr>
          <tr>
            <td>江苏</td>
            <td>王炎</td>
            <td>18201326283</td>
            <td>江苏省南京市江北新区研创园雨合路33号光电科技园C栋803室</td>
          </tr>
          <tr>
            <td>河南</td>
            <td>罗建</td>
            <td>18030461977</td>
            <td>郑州经济技术开发区航海东路2079号醇葡大厦进口葡萄酒仓储物流配送仓库2层265室</td>
          </tr>
        </table>
      </div> */}
    </div>
  );
}
