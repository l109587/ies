import { useState } from 'react';
import { Form } from 'antd';
import {
  Table,
  Modal,
  InputText,
  Select,
  InputBox,
  KeyBoard,
} from '@/components/common';
import styles from './index.less';
import { language } from '@/utils/utils';
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '用户组',
    dataIndex: 'usergroup',
    key: 'usergroup',
  },
];
export default function () {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [addFormRef] = Form.useForm();
  const onAdd = () => {
    setAddModalOpen(true);
  };
  const onDel = (keys, rows) => {
    setSelectedKeys(keys);
    setSelectedRows(rows);
    setDelModalOpen(true);
  };
  const handleAddCancel = () => {
    setAddModalOpen(false);
    addFormRef.resetFields();
  };
  const handleAddOk = () => {
    addFormRef.validateFields().then((values) => {
      // values就是表单中输入的值
      setAddModalOpen(false);
      addFormRef.resetFields();
    });
  };
  const delHandleOk = () => {
    setDelModalOpen(false);
  };
  const delHandleCancel = () => {
    setDelModalOpen(false);
  };
  const userGroupType = [
    { label: '安全保密员', value: 'secure' },
    { label: '系统管理员', value: 'system' },
    { label: '区域管理员', value: 'region' },
  ];
  return (
    <div>
      <Table
        columns={columns}
        showAD={true}
        rowSelection={true}
        isShowSearch={true}
        onAdd={onAdd}
        onDelete={onDel}
        apiUrl="/cfg.php?controller=sys&action=getuserInfo"
      />
      <Modal
        title="添加用户"
        isModalOpen={addModalOpen}
        handleOk={handleAddOk}
        handleCancel={handleAddCancel}
      >
        <Form
          name="basic"
          form={addFormRef}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles.addFormRef}
          colon={false}
        >
          <Form.Item
            label={language('project.username')}
            name="username"
            rules={[
              {
                required: true,
                message: language('project.required'),
              },
            ]}
          >
            <InputBox
              placeholder={language('project.usernamepd')}
              style={{ width: 280 }}
              onClick={() => {
                setKeyboardOpen(true);
                setItemName('username');
              }}
              formRef={addFormRef}
            />
          </Form.Item>
          <Form.Item label="用户组" name="usergroup">
            <Select
              data={userGroupType}
              width={280}
              formRef={addFormRef}
              itemName="usergroup"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="删除用户"
        isModalOpen={delModalOpen}
        handleOk={delHandleOk}
        handleCancel={delHandleCancel}
      >
        <div style={{ marginTop: 120, textAlign: 'center' }}>
          <span style={{ fontSize: 18, color: '#fff' }}>
            你确定要删除选择的用户吗？
          </span>
        </div>
      </Modal>
      <KeyBoard
        keyboardOpen={keyboardOpen}
        setKeyboardOpen={setKeyboardOpen}
        formref={addFormRef}
        itemname={itemName}
      />
    </div>
  );
}
