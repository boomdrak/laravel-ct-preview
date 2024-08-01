import Login from '@/components/Login/Login';
import { useCookies } from 'react-cookie';
import { check } from '@/api/sessionCheck';
import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import { Todo } from './components/Todo/Todo';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);

  const [cookies, setCookie] = useCookies(['access_token']);
  const isLoggedIn = async () => {
    if ((await check(cookies.access_token)) === false) {
      setCookie('access_token', false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  if (cookies.access_token === false) {
    return <Login />;
  }

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Tables" />
              <Todo />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/todo"
          element={
            <>
              <PageTitle title="Tables" />
              <Todo />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
