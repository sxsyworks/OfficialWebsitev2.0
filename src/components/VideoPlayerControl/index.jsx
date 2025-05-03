import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

export default function VideoPlayerControl(props) {
  const { src, show, coverUrl } = props;
  const [isPlay, setIsPlay] = useState(false);
  const [isFristPlay, setIsFristPlay] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPlay = () => {
    const { current } = videoRef;
    if (!isPlay) {
      current?.play();
    } else {
      current?.pause();
      props?.setCurrentTime(current.currentTime);
    }
    if (!isPlay && !isFristPlay) {
      setIsFristPlay(true);
    }
    setIsPlay(!isPlay);
  };

  useEffect(() => {
    if (show) return;
    const { current } = videoRef;
    setIsPlay(false);
    current?.pause();
    props?.setCurrentTime(current.currentTime);
    return () => {
      current?.pause();
    };
  }, [show]);

  useEffect(() => {
    const { current } = videoRef;
    current.currentTime = props.currentTime;
    if (props.currentTime && !isFristPlay) {
      setIsFristPlay(true);
    }
  }, [props.currentTime]);

  return (
    <div
      className={`${styles.wrapper} ${isFristPlay ? styles.active : ''}`}
      style={{ backgroundImage: !isFristPlay ? `url('${coverUrl}')` : '' }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop={true}
        className={styles.videoPlayer}
        x5-playsinline="true"
        webkit-playsinline="true"
        playsInline={true}
        controlsList="nodownload"
      ></video>
      <div className={`${styles.btn} ${isPlay ? styles.active : ''}`} onClick={handleVideoPlay}></div>
    </div>
  );
}
