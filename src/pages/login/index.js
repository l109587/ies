import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import { history } from 'umi';
import proname from '@/assets/img/proname.png';
import { KeyBoard } from '@/components/common';
import { getToken } from '@/services/login';
import { setToken } from '@/utils/store';
import { language } from '@/utils/utils';

const App = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [loginRef] = Form.useForm();
  useEffect(() => {
    fetchToken();
  }, []);
  const menuData = [
    {
      name: '系统升级',
      route: '/sys/sysupdate',
      icon: '',
    },
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
  const onFinish = (values) => {
    history.push(menuData[0].route);
  };

  const fetchToken = async () => {
    const res = await getToken();
    setToken(res.token);
  };

  return (
    <div className={styles.box}>
      <div
        className={styles.loginbox}
        style={{ position: 'relative', margin: '0 auto', width: 550, top: 230 }}
      >
        <div className={styles.logincontain}>
          <div style={{ marginBottom: 60 }}>
            <img src={proname} />
            <span className={styles.title}>
              {language('project.productname')}
            </span>
          </div>

          <Form
            name="normal_login"
            form={loginRef}
            className={styles.loginform}
            onFinish={onFinish}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
          >
            <Form.Item
              name="username"
              className={styles.formItem}
              label={language('project.username')}
            >
              <Input
                placeholder={language('project.username')}
                className={styles.inputItem}
                style={{ width: 290 }}
                onClick={() => {
                  setKeyboardOpen(true);
                  setItemName('username');
                }}
              />
            </Form.Item>
            <Form.Item name="password" label={language('project.password')}>
              <Input.Password
                placeholder={language('project.passwordpd')}
                className={styles.inputItem}
                style={{ width: 290 }}
                onClick={() => {
                  setKeyboardOpen(true);
                  setItemName('password');
                }}
              />
            </Form.Item>
            <Form.Item name="login">
              <Row>
                <Col offset={12}>
                  <Button
                    style={{
                      width: 290,
                      height: 50,
                      background: '#11acfc',
                      color: '#fff',
                      border: 0,
                      fontSize: 18,
                      borderRadius: 5,
                    }}
                    htmlType="submit"
                  >
                    {language('project.login')}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
      <KeyBoard
        keyboardOpen={keyboardOpen}
        setKeyboardOpen={setKeyboardOpen}
        formref={loginRef}
        itemname={itemName}
      />
    </div>
  );
};

export default App;
