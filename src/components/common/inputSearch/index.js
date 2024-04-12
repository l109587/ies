import { useRef, useState } from 'react';
import { Input, Drawer } from 'antd';
import styles from './index.less';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import layout from './chinese';
import Button from '../button';
/*
  搜索输入框、虚拟键盘点击输入框弹出虚拟键盘
  placeholder：默认提示
*/
const { Search } = Input;

export default function (props) {
  const { placeholder, search, finish } = props;

  const [input, setInput] = useState('');
  const [layoutName, setLayoutName] = useState('');
  const [language, setLanguage] = useState('chinese');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const keyboard = useRef();
  //键盘变更
  const onChange = (input) => {
    setInput(input);
  };
  const onKeyPress = (button) => {
    if (button === '{shift}' || button === '{lock}') handleShift();
    if (button === '{shift}') {
      const newLanguages = language === 'english' ? 'chinese' : 'english';
      setLanguage(newLanguages);
    }
    if (button === '{enter}') {
      setInput('');
      keyboard?.current?.clearInput();
      setTimeout(() => {
        keyboard?.current?.candidateBox.destroy();
      }, 100);
    }
  };
  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default';
    setLayoutName(newLayoutName);
  };
  const handleChange = (e) => {
    const input = e.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  //关闭抽屉
  const onClose = () => {
    setKeyboardOpen(false);
  };
  const keyboardRender = (event) => {
    event.input.default = input;
  };

  //搜索
  const onSearch = (value) => {
    search(value);
  };
  return (
    <>
      <Search
        value={input}
        placeholder={placeholder}
        onClick={() => {
          setKeyboardOpen(true);
        }}
        className={styles.searchInput}
        onChange={handleChange}
        onSearch={onSearch}
        // allowClear={true}
      />

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
                完成·  
              </Button>
            </div>·
          </div>

          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layoutName}
            onChange={onChange}
            onKeyPress={onKeyPress}
            layout={layout.layout}
            onRender={keyboardRender}
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
    </>
  );
}
