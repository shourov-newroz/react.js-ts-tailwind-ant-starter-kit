import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/loading/LoadingSpinner';
import MainLayout from './components/MainLayout';
import { darkTheme, lightTheme } from './config/theme';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

const AppContent = () => {
  const { algorithm, isDark } = useTheme();

  return (
    <ErrorBoundary>
      <ConfigProvider
        theme={{
          algorithm,
          token: {
            colorPrimary: isDark ? darkTheme['--primary-color'] : lightTheme['--primary-color'],
            colorBgContainer: isDark
              ? darkTheme['--background-color-light']
              : lightTheme['--background-color-light'],
            colorText: isDark ? darkTheme['--text-color'] : lightTheme['--text-color'],
            colorTextSecondary: isDark
              ? darkTheme['--text-color-secondary']
              : lightTheme['--text-color-secondary'],
            colorBorder: isDark ? darkTheme['--border-color'] : lightTheme['--border-color'],
            borderRadius: 4,
            fontFamily: lightTheme['--font-family'],
          },
        }}
      >
        <StyleProvider hashPriority="low">
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route
                    index
                    element={
                      <ErrorBoundary>
                        <Home />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="about"
                    element={
                      <ErrorBoundary>
                        <About />
                      </ErrorBoundary>
                    }
                  />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </StyleProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
