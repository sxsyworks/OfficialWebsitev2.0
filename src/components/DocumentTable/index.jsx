import { download } from '@/utils/common';
import { Button, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

const DocumentTable = (props) => {
  const { item } = props;
  const { formatMessage } = useIntl();
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    pageIndex: 1,
    pageSize: 5,
  });
  const [total, setTotal] = useState(5);

  useEffect(() => {
    const method = item['api'];
    // 建议三个接口返回格式统一
    if (item.showPagination) {
      method?.(pageInfo).then((res) => {
        if (!res.code) {
          setData(res.data?.list);
          setTotal(res?.data?.count);
        }
      });
      return;
    }
    method?.().then((res) => {
      if (!res.code) {
        setData(res.data);
      }
    });
  }, [pageInfo]);

  const getTableData = () => {
    return data.map((row) => {
      return (
        <div className={styles.tr} key={item.src}>
          {item?.columns?.map((it) => {
            if (it === 'download') {
              return (
                <a key={it} href="javascript:void(0)" className={styles.download} onClick={() => download(row.url)}></a>
              );
            }
            if (it === 'url') {
              return <a key={it} className={styles.view} onClick={() => window.open(row.url, '_blank')}></a>;
            }
            return (
              <div key={it} className={styles.row}>
                {it === 'publishTime' ? row[it]?.slice(0, 10) : row[it]}
              </div>
            );
          })}
        </div>
      );
    });
  };

  // 分页页数修改
  const onPageChange = (pageIndex) => {
    setPageInfo({ ...pageInfo, pageIndex });
  };

  // 分页自定义上下页名称
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <Button>{formatMessage({ id: 'btn.previous' })}</Button>;
    }
    if (type === 'next') {
      return <Button>{formatMessage({ id: 'btn.next' })}</Button>;
    }
    return originalElement;
  };

  return (
    <div className={styles.documentsTable} key={item.key}>
      <div className={styles.title}>
        {formatMessage({ id: `document.${item.key}.title` })}
        <p className={styles.subTitle}>{formatMessage({ id: `document.${item.key}.subtitle` })}</p>
      </div>
      <div className={styles.table}>
        <div className={styles.tr}>
          {item?.columns?.map((it) => {
            return (
              <div className={styles.column} key={it}>
                {it === 'title' ? '' : formatMessage({ id: 'document.table.' + it })}
              </div>
            );
          })}
        </div>
        {getTableData(item)}
        {item.showPagination ? (
          <div className={styles.pagination}>
            <Pagination
              defaultCurrent={1}
              total={total}
              pageSize={pageInfo.pageSize}
              onChange={onPageChange}
              itemRender={itemRender}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DocumentTable;
