import { ConfigProvider } from 'antd';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/loading/LoadingSpinner';
import MainLayout from './components/MainLayout';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

const AppContent = () => {
  const { algorithm } = useTheme();

  return (
    <ErrorBoundary>
      <ConfigProvider
        theme={{
          algorithm,
          token: {
            colorPrimary: 'var(--primary-color)',
            colorBgContainer: 'var(--background-color-light)',
            colorText: 'var(--text-color)',
            colorTextSecondary: 'var(--text-color-secondary)',
            colorBorder: 'var(--border-color)',
            borderRadius: 4,
            fontFamily: 'var(--font-family)',
          },
        }}
      >
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
