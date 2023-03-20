import { configureStore } from '@reduxjs/toolkit';
import dataUserReducer from '../features/dataUserSlice';
import loginReducer from '../features/loginSlice';

export const store = configureStore({
  reducer: {
    dataUser: dataUserReducer,
    loginToken: loginReducer,
  },
});
