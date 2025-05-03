import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import Title from '@/components/Title';
import { useWow } from '@/utils/common';
import { useMemo, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

// 联系人列表
const ContactTableList = [
  { order: '序号', area: '服务区域', people: '总负责人', tel: '电话' },
  { order: '1', area: '北京/吉林/内蒙古', people: '黄聪聪', tel: '18333261609' },
  { order: '2', area: '安徽/江苏/浙江', people: '朱怀鹏', tel: '15856980676' },
  {
    order: '3',
    area: '四川/湖南/湖北',
    children: [
      { people: '汪名庆', tel: '15928839553' },
      { people: '王浩', tel: '18435225079' },
    ],
  },
  { order: '4', area: '安徽/山东/上海', people: '福杰', tel: '15652352962' },
  { order: '5', area: '广东/云南/西北', people: '林中根', tel: '13421377060' },
  {
    order: '6',
    area: '新疆/西藏/青海/甘肃/宁夏',
    children: [
      { people: '王炎', tel: '18201326283' },
      { people: '孙志伟', tel: '15928839553' },
    ],
  },
];

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
      应用类型: [
        '全基因组测序、靶向基因组测序、口岸病原宏基因组测序、转录组测序、表达谱分析、扩增子测序、拷贝数分析、甲基化、双端配对测序等应用和研究',
      ],
      样本类型: ['DNA、cDNA、RNA 等'],
      质保: ['3年免费'],
      产地: ['中国'],
    },
    环境要求: {
      存储温度: ['10°C ~ 30°C'],
      存储湿度: ['10% ~ 80%'],
      工作温度: ['10°C ~ 25°C'],
      工作湿度: ['35% ~ 80%，无凝结'],
      工作电源: ['100-240VAC (50/60Hz), 200W'],
    },
    仪器外观参数: {
      测序芯片: ['6个'],
      体积: ['408mm * 355mm * 126 mm'],
      重量: ['13kg'],
      芯片结构: ['集成电路和生物芯片一体'],
    },
    系统硬件参数: {
      系统: ['Ubuntu 22.04LTS'],
      内存: ['128GB RAM'],
      硬盘: ['2T SSD + 4T SSD*2 +16T SATA*2'],
      GPU: ['NVIDIA GeForce RTX 4090D*2'],
      CPU: ['Intel Core i9/AMD Ryzen 9'],
    },
    仪器性能: {
      测序通道数量: ['6144*6'],
      起始样品量: ['10pg～10μg'],
      测序样品上样量: ['100ng；75μL'],
      测序速度: ['DNA≥450 bp/s、RNA≥70 bp/s'],
      运行时间: ['1min-72h(可控)'],
      芯片使用寿命: ['72h'],
      运行数: ['6个独立测序芯片实验'],
    },
    性能指标: {
      文库制备时间: ['快速barcode建库（Rapid）10min；连接建库（Ligation）2h'],
      获取序列时间: ['≤1min，实时'],
      读长长度: ['最大读长 > 4Mb'],
      理论数据产量: ['60Gb/芯片 最大通量360Gb'],
      准确率: ['单序列准确度99%，RCA模式准确度达99.95%，一致性序列准确度99.999%以上'],
      可兼容开源分析工具: [
        '≥50种 <br/> 可完成原始电信号碱基读取(H5一FastQ)、数据质量控制(QC)、Barcode 拆分(Demultiplexing)、序列比对(Alignment)、基因组组装(Assembly)、宏基因组分析(Metagenomics)、扩增子分析(Amplicon)、测序错误校正(Error correc-tion)、变异分析(Variant calling)',
      ],
      性能介绍: [
        `
        1、原理：采用单分子纳米孔测序技术，根据电流信号变化实现对DNA、cDNA、RNA分子的高通量单分子实时测序；<br/>
        2、样本类型：基因组DNA、扩增子/PCR产物、cDNA、RNA等；<br/>
        3、起始核酸样品量：10 pg～10 μg；<br/>
        4、运行数为6个flow cell实验；<br/>
        5、文库制备时间：10 min（Rapid）或2 h（Ligation）；<br/>
        6、DNA/RNA直接测序，无需做PCR扩增（RNA无需转换成cDNA即可进行测序）；<br/>
        7、序列条数最多为36 Mb reads（以10 kb长度计算）；<br/>
        8、读长长度：最低200 bp，最高可达4 Mb；<br/>
        9、测序数据产量：最高可达360 Gb数据量；<br/>
        10、测序准确度：单序列达99%以上，RCA模式准确度达99.95%，一致性序列准确度99.999%以上；<br/>
        11、碱基修饰：碱基修饰基于电信号的差异检测碱基，在DNA/RNA测序同时可直接检测碱基修饰；<br/>
        12、仪器为集成设备，可实时完成数据获取，存储以及碱基转换；<br/>
        13、支持复杂结构测序、DNA和RNA直接测序、碱基修饰测序、cDNA测序等，无需PCR扩增，免除PCR扩增带来的错误和GC偏差；<br/>
        14、模块化设计：允许同时运行多至6个独立的实验，也可以单独运行1个测序实验；<br/>
        15、测序灵敏度：核酸起始量最低可至10ng，测序上样量≥100ng或≥40ul；病原检测下限低至50 copies/ml；<br/>
        16、配套的生信分析软件兼容支持二代、三代测序下机数据的直接分析，支持微生物基因组本地化数据库储存与管理；用户可自定义加入病原，有利于常见病原的识别；<br/>
        17、分析软件功能：可一步快速完成原始电信号碱基读取（H5 to fastq）、数据质量控制（QC）、实现标签拆分、全基因组序列拼接、测序错误校正、变异分析、碱基修饰、基因分型、突变位点鉴定、序列比对、结果筛选、物种鉴定、物种注释、耐药分析、系统发育分析等功能，精准定位微生物物种，并给出病原微生物分类、特征、致病性、宿主等信息；<br/>
        18、具备开展包括宏基因组测序分析（含16s 全长）、扩增子测序分析、病毒宏转录组分析、细菌抗性基因/毒力基因鉴定、菌群微生态监测、流感病毒/猴痘病毒分型、质粒分析、结核分型、新冠分型等生信分析功能/模块；<br/>
        19、2GB大小的测序数据45分钟内完成分析；<br/>
        20、具备开展包括宏基因组测序分析（含16s 全长）、扩增子测序分析、病毒宏转录组分析、细菌抗性基因/毒力基因鉴定、菌群微生态监测、流感病毒/猴痘病毒分型、质粒分析、结核分型、新冠分型等生信分析功能/模块；<br/>
        21、报告系统：支持一键出结果，无需额外参数选择或设置，系统全界面化操作，分析系统自动、实时生成结果或报告，方便报告解读及复核；<br/>
        22、数据库：包含宏基因组测序数据库（25168种微生物，其中8733种病毒，9583种支原体和细菌，1488种真菌和寄生虫、毒力基因数据库、耐药基因数据库）、扩增子测序数据库（427种病原及9大类耐药基因等），口岸卫生检疫病原快速鉴定数据库（1476种病原，包含人体生物样本、病媒生物样本、特殊生物资源以及船舶压载水等多种样本携带病原）；<br/>
        23、分析系统及工作站：<br/>
        （1）标准配置：CPU数量2个，CPU主频2.6GHz，动态加速频率3.9GH，核心数不低于18核心36线程；GPU显卡内存5Gb，核心1024；显示器23英寸；分辨率2560×1440；内存64G，固态硬盘1920Gb；机械硬盘容量8Tb。工作站预装数据信息库1套，配备CLC数据分析软件，使用期限两年。<br/>
        （2）高级配置：CPU处理器:主频:2GHz;动态加速频率:4.1GHz;核心数量:28核心;线程数量:56线程；GPU 核心数2400；显卡：内存5GB；分辨率2560×1440；内存：384 GB DDR4；硬盘容量：3.84TB SSD系统盘+54TB SATA企业级硬盘；塔式(1200w) ；显示器：24英寸-2K图显。工作站预装病原测序数据生信分析系统 1套，含宏基因组测序数据库、扩增子测序数据库、口岸卫生检疫病原快速鉴定数据库；以及生信分析培训用60寸显示器1个。<br/>
        24、芯片质检、测序过程均可本地化完成，无需连接网络。
        `,
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
              <h2 className={styles.title}>QPursue-6khex</h2>
              <div className={styles.subtitle}>中通量、桌面式纳米孔基因测序仪</div>
              <div className={styles.img}>
                <img src={require(`@/assets/imgs/sequencer/6khex.png`)} alt="sequencer device" />
              </div>
              <div className={styles.adv}>通量灵活的长读长测序设备</div>
              <div className={styles.adv}>可同时运行6张芯片</div>
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
      {/* <div className={styles.contacts}>
        <ContactTable tableList={ContactTableList} />
      </div> */}
    </div>
  );
}
