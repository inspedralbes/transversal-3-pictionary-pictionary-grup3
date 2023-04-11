import { createSlice } from '@reduxjs/toolkit';

export const scoreBoardSlice = createSlice({
  name: 'scoreBoard',
  initialState: {
    score: [],
  },
  reducers: {
    setScoreBoard: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { setScoreBoard } = scoreBoardSlice.actions;
export default scoreBoardSlice.reducer;