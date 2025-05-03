import { getVideoList } from '@/services/api';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

export default function Video() {
  const { formatMessage } = useIntl();
  const types = ['company', 'product', 'train'];
  const [current, setCurrent] = useState('company');
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [isPlayedVideo, setIsPlayedVideo] = useState(null);

  useEffect(() => {
    getVideoList({
      pageIndex: 1,
      pageSize: 100,
    }).then((res) => {
      if (!res.code) {
        setAllVideos(res.data?.list);
      }
    });
  }, []);

  useEffect(() => {
    if (!allVideos.length) return;
    let videos = allVideos.filter((item) => {
      return item.type === current;
    });
    setIsPlayedVideo(null);
    setVideos(videos);
  }, [current, allVideos]);

  const playVideoFirst = (e, id) => {
    let newVideo = [...videos];
    newVideo = newVideo.map((item) => {
      if (item.id === id) {
        return { ...item, hidden: true };
      }
      return item;
    });
    setVideos(newVideo);
    const videoEle = e.target.previousSibling;
    videoEle?.play();
  };

  // 监听视频播放
  const onPlayVideo = (e, id) => {
    if (isPlayedVideo) {
      pauseVideo(isPlayedVideo);
    }
    setIsPlayedVideo(id);
  };

  // 监听视频暂停
  const onPauseVideo = (e, id) => {
    if (id !== isPlayedVideo) return;
    setIsPlayedVideo(null);
  };

  // 暂停视频播放
  const pauseVideo = (id) => {
    const playedVideoDom = document.querySelector("video[data-id='" + id + "']");
    playedVideoDom?.pause();
  };

  return (
    <div className={styles.videoBox}>
      <div className={styles.steps}>
        {types.map((item) => {
          return (
            <div
              className={styles.step + ' ' + (current === item ? styles.current : '')}
              key={item}
              onClick={() => setCurrent(item)}
            >
              {formatMessage({ id: 'video.' + item + '.title' })}
              <div className={styles.subtitle}>{formatMessage({ id: 'video.' + item + '.subtitle' })}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.videos}>
        {videos.map((item, index) => {
          let isNewPage = false;
          if (item.type === 'train' && item.sourceWay !== 'video') {
            // let isVideo = isVideoUrl(item.url);
            // if (item.sourceWay !== 'video') {
            isNewPage = true;
            // }
          }
          return (
            <div className={styles.videoItem} key={index}>
              {isNewPage ? (
                <a href={item.url} className={styles.link} target="_blank">
                  <img src={item.cover} alt="video" className={styles.img} />
                </a>
              ) : (
                <div className={styles.imgwrap}>
                  <video
                    disablePictureInPicture={true}
                    data-id={item.id}
                    src={item.url}
                    className={styles.video}
                    controls
                    controlsList="nodownload noremoteplayback noplaybackrate"
                    onPlay={(e) => onPlayVideo(e, item.id)}
                    onPause={(e) => onPauseVideo(e, item.id)}
                  />
                  <img
                    src={item.cover}
                    alt={item.name}
                    className={styles.img}
                    style={{ display: item.hidden ? 'none' : 'block' }}
                    onClick={(e) => playVideoFirst(e, item.id)}
                  />
                </div>
              )}
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
