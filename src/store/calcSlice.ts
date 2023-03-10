import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CalcState = {
  sign: string;
  currentValue: string;
  calculateValue: string | null;
};

const initialState: CalcState = {
  sign: '',
  currentValue: '0',
  calculateValue: null,
};

const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    setCurrentValue(state, action: PayloadAction<string>) {
      const curVal = state.currentValue;
      if (curVal === 'Cannot divide by zero' || curVal === '0' || curVal === state.calculateValue) {
        state.currentValue = action.payload;
      } else {
        state.currentValue += action.payload;
      }
    },
    setActionSign(state, action: PayloadAction<string>) {
      state.calculateValue = state.currentValue;
      state.sign = action.payload;
    },
    getResult(state, action: PayloadAction<string>) {
      state.currentValue = action.payload;
      state.calculateValue = null;
    },
  },
});

export const { setCurrentValue, setActionSign, getResult } = calcSlice.actions;

export default calcSlice.reducer;
