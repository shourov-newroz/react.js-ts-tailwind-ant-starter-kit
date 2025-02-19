import { Button, Layout, Menu } from 'antd';
import { Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from './loading/LoadingSpinner';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/about',
      label: <Link to="/about">About</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center p-0 bg-white dark:bg-gray-800">
        <div className="text-lg font-bold px-4 text-gray-800 dark:text-white">SportsRoz</div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="flex-1 border-0"
          theme={isDark ? 'dark' : 'light'}
        />
        <Button onClick={toggleTheme} className="mr-4">
          {isDark ? '🌞 Light' : '🌙 Dark'}
        </Button>
      </Header>
      <Content>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </Content>
      <Footer className="text-center">
        SportsRoz ©{new Date().getFullYear()} Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default MainLayout;
