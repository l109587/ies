import { useEffect, useRef, useState } from 'react';
import { Input, Drawer } from 'antd';
import styles from './index.less';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import layout from './chinese';
import Button from '../button';

export default (props) => {
  const {
    itemname,
    formref,
    keyboardOpen = false,
    setKeyboardOpen,
    finish,
  } = props;

  const [layoutName, setLayoutName] = useState('');
  const [language, setLanguage] = useState('chinese');
  const keyboard = useRef();

  useEffect(() => {
    keyboard?.current?.setInput(formref?.getFieldsValue([itemname])[itemname]);
  }, [itemname, formref?.getFieldsValue([itemname])[itemname]]);

  useEffect(() => {}, [keyboardOpen]);

  //键盘变更
  const onChange = (values) => {
    formref?.setFieldValue(itemname, values);
    formref?.validateFields([itemname]);
  };
  const onKeyPress = (button) => {
    if (button === '{shift}' || button === '{lock}') handleShift();
    if (button === '{shift}') {
      const newLanguages = language === 'english' ? 'chinese' : 'english';
      setLanguage(newLanguages);
    }
    if (button === '{enter}') {
      formref?.setFieldValue(itemname, null);
      keyboard?.current?.clearInput();
      setTimeout(() => {
        keyboard?.current?.candidateBox.destroy();
      }, 100);
    }
  };
  //初始化虚拟键盘
  const keyboardRender = (event) => {
    event.input.default = formref?.getFieldsValue([itemname])[itemname];
  };

  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default';
    setLayoutName(newLayoutName);
  };

  //关闭抽屉
  const onClose = () => {
    setKeyboardOpen(false);
  };
  return (
    <Drawer
      placement="bottom"
      closable={false}
      onClose={onClose}
      open={keyboardOpen}
      className={styles.keydrawer}
      height={285}
      destroyOnClose={true}
      mask={false}
      autoFocus={false}
    >
      <div className={styles.keyboard}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: 5,
          }}
        >
          <div>
            <Button
              type="ok"
              onClick={() => {
                finish ? finish() : onClose();
              }}
            >
              完成
            </Button>
          </div>
        </div>

        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layoutName}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onRender={keyboardRender}
          layout={layout.layout}
          layoutCandidates={
            language === 'english' ? {} : layout.layoutCandidates
          }
          display={{
            '{bksp}': 'baskspace',
            '{enter}': '清除',
            '{shift}': '中/英',
            '{s}': 'shift',
            '{tab}': 'tab',
            '{lock}': '大/小写',
            '{accept}': 'Submit',
            '{space}': 'Space',
          }}
          preventMouseDownDefault={true}
        />
      </div>
    </Drawer>
  );
};
