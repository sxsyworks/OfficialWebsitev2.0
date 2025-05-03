import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { getNewsList } from '@/services/api';
import { disassembleDate } from '@/utils/common';
import { NewsList, MonthEnglish } from '@/utils/constant';
import styles from './index.less';

export default function NewsIndex() {
  const [cur, setCur] = useState('dynamic');
  const [list, setList] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!data[cur]) {
      getNewsList({
        pageIndex: 1,
        pageSize: 3,
        type: cur,
      }).then((res) => {
        if (!res.code) {
          const newList = res.data?.list;
          setList(newList);
          setData({ ...data, [cur]: newList });
        }
      });
      return false;
    }
    setList(data[cur]);
  }, [cur]);

  // 新窗口外链到新闻详情页
  const handleNewClick = (path) => {
    window.open(path);
  };
  return (
    <div className={styles.newsIndex}>
      <div className={styles.title}>
        新闻资讯
        <p className={styles.subTitle}>NEWS &amp; UPDATES</p>
      </div>
      <div className={styles.content}>
        <div className={styles.type}>
          {NewsList.map((item, index) => {
            return (
              <div
                key={index}
                className={`${styles.typeItem} ${cur === item.key ? styles.active : ''}`}
                onClick={() => {
                  setCur(item.key);
                }}
              >
                {item.name}
              </div>
            );
          })}
          <Link to={'/news/' + cur}>
            <div className={styles.moreBtn}>查看更多</div>
          </Link>
        </div>
        <ul className={styles.list}>
          {list.map((item) => {
            let { id, title, source, url, cover, publishTime } = item;
            let { year, month, day } = disassembleDate(publishTime, MonthEnglish);
            return (
              <li key={id} onClick={() => handleNewClick(url)} className={styles.newsItem}>
                <img src={cover} alt="news" className={styles.img} />
                <div className={styles.info}>
                  <p className={styles.day}>{day}</p>
                  <div className={styles.date}>
                    <p>{month}</p>
                    <p>{year}</p>
                  </div>
                  <div className={styles.origin}>
                    <p>来源</p>
                    <p className={styles.value}>{source}</p>
                  </div>
                </div>
                <p>{title}</p>
                <div className={styles.btn}>阅读全文</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
