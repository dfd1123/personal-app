import React from 'react';
import {Route} from '@/types/Route';
import MateRoom from '@/views/pages/mateRoom/MateRoom';

const auth : Route[] = [
  {
    path: '/mate-room/:id',
    element: <MateRoom />
  },
];

export default auth;
