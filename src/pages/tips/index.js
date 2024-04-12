import { useEffect } from 'react';
import styles from './index.less';
import proname from '@/assets/img/proname.png';
import { history } from 'umi';
import { language } from '@/utils/utils';

export default function () {
  const tipItems = [
    {
      id: '01',
      content: language('project.tipsfirst'),
    },
    {
      id: '02',
      content: language('project.tipssecond'),
    },
    {
      id: '03',
      content: language('project.tipsthird'),
    },
    {
      id: '04',
      content: language('project.tipsfourth'),
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      history.push('/login');
    }, 5000);
  });
  return (
    <div className={styles.box}>
      <div>
        <div>
          <div style={{ marginBottom: 54 }}>
            <img src={proname} />
            <span className={styles.title}>
              {language('project.productname')}
            </span>
          </div>
          <div className={styles.tipContain}>
            {tipItems.map((item, index) => (
              <div className={styles.tipItem} key={item.id}>
                <div>
                  <span
                    style={{
                      fontSize: 21,
                      color: '#fff',
                      display: 'inline-block',
                      marginLeft: 24,
                      marginRight: 31,
                    }}
                  >
                    {' '}
                    {index + 1}
                  </span>
                  <span style={{ fontSize: 21, color: '#fff' }}>
                    {item.content}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
