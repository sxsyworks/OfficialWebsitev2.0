import VideoIcon from '@/assets/icons/video.png';
import WechatIcon from '@/assets/icons/wechat.png';
import WeiboIcon from '@/assets/icons/weibo.png';
import './index.less';
import styles from './index.less';

export default function ContactIcons() {
  return (
    <div className={styles.contactIcon}>
      <div className={styles.icon}>
        <img src={WechatIcon} alt="微信" className={styles.iconImage} />
        <div className={styles.qrCode}>
          <img src={require('@/assets/icons/wechat.jpg')} alt="公众号" />
        </div>
      </div>
      <div className={styles.icon}>
        <img src={VideoIcon} alt="视频" className={styles.iconImage} />
        <div className={styles.qrCode}>
          <img src={require('@/assets/icons/video.jpg')} alt="视频号" />
        </div>
      </div>
      <div className={styles.icon}>
        <img src={WeiboIcon} alt="微博" className={styles.iconImage} />
        <div className={styles.qrCode}>
          <img src={require('@/assets/icons/weibo.jpg')} alt="微博号" />
        </div>
      </div>
    </div>
  );
}
