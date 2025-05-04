import styles from './explanation.less';

const features = [
  {
    number: '01',
    title: '操作简单',
    description: <>相较同类产品纯化步骤少全流程仅需100分钟</>,
  },
  {
    number: '02',
    title: '灵活易用',
    description: <>兼容测序芯片QCell-6K 和QCell-384，测序质量≥Q7，eads拆分效率达到90%以上</>,
  },
  {
    number: '03',
    title: '设计合理',
    description: <>提供建库所需全部试剂，用户也可根据需求灵活购买，避免试剂浪费</>,
  },
];

const Explanation4 = () => {
  return (
    <div className={styles.explanation}>
      <div className={styles.row}>
        <div className={styles.productIntroLabel}>产品介绍</div>
        <div className={styles.productIntroContent}>
          齐碳科技有限公司针对多个样本混合测序需求开发的产品，适用于基因组DNA和PCR样本构建文库。最多支持12/48个条形码样本的混合建库测序，质量合格Reads(≥Q7)条形码拆出率大于90%，性能优秀；同时，与同类产品相比具有纯化步骤少，建库流程简单的特点。
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
          <div className={styles.flowContainer}>
            <div className={styles.stepBox}>DNA</div>
            <div className={styles.dotArrow}>•</div>
            <div className={styles.arrowRight}>→</div>
            <div className={styles.stepBox}>末修加A尾</div>
            <div className={styles.dotArrow}>•</div>
            <div className={styles.arrowRight}>→</div>
            <div className={styles.stepBox}>条形码连接</div>
            <div className={styles.dotArrow}>•</div>
            <div className={styles.arrowRight}>→</div>
            <div className={styles.stepBox}>纯化</div>
            <div className={styles.dotArrow}>•</div>
            <div className={styles.arrowRight}>→</div>
            <div className={styles.stepBox}>定量</div>
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
      </div>

      <div className={styles.row}>
        <div className={styles.orderInfoLabel}>订购信息</div>
        <div className={styles.productInfo}>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品名称</div>
            <div className={styles.value}>直接条形码试剂盒-48</div>
            <div className={styles.value}>直接连接建库试剂盒</div>
            <div className={styles.value}>直接条形码试剂盒 Set A</div>
            <div className={styles.value}>直接条形码试剂盒 Set B</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>包装规格</div>
            <div className={styles.value}>6 测试/盒</div>
            <div className={styles.valueBlue}>（48barcode/测试）</div>
            <div className={styles.value}>6 测试/盒</div>
            <div className={styles.value}>6 测试/盒</div>
            <div className={styles.valueBlue}>（6barcode/测试）</div>
            <div className={styles.value}>6 测试/盒</div>
            <div className={styles.valueBlue}>（6barcode/测试）</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品货号</div>
            <div className={styles.value}>C-006-0014</div>
            <div className={styles.value}>C-006-0015</div>
            <div className={styles.value}>C-006-0017</div>
            <div className={styles.value}>C-006-0017</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explanation4;
