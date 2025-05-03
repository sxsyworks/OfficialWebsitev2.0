import { useEffect, useRef } from 'react';
import styles from './index.less';
export default function VideoPlyer(props) {
  const { urls, show = true, loop = false } = props;
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
    return urls.length > 1 ? (
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
        {urls.map((item) => (
          <source key={item} src={item}></source>
        ))}
      </video>
    ) : (
      <video
        src={urls[0]}
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
