import { useEffect, useRef } from 'react';
import styles from './index.less';
export default function VideoPlyer(props) {
  const { src, show = true, loop = false, forms } = props;
  const videoRef = useRef(null);

  const Listener = () => {
    props?.onLoaded(src);
    videoRef?.current?.removeEventListener('canplaythrough', Listener);
  };

  useEffect(() => {
    if (props.onLoaded) {
      videoRef?.current?.addEventListener('canplaythrough', Listener);
    }
  }, []);

  const Player = () => {
    return forms.length > 1 ? (
      <video
        autoPlay
        muted
        loop={loop}
        x5-playsinline="true"
        webkit-playsinline="true"
        playsInline={true}
        className={styles.videoPlayer}
        ref={videoRef}
        preload="auto"
        controlsList="nodownload"
      >
        {forms.map((item) => (
          <source key={item} src={`https://webjpg.qitantech.com${src}.${item}`} type={`video/${item}`}></source>
        ))}
      </video>
    ) : (
      <video
        src={src + `.${forms[0]}`}
        autoPlay
        muted
        loop={loop}
        x5-playsinline="true"
        webkit-playsinline="true"
        playsInline={true}
        className={styles.videoPlayer}
        preload="auto"
      ></video>
    );
  };
  return show ? Player() : <div className={styles.videoPlayer}></div>;
}
