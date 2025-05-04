import Process2 from '../images/process2.png';
import styles from './explanation.less';

const features = [
  {
    number: '01',
    title: '极速建库',
    description: <>10 min即可完成纳米孔测序文库构建</>,
  },
  {
    number: '02',
    title: '通用性强',
    description: <>扩增子通用性强，适配多种扩增检测试剂盒</>,
  },
  {
    number: '03',
    title: '简单易用',
    description: <>文库构建操作简单，一步完成，无需末端修复，无需常规纯化。</>,
    },
    {
        number: '04',
        title: '开发定制',
        description: <>文库构建操作简单，一步完成，无需末端修复，无需常规纯化。</>,
      },
];

const Explanation2 = () => {
  return (
    <div className={styles.explanation}>
      <div className={styles.row}>
        <div className={styles.productIntroLabel}>产品介绍</div>
        <div className={styles.productIntroContent}>
          本产品为极速建库试剂盒，是针对齐碳科技纳米孔测序平台配套开发的，为扩增DNA片段极速添加测序接头的建库试剂盒。使用该试剂盒可在约10分钟内完成文库构建，与成都齐碳科技有限公司研发的3841或6K纳米孔基因测序仪及软件配合使用，完成测序过程并获取样本的序列信息。若在DNA扩增过程中添加条形码序列，多个扩增产物纯化后等量混合，搭配本试剂盒使用，则可一次性获取多个样本的序列信息。
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
            <img src={Process2} alt="Process2" />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.orderInfoLabel}>订购信息</div>
        <div className={styles.productInfo}>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品名称</div>
            <div className={styles.value}>极速建库试剂盒</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>包装规格</div>
            <div className={styles.value}>6 测试/盒</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品货号</div>
            <div className={styles.value}>C-001-0007</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explanation2;
