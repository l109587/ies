import { useState } from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import Iconinfo from '@/assets/icon/icon_info.png';
import update from '@/assets/img/update/update.png';
import restart from '@/assets/img/update/restart.png';
import shutdown from '@/assets/img/update/shutdown.png';
import { Modal } from '@/components/common';
import { language } from '@/utils/utils';

export default function () {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [restartOpen, setRestartOpen] = useState(false);
  const [shutdownOpen, setShutdownOpen] = useState(false);
  // 升级
  const updateHandel = () => {
    setUpdateOpen(true);
  };
  const upHandleOk = () => {
    setUpdateOpen(false);
  };
  const upHandleCancel = () => {
    setUpdateOpen(false);
  };
  // 重启
  const restartHandel = () => {
    setRestartOpen(true);
  };
  const reHandleOk = () => {
    setRestartOpen(false);
  };
  const reHandleCancel = () => {
    setRestartOpen(false);
  };
  //关机
  const shutdownHandel = () => {
    setShutdownOpen(true);
  };
  const downHandleOk = () => {
    setShutdownOpen(false);
  };
  const downHandleCancel = () => {
    setShutdownOpen(false);
  };
  return (
    <div style={{ padding: '30px 60px 0 60px' }}>
      <div>
        <Row className={styles.infoBox}>
          <Col span={8}>
            <div className={styles.infotitle}>
              {language('project.system.sysupdate.system')}
            </div>
          </Col>
          <Col span={16}>
            <div className={styles.infotext}>Neokylin V6.1(4.0.19)</div>
          </Col>
        </Row>
        <Row className={styles.infoBox}>
          <Col span={8}>
            <div className={styles.infotitle}>
              {language('project.system.sysupdate.version')}
            </div>
          </Col>
          <Col span={16}>
            <div className={styles.infotext}>
              北信源存储介质信息消除工具VRV IES V4.0
            </div>
          </Col>
        </Row>
        <Row className={styles.infoBox}>
          <Col span={8}>
            <div className={styles.infotitle}>
              {language('project.system.sysupdate.memory')}
            </div>
          </Col>
          <Col span={16}>
            <div className={styles.infotext}>
              大小(1910MB) 使用(481MB) 剩余(1428MB)
            </div>
          </Col>
        </Row>
        <Row className={styles.infoBox}>
          <Col span={8}>
            <div className={styles.infotitle}>
              {language('project.system.sysupdate.disk')}
            </div>
          </Col>
          <Col span={16}>
            <div className={styles.infotext}>
              容量(14G) 使用(13G) 剩余(1010MB)
            </div>
          </Col>
        </Row>
        <Row className={styles.infoBox}>
          <Col span={8}>
            <div className={styles.infotitle}>
              {language('project.system.sysupdate.runtime')}
            </div>
          </Col>
          <Col span={16}>
            <div className={styles.infotext}>0天0小时9分钟</div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <div className={styles.infotitle}>
              {language('project.system.sysupdate.updatelasttime')}
            </div>
          </Col>
          <Col span={16}>
            <div className={styles.infotext}>2022/10/10 10:00:00</div>
          </Col>
        </Row>
      </div>
      <div style={{ margin: '32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Iconinfo}></img>
          <span style={{ display: 'inline-block', marginLeft: 6 }}>
            {language('project.system.sysupdate.updatetip')}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <div onClick={updateHandel} className={styles.icon}>
            <img src={update} />
          </div>
          <div className={styles.imgText}>
            <span>{language('project.system.sysupdate.update')}</span>
          </div>
        </div>
        <div>
          <div onClick={restartHandel} className={styles.icon}>
            <img src={restart} />
          </div>
          <div className={styles.imgText}>
            <span>{language('project.system.sysupdate.restart')}</span>
          </div>
        </div>
        <div>
          <div onClick={shutdownHandel} className={styles.icon}>
            <img src={shutdown} />
          </div>
          <div className={styles.imgText}>
            <span>{language('project.system.sysupdate.shutdown')}</span>
          </div>
        </div>
      </div>
      <Modal
        title={language('project.system.sysupdate.updatetitle')}
        isModalOpen={updateOpen}
        handleOk={upHandleOk}
        handleCancel={upHandleCancel}
      >
        <div style={{ marginTop: 120, textAlign: 'center' }}>
          <span style={{ fontSize: 18, color: '#fff' }}>
            {language('project.system.sysupdate.updateinfo')}
          </span>
        </div>
      </Modal>
      <Modal
        title={language('project.system.sysupdate.restartitle')}
        isModalOpen={restartOpen}
        handleOk={reHandleOk}
        handleCancel={reHandleCancel}
      >
        <div style={{ marginTop: 120, textAlign: 'center' }}>
          <span style={{ fontSize: 18, color: '#fff' }}>
            {language('project.system.sysupdate.restartinfo')}
          </span>
        </div>
      </Modal>
      <Modal
        title={language('project.system.sysupdate.shutdowntitle')}
        isModalOpen={shutdownOpen}
        handleOk={downHandleOk}
        handleCancel={downHandleCancel}
      >
        <div style={{ marginTop: 120, textAlign: 'center' }}>
          <span style={{ fontSize: 18, color: '#fff' }}>
            系统将在<span style={{ color: '#fff700' }}>50秒</span>
            后关闭，您确定要关闭系统吗？
          </span>
        </div>
      </Modal>
    </div>
  );
}
