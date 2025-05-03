import React, { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import { NewsList, MonthEnglish } from '@/utils/constant';
import { useParams } from 'umi';
import { getNewsList } from '@/services/api';
import styles from './index.less';
import { disassembleDate } from '@/utils/common';

export default function News() {
  const [cur, setCur] = useState('dynamic');
  const params = useParams();
  const [data, setData] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    if (params.type) {
      setCur(params.type);
    }
  }, [params.type]);

  useEffect(() => {
    if (!data[cur]) {
      getNewsList({
        pageIndex: 1,
        pageSize: 200,
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
    <>
      <Menu />
      <Header name="news" bg="/news.png" />
      <div className={styles.news}>
        <div className={styles.container}>
          <ul className={styles.nav}>
            {NewsList.map((item) => (
              <li
                key={item.key}
                className={`${styles.navItem} ${cur === item.key ? styles.active : ''}`}
                onClick={() => {
                  setCur(item.key);
                }}
              >
                <h2 className={styles.name}>{item.name}</h2>
                <h4 className={styles.subName}>{item.subName}</h4>
              </li>
            ))}
          </ul>
          <ul className={styles.list}>
            {list.map((item, idx) => {
              let { id, title, source, url, cover, publishTime } = item;
              let { year, month, day } = disassembleDate(publishTime, MonthEnglish);
              return (
                <li
                  key={id}
                  onClick={() => handleNewClick(url)}
                  className={styles.newsItem}
                  style={{ msGridColumns: idx + 1 }}
                >
                  <img src={cover} alt="news" className={styles.img} />
                  <div className={styles.newContent}>
                    <div className={styles.info}>
                      <p className={styles.day}>{day}</p>
                      <div className={styles.date}>
                        <p>{month}</p>
                        <p>{year}</p>
                      </div>
                      <div className={styles.origin}>
                        <p className={styles.title}>来源</p>
                        <p className={styles.value}>{source}</p>
                      </div>
                    </div>
                    <p>{title}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
