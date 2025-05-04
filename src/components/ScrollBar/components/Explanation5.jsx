import styles from './explanation.less';

const features = [
  {
    number: '01',
    title: '操作简单',
    description: <>仅需5步即可完成文库的测序工作</>,
  },
  {
    number: '02',
    title: '通用',
    description: <>适配齐碳多样化建库试剂盒</>,
  },
  {
    number: '03',
    title: '成本低',
    description: <>无需DNA聚合酶、无需测序引物、无需dNTP</>,
  },
];

const Explanation5 = () => {
  return (
    <div className={styles.explanation}>
      <div className={styles.row}>
        <div className={styles.productIntroLabel}>产品介绍</div>
        <div className={styles.productIntroContent}>
          齐碳科技开发的检测基因组DNA文库的通用测序试剂盒产品。此试剂盒适配于齐碳纳米孔测序平台，搭配齐碳科技自主开发的多种建库试剂盒，可完成对应文库的测序过程并获取样本序列信息。
        </div>
        <div />
      </div>

      <div className={styles.row}>
        <div className={styles.chipTypeLabel}>适配芯片类型</div>
        <div className={styles.chipTypeContent}>QCell-6K&QCell-384</div>
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
          <div className={styles.stepBox}>芯片冲洗</div>
          <div className={styles.dotArrow}>•</div>
          <div className={styles.arrowRight}>→</div>
          <div className={styles.stepBox}>芯片导通</div>
          <div className={styles.dotArrow}>•</div>
          <div className={styles.arrowRight}>→</div>
          <div className={styles.stepBox}>文库测序体系配置</div>
          <div className={styles.dotArrow}>•</div>
          <div className={styles.arrowRight}>→</div>
          <div className={styles.stepBox}>文库测序体系配置</div>
          <div className={styles.dotArrow}>•</div>
          <div className={styles.arrowRight}>→</div>
          <div className={styles.stepBox}>孵育并测序</div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.orderInfoLabel}>订购信息</div>

        <div className={styles.productInfo}>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品名称</div>
            <div className={styles.value}>测序试剂盒（QCell-384)</div>
            <div className={styles.value}>测序试剂盒（QCell-6k)</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>包装规格</div>
            <div className={styles.value}>6 测试/盒</div>
            <div className={styles.value}>6 测试/盒</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品货号</div>
            <div className={styles.value}>C-002-0002</div>
            <div className={styles.value}>C-002-0005</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explanation5;
