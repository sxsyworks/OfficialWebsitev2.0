import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import Title from '@/components/Title';
import { useWow } from '@/utils/common';
import { useMemo, useState } from 'react';
import styles from './index.less';

export default function Sequencer() {
  const [current, setCurrent] = useState('3841');
  const devices = ['automation'];
  const FeatureImg = [
    { icon: require('@/assets/imgs/sequencer/automation1.png'), title: '简便高效' },
    { icon: require('@/assets/imgs/sequencer/automation2.png'), title: '精准移液' },
    { icon: require('@/assets/imgs/sequencer/automation3.png'), title: '通量灵活' },
    { icon: require('@/assets/imgs/sequencer/automation4.png'), title: '安全可靠' },
  ];
  useWow([], '#bidding');

  const conpareData = {
    仪器产品参数: {
      技术原理: ['全自动核酸文库构建技术'],
      外形尺寸: ['800×770×780mm'],
      样本位: ['24'],
      板位数: ['12 个标准板位'],
      洁净装置: ['配置紫外消毒灯， 高效净化过滤装置'],
    },
    移液模块: {
      移液器类型: ['8 通道固定间距移液器'],
      移液范围: ['1µL-200µL'],
      移液准确度: ['1µL ：≤5% ( 一吸一注 )  |  20µL ：≤2%  |  200µL ：≤1%'],
      移液精密度: ['1µL ：＜±12% ( 一吸一注 ) | 20µL ：＜±2% | 200µL ：＜±1%'],
    },
    // 热循环模块: {
    //   模块温控范围: ['+4~+99℃'],
    //   热盖最高温度: ['+120 ℃'],
    //   平均升温速率: ['≥2.0℃/s'],
    //   平均降温速率: ['≥2.2℃/s'],
    //   温控精度: ['±0.3℃    @55℃'],
    //   温度准确性: ['±0.2℃    @55℃'],
    //   温度均匀性: ['±0.35℃'],
    // },
    温控模块: {
      模块温控范围: ['0~105℃'],
      温度准确性: ['±0.5℃'],
      温度均匀性: ['±0.5℃'],
    },
    磁力架模块: {
      磁力架配置: ['96 孔环形磁力架'],
    },
    核酸定量模块: {
      浓度检测范围: ['0.2~100ng/µL'],
    },
    混匀模块: {
      最大转速: ['1500rpm'],
    },
    工作环境: {
      温度要求: ['15~30℃'],
      湿度要求: ['相对湿度 ：≤80%'],
      电源要求: ['220V, 50/60Hz, 最大功率 1000W'],
    },
    性能要求: {
      性能要求: [
        `
        1、仪器可使建库操作覆盖末端修复、barcode连接和接头连接全流程，一键实现“核酸进文库出”，全程无需手工操作；一键式图形界面分析的设计，可方便使用者快速进行新冠、致病菌和广谱病原物的快速鉴定及溯源。配置的高性能数据处理服务器可实现数据的快速分析，节省大量数据处理时间。<br/>
        2、内置有经过验证的三代测序仪建库程序，可自动化完成1到24个任意数量样本建库，可提供程序应用截图证明材料。<br/>
        3、支持多样本核酸自动混合均一化，自动完成基于染料法核酸浓度定量和移液混样，可提供本功能的自动化建库控制屏幕截图。<br/>
        4、搭载8通道核酸定量单元，机械臂程序化控制点样，样本位24个，可对核酸样本批量进行定量。<br/>
        5、具备低温制冷功能，确保酶活力高效稳定，实现仪器内试剂长时间作业。温度范围：0-105℃，温度控制准确度：±0.5℃，温度控制一致性：±0.5℃；具备20-80℃加热震荡功能，确保核酸有效洗脱。<br/>
        6、具备自动升降式磁吸功能，可实现根据样本体积自动调节磁力吸附位置，提升核酸回收效率。<br/>
        7、配备长寿命UV紫外灯，实验结束自动开启，无需手动灭菌；配备HEPA过滤系统，实验开始自动开启，确保操作过程中空气洁净度达到ISO5级别。<br/>
        8、引导式操作界面，自带扫码功能，防止试剂耗材位置装配错误；搭载智能互联系统，平板电脑和手机可通过wifi远程连接建库仪，实现远程操作和监控；自动报错、反馈并暂停实验，防止试剂和样本的损失。<br/>
        9、有配套商品化整合式建库试剂盒，试剂盒中包含三代测序建库所需的末修酶、连接酶、barcode等组分，支持便捷高效构建文库, 提供同品牌试剂盒说明书及图片证明。
      `,
      ],
    },
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
              <h2 className={styles.title}>QPrenano-100</h2>
              <div className={styles.subtitle}>自动化样本制备系统</div>
              <div className={styles.img}>
                <img src={require(`@/assets/imgs/sequencer/automation.png`)} alt="sequencer device" />
              </div>
              <div className={styles.adv}>一款基于液体处理工作站的核酸检测前处理设备</div>
              <div className={styles.adv}>适配齐碳 QNome、QPursue 纳米孔测序平台 *</div>
            </div>
          );
        })}
      </div>
      <div className={styles.feature}>
        <Title name="sequencer.feature" />
        <div className={styles.feaCon + ' wow animate__fadeInUpSmall'}>
          {FeatureImg.map((item, index) => {
            let { icon, title } = item;
            return (
              <div key={index} className={styles.feaItem}>
                <div className={styles.feaIcon} style={{ backgroundImage: 'url(' + icon + ')' }}></div>
                <div className={styles.feaTitle}>{title}</div>
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
          <p className={styles.note}>*: 适配齐碳纳米孔基因测序仪QNome-3841、QNome-3841hex、QPursue-6k、QPursue-6khex</p>
        </div>
      </div>
    </div>
  );
}
