import React, { useState, useEffect } from 'react';
import Title from '@/components/Title';
import styles from '../index.less';
import Swiper from '@/assets/swiper';
import '@/assets/swiper/index.css';
export default function Banner() {
  const imgs = new Array(4).fill(1);
  const [current, setCurrent] = useState(0);
  const getDos = (i) => {
    return (
      <div className="dosItem">
        <a key={i} className="item"></a>
      </div>
    );
  };
  const getCurrent = (pre, index) => {
    setCurrent(index);
  };
  const changeSlider = (swiper) => {
    setCurrent(swiper.realIndex);
  };
  useEffect(() => {
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: 10000,
      pagination: '.swiper-pagination',
      loop: true,
      slidesPerView: 1,
      initialSlide: 0,
      paginationClickable: true,
      onSlideChangeStart: changeSlider,
      paginationElement: 'div',
    });
  }, []);
  return (
    <div className={styles.banner}>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {imgs.map((item, idx) => {
            let img = require(`@/assets/imgs/join/place${idx + 1}.png`);
            return (
              <div key={item + idx} className="swiper-slide">
                <div
                  className={styles.imgItem}
                  style={{
                    backgroundImage: `url(${img})`,
                  }}
                >
                  <div className={styles.imgTitle}>
                    <Title name="about.joinUs.office" style={{ color: '#fff' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}
