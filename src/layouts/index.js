import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginLayout from './Login';
import MainLayout from './Main';
import Loader from './loader';

function IndexLayout({ children }) {
  const { isAuthenticated, baseLoader } = useSelector((store) => store.user);
  if (baseLoader) return <Loader />;
  if (!isAuthenticated) return <LoginLayout>{children}</LoginLayout>;
  return <MainLayout>{children}</MainLayout>;
}

export default IndexLayout;
