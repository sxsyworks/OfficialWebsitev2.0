import Process6 from '../images/process6.png';
import styles from './explanation.less';

const features = [
  {
    number: '01',
    title: '高效清洗',
    description: (
      <>
        有效清除测序过程中累积的杂质和残留，针对不同芯片，最高可实现100%清洗（0污染率），同时确保测序数据的准确性和可靠性
      </>
    ),
  },
  {
    number: '02',
    title: '通用',
    description: (
      <>清洗全流程40min内即可完成，芯片清洗后无需额外的软件端设置，即可直接投入下一次测序，显著提升实验效率</>
    ),
  },
  {
    number: '03',
    title: '成本低',
    description: (
      <>
        兼容齐碳科技自研的纳米孔测序芯片QCell-384和QCell-6k客户可根据不同应用场景和数据量需求灵活调配芯片使用，样本随来随测、测序想停就停
      </>
    ),
  },
];

const Explanation6 = () => {
  return (
    <div className={styles.explanation}>
      <div className={styles.row}>
        <div className={styles.productIntroLabel}>产品介绍</div>
        <div className={styles.productIntroContent}>
          齐碳纳米孔测序清洗试剂盒是适配于齐碳纳米孔测序芯片的辅助试剂盒，能够快速降解与清洗芯片中上一轮测序文库残留，使芯片中有活性的纳米孔可用于下一次测序，以达到芯片重复使用的目的。
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
        </div>

        <div className={styles.flowContainer}>
          <div className={styles.processImgContainer}>
            <img src={Process6} alt="Process6" />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.orderInfoLabel}>订购信息</div>

        <div className={styles.productInfo}>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品名称</div>
            <div className={styles.value}>纳米孔测序清洗试剂盒</div>
            <div className={styles.value}>纳米孔测序清洗试剂盒</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>包装规格</div>
            <div className={styles.value}>6 测试/盒</div>
            <div className={styles.value}>48 测试/盒</div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.label}>产品货号</div>
            <div className={styles.value}>C-007-0001</div>
            <div className={styles.value}>C-007-0002</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explanation6;
