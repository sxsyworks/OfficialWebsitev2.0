import Title from '@/components/Title';
import styles from '../index.less';

export const JoinWelfare = [
  {
    key: '1',
    name: '弹性时间',
    desc: '弹性工作制，每个人都是自己的管理者',
  },
  {
    key: '2',
    name: '六险一金',
    desc: '五险一金+补充医疗保险，让你和家人有更多的保障',
  },
  {
    key: '3',
    name: '12天带薪年假',
    desc: '你说想去看世界，12天带薪年假拿走不谢',
  },
  {
    key: '4',
    name: '年度体检',
    desc: '我们关心每一位齐碳小伙伴的身体健康',
  },
  {
    key: '5',
    name: '节日福利',
    desc: '星座生日会、结婚礼金、节日惊喜……各种福利让你每月惊喜不断',
  },
  {
    key: '6',
    name: '零食下午茶',
    desc: '缤纷零食周周上新、水果饮料甜蜜组合、满足你的吃货胃',
  },
  {
    key: '7',
    name: '花式团建',
    desc: '培训、拓展、年会、篮球、足球、滑冰、桌游、各种轰趴，等你来选',
  },
  {
    key: '8',
    name: '股票期权',
    desc: '为公司创造卓越价值的小伙伴将有机会收获股票期权',
  },
];

export default function Welfare() {
  return (
    <div className={styles.welfare}>
      <Title name="about.joinUs.welfare" />
      <ul className={styles.items}>
        {JoinWelfare.map((item, idx) => (
          <li key={item.key} className={styles.item + ' wow animate__fadeInUpSmall anidelay-1'}>
            <i className={`${styles.icon} ${styles[`icon${idx + 1}`]}`}></i>
            <h6 className={styles.name}>{item.name}</h6>
            <p className={styles.desc}>{item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
