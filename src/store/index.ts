import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import modalSlice from '@/store/modal/modal';
import dialogSlice from '@/store/modal/dialog';
import toastSlice from '@/store/modal/toast';
import infoReducer from '@/store/info/infoReducer';
import authSlice from '@/store/auth/auth';

export type RootState = ReturnType<typeof store.getState>;
export type Selector<T> = (state: RootState) => T;

const createNoopStorage = () => {
  return {
    getItem(_key:string) {
      return Promise.resolve(null);
    },
    setItem(_key:string, value:any) {
      return Promise.resolve(value);
    },
    removeItem(_key:string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const reducers = combineReducers({
  modalSlice,
  dialogSlice,
  toastSlice,
  infoReducer,
  authSlice
});

const persistConfig = { 
  key: 'root', 
  storage, 
  whitelist:['authSlice']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
