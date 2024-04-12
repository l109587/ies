import { Layout, ConfigProvider } from 'antd';
const { Content, Header, Footer } = Layout;
import TopContent from '@/components/layout/header';
import TopMenu from '@/components/layout/topMenu';
import MyFooter from '@/components/layout/footer';
import styles from './PrimaryLayout.less';

export default ({ children }) => {
  const contetnHeight = window.innerHeight - 142;
  const headerStyle = {
    color: '#fff',
    height: 96,
    paddingInline: 0,
    backgroundColor: 'rgba(255,255,255,0)',
    lineHeight: '64px',
  };
  const contentStyle = {
    color: '#fff',
    minHeight: 472,
    height: contetnHeight,
  };
  const footerStyle = {
    color: '#fff',
    height: 46,
    backgroundColor: 'rgba(255,255,255,0)',
    padding: 0,
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextPlaceholder: 'rgba(255,255,255,.5)',
          colorTextQuaternary: 'rgba(255,255,255,.5)',
          fontSize: '16px',
          colorBgMask: 'rgba(0, 0, 0, 0.2)',
        },
        components: {
          Button: {
            borderRadius: '5px',
          },
        },
      }}
    >
      <Layout className={styles.main}>
        <Header style={headerStyle}>
          <TopContent />
        </Header>
        <Content style={contentStyle}>
          <div style={{ height: 50 }}>
            <TopMenu />
          </div>
          <div>{children}</div>
        </Content>
        <Footer style={footerStyle}>
          <MyFooter></MyFooter>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};
