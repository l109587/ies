import { Space, Button } from 'antd';
import { Slider } from '@/components/common';
import { language } from '@/utils/utils';

export default function () {
  const getLoginCount = (value) => {};
  return (
    <div style={{ padding: '35px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Space direction="vertical" size={20}>
          <Slider
            min={1}
            max={5}
            defaultValue={2}
            unit={language('project.system.sysconfig.logintimesu')}
            getCount={getLoginCount}
            label={language('project.system.sysconfig.logintimes')}
            rangeText={language('project.system.sysconfig.logintimesr')}
          />
          <Slider
            min={5}
            max={120}
            defaultValue={5}
            unit={language('project.system.sysconfig.errortimeoutu')}
            getCount={getLoginCount}
            label={language('project.system.sysconfig.errortimeout')}
            rangeText={language('project.system.sysconfig.errortimeoutr')}
          />
          <Slider
            min={1}
            max={20}
            defaultValue={1}
            unit={language('project.system.sysconfig.pwdlengthu')}
            getCount={getLoginCount}
            label={language('project.system.sysconfig.pwdlength')}
            rangeText={language('project.system.sysconfig.pwdlengthr')}
          />
          <Slider
            min={10}
            max={120}
            defaultValue={10}
            unit={language('project.system.sysconfig.logoutimesu')}
            getCount={getLoginCount}
            label={language('project.system.sysconfig.logoutimes')}
            rangeText={language('project.system.sysconfig.logoutimesr')}
          />
          <Slider
            min={1}
            max={7}
            defaultValue={1}
            unit={language('project.system.sysconfig.modpwdcycleu')}
            getCount={getLoginCount}
            label={language('project.system.sysconfig.modpwdcycle')}
            rangeText={language('project.system.sysconfig.modpwdcycler')}
          />
          <Slider
            min={1}
            max={36}
            defaultValue={1}
            unit={language('project.system.sysconfig.logstoreu')}
            getCount={getLoginCount}
            label={language('project.system.sysconfig.logstore')}
            rangeText={language('project.system.sysconfig.logstorer')}
          />
          <Slider
            min={50}
            max={90}
            defaultValue={50}
            unit={language('project.system.sysconfig.logwarnu')}
            getCount={getLoginCount}
            label={language('project.system.sysconfig.logwarn')}
            rangeText={language('project.system.sysconfig.logwarnr')}
          />
          <Button
            style={{
              backgroundColor: '#11acfc',
              border: 0,
              color: '#fff',
              width: 100,
              height: 42,
              marginLeft: 130,
            }}
            onClick={() => {
              console.log('sdfsd');
            }}
          >
            {language('project.system.sysconfig.reset')}
          </Button>
        </Space>
      </div>
    </div>
  );
}
