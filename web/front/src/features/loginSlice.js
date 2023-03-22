import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginToken: '',
    loginUser: ''
  },
  reducers: {
    setLoginToken: (state, action) => {
      state.loginToken = action.payload;
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export const { setLoginToken, setLoginUser } = loginSlice.actions;
export default loginSlice.reducer;
