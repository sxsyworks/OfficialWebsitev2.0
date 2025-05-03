import Swiper from '@/assets/swiper';
import '@/assets/swiper/index.css';
import Menu from '@/components/Menu';
import VideoPlayer from '@/components/VideoPlayerBanner';
import { getBannerList } from '@/services/api';
import { useEffect, useState } from 'react';
import styles from './index.less';
export default function Banner(props) {
  const [current, setCurrent] = useState(0);
  const [myswiper, setMyswiper] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getBannerList({ platform: 'pc' }).then((res) => {
      if (!res.code) {
        setData(res.data);
      }
    });
  }, []);

  const changeSlider = (swiper) => {
    setCurrent(swiper.realIndex);
  };

  useEffect(() => {
    if (!data.length) return;
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: 10000,
      pagination: '.swiper-pagination',
      loop: true,
      slidesPerView: 1,
      initialSlide: 0,
      paginationClickable: true,
      onSlideChangeStart: changeSlider,
      paginationElement: 'div',
      // paginationHide: true,
    });
    setMyswiper(mySwiper);
    setTimeout(() => {
      const swiperPagination = document.getElementById('swiperPagination');
      if (!swiperPagination) return;
      swiperPagination.style.display = 'block';
      setShow(true);
      props.finished();
    }, 7800);
  }, [data]);

  return (
    <div className={styles.banner + ' item'}>
      {show ? <Menu /> : null}
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {data.map((item, index) => {
            if (!item.url) return null;
            if (item.beVideo) {
              return (
                <div className="swiper-slide" key={item.url}>
                  <div className={styles.videoItem}>
                    <VideoPlayer
                      urls={[item.url, item.webmUrl]}
                      forms={item.forms}
                      show={current === index ? true : false}
                      {...item}
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className="swiper-slide" key={item.url}>
                  <div>
                    <div
                      className={styles.imgItem}
                      style={{
                        backgroundImage: `url('${item.url}')`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="swiper-pagination" id="swiperPagination"></div>
      </div>
    </div>
  );
}
