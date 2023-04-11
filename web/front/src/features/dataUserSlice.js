import { createSlice } from '@reduxjs/toolkit';

export const dataUserSlice = createSlice({
  name: 'dataUser',
  initialState: {
    dataUser: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.dataUser = action.payload;
    },
  },
});

export const { setUserData } = dataUserSlice.actions;
export default dataUserSlice.reducer;
