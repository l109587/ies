import React, { useState, useRef } from 'react';
import styles from './index.less';
import { Input } from 'antd';

export default function (props) {
  return <Input className={styles.inputItem} {...props} />;
}
