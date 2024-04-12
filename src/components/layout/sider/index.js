import { Button } from 'antd';
import { history } from 'umi';

export default () => {
  const menuData = [
    {
      name: '修改密码',
      route: '/sys/modpass',
      icon: '',
    },
    {
      name: '操作日志',
      route: '/sys/opelog',
      icon: '',
    },
    {
      name: '用户管理',
      route: '/sys/usermanage',
      icon: '',
    },
  ];
  return (
    <div style={{ height: '100%', width: '100%' }}>
      {menuData.map((item, index) => (
        <div
          style={{
            width: '100%',
            height: 138,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderBottom: '1px solid #fff',
          }}
          onClick={() => {
            history.push(item.route);
          }}
        >
          <div style={{ fontSize: 16 }}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};
