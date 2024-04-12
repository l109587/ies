import { useState } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { Button, notification } from 'antd';
import { CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { language } from '@/utils/utils';

export default function () {
  const typeOptions = [
    {
      title: language('project.erase.seterase.00erase'),
      value: '00',
    },
    {
      title: language('project.erase.seterase.FFerase'),
      value: 'FF',
    },
    {
      title: language('project.erase.seterase.RAND'),
      value: 'rand',
    },
    {
      title: language('project.erase.seterase.00+FF'),
      value: '00andFF',
    },
    {
      title: language('project.erase.seterase.VSITR'),
      value: 'vsitr',
    },
    {
      title: language('project.erase.seterase.BMB21'),
      value: 'bmb21',
    },
    {
      title: language('project.erase.seterase.DOD5220'),
      value: 'dod',
    },
    {
      title: language('project.erase.seterase.NNSA'),
      value: 'nnsa',
    },
  ];
  const countOptions = [
    {
      title: language('project.erase.seterase.once'),
      value: '1',
    },
    {
      title: language('project.erase.seterase.twice'),
      value: '2',
    },
    {
      title: language('project.erase.seterase.three'),
      value: '3',
    },
    {
      title: language('project.erase.seterase.four'),
      value: '4',
    },
    {
      title: language('project.erase.seterase.five'),
      value: '5',
    },
    {
      title: language('project.erase.seterase.six'),
      value: '6',
    },
  ];
  const [type, setType] = useState(''); //选中模式
  const [count, setCount] = useState(''); //选中编数
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (text = '', type = 'success') => {
    if (type === 'success') {
      api.open({
        key: 'success',
        description: text,
        duration: 3,
        placement: 'top',
        style: {
          backgroundColor: '#dbf9d4',
          border: '1px solid #dbf9d4',
        },
        icon: (
          <CheckCircleFilled style={{ color: '#6fbd5e', fontSize: '20px' }} />
        ),
        className: styles.notice,
      });
    } else {
      api.open({
        key: 'error',
        description: text,
        duration: 3,
        placement: 'top',
        style: {
          backgroundColor: '#fdf6ec',
          border: '1px solid #fdf6ec',
        },
        icon: (
          <InfoCircleFilled style={{ color: '#e6a23c', fontSize: '20px' }} />
        ),
        className: styles.notice,
      });
    }
  };

  const onChangeType = (value) => {
    setType(value);
  };
  const onChangeCount = (value) => {
    setCount(value);
  };
  const handleOk = () => {
    openNotification('擦除设置已修改');
  };
  return (
    <div>
      {contextHolder}
      <div style={{ padding: '45px 115px' }}>
        <div style={{ display: 'flex', width: '100%', marginBottom: 26 }}>
          <div style={{ whiteSpace: 'nowrap', marginRight: 10, marginTop: 12 }}>
            {language('project.erase.seterase.mode')}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {typeOptions.map((item, index) => {
              return (
                <div
                  className={classnames(styles.select, {
                    [styles.selected]: type === item.value,
                  })}
                  onClick={() => {
                    onChangeType(item.value);
                  }}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', marginBottom: 26 }}>
          <div style={{ whiteSpace: 'nowrap', marginRight: 10, marginTop: 12 }}>
            {language('project.erase.seterase.times')}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {countOptions.map((item, index) => {
              return (
                <div
                  className={classnames(styles.select, {
                    [styles.selected]: count === item.value,
                  })}
                  onClick={() => {
                    onChangeCount(item.value);
                  }}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ marginLeft: 108, marginBottom: 50 }}>
          <Button
            style={{
              backgroundColor: '#11acfc',
              border: 0,
              color: '#fff',
              width: 146,
              height: 42,
            }}
            onClick={handleOk}
          >
            {language('project.erase.seterase.determine')}
          </Button>
        </div>
        <div style={{ display: 'flex', marginLeft: 60 }}>
          <div style={{ whiteSpace: 'nowrap' }}>
            {language('project.erase.seterase.illustrate')}
          </div>
          <div>
            <span>{language('project.erase.seterase.erasesetips')}</span>
            <br />
            <span>{language('project.erase.seterase.erasesetiptwo')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
