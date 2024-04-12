import styles from './index.less';
import classnames from 'classnames';
import { history, Location } from 'umi';
import iconMap from '@/utils/iconMap';

export default function () {
  const menuData = [
    {
      name: '系统升级',
      route: '/sys/sysupdate',
      icon: 'update',
    },
    {
      name: '设备擦除',
      route: '/user/deverase',
      icon: 'erase',
    },
    {
      name: '擦除设置',
      route: '/user/seterase',
      icon: 'seterase',
    },
    {
      name: '系统配置',
      route: '/sys/sysconfig',
      icon: 'sysconfig',
    },
    {
      name: '操作日志',
      route: '/sys/opelog',
      icon: 'log',
    },
    {
      name: '用户管理',
      route: '/sys/usermanage',
      icon: 'user',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {menuData.map((item, index) => {
          if (index == 0) {
            return (
              <div
                className={classnames(styles.menufir, {
                  [styles.menufiron]: item.route == history.location.pathname,
                })}
                onClick={() => {
                  history.push(item.route);
                }}
                key={item.route}
              >
                <div className={styles.icon}>
                  {item.icon && iconMap[item.icon]}
                </div>
                <div>{item.name}</div>
              </div>
            );
          } else {
            return (
              <div
                className={classnames(styles.menuitem, {
                  [styles.menuitemon]: item.route == history.location.pathname,
                })}
                onClick={() => {
                  history.push(item.route);
                }}
                key={item.route}
              >
                <div className={styles.icon}>
                  {item.icon && iconMap[item.icon]}
                </div>
                <div>{item.name}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
