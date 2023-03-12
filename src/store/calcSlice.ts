import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CalcState = {
  sign: string;
  currentValue: string;
  calculateValue: string | null;
  isRunning: boolean;
  isFinish: boolean;
};

const initialState: CalcState = {
  sign: '',
  currentValue: '0',
  calculateValue: null,
  isRunning: false,
  isFinish: false,
};

const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    setCurrentValue(state, action: PayloadAction<string>) {
      const curVal = state.currentValue;
      if (
        curVal === 'Cannot divide by zero' ||
        curVal === '0' ||
        curVal === state.calculateValue ||
        state.isFinish
      ) {
        state.currentValue = action.payload;
        state.isFinish = false;
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
      state.isFinish = true;
    },
    toggleRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },
    resetCalc(state) {
      state.sign = '';
      state.currentValue = '0';
      state.calculateValue = null;
      state.isFinish = false;
    },
  },
});

export const { setCurrentValue, setActionSign, getResult, toggleRunning, resetCalc } =
  calcSlice.actions;

export default calcSlice.reducer;
