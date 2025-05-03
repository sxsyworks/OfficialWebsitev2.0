import React, { useState, useEffect, useRef } from 'react';
import VideoPlayerControl from '@/components/VideoPlayerControl';
import styles from './index.less';
import Swiper from '@/assets/swiper';
import { getBannerList } from '@/services/api';
import '@/assets/swiper/index.css';

export default function Banner(props) {
  const [current, setCurrent] = useState(0);
  // const [isPlay, setIsPlay] = useState(false);
  // const isPlay = useRef(null); // TODO
  const [isFristPlay, setIsFristPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    getBannerList({ platform: 'mobile' }).then((res) => {
      if (!res.code) {
        setData(res.data);
      }
    });
  }, []);
  let isPlay = false;
  // const data = [
  //   { src: '/banner1-mobile.png', type: 'image' },
  //   { src: '/banner2-mobile.jpg', type: 'image' },
  //   { src: '/banner3-mobile.jpg', type: 'image' },
  //   { src: '/banner4.mp4', type: 'video' },
  // ];
  const changeSlider = (swiper) => {
    if (swiper.activeIndex !== 0) {
      if (isPlay) {
        const dupVideo = document.querySelector('.swiper-slide-duplicate');
        const videoDom = dupVideo?.getElementsByTagName('video')?.[0];
        const btnDom = dupVideo?.querySelector('div[class*="btn"]');
        if (btnDom && videoDom) {
          videoDom.pause();
          setCurrentTime(videoDom.currentTime);
          btnDom.className = `${styles.btn}`;
          isPlay = false;
        }
      }
    }
    setCurrent(swiper.realIndex);
  };

  useEffect(() => {
    if (!data.length) return;
    new Swiper('.swiper-container', {
      autoplay: 10000,
      pagination: '.swiper-pagination',
      loop: true,
      slidesPerView: 1,
      initialSlide: 0,
      paginationClickable: true,
      onSlideChangeStart: changeSlider,
      paginationElement: 'div',
    });

    const dupVideo = document.querySelector('.swiper-slide-duplicate');
    if (!dupVideo) return;
    dupVideo.onclick = (e) => {
      if (e.target.className.includes('btn')) {
        const wrapperDom = dupVideo.children[0];
        wrapperDom.className = `${styles.wrapper} ${styles.active}`;
        wrapperDom.style.backgroundImage = '';
        const videoDom = dupVideo.getElementsByTagName('video')?.[0];
        videoDom.muted = true;
        // const isPlay = e.target.className.includes('active'); // TODO
        setIsFristPlay(true);
        if (isPlay) {
          e.target.className = `${styles.btn}`;
          videoDom?.pause();
          setCurrentTime(videoDom.currentTime);
        } else {
          e.target.className = `${styles.btn} ${styles.active}`;
          videoDom?.play();
        }
        // setIsPlay(!isPlay);
        // isPlay.current = !isPlay;
        isPlay = !isPlay;
      }
    };
  }, [data]);

  useEffect(() => {
    if (!data.length) return;
    const dupVideo = document.querySelector('.swiper-slide-duplicate');
    const videoDom = dupVideo.getElementsByTagName('video')?.[0];
    videoDom.currentTime = currentTime;
    const wrapperDom = dupVideo.children[0];
    if (currentTime !== 0 && !isFristPlay) {
      wrapperDom.className = `${styles.wrapper} ${styles.active}`;
      wrapperDom.style.backgroundImage = '';
      const btnDom = dupVideo?.querySelector('div[class*="btn"]');
      btnDom.className = `${styles.btn}`;
      setIsFristPlay(true);
    }
  }, [currentTime, data]);

  return (
    <div className={styles.banner} style={{ height: props.height }}>
      <div className="swiper-container">
        <div className="swiper-wrapper" style={{ height: props.height }}>
          {data.map((item, index) => {
            if (!item.url) return null;
            if (item.beVideo) {
              return (
                <div key={index} className="swiper-slide">
                  {/* <div style={{ height: props.height }}> */}
                  <VideoPlayerControl
                    coverUrl={item.webmUrl}
                    src={item.url}
                    show={props.isAnimate && current === index}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    // height={props}
                  />
                  {/* </div> */}
                </div>
              );
            } else {
              return (
                <div key={index} className="swiper-slide">
                  <div
                    className={styles.imgItem}
                    style={{
                      backgroundImage: `url('${item.url}')`,
                      // height: props.height,
                    }}
                  ></div>
                </div>
              );
            }
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}
