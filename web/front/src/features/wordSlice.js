import { createSlice } from '@reduxjs/toolkit';

export const wordListSlice = createSlice({
  name: 'wordList',
  initialState: {
    word: [],
  },
  reducers: {
    setWordList: (state, action) => {
      state.word = action.payload;
    },
  },
});

export const { setWordList } = wordListSlice.actions;
export default wordListSlice.reducer;
