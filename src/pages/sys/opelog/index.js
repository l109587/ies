import { useState } from 'react';
import { Table, Modal } from '@/components/common';
import { Spin } from 'antd';
import infoIcon from '@/assets/icon/icon_info_big.png';
import errorIcon from '@/assets/icon/icon_error.png';
import successIcon from '@/assets/icon/icon_success.png';
export default function () {
  const [importOpen, setImportOpen] = useState(false);
  const [importStatus, setImportStatus] = useState('usb');
  const [isInsertUsb, setIsInsertUsb] = useState(false);
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
      title: '动作',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: '时间',
      key: 'time',
      dataIndex: 'time',
    },
  ];
  const onImport = () => {
    //首先检查是否插入了usb
    let isusb = true;
    setIsInsertUsb(isusb);
    setImportOpen(true);
  };
  const onExport = () => {};
  //关闭弹窗
  const closeImportModal = () => {
    setImportOpen(false);
  };
  const handleImportOk = () => {
    if (importStatus === 'usb') {
      if (isInsertUsb) {
        //开始导入，调用导入接口
        setImportStatus('loading');
        setTimeout(() => {
          setImportStatus('success');
        }, 3000);
      } else {
        setImportStatus('error');
      }
    } else {
      setImportOpen(false);
      setImportStatus('usb');
    }
  };
  return (
    <div style={{ height: '100%' }}>
      <Table
        columns={columns}
        showEI={true}
        onImport={onImport}
        onExport={onExport}
        rowSelection={false}
        isShowDatepick={true}
        isShowSearch={true}
      ></Table>
      <Modal
        title="导入提示"
        isModalOpen={importOpen}
        handleOk={handleImportOk}
        handleCancel={closeImportModal}
        footer={importStatus !== 'loading'}
        cancelBtn={importStatus === 'usb'}
      >
        {importStatus === 'usb' && (
          <div
            style={{
              marginTop: 120,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={infoIcon} style={{ width: 40 }} alt="" />
            <div
              style={{
                fontSize: 18,
                color: '#fff',
                lineHeight: '40px',
                marginLeft: 16,
              }}
            >
              请确认是否插入U盘
            </div>
          </div>
        )}

        {importStatus === 'loading' && (
          <div
            style={{
              marginTop: 145,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Spin size="large" />
            <div
              style={{
                fontSize: 18,
                color: '#fff',
                lineHeight: '38px',
                marginLeft: 16,
              }}
            >
              正在导入，请稍后...
            </div>
          </div>
        )}
        {importStatus === 'success' && (
          <div
            style={{
              marginTop: 120,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={successIcon} style={{ width: 40 }} alt="" />
            <div
              style={{
                fontSize: 18,
                color: '#fff',
                lineHeight: '40px',
                marginLeft: 16,
              }}
            >
              导入成功
            </div>
          </div>
        )}
        {importStatus === 'error' && (
          <div
            style={{
              marginTop: 120,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={errorIcon} style={{ width: 40, height: 40 }} alt="" />
            <div style={{ marginLeft: 16 }}>
              <div style={{ fontSize: 18, color: '#fff', marginBottom: 6 }}>
                导入失败
              </div>
              <div style={{ color: 'rgba(255,255,255,.8)' }}>
                U盘已拔出，请确认U盘已插入后重新导入
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
