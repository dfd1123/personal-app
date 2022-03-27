import React from 'react';
import {Route} from '@/types/Route';
import Login from '@/views/pages/auth/Login';

const auth : Route[] = [
  {
    path: '/login',
    element: <Login />
  },
];

export default auth;
