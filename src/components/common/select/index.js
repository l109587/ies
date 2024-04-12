import { useState, useEffect } from 'react';
import leftArrow from '../../../assets/icon/leftarrow.png';
import rightArrow from '../../../assets/icon/rightarrow.png';
import leftArrowd from '../../../assets/icon/leftarrow_dark.png';
import rightArrowd from '../../../assets/icon/rightarrow_dark.png';
/*
    点击选择器
    data：选择数据 
    label：选择名称
    value：选择的值
    fetValue：传出的value值
*/
const Select = (props) => {
  const {
    data = [],
    formRef,
    itemName,
    width = 187,
    defaultValue = 'system',
  } = props;
  const defaultIndex = data.findIndex((item) => item.value === defaultValue);
  const [index, setIndex] = useState(defaultIndex > 0 ? defaultIndex : 0);
  const name = 'bg-input';
  useEffect(() => {
    formRef.setFieldsValue({ [itemName]: data[index].value });
  }, [index]);
  const prev = () => {
    const newIndex = index <= 0 ? 0 : index - 1;
    setIndex(newIndex);
  };
  const next = () => {
    const newIndex = index >= data.length - 1 ? index : index + 1;
    setIndex(newIndex);
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#fff',
        width: width - 10,
        height: 45,
        background:
          'url(' +
          require('../../../assets/img/' + name + '.png') +
          ') no-repeat',
        backgroundSize: '100% 100%',
        padding: '0 5px',
      }}
    >
      <div
        onClick={prev}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: index === 0 ? 'not-allowed' : 'pointer',
        }}
      >
        <img
          src={index === 0 ? leftArrowd : leftArrow}
          alt=""
          style={{ height: 24, width: 16 }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>{data[index].label}</div>
      <div
        onClick={next}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: index === data.length - 1 ? 'not-allowed' : 'pointer',
        }}
      >
        <img
          src={index === data.length - 1 ? rightArrowd : rightArrow}
          alt=""
          style={{ height: 24, width: 16 }}
        />
      </div>
    </div>
  );
};
export default Select;
