import { useEffect, useState, memo } from 'react';
import moment from 'moment';
import { language } from '@/utils/utils';

const Footer = () => {
  const [timer, setTimer] = useState('');
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRefresh((r) => r + 1);
      setTimer(moment(new Date().getTime()).format('YYYY/MM/DD HH:mm:ss'));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [refresh]);
  return (
    <div style={{ lineHeight: '46px' }}>
      {language('project.systime')}
      {timer}
    </div>
  );
};

export default memo(Footer);
