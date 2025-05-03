import { getHonour, getTimeline } from '@/services/api';
import { useWow } from '@/utils/common';
import _debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

let yearTimes = 0,
  totalTimes = 0,
  yearsLen = 0,
  yearWidth = 0,
  showLength = 0;

export default function TimeLine(props) {
  const { formatMessage } = useIntl();
  const yearDataRef = useRef();
  const { curTimeLine } = props;
  const [curYear, setCurYear] = useState(null);
  const [lastYear, setLastYear] = useState(0);
  const [cur, setCur] = useState();
  const [showNextYearArr, setShowNextYearArr] = useState(false);
  const [showPreYearArr, setShowPreYearArr] = useState(false);
  const [width, setWidth] = useState(0); // 段宽度
  const [timelineData, setTimelineData] = useState(null);

  useEffect(() => {
    if (curTimeLine === 'timeline')
      getTimeline().then((res) => {
        if (!res.code) {
          setTimelineData(res.data);
        }
      });
    else
      getHonour().then((res) => {
        if (!res.code) {
          setTimelineData(res.data);
        }
      });
  }, [curTimeLine]);

  useEffect(() => {
    if (!timelineData) return;
    yearsLen = Object.keys(timelineData).length;
    setCur(yearsLen - 1);
    yearBoxSizeChange(); // TODO
    let year = Object.keys(timelineData)[yearsLen - 1];
    setCurYear(year);
    return () => {
      setWidth(0);
      setShowPreYearArr(false);
      setShowNextYearArr(false);
    };
  }, [timelineData]);

  const monthData = useMemo(() => {
    let cur = timelineData?.[curYear];
    let month = [];
    cur &&
      Object.getOwnPropertyNames(cur).forEach((key) => {
        month.push(
          <div className={styles.month + ' wow animate__fadeInUpSmall'} key={curTimeLine + key + curYear}>
            <p className={styles.name}>{formatMessage({ id: `about.aboutUs.month${key}` })}</p>
            <div className={styles.monthArr}>
              {cur[key].map((item, index) => {
                return (
                  <div className={styles.data} key={index}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>,
        );
      });
    return month;
  }, [curYear, timelineData]);

  useWow();

  const yearData = useMemo(() => {
    let years = [];
    timelineData &&
      Object.getOwnPropertyNames(timelineData).forEach((key, index) => {
        years.push(
          <div
            className={(key === curYear ? styles.current : '') + ' ' + styles.year}
            key={curTimeLine + key}
            id={curTimeLine + key}
            onClick={() => {
              setCurYear(key);
              setCur(index);
            }}
          >
            {key}
          </div>,
        );
      });
    return years;
  }, [curYear, timelineData]);

  useEffect(() => {
    let el = document.getElementById('circle');
    el.style.transition = 'left 1s';
    circle.style.left = `calc(${(cur + 0.5) * yearWidth}px)`;
  }, [cur]);

  const clickYearNext = () => {
    yearTimes++;
    if (yearTimes === totalTimes) {
      yearDataRef.current.style.transform = `translateX(${-(yearsLen - showLength) * 8}rem)`;
    } else {
      yearDataRef.current.style.transform = `translateX(${-(showLength * yearTimes) * yearWidth}px)`;
    }
    setShowPreYearArr(true);
    if (yearTimes === totalTimes) {
      setShowNextYearArr(false);
    }
  };

  const clickYearPre = () => {
    yearTimes--;
    yearDataRef.current.style.transform = `translateX(${-showLength * yearTimes * 8}rem)`;
    setShowNextYearArr(true);
    if (yearTimes === 0) {
      setShowPreYearArr(false);
    }
  };

  const yearBoxSizeChange = _debounce(() => {
    // 段宽度
    let width = document.getElementById('year')?.clientWidth;
    // 时间轴总宽度
    let totWidth = yearDataRef.current?.clientWidth;
    // 年宽度
    // let curScoll = document.getElementById(curTimeLine + curYear)?.clientWidth; // curYear还没生效
    // 年宽度
    yearWidth = totWidth / yearsLen;
    // 每段显示的年个数
    showLength = Math.round(width / yearWidth);
    // 总段数(从0开始) <=3 = 0; <=6 =1  ; <= 9 =2
    yearTimes = totalTimes = yearsLen ? Math.floor((yearsLen - 1) / showLength) : 0;
    setShowPreYearArr(totalTimes > 0);
    setShowNextYearArr(false);
    setWidth(width);
  }, 500);

  useEffect(() => {
    if (totalTimes > 0) {
      if (yearsLen - showLength <= showLength) {
        yearDataRef.current.style.transform = `translateX(${-(yearsLen - showLength) * yearWidth}px)`;
      } else {
        yearDataRef.current.style.transform = `translateX(${-(yearsLen - showLength) * 8}rem)`;
      }
    } else if (totalTimes === 0) {
      yearDataRef.current.style.transform = `translateX(${0}px)`;
    }
    let circle = document.getElementById('circle');
    yearDataRef.current.clientWidth;
    circle.style.left = `calc(${(cur + 0.5) * yearWidth}px)`;
  }, [width]);

  useEffect(() => {
    if (!curYear || lastYear) return;
    setLastYear(curYear);
    yearBoxSizeChange();
    window.addEventListener('resize', yearBoxSizeChange);
    return () => window.removeEventListener('resize', yearBoxSizeChange);
  }, [curYear, timelineData]);

  return (
    <div className={styles.timeLine}>
      <div className={styles.years}>
        <div className={styles.box} id="year">
          <div className={styles.yearsBox} ref={yearDataRef}>
            {yearData}
            <div className={styles.circle} id="circle"></div>
          </div>
        </div>
        {showNextYearArr ? (
          <div className={styles.yearArrNext + ' ' + styles.arrIcon} onClick={clickYearNext}></div>
        ) : null}
        {showPreYearArr ? (
          <div className={styles.yearArrPre + ' ' + styles.arrIcon} onClick={clickYearPre}></div>
        ) : null}
      </div>
      <div className={styles.monthDataBox} id="monthDataBox">
        {monthData}
        <div className={styles.content}>{curYear}</div>
      </div>
    </div>
  );
}
