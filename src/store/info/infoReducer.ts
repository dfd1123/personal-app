import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route, ReduceRoute } from '@/types/Route';

interface StateType {
  loading: boolean;
  routeInfo:
    | ReduceRoute
    | {
        path: null;
        element: null;
        meta: {
          headerHide: boolean;
          footerHide: boolean;
          isAuth: boolean;
        };
      };
}

const initialState: StateType = {
  loading: false,
  routeInfo: {
    path: null,
    element: null,
    meta: {
      headerHide: false,
      footerHide: false,
      isAuth: false,
    },
  },
};

const infoSlice = createSlice({
  name: 'infoSlice',
  initialState,
  reducers: {
    setLoadingStatus(state, action: PayloadAction<{status: boolean}>){
      state.loading = action.payload.status;
    },
    setRouteInfo(state, action: PayloadAction<{ routeInfo: Route | null }>) {
      const { routeInfo } = action.payload;

      if (!routeInfo) return;

      const basicMeta = {
        headerHide: false,
        footerHide: false,
        isAuth: false,
      };

      if (routeInfo.meta) {
        state.routeInfo.meta.headerHide = Boolean(routeInfo.meta.headerHide);
        state.routeInfo.meta.footerHide = Boolean(routeInfo.meta.footerHide);
        state.routeInfo.meta.isAuth = Boolean(routeInfo.meta.isAuth);
      } else {
        state.routeInfo.meta = basicMeta;
      }

      state.routeInfo = { ...routeInfo, meta: state.routeInfo.meta };
    },
  },
});

export const { setLoadingStatus, setRouteInfo } = infoSlice.actions;

export default infoSlice.reducer;
