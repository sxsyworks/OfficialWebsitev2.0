import Process3 from '../images/process3.png';
import styles from './explanation.less';

const features = [
  {
    number: '01',
    title: '速度块',
    description: <>10 min即可完成纳米孔测序条形码文库构建</>,
  },
  {
    number: '02',
    title: '通用性强',
    description: <>扩增子通用性强，片段长度无限制,可适配新冠、流感、猴痘等多种病原检测试剂盒</>,
  },
  {
    number: '03',
    title: '操作简单',
    description: <>无需末端修复，无需常规纯化，简单操作，一步到位</>,
  },
  {
    number: '04',
    title: '灵活选择',
    description: <>条形码接头预分装在八联排管，接头装量为单次反应规格，可按需灵活选择每次文库构建的条形码数量</>,
  },
];

const Explanation3 = () => {
  return (
    <div className={styles.explanation}>
      <div className={styles.row}>
        <div className={styles.productIntroLabel}>产品介绍</div>
        <div className={styles.productIntroContent}>
          齐碳科技极速条形码建库试剂盒-8，是针对齐碳科技纳米孔测序平台配套开发的，为扩增DNA片段直接添加条形码的建库试剂盒。使用本试剂盒可在约10
          min内一次性获得8个不同条形码的文库，并在混合后进行测序，与齐碳科技有限公司自主研发的3841或6K纳米孔基因测序仪及软件配合使用，完成测序过程并一次性获取8个样本的序列信息。
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
        </div>

        <div className={styles.flowContainer}>
          <div className={styles.processImgContainer}>
            <img src={Process3} alt="Process3" />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.orderInfoLabel}>订购信息</div>
        <div className={styles.productInfo}>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品名称</div>
            <div className={styles.value}>极速条形码建库试剂盒</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>包装规格</div>
            <div className={styles.value}>6 测试/盒</div>
            <div className={styles.valueBlue}>（88barcode/测试）</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品货号</div>
            <div className={styles.value}>C-001-0008</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explanation3;
