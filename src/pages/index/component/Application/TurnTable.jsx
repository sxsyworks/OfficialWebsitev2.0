import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useIntl } from 'umi';
import styles from './index.less';

const TurnTable = (props) => {
  const { formatMessage } = useIntl();
  const { area } = props;
  const total = area === 'medical' ? 8 : 6; // 图片的总个数
  const angle = 360 / total; // 每个点间隔的角度，或者每段弧形对应（旋转）的角度
  const startAngle = angle / 2; // 第一个点起始的角度
  const duration = 5000; // 轮询总间隔
  const degree = 1; // 弧线轮询走的角度
  let curAngle = startAngle; // 当前点的角度
  let arcAngel = startAngle; // 弧线（结尾点）的角度

  const [circle, setCircle] = useState({
    r: 250,
    cx: 270,
    cy: 270,
  });
  const [points, setPoints] = useState([]);
  const [items, setItems] = useState([]);
  const cur = useRef(0);
  const timer = useRef(null);
  const icons = useRef(null);
  const [curState, setCurState] = useState(0);
  const [d, setD] = useState('');
  const boxRef = useRef(null);

  const getOptions = () => {
    let { cx, cy, r } = circle; // 以虚线圆为参考
    let curAngle = startAngle; // 当前点的角度
    let points = [];
    let items = [];

    for (let index = 0; index < total; index++) {
      // 点的位置
      let rx = Math.sin((-curAngle / 180) * Math.PI);
      let ry = Math.cos((-curAngle / 180) * Math.PI);
      // let rx = Math.cos((curAngle / 180) * Math.PI);
      // let ry = Math.sin((curAngle / 180) * Math.PI);
      let x = cx - r * rx;
      let y = cy - r * ry;
      let point = { x, y };
      points.push(point);
      // label的位置
      let lr = r / 2.5;
      let itemX = x - lr * rx;
      let itemY = y - lr * ry;
      items[index] = { id: index + 1, itemX, itemY };
      curAngle += angle;
    }
    setItems(items);
    setPoints(points);
  };

  const paint = () => {
    const { cx, cy, r } = circle;
    let { current } = cur;
    let xAxisRotation = 0;
    let largeArcFlag = 0;
    let sweepFlag = 1;
    let next = current === total - 1 ? 0 : current + 1;
    arcAngel = arcAngel + degree > curAngle + angle ? curAngle + angle : arcAngel + degree;
    let startX = cx - r * Math.sin((-curAngle / 180) * Math.PI);
    let startY = cy - r * Math.cos((-curAngle / 180) * Math.PI);
    let endX = cx - r * Math.sin((-arcAngel / 180) * Math.PI);
    let endY = cy - r * Math.cos((-arcAngel / 180) * Math.PI);

    const d = `M ${startX},${startY} A ${circle.r} ${circle.r} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endX},${endY}`;
    setD(d);

    if (arcAngel - curAngle >= angle) {
      curAngle = arcAngel;
      cur.current = next;
      setCurState(next);
    }
  };

  useEffect(() => {
    props.changekind(curState);
  }, [curState]);

  // 切换领域和圆心大小时重新开始旋转
  useEffect(() => {
    cur.current = 0;
    setCurState(0);
    props.changekind(0);
    getOptions();
    if (props.isAnimate) {
      onStart();
    } else {
      paint();
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [props.area, circle, props.isAnimate]);

  // 根据窗口大小适配圆形转盘大小 // TODO 这个监听可以用一下防抖或节流
  useEffect(() => {
    const $box = boxRef?.current;
    const observer = new ResizeObserver(function (mutations, observer) {
      mutations.forEach(function (target) {
        let { width, height } = target.contentRect;
        let len = Math.min(width, height);
        let r;
        if (height > width) {
          r = (len * 0.4).toFixed(2);
        } else {
          r = Math.max(180, len / 3);
        }
        setCircle({ cx: r + 20, cy: r + 20, r: r });
      });
    });
    observer.observe($box);
    return () => {
      observer.unobserve($box);
    };
  }, []);

  const getInfo = () => {
    const id = curState + 1;
    let icon = `icon-${area}-${id}`;
    return (
      <article className={styles.info}>
        <div>
          <i className={`${styles.icon} ${styles[icon]}`} />
          <span
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: formatMessage({ id: `home.application.${area}${id}.name` }, { tag: '' }),
            }}
          ></span>
        </div>
        <p className={styles.desc}>{formatMessage({ id: `home.application.${area}${id}.desc` })}</p>
      </article>
    );
  };

  const changeColor = (idx, isLight) => {
    let icon = icons.current.querySelectorAll('i[class^=icon]')?.[idx];
    let name = `icon-${area}-${idx + 1}${isLight ? '-blue' : ''}`;
    icon.className = `${styles.icon} ${styles[name]}`;
  };

  // 停止定时器
  const onStop = (idx) => {
    changeColor(idx, true);
    if (timer.current) {
      clearInterval(timer.current);
    }
    cur.current = idx - 1;
    setCurState(idx - 1);
    curAngle = startAngle + (idx - 1) * angle;
    arcAngel = curAngle + angle;
    paint();
  };

  // 开启定时器
  const onStart = (idx) => {
    if (idx || idx === 0) {
      changeColor(idx);
    }
    curAngle = arcAngel = startAngle + cur.current * angle;
    paint();
    timer.current = setInterval(() => {
      paint();
    }, duration / (angle / degree));
  };

  return (
    <div className={`${styles.right} ${styles[formatMessage({ id: 'page.css.page' })]}`} id="box" ref={boxRef}>
      <div className={styles.box} style={{ width: 2 * circle.cx + 'px', height: 2 * circle.cy + 'px' }}>
        <svg id={styles.svg} viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle id={styles.bar} r={circle.r} cx={circle.cx} cy={circle.cy}></circle>
          <path d={d} fill="none" stroke="#fff" strokeWidth="2" />
          {points.map(({ x, y }, idx) => (
            <g key={x + y + idx}>
              <circle key={x + y + idx + 'dot'} r="4" cx={x} cy={y} fill="#fff"></circle>
              {curState === idx ? (
                <circle key="circle" r="15" cx={x} cy={y} fill="transparent" stroke="#51A8DE"></circle>
              ) : null}
            </g>
          ))}
        </svg>
        <ul ref={icons}>
          {items.map(({ itemX, itemY, id }, idx) => {
            let icon = `icon-${area}-${idx + 1}`;
            return (
              <li
                key={id}
                className={styles.item}
                style={{ top: itemY, left: itemX }}
                onMouseOver={() => onStop(idx)}
                onMouseOut={() => onStart(idx)}
              >
                <i className={`${styles.icon} ${styles[icon]}`} />
                <span
                  className={styles.text}
                  dangerouslySetInnerHTML={{
                    __html: formatMessage({ id: `home.application.${area}${id}.name` }, { tag: '<br/>' }),
                  }}
                ></span>
              </li>
            );
          })}
        </ul>
        {getInfo()}
      </div>
    </div>
  );
};

export default TurnTable;
