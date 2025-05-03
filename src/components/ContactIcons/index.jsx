import { ReactComponent as Video } from '@/assets/icons/video.svg';
import { ReactComponent as Wechat } from '@/assets/icons/wechat.svg';
import { ReactComponent as Weibo } from '@/assets/icons/weibo.svg';
import styles from './index.less';
import './index.less';

export default function ContactIcons() {
  return (
    <div className={styles.contactIcon}>
      <div className={styles.icon}>
        <Wechat />
        <div className={styles.qrCode}>
          <img src={require('@/assets/icons/wechat.jpg')} alt="公众号" />
        </div>
      </div>
      <div className={styles.icon}>
        <Video />
        <div className={styles.qrCode}>
          <img src={require('@/assets/icons/video.jpg')} alt="视频号" />
        </div>
      </div>
      <div className={styles.icon}>
        <Weibo />
        <div className={styles.qrCode}>
          <img src={require('@/assets/icons/weibo.jpg')} alt="微博号" />
        </div>
      </div>
    </div>
  );
}
