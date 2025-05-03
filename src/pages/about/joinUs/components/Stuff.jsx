import Title from '@/components/Title';
import styles from '../index.less';

export default function Stuff() {
  const imgs = new Array(8).fill(1);

  return (
    <div className={styles.stuff}>
      <Title name="about.joinUs.stuff" />
      <div className={styles.items}>
        {imgs.map((num, idx) => {
          return (
            <img
              key={num + idx}
              src={require(`@/assets/imgs/join/stuff${idx + 1}.png`)}
              alt="stuffs"
              className={styles.item + ' wow animate__fadeInUpSmall anidelay-1'}
            />
          );
        })}
      </div>
    </div>
  );
}
