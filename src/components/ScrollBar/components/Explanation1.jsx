import styles from './explanation.less';

const features = [
  {
    number: '01',
    title: 'To be added',
    description: <>操作简单，仅需1小时即可完成文库制备</>,
  },
  {
    number: '02',
    title: 'To be added',
    description: <>广泛适用性，适合所有物种基因组DNA、cDNA、PCR产物样本</>,
  },
  {
    number: '03',
    title: 'To be added',
    description: <>样本无需PCR，建库起始用量仅需1ug(或150~300fmol)</>,
  },
];

const Explanation1 = () => {
  return (
    <div className={styles.explanation}>
      <div className={styles.row}>
        <div className={styles.productIntroLabel}>产品介绍</div>
        <div className={styles.productIntroContent}>
          齐碳科技针对基因组DNA、PCR样本构建文库开发的试剂盒产品。此试剂盒适用于所有常见的动物、植物、真菌、细菌等物种，包括人、鼠、水稻、拟南芥、酵母、大肠杆菌等样本提取的基因组DNA或PCR产物进行文库制备；同时，具有纯化步骤少，建库流程简单的特点。
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
        <div className={styles.processLabel}>
          <div className={styles.processDescription}>操作流程</div>
          <div className={styles.processSpecial}>测序流程(~60分钟)</div>
        </div>

        <div className={styles.flowContainer}>
          <div className={styles.stepBox}>DNA</div>
          <div className={styles.dotArrow}>•</div>
          <div className={styles.arrowRight}>→</div>
          <div className={styles.stepBox}>未修加A尾</div>
          <div className={styles.dotArrow}>•</div>
          <div className={styles.arrowRight}>→</div>
          <div className={styles.stepBox}>纯化</div>
          <div className={styles.dotArrow}>•</div>
          <div className={styles.arrowRight}>→</div>
          <div className={styles.stepBox}>测序接头连接</div>
          <div className={styles.dotArrow}>•</div>
          <div className={styles.arrowRight}>→</div>
          <div className={styles.stepBox}>纯化</div>
          <div className={styles.dotArrow}>•</div>
          <div className={styles.arrowRight}>→</div>
          <div className={styles.stepBox}>文库定量</div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.orderInfoLabel}>订购信息</div>

        <div className={styles.productInfo}>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品名称</div>
            <div className={styles.value}>通用建库试剂盒</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>包装规格</div>
            <div className={styles.value}>6 测试/盒</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品货号</div>
            <div className={styles.value}>C-001-0002</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explanation1;
