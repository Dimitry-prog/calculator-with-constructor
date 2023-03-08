import { createSlice } from '@reduxjs/toolkit';

type CalcState = {
  sign: string;
  result: number;
};

const initialState: CalcState = {
  sign: '',
  result: 0,
};

const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {},
});

export default calcSlice.reducer;
