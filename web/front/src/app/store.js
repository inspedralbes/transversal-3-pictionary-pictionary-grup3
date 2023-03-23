import { configureStore } from '@reduxjs/toolkit';
import dataUserReducer from '../features/dataUserSlice';
import loginReducer from '../features/loginSlice';
import scoreBoardReducer from '../features/scoreBoardSlice';

export const store = configureStore({
  reducer: {
    dataUser: dataUserReducer,
    login: loginReducer,
    scoreBoard: scoreBoardReducer,
  },
});
