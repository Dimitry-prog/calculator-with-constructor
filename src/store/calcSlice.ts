import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CalcState = {
  sign: string;
  currentValue: string;
  calculateValue: string | null;
  isRunning: boolean;
};

const initialState: CalcState = {
  sign: '',
  currentValue: '0',
  calculateValue: null,
  isRunning: false,
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
    toggleRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },
  },
});

export const { setCurrentValue, setActionSign, getResult, toggleRunning } = calcSlice.actions;

export default calcSlice.reducer;
