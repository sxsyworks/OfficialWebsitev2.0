import { useEffect, useRef, useState } from 'react';
import CurveLineImg from './images/curveLine.png';
import PolygonImg from './images/Polygon.png';
import styles from './index.less';

const items = [
  { title: '' },
  { title: '' },
  { title: '通用建库试剂盒', image: require('./images/1.png') },
  { title: '极速建库试剂盒', image: require('./images/2.png') },
  { title: '极速条形码建库试剂盒', image: require('./images/3.png') },
  { title: '直接条形码建库试剂盒', image: require('./images/4.png') },
  { title: '测序试剂盒', image: require('./images/5.png') },
  { title: '清洗试剂盒', image: require('./images/6.png') },
  { title: 'QCell-384', image: require('./images/7.png') },
  { title: 'QCell-6k', image: require('./images/8.png') },
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
          {items[activeIndex]?.image && <img src={items[activeIndex].image} alt={items[activeIndex].title} />}
        </div>
      </div>

      <div className={styles.explanation}>
        <div className={styles.row}>
          <div className={styles.exp1}>产品介绍</div>
          <div />
        </div>
        <div className={styles.row}>
          <div className={styles.exp1}>适配芯片类型</div>
          <div />
        </div>
        <div className={styles.row}>
          <div className={styles.exp1}>产品特点</div>
          <div />
        </div>
        <div className={styles.row}>
          <div className={styles.exp1}>操作流程</div>
          <div />
        </div>
        <div className={styles.row}>
          <div className={styles.exp1}>订购信息</div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default ScrollView;
