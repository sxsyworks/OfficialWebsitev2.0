import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default () => (
  <div className={styles.loading}>
    <div>
      <Spin />
      <p className={styles.text}>The page is Loading...</p>
    </div>
  </div>
);
