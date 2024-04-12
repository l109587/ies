import { useState } from 'react';
import { Drawer, Form, Row, Col, Space, notification, Progress } from 'antd';
import { InfoCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import styles from './index.less';
import classnames from 'classnames';
import {
  InputText,
  Button,
  Modal,
  Select,
  InputBox,
  KeyBoard,
} from '@/components/common';

import hddOn from '@/assets/img/erase/hdd-on.png';
import hddOff from '@/assets/img/erase/hdd-off.png';
import usbOn from '@/assets/img/erase/usb-on.png';
import usbOff from '@/assets/img/erase/usb-off.png';
import eraseSet from '@/assets/img/erase/erase-set.png';
import eraseLoading from '@/assets/img/erase/erase-loading.png';
import eraseFinish from '@/assets/img/erase/erase-finish.png';
import { language } from '@/utils/utils';

export default function () {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const devInfos = [
    {
      id: '001',
      name: 'HDD1',
      status: 1,
      process: 0,
    },
    {
      id: '002',
      name: 'HDD2',
      status: 1,
      process: 0,
    },
    {
      id: '003',
      name: 'HDD3',
      status: 2,
      process: 10,
    },
    {
      id: '004',
      name: 'HDD4',
      status: 3,
      process: 0,
    },
    {
      id: '005',
      name: 'USB1',
      status: 0,
      process: 0,
    },
    {
      id: '006',
      name: 'USB2',
      status: 1,
      process: 0,
    },
    {
      id: '007',
      name: 'USB3',
      status: 2,
      process: 40,
    },
    {
      id: '008',
      name: 'USB4',
      status: 3,
      process: 0,
    },
  ];
  const statusMap = {
    0: language('project.erase.deverase.noinsert'),
    1: language('project.erase.deverase.noerase'),
    2: language('project.erase.deverase.erase'),
    3: language('project.erase.deverase.erasedown'),
  };
  const statusRender = (status, process) => {
    if (status !== 2) {
      return statusMap[status];
    } else {
      return `${statusMap[status]}${process}%`;
    }
  };
  const hdds = devInfos.slice(0, 4);
  const usbs = devInfos.slice(4);
  const [boxOpen, setBoxOpen] = useState(false);
  const [id, setId] = useState(''); //存id
  const [name, setName] = useState(''); //存name
  const [eraseOpen, setEraseOpen] = useState(false); //确定擦拭弹窗
  const [api, contextHolder] = notification.useNotification();
  const [formRef] = Form.useForm();
  const operateIcon = {
    0: '',
    1: eraseSet,
    2: eraseLoading,
    3: eraseFinish,
  };
  const classification = [
    { label: '高级', value: 'high' },
    { label: '中级', value: 'mid' },
    { label: '低级', value: 'low' },
  ];
  const types = [
    { label: 'SATA硬盘', value: 'sata' },
    { label: 'Z1DCJEH2', value: 'z1d' },
    { label: 'SDFSJEH2', value: 'sd' },
  ];
  const setErase = (id, name, status) => {
    setId(id);
    if (status === 0) {
      openNotification('未插入或未启动硬盘，请先启动硬盘。', 'error');
    } else {
      setName(name);
      setBoxOpen(true);
    }
  };
  const onClose = () => {
    setId('');
    setBoxOpen(false);
    formRef.resetFields();
  };
  //开始擦拭
  const start = () => {
    const values = formRef.getFieldsValue(true);
    setEraseOpen(true);
  };
  //确定擦拭
  const eraseHandleOk = () => {
    setEraseOpen(false);
  };
  //取消擦拭
  const eraseHandleCancel = () => {
    setEraseOpen(false);
  };
  //提示框
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
  return (
    <div>
      {contextHolder}
      <div style={{ padding: '40px 30px 0' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: 48,
          }}
        >
          {hdds.map((item, index) => {
            return (
              <div key={item.id}>
                <div
                  style={{
                    position: 'relative',
                    width: 160,
                    cursor: 'pointer',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setErase(item.id, item.name, item.status);
                    formRef.resetFields();
                  }}
                >
                  <div
                    style={{
                      marginBottom: 6,
                      height: 127,
                    }}
                    className={classnames({ [styles.devItem]: item.id === id })}
                  >
                    <div style={{ position: 'absolute', left: 60 }}>
                      {item.name}
                    </div>
                    <div style={{ position: 'absolute', top: 68, left: 116 }}>
                      <img
                        className={
                          item.status === 2 ? styles.eraseLoading : null
                        }
                        src={operateIcon[item.status]}
                      ></img>
                    </div>
                    <div>
                      {item.status !== 0 ? (
                        <div>
                          <img src={hddOn} />
                        </div>
                      ) : (
                        <div>
                          <img src={hddOff} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ position: 'relative' }}>
                  <Progress
                    percent={item.process}
                    showInfo={false}
                    size={[160, 21]}
                    className={styles.progress}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 3,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      margin: 'auto',
                      textAlign: 'center',
                      fontSize: 14,
                    }}
                  >
                    <span>{statusRender(item.status, item.process)}</span>
                  </div>
                </div>
                {item.process > 0 && (
                  <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 14 }}>
                    <div>{language('project.erase.deverase.speed')}98M/s</div>
                    <div>
                      {language('project.erase.deverase.remain')}2小时10分10秒
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: 40,
          }}
        >
          {usbs.map((item, index) => {
            return (
              <div>
                <div
                  style={{
                    position: 'relative',
                    width: 160,
                    cursor: 'pointer',
                  }}
                  key={item.id}
                  onClick={() => {
                    setErase(item.id, item.name, item.status);
                  }}
                >
                  <div
                    style={{
                      height: 127,
                      marginBottom: 6,
                    }}
                    className={classnames({ [styles.devItem]: item.id === id })}
                  >
                    <div style={{ position: 'absolute', left: 60 }}>
                      {item.name}
                    </div>
                    <div style={{ position: 'absolute', top: 68, left: 103 }}>
                      <img
                        className={
                          item.status === 2 ? styles.eraseLoading : null
                        }
                        src={operateIcon[item.status]}
                      ></img>
                    </div>
                    <div>
                      {item.status !== 0 ? (
                        <div>
                          <img src={usbOn} />
                        </div>
                      ) : (
                        <div>
                          <img src={usbOff} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ position: 'relative' }}>
                  <Progress
                    percent={item.process}
                    showInfo={false}
                    size={[160, 21]}
                    className={styles.progress}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 3,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      margin: 'auto',
                      textAlign: 'center',
                      fontSize: 14,
                    }}
                  >
                    {statusRender(item.status, item.process)}
                  </div>
                </div>
                {item.process > 0 && (
                  <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 14 }}>
                    <div>{language('project.erase.deverase.speed')}98M/s</div>
                    <div>
                      {language('project.erase.deverase.remain')}2小时10分10秒
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          marginLeft: 24,
          height: 40,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <InfoCircleFilled
          style={{ color: '#e6a23c', fontSize: '20px', marginRight: 5 }}
        />
        <span>{language('project.erase.deverase.eraseinfo')}</span>
      </div>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={boxOpen}
        className={styles.eraseDrawer}
        height={348}
        destroyOnClose={true}
        mask={false}
        push={{ distance: 280 }}
        // push={true}
      >
        <div>
          <div style={{ fontWeight: 700, padding: '0 15px' }}>
            {name}
            {language('project.erase.deverase.erasetitle')}
          </div>
          <div style={{ padding: '50px 0 24px 0' }}>
            <Form
              name="normal_form"
              form={formRef}
              className={styles.eraseform}
              // initialValues={{ remember: true }}
              style={{ color: '#fff' }}
              layout="inline"
              colon={false}
            >
              <Form.Item
                name="id"
                label={language('project.erase.deverase.eraseid')}
                labelCol={{
                  span: 6,
                }}
              >
                {/* <InputText
                  itemname="id"
                  formref={formRef}
                  width={170}
                  placeholder={language('project.erase.deverase.eraseidpd')}
                /> */}
                <InputBox
                  placeholder={language('project.erase.deverase.eraseidpd')}
                  style={{ width: 240 }}
                  onClick={() => {
                    setKeyboardOpen(true);
                    setItemName('id');
                    console.log(
                      formRef.getFieldInstance('capacity'),
                      'instance',
                    );
                    // formRef.getFieldInstance('capacity').focus()
                  }}
                  formRef={formRef}
                />
              </Form.Item>
              <Form.Item
                name="level"
                label={language('project.erase.deverase.level')}
                labelCol={{
                  span: 6,
                }}
              >
                <Select
                  data={classification}
                  formRef={formRef}
                  width={240}
                  itemName="level"
                />
              </Form.Item>
              <Form.Item
                name="type"
                label={language('project.erase.deverase.type')}
                labelCol={{
                  span: 8,
                }}
              >
                <Select
                  data={types}
                  formRef={formRef}
                  width={240}
                  itemName="type"
                />
              </Form.Item>
              <Form.Item
                name="capacity"
                label={language('project.erase.deverase.capacity')}
                labelCol={{
                  span: 6,
                }}
              >
                {/* <InputText
                  itemname="capacity"
                  formref={formRef}
                  width={170}
                  placeholder={language('project.erase.deverase.capacitypd')}
                /> */}
                <InputBox
                  placeholder={language('project.erase.deverase.capacitypd')}
                  style={{ width: 240 }}
                  onClick={() => {
                    setKeyboardOpen(true);
                    setItemName('capacity');
                  }}
                  formRef={formRef}
                />
              </Form.Item>
              <Form.Item
                name="name"
                label={language('project.erase.deverase.name')}
                labelCol={{
                  span: 6,
                }}
              >
                {/* <InputText
                  itemname="name"
                  formref={formRef}
                  width={170}
                  placeholder={language('project.erase.deverase.namepd')}
                /> */}
                <InputBox
                  placeholder={language('project.erase.deverase.namepd')}
                  style={{ width: 240 }}
                  onClick={() => {
                    setKeyboardOpen(true);
                    setItemName('name');
                  }}
                  formRef={formRef}
                />
              </Form.Item>
              <Form.Item
                name="department"
                label={language('project.erase.deverase.department')}
                labelCol={{
                  span: 8,
                }}
              >
                {/* <InputText
                  itemname="department"
                  formref={formRef}
                  width={170}
                  placeholder={language('project.erase.deverase.departmentpd')}
                /> */}
                <InputBox
                  placeholder={language('project.erase.deverase.departmentpd')}
                  style={{ width: 240 }}
                  onClick={() => {
                    setKeyboardOpen(true);
                    setItemName('department');
                  }}
                  formRef={formRef}
                />
              </Form.Item>
              <Form.Item
                name="respon"
                label={language('project.erase.deverase.respon')}
                labelCol={{
                  span: 6,
                }}
              >
                {/* <InputText
                  itemname="respon"
                  formref={formRef}
                  width={170}
                  placeholder={language('project.erase.deverase.responpd')}
                /> */}
                <InputBox
                  placeholder={language('project.erase.deverase.responpd')}
                  style={{ width: 240 }}
                  onClick={() => {
                    setKeyboardOpen(true);
                    setItemName('respon');
                  }}
                  formRef={formRef}
                />
              </Form.Item>
              <Form.Item
                name="dis"
                label={language('project.erase.deverase.dis')}
                labelCol={{
                  span: 6,
                }}
              >
                {/* <InputText
                  itemname="dis"
                  formref={formRef}
                  width={170}
                  placeholder={language('project.erase.deverase.dispd')}
                /> */}
                <InputBox
                  placeholder={language('project.erase.deverase.dispd')}
                  style={{ width: 240 }}
                  onClick={() => {
                    setKeyboardOpen(true);
                    setItemName('dis');
                  }}
                  formRef={formRef}
                />
              </Form.Item>
              <Form.Item
                name="purpose"
                label={language('project.erase.deverase.purpose')}
                labelCol={{
                  span: 8,
                }}
              >
                {/* <InputText
                  itemname="purpose"
                  formref={formRef}
                  width={170}
                  placeholder={language('project.erase.deverase.purposepd')}
                /> */}
                <InputBox
                  placeholder={language('project.erase.deverase.purposepd')}
                  style={{ width: 240 }}
                  onClick={() => {
                    setKeyboardOpen(true);
                    setItemName('purpose');
                  }}
                  formRef={formRef}
                />
              </Form.Item>
              <div style={{ width: '100%', textAlign: 'right', marginTop: 9 }}>
                <Space
                  align="end"
                  size={20}
                  style={{ textAlign: 'right', padding: '0 15px' }}
                >
                  <Button
                    type="cancel"
                    onClick={() => {
                      setKeyboardOpen(false);
                      setBoxOpen(false);
                      setId('');
                      formRef.resetFields();
                    }}
                  >
                    {language('project.erase.deverase.erasecancel')}
                  </Button>
                  <Button type="ok" onClick={start}>
                    {language('project.erase.deverase.erasestart')}
                  </Button>
                </Space>
              </div>
            </Form>
          </div>
          <Modal
            title={language('project.erase.deverase.erasetip')}
            isModalOpen={eraseOpen}
            handleOk={eraseHandleOk}
            handleCancel={eraseHandleCancel}
          >
            <div style={{ marginTop: 120, textAlign: 'center' }}>
              <span style={{ fontSize: 18, color: '#fff' }}>
                {language('project.erase.deverase.erasetipinfo')}
              </span>
            </div>
          </Modal>
        </div>
        <KeyBoard
          keyboardOpen={keyboardOpen}
          setKeyboardOpen={setKeyboardOpen}
          formref={formRef}
          itemname={itemName}
        />
      </Drawer>
    </div>
  );
}
