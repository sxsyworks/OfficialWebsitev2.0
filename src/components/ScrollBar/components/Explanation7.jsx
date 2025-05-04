import styles from './explanation.less';

const features = [
  {
    number: '01',
    title: 'To be added',
    description: <>全新打造硅基生物芯片，更稳定的测序表现 </>,
  },
  {
    number: '02',
    title: 'To be added',
    description: <>数据产出稳定，无需凑样</>,
  },
  {
    number: '03',
    title: 'To be added',
    description: <>单芯片搭载孔数384个单芯片设计通量达5Gb</>,
  },
];

const Explanation7 = () => {
  return (
    <div className={styles.explanation}>
      <div className={styles.row}>
        <div className={styles.productIntroLabel}>产品介绍</div>
        <div className={styles.productIntroContent}>
          QCell-384是齐碳科技推出的低通量纳米孔测序芯片，可搭配低通量纳米孔测序平台QNome-3841和QNome-3841hex进行纳米孔长读长测序。
        </div>
        <div />
      </div>

      <div className={`${styles.row} ${styles.featuresRow}`}>
        <div className={styles.featuresLabel}>产品特点</div>
        <div className={styles.featuresContainer}>
          {features.map((feature) => (
            <div key={feature.number} className={styles.featureCard}>
              <div className={styles.featureNumber}>{feature.number}</div>
              <div className={styles.featureTitle}>{feature.title}</div>
              <div className={styles.featureDescription}>{feature.description}</div>
            </div>
          ))}
        </div>
        <div />
      </div>

      <div className={styles.row}>
        <div className={styles.orderInfoLabel}>性能参数</div>
        <div className={styles.productInfo}>
          <div className={styles.infoBlock}>
            <div className={styles.label}>芯片</div>
            <div className={styles.value}>QCell-384</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>单芯片通道数</div>
            <div className={styles.value}>384</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>单芯片设计通量</div>
            <div className={styles.value}>5Gb</div>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.orderInfoLabel}>规格参数</div>
        <div className={styles.productInfo}>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品外观</div>
            <div className={styles.value}>
              尺寸 60mm*50mm*20mm<span className={styles.valueSmall}>(±0.5mm)</span>
            </div>
            <div className={styles.value}>
              净重 31.0g<span className={styles.valueSmall}>(±0.5g)</span>
            </div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>储存环境</div>
            <div className={styles.value}>温度 2-8℃</div>
            <div className={styles.value}>湿度 45-75%</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>工作环境</div>
            <div className={styles.value}>温度 10-30℃</div>
            <div className={styles.value}>湿度 30-80%</div>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.orderInfoLabel}>订购信息</div>
        <div className={styles.productInfo}>
          <div className={styles.infoBlock}>
            <div className={styles.label}>品名</div>
            <div className={styles.value}>QCell-384</div>
            <div className={styles.value}>QCell-384</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>货号</div>
            <div className={styles.value}>Q-001-001-01</div>
            <div className={styles.value}>Q-001-001-02</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>规格(张)</div>
            <div className={styles.value}>1</div>
            <div className={styles.value}>6</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explanation7;
