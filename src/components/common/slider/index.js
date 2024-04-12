import { useState } from 'react';
import leftArrow from '../../../assets/icon/leftarrow.png';
import rightArrow from '../../../assets/icon/rightarrow.png';
import rightArrowd from '../../../assets/icon/rightarrow_dark.png';
import leftArrowd from '../../../assets/icon/leftarrow_dark.png';
import { Slider } from 'antd';
import styles from './index.less';
/* 
    滑动型输入器，展示当前值和可选范围。
    min:最小值
    max：最大值
    unit：单位
*/
const Select = (props) => {
  const {
    min = 0,
    max = 20,
    unit = '次',
    defaultValue = 0,
    getCount,
    label,
    rangeText,
  } = props;
  const [number, setNumber] = useState(defaultValue);
  const name = 'bg-select';
  const prev = () => {
    const newNumber = number <= min ? min : number - 1;
    setNumber(newNumber);
  };
  const next = () => {
    const newNumber = number >= max ? max : number + 1;
    setNumber(newNumber);
  };
  const onChange = (newValue) => {
    setNumber(newValue);
  };
  getCount(number);
  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 115,
          justifyContent: 'flex-end',
          marginRight: 15,
        }}
      >
        {label}
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            width: 206,
            height: 45,
            background:
              'url(' + require('../../../assets/img/' + name + '.png') + ')',
          }}
        >
          <div
            onClick={prev}
            style={{
              width: 22,
              paddingLeft: 6,
              cursor: number === min ? 'not-allowed' : 'pointer',
            }}
          >
            <img
              src={number === min ? leftArrowd : leftArrow}
              alt=""
              style={{ width: '100%', height: 24, width: 16 }}
            />
          </div>
          <div style={{ width: 164, textAlign: 'center' }}>{number}</div>
          <div
            onClick={next}
            style={{
              width: 22,
              paddingRight: 6,
              cursor: number === max ? 'not-allowed' : 'pointer',
            }}
          >
            <img
              src={number === max ? rightArrowd : rightArrow}
              alt=""
              style={{ width: '100%', height: 24, width: 16 }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: 32,
          display: 'flex',
          alignItems: 'center',
          marginLeft: 8,
        }}
      >
        <span style={{ display: 'inline-block' }}>{unit}</span>
      </div>
      <div
        style={{ marginLeft: 14, width: 100, marginTop: 5 }}
        className={styles.slider}
      >
        <Slider
          min={min}
          max={max}
          onChange={onChange}
          value={typeof number === 'number' ? number : 0}
          tooltip={{
            open: false,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          color: '#bbbbbb',
          marginLeft: 15,
        }}
      >
        {rangeText}
      </div>
    </div>
  );
};
export default Select;
