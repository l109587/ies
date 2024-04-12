import { useState } from 'react';
import { Modal, Space } from 'antd';
import styles from './index.less';
import Button from '@/components/common/button';
import classnames from 'classnames';
/*
  弹窗
  title：弹窗标题
  isModalOpen：控制弹窗显隐
  handleOk：弹窗点击确定按钮返回的方法
  handleCancel：点击取消按钮返回的方法
  children：弹窗内容
  footer： 底部按钮
  cancelBtn：取消按钮
*/

export default function modal(props) {
  const {
    title,
    isModalOpen,
    handleOk,
    handleCancel,
    children,
    footer = true,
    cancelBtn = true,
  } = props;
  return (
    <div>
      <Modal
        title={title}
        open={isModalOpen}
        // onOk={handleOk}
        centered={true}
        wrapClassName={styles.modalbox}
        width={600}
        closable={false}
        footer={null}
        destroyOnClose={true}
        bodyStyle={{ display: 'flex', flexDirection: 'column' }}
      >
        {children}
        {footer && (
          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Space size={20}>
                {cancelBtn && (
                  <Button
                    type="cancel"
                    onClick={() => {
                      handleCancel();
                    }}
                  >
                    取消
                  </Button>
                )}
                <Button onClick={handleOk || handleCancel}>确认</Button>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
