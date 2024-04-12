import { ConfigProvider } from 'antd';
export default ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder: 'rgba(255,255,255,.5)',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
