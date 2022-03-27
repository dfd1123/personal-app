import React from 'react';
import { Navigate } from 'react-router';
import NotFound from '@/views/pages/NotFound';
import ErrorPage from '@/views/pages/ErrorPage';
import {Route} from '@/types/Route';
import Home from '@/views/pages/home/Home';

// ex
/*
const commonRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
      {path: '*', element: <Navigate to='/404' />},
      {path: '/', element: <MainView />},
      {path: '404', element: <PageNotFoundView />},
      {path: 'account', element: <Navigate to='/account/list' />},
    ],
  };
 */

const common : Route[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/404',
    element: <NotFound />,
    meta:{
      headerHide: true,
      footerHide: true
    }
  },
  {
    path: '/500',
    element: <ErrorPage />,
    meta:{
      headerHide: true,
      footerHide: true
    }
  }
];

export default common;
