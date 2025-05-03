import Intro from './components/Intro';
import Welfare from './components/Welfare';
import Stuff from './components/Stuff';
import Banner from './components/Banner';
import { useWow } from '@/utils/common';
import styles from './index.less';

export default function JoinUs() {
  useWow();
  return (
    <div className={styles.JoinUs}>
      <Intro />
      <Welfare />
      <Banner />
      <Stuff />
    </div>
  );
}
