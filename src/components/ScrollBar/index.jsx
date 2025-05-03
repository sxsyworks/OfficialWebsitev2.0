import { useEffect, useRef, useState } from 'react';
import CurveLineImg from './images/curveLine.png';
import DottedLine from './images/dottedLine.png';
import PolygonImg from './images/Polygon.png';
import styles from './index.less';


const items = [
  {
    title: '',
  },
  {
    title: '',
  },
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
  },
  {
    title: 'QCell-384',
    image: require('./images/7.png'),
  },
  {
    title: 'QCell-6k',
    image: require('./images/8.png'),
  },
  {
    title: '',
  },
  {
    title: '',
  },
];

const ScrollView = () => {
  const initialIndex = 6;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    const container = e.target;
    const itemHeight = container.scrollHeight / items.length;
    const scrollMiddle = container.scrollTop + container.clientHeight / 2;
    let index = Math.floor(scrollMiddle / itemHeight);
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    const itemHeight = container.scrollHeight / items.length;
    const selectedItemTop = itemHeight * activeIndex;
    container.scrollTop = selectedItemTop - container.clientHeight / 2;
  }, [activeIndex]);

  const calculateStyles = (index) => {
    if (index === activeIndex) {
      return {
        paddingLeft: '0px',
        filter: 'opacity(1)',
      };
    }

    const diff = Math.abs(index - activeIndex);
    return {
      paddingLeft: `${diff * 15}px`,
      filter: `opacity(${1 - diff * 0.4})`,
    };
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <div className={styles.dottedLine}>
          <img src={DottedLine} alt="DottedLine" />
        </div>

        <div className={styles.textList} onScroll={handleScroll} ref={scrollRef}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.textItem} ${index === activeIndex ? styles.active : styles.inactive}`}
              style={calculateStyles(index)}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className={styles.middleLabel}>
          <div className={styles.container1}>
            <div>
              <img src={PolygonImg} alt="Polygon" />
            </div>
          </div>
          <div className={styles.container2}>
            <div>
              <img src={CurveLineImg} alt="curveLine" />
            </div>
          </div>
        </div>

        <div className={styles.imageBox}>
          <img src={items[activeIndex].image} alt={items[activeIndex].title} />
        </div>
      </div>
      <div className={styles.explanation}>
        <div className={styles.exp1}>产品介绍</div>
        <div className={styles.exp1}>适配芯片类型</div>
        <div className={styles.exp1}>产品特点</div>
        <div className={styles.exp1}>操作流程</div>
        <div className={styles.exp1}>订购信息</div>
      </div>
    </div>
  );
};

export default ScrollView;
