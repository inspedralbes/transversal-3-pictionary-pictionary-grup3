import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'loginToken',
  initialState: {
    loginToken: '',
  },
  reducers: {
    setLoginToken: (state, action) => {
      state.loginToken = action.payload;
    },
  },
});

export const { setLoginToken } = loginSlice.actions;
export default loginSlice.reducer;
