import { useEffect, useRef, useState } from 'react';
import Explanation1 from './components/Explanation1';
import Explanation2 from './components/Explanation2';
import Explanation3 from './components/Explanation3';
import Explanation4 from './components/Explanation4';
import Explanation5 from './components/Explanation5';
import Explanation6 from './components/Explanation6';
import Explanation7 from './components/Explanation7';
import Explanation8 from './components/Explanation8';
import CurveLineImg from './images/curveLine.png';
import PolygonImg from './images/Polygon.png';
import styles from './index.less';

const items = [
  { title: '' },
  { title: '' },
  {
    title: '通用建库试剂盒',
    image: require('./images/1.png'),
  },
  {
    title: '极速建库试剂盒',
    image: require('./images/2.png'),
  },
  {
    title: '极速条形码建库试剂盒',
    image: require('./images/3.png'),
  },
  {
    title: '直接条形码建库试剂盒',
    image: require('./images/4.png'),
  },
  {
    title: '测序试剂盒',
    image: require('./images/5.png'),
  },
  {
    title: '清洗试剂盒',
    image: require('./images/6.png'),
    description: '',
    chipType: 'QCell-6K & QCell-384',
    features: '温和清洁，延长芯片寿命',
  },
  {
    title: 'QCell-384',
    image: require('./images/7.png'),
  },
  {
    title: 'QCell-6k',
    image: require('./images/8.png'),
  },
  { title: '' },
  { title: '' },
];

const ScrollView = () => {
  const initialIndex = 2;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    const activeItem = container.children[activeIndex];

    if (activeItem) {
      const containerHeight = container.clientHeight;
      const itemOffsetTop = activeItem.offsetTop;
      const itemHeight = activeItem.clientHeight;

      const scrollTop = itemOffsetTop - containerHeight / 2 + itemHeight / 2;
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const calculateStyles = (index) => {
    if (index === activeIndex) {
      return {
        paddingLeft: '0px',
        filter: 'opacity(1)',
      };
    } else if (Math.abs(index - activeIndex) === 1) {
      return {
        paddingLeft: '15px',
        filter: 'opacity(0.6)',
      };
    } else {
      return {
        paddingLeft: '30px',
        filter: 'opacity(0.2)',
      };
    }
  };

  const handleUpArrowClick = () => {
    if (activeIndex > 2) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleDownArrowClick = () => {
    if (activeIndex < 9) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const activeItem = items[activeIndex] || {};

  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <div className={styles.verticalPagination}>
          <div className={styles.arrow} onClick={handleUpArrowClick}>
            ▲
          </div>
          {items.slice(2, 10).map((_, index) => (
            <div key={index} className={`${styles.dot} ${index === activeIndex - 2 ? styles.activeDot : ''}`} />
          ))}
          <div className={styles.arrow} onClick={handleDownArrowClick}>
            ▼
          </div>
        </div>

        <div className={styles.textList} ref={scrollRef}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.textItem} ${index === activeIndex ? styles.active : styles.inactive}`}
              style={calculateStyles(index)}
              onClick={() => {
                if (index >= 2 && index <= 9) {
                  setActiveIndex(index);
                }
              }}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className={styles.middleLabel}>
          <div className={styles.container1}>
            <img src={PolygonImg} alt="Polygon" />
          </div>
          <div className={styles.container2}>
            <img src={CurveLineImg} alt="CurveLine" />
          </div>
        </div>

        <div className={styles.imageBox}>
          {activeItem.image && <img src={activeItem.image} alt={activeItem.title} />}
        </div>
      </div>

      <div>
        {activeItem.title === '通用建库试剂盒' && <Explanation1 />}
        {activeItem.title === '极速建库试剂盒' && <Explanation2 />}
        {activeItem.title === '极速条形码建库试剂盒' && <Explanation3 />}
        {activeItem.title === '直接条形码建库试剂盒' && <Explanation4 />}
        {activeItem.title === '测序试剂盒' && <Explanation5 />}
        {activeItem.title === '清洗试剂盒' && <Explanation6 />}
        {activeItem.title === 'QCell-384' && <Explanation7 />}
        {activeItem.title === 'QCell-6k' && <Explanation8 />}
      </div>
    </div>
  );
};

export default ScrollView;
