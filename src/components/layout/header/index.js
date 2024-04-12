import React, { useState, useRef } from 'react';
import styles from './index.less';
import { Button, Popover, Dropdown, Form, Input } from 'antd';
import { history } from 'umi';
import { language } from '@/utils/utils';

import pronamec from '@/assets/img/pronamec.png';
import arrowIcon from '@/assets/img/arrow.png';
import lockIcon from '@/assets/icon/icon_lock.png';
import exitIcon from '@/assets/icon/icon_exit.png';

import { KeyBoard, Modal, InputBox } from '@/components/common';

export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ispassModalOpen, setIspassModalOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [pwdform] = Form.useForm();
  const items = [
    {
      key: '1',
      label: (
        <div
          style={{ display: 'flex', justifyContent: 'center' }}
          onClick={() => {
            setIspassModalOpen(true);
          }}
        >
          <div style={{ display: 'flex', width: 95 }}>
            <div className={styles.icon}>
              <img src={lockIcon} />
            </div>
            <span>{language('project.modpwd')}</span>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          style={{ display: 'flex', justifyContent: 'center' }}
          onClick={() => {
            // history.push('/login');
            setIsModalOpen(true);
          }}
        >
          <div style={{ display: 'flex', width: 90 }}>
            <div className={styles.icon}>
              <img src={exitIcon} />
            </div>
            <span>{language('project.logout')}</span>
          </div>
        </div>
      ),
    },
  ];
  //修改密码
  const handlepassOk = () => {
    pwdform.validateFields().then((values) => {
      // values就是表单中输入的值
      setIspassModalOpen(false);
      setKeyboardOpen(false);
      pwdform.resetFields();
    });
  };
  const handlepassCancel = () => {
    setKeyboardOpen(false);
    setIspassModalOpen(false);
    pwdform.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setKeyboardOpen(false);
    history.push('/login');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '0 30px 0 24px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#fff',
        }}
      >
        <div style={{ width: 110 }}>
          <img src={pronamec} />
        </div>

        <div>
          <span style={{ fontSize: 26, fontWeight: 500 }}>
            {language('project.productname')}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            width: 110,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 16 }}>您好，sys</div>
          <div className={styles.dropdownbox}>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
              overlayClassName={styles.dropdown}
              trigger="click"
            >
              <div style={{ cursor: 'pointer' }}>
                <img
                  style={{ width: 20, height: 20 }}
                  alt="arrowIcon"
                  src={arrowIcon}
                ></img>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      <Modal
        title={language('project.logoutip')}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <div style={{ marginTop: 120, textAlign: 'center' }}>
          <span style={{ fontSize: 18, color: '#fff' }}>
            {language('project.logoutipinfo')}
          </span>
        </div>
      </Modal>
      <Modal
        title={language('project.modpwd')}
        isModalOpen={ispassModalOpen}
        handleOk={handlepassOk}
        handleCancel={handlepassCancel}
      >
        <Form
          name="basic"
          form={pwdform}
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 17,
          }}
          autoComplete="off"
          className={styles.pwdform}
          colon={false}
        >
          <Form.Item
            label={language('project.oldpwd')}
            name="oldpwd"
            rules={[
              {
                required: true,
                message: language('project.required'),
              },
            ]}
          >
            <Input.Password
              placeholder={language('project.oldpwdpd')}
              className={styles.inputItem}
              style={{ width: 317 }}
              onClick={() => {
                setKeyboardOpen(true);
                setItemName('oldpwd');
              }}
            />
          </Form.Item>
          <Form.Item
            label={language('project.newpwd')}
            name="newpwd"
            rules={[
              {
                required: true,
                message: language('project.required'),
              },
            ]}
          >
            <Input.Password
              placeholder={language('project.newpwdpd')}
              className={styles.inputItem}
              style={{ width: 317 }}
              onClick={() => {
                setKeyboardOpen(true);
                setItemName('newpwd');
              }}
            />
          </Form.Item>
          <Form.Item
            label={language('project.repwd')}
            name="repwd"
            rules={[
              {
                required: true,
                message: language('project.required'),
              },
            ]}
          >
            <Input.Password
              placeholder={language('project.repwdpd')}
              className={styles.inputItem}
              style={{ width: 317 }}
              onClick={() => {
                setKeyboardOpen(true);
                setItemName('repwd');
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <KeyBoard
        keyboardOpen={keyboardOpen}
        setKeyboardOpen={setKeyboardOpen}
        formref={pwdform}
        itemname={itemName}
      />
    </div>
  );
};
