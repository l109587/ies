import { Button } from 'antd';
/*
    按钮
    type：按钮类型 ok/cancel
    onClick：按钮点击事件
    children：按钮text
    size: 按钮大小 large middle small 
*/
export default (props) => {
  const { children, type = 'ok', onClick, size = 'large' } = props;
  return (
    <Button
      style={{
        color: '#fff',
        border: '1px solid #49baed',
        backgroundColor: type == 'ok' ? '#2270d6' : '#001e4c',
        borderRadius: '5px',
        padding: size === 'large' ? '0 30px' : null,
      }}
      size={size}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
